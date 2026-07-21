import './style.css'; // Adjust path if style.css is elsewhere, e.g., './styles/style.css'

import { generateStatusMarkup, generateLineItemMarkup, getHaversineDistanceMeters, trainLineColors, trainLineNames } from './utils';

import esriConfig from "@arcgis/core/config.js";
import "@arcgis/map-components/dist/components/arcgis-scene";
import "@arcgis/map-components/dist/components/arcgis-zoom";

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";

import { setAssetPath } from "@esri/calcite-components/dist/components";

import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import Point from "@arcgis/core/geometry/Point.js";
import Polyline from "@arcgis/core/geometry/Polyline.js"; // <-- ADD THIS

setAssetPath("https://js.arcgis.com/calcite-components/2.13.0/assets");
esriConfig.assetsPath = "https://js.arcgis.com/4.30/@arcgis/core/assets";

let trainLayer: GraphicsLayer;
let routeHistoryLayer: GraphicsLayer; // Layer for trail paths

// In-memory cache to store the last known position of each tripId
const historicalPositions = new Map<string, { lon: number, lat: number }>();

// CHECK_STATUS: Add this at the top of your script file to persist coordinates between updates
//const positionStabilityTracker = new Map<string, { lat: number; lon: number; staticCount: number }>();
let activeTrainHighlight: any = null;
let activeTrailHighlight: any = null;


// Fallback color if an unexpected code appears
const DEFAULT_LINE_COLOR = '#00f2fe';


// Load Train Stops location data from geojson files
let stationList: Array<{ name: string; point: Point }> = [];

async function loadStations() {
  try {
    const response = await fetch("/data/train_stops.geojson");
    const stationGeoJSON = await response.json();

    stationList = stationGeoJSON.features.map((feature: any) => ({
      name: feature.properties.STOP_NAME,
      point: new Point({
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        spatialReference: { wkid: 4326 }
      })
    }));

    console.log(`Successfully loaded ${stationList.length} train stations.`);
  } catch (err) {
    console.error("Failed to load station GeoJSON:", err);
  }
}
// --- STEP 1: Load Train station from train_stops.geojson ---
loadStations();

import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";

// --- TRAIN STATIONS LAYER WITH TEXT LABELS ---
const stationLayer = new GeoJSONLayer({
  url: "/data/train_stops.geojson", // or imported relative path
  title: "Train Stations",

  // Only show markers & labels when zoomed in closer than 1:50,000 scale
  minScale: 50000,
  maxScale: 0,

  // 1. Subtle Station Marker Styling
  renderer: {
    type: "simple",
    symbol: {
      type: "simple-marker",
      style: "circle",
      color: "#ffffff",
      outline: {
        color: "#0066cc",
        width: 1.5
      },
      size: "6px"
    }
  } as any,

  // 2. Station Name Labels
  labelingInfo: [
    {
      // Extract STOP_NAME and remove "Railway Station" for cleaner text on the map
      labelExpressionInfo: {
        expression: "Replace($feature.STOP_NAME, ' Railway Station', '')"
      },
      symbol: {
        type: "text",
        color: "#0066cc",
        haloColor: "#ffffff",
        haloSize: "1.0px",
        font: {
          size: 9,
          family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          weight: "bold"
        },
        yoffset: 8 // Offsets the text slightly above the marker dot
      },
      labelPlacement: "above-center"
    }
  ]
});



// --- STEP 2: Fetch and process live coordinates from Vercel ---
async function fetchLiveTrainPositions() {
  try {
    const response = await fetch('https://metro-train-server.vercel.app/trains-details');
    const trainData = await response.json();

    // Reformat Vercel data schema to fit our modular rendering logic
    const parsedTrains = trainData.map((train: any) => {
      // Clean up the route ID string exactly like your Cesium code did
      const routeCode = train.routeId.split('-').pop().replace(':', '');

      return {
        id: train.tripId,
        line: routeCode,
        lon: parseFloat(train.longitude),
        lat: parseFloat(train.latitude),
        bearing: train.bearing
      };
    });

    // Pass the parsed array directly to the separate render logic
    renderTrains(parsedTrains);

  } catch (error) {
    console.error("Failed to stream data pipeline from Vercel server:", error);
  }
}

// 1. Outside your render function, create a persistent map to track movement histories
const coordinateHistory = new Map<string, { lat: number; lon: number; staticFrames: number }>();


function renderTrains(trainData: Array<{ id: string, line: string, lon: number, lat: number, bearing?: number, currentStatus?: number }>) {
  if (!trainLayer || !routeHistoryLayer) return;

  // Track the list of active train IDs in this specific data packet
  const activeTrainIds = new Set<string>();

  trainData.forEach((train) => {
    activeTrainIds.add(train.id);

    const lineHexColor = trainLineColors[train.line] || DEFAULT_LINE_COLOR;

    const rawBearing = train.bearing !== undefined
      ? (typeof train.bearing === 'number' ? train.bearing : parseFloat(train.bearing))
      : 0;
    const correctedHeading = rawBearing + 180;

    const currentPoint = new Point({
      longitude: train.lon,
      latitude: train.lat,
      z: 5
    });

    // --- RUN LOCAL STATIONARY DETECTION ---
    let calculatedStatus = 2; // Default to Moving

    if (coordinateHistory.has(train.id)) {
      const lastPos = coordinateHistory.get(train.id)!;
      const hasMoved = Math.abs(lastPos.lat - train.lat) > 0.00001 || Math.abs(lastPos.lon - train.lon) > 0.00001;

      if (!hasMoved) {
        lastPos.staticFrames += 1;
        if (lastPos.staticFrames >= 5) {
          calculatedStatus = 1; // Force status to Stopped
          console.log(train.id + " Stopped ");
        }
      } else {
        lastPos.lat = train.lat;
        lastPos.lon = train.lon;
        lastPos.staticFrames = 0;
      }
    } else {
      coordinateHistory.set(train.id, { lat: train.lat, lon: train.lon, staticFrames: 0 });
    }

    // --- GENERATE DYNAMIC MESH SYMBOLS ---
    let trainSymbol;
    if (calculatedStatus === 1) {
      trainSymbol = {
        type: "point-3d",
        symbolLayers: [
          {
            type: "object",
            resource: { primitive: "sphere" },
            width: 65,
            height: 65,
            depth: 65,
            heading: 0,
            material: {
              color: lineHexColor,
              emissive: { source: "color", strength: 1.0 }
            }
          }
        ]
      };
    } else {
      trainSymbol = {
        type: "point-3d",
        symbolLayers: [
          {
            type: "object",
            resource: { primitive: "tetrahedron" },
            width: 55,
            height: 10,
            depth: 65,
            heading: correctedHeading,
            tilt: 0,
            translation: [0, 42, 4],
            material: {
              color: lineHexColor,
              emissive: { source: "color", strength: 2.5 }
            }
          },
          {
            type: "text",
            size: 10,
            font: { weight: "bold", family: "monospace" },
            material: { color: [255, 255, 255] },
            halo: { color: [25, 25, 25, 0.9], size: 2.5 },
            verticalAlignment: "bottom",
            offsets: [0, 16]
          }
        ]
      };
    }

    // --- DRAW DETACHED HISTORICAL TRAIL ---
    if (historicalPositions.has(train.id)) {
      const pastCoord = historicalPositions.get(train.id)!;

      if (pastCoord.lon !== train.lon || pastCoord.lat !== train.lat) {
        const polyline = new Polyline({
          paths: [[
            [pastCoord.lon, pastCoord.lat, 4],
            [train.lon, train.lat, 4]
          ]]
        });

        const trailGraphic = new Graphic({
          geometry: polyline,
          symbol: {
            type: "simple-line",
            color: lineHexColor,
            width: 4,
            style: "short-dot"
          } as any,
          attributes: { parentTripId: train.id } // Tag it to manage trail segments cleanly
        });

        routeHistoryLayer.add(trailGraphic);
      }
    }
    historicalPositions.set(train.id, { lon: train.lon, lat: train.lat });

    // --- OBJECT MUTATION IN PLACE (FIXES REFRESH FLICKERING) ---
    // Look up the active graphic directly in the layer's live collection
    const existingTrainGraphic = trainLayer.graphics.find(
      (graphic) => graphic.attributes && graphic.attributes.id === train.id
    );

    if (existingTrainGraphic) {
      // 1. Mutate the position vector coordinate geometry in place
      existingTrainGraphic.geometry = currentPoint;

      // 2. Mutate the rendering style mesh properties in place
      existingTrainGraphic.symbol = trainSymbol as any;

      // 3. Mutate the metadata properties
      existingTrainGraphic.attributes = train;


    } else {
      // Create a brand new graphic if it's the first time seeing this train
      const newTrainGraphic = new Graphic({
        geometry: currentPoint,
        symbol: trainSymbol as any,
        attributes: train
      });
      trainLayer.add(newTrainGraphic);
    }
  });

  // --- CLEAN UP OLD TRANSIT VECTORS ---
  // If a train drops off the live Vercel feed, remove its graphic from the map
  // 1. Identify trains that dropped off the live feed
  const orphanedTrains = trainLayer.graphics.filter(
    (graphic) => !activeTrainIds.has(graphic.attributes?.id)
  ).toArray();


  // 2. Extract the trip IDs of all removed trains
  if (orphanedTrains.length > 0) {
    console.log("Trains removed:" + orphanedTrains.length)
    trainLayer.removeMany(orphanedTrains);
  }

  // 3. Extract the trip IDs of all removed trains
  const orphanedIds = new Set(
    orphanedTrains.map((graphic) => graphic.attributes?.id).filter(Boolean)
  );

  // 4. Find matching historical trail graphics on the trail layer
  const orphanedTrails = routeHistoryLayer.graphics.filter(
    (graphic) => orphanedIds.has(graphic.attributes?.parentTripId)
  ).toArray();

  // 5. Clean up map layers and memory caches
  trainLayer.removeMany(orphanedTrains);

  if (orphanedTrails.length > 0) {
    routeHistoryLayer.removeMany(orphanedTrails);
  }
  // Update the sidepanel to show current count of live trains
  updateSidePanelCounters()

}



// --- STEP 3: Boot up the map window and set intervals ---
async function initializeMap() {
  const sceneElement = document.querySelector("#safety-scene") as any;
  if (!sceneElement) return;

  try {
    await sceneElement.viewOnReady();
    const view = sceneElement.view;

    if (!view) {
      setTimeout(initializeMap, 100);
      return;
    }

    view.camera = {
      //position: { longitude: 144.9631, latitude: -37.8136, z: 20000 },
      position: { longitude: 144.9631, latitude: -37.97, z: 20000 },
      heading: 0,
      tilt: 45
    };

    // Move the date parameters to an afternoon timestamp for clear basemap visibility
    view.environment.lighting.date = new Date(2026, 6, 14, 14, 0, 0);
    view.environment.lighting.directShadowsEnabled = false;
    view.environment.lighting.ambientOcclusionEnabled = true;
    view.environment.lighting.glow = { intensity: 1.0 };

    view.map.add(stationLayer);

    // Instantiate the trail layer FIRST so it sits beneath the train dots
    routeHistoryLayer = new GraphicsLayer({ id: "route-history-layer" });
    view.map.add(routeHistoryLayer);

    trainLayer = new GraphicsLayer({ id: "train-layer" });
    view.map.add(trainLayer);

    // Initial load call
    await fetchLiveTrainPositions();

    // Query your server endpoints every 10 seconds automatically
    setInterval(fetchLiveTrainPositions, 10000);

    // --- STEP 4: Handle Interactive Clicking, Popups, and Highlights ---
    const trainLayerView = await view.whenLayerView(trainLayer);
    const routeHistoryLayerView = await view.whenLayerView(routeHistoryLayer);

    view.on("click", async (event: any) => {
      // 1. Prevent the default map click behavior from fighting your custom code
      event.stopPropagation();

      // Clear any existing active selection highlights
      if (activeTrainHighlight) {
        activeTrainHighlight.remove();
        activeTrainHighlight = null;
      }
      if (activeTrailHighlight) {
        activeTrailHighlight.remove();
        activeTrailHighlight = null;
      }

      // 2. Perform the screen raycast
      const response = await view.hitTest(event);

      const matchedResult = response.results.find(
        (result: any) => result.type === "graphic" && result.graphic.layer === trainLayer
      );

      if (matchedResult && matchedResult.type === "graphic") {
        const clickedTrain = matchedResult.graphic;
        const attrs = clickedTrain.attributes;

        // 3. Highlight structures
        activeTrainHighlight = trainLayerView.highlight(clickedTrain);

        const matchingTrails = routeHistoryLayer.graphics.filter(
          (g) => g.attributes && g.attributes.parentTripId === attrs.id
        ).toArray();

        if (matchingTrails.length > 0) {
          activeTrailHighlight = routeHistoryLayerView.highlight(matchingTrails);
        }

        // 4. Safely check types and format coordinates
    
        // Look up the clean line name, fallback to the code if not found
        const fullLineName = trainLineNames[attrs.line] || `${attrs.line} Line`;

        // Inside your view.on("click") event handler:
        const locationLabel = getNearestStationName(clickedTrain.geometry);

        // 5. Open the tailored passenger telemetry layout
        view.openPopup({
          location: clickedTrain.geometry,
          title: `🚆 ${fullLineName}`,
          content: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 2px 4px; font-size: 13px; color: #1a1a1a; min-width: 250px;">
      
      <!-- LIVE POSITION HIGHLIGHT BANNER -->
      <div style="background: #f0f7ff; border-left: 3px solid #0066cc; padding: 6px 8px; border-radius: 0 4px 4px 0; margin-bottom: 8px;">
        <span style="color: #555555; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; display: block;">Current Location</span>
        <strong style="font-size: 13px; color: #0066cc; display: block; margin-top: 1px;">📍 ${locationLabel}</strong>
      </div>

      <!-- TELEMETRY COMPACT GRID -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px; font-size: 12px; align-items: center;">
        
        <div>
          <span style="color: #777777; font-size: 10px; text-transform: uppercase; display: block;">Service ID</span>
          <strong style="font-family: SFMono-Regular, Consolas, monospace; font-size: 12px; color: #333333;">${attrs.id}</strong>
        </div>
      </div>

    </div>
  `
        });
        
      } else {
        view.closePopup();
      }
    });

  } catch (error) {
    console.error("Map initialization failed:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMap);
} else {
  initializeMap();
}

// Step 4: Update sidepanelms how the number of trains on each line
function updateSidePanelCounters() {
  const allTrains = trainLayer.graphics.toArray();
  const totalCount = allTrains.length;

  // Initialize your line tallies
  const lineCounts: Record<string, number> = {};
  Object.keys(trainLineNames).forEach(code => {
    lineCounts[code] = 0;
  });

  // Tally up the trains based on their attribute codes
  allTrains.forEach(graphic => {
    const code = graphic.attributes?.line;
    if (code && lineCounts[code] !== undefined) {
      lineCounts[code]++;
    }
  });

  // Render the data into your side panel container HTML
  const panelContainer = document.getElementById("transit-side-panel");
  if (!panelContainer) return;


let htmlMarkup =generateStatusMarkup(totalCount)

  Object.entries(lineCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([code, count]) => {

    const fullName = trainLineNames[code] || `${code} Line`;
    const colour = trainLineColors[code] || "#64748b";

    htmlMarkup += generateLineItemMarkup(fullName, count, colour)
  
});

 htmlMarkup += `
  </ul>
</div>
`;


  panelContainer.innerHTML = htmlMarkup;
}

function getNearestStationName(trainGeometry: Point): string {
  // Ensure the geometry exists and has valid numeric coordinates
  if (!trainGeometry || trainGeometry.latitude == null || trainGeometry.longitude == null) {
    return "In Transit";
  }

  // TypeScript now safely knows these are strictly `number`
  const trainLat: number = trainGeometry.latitude;
  const trainLon: number = trainGeometry.longitude;

  let nearestStationName = "";
  let minDistanceMeters = Infinity;

  for (const station of stationList) {
    // Ensure station point coordinates are valid numbers too
    const stationLat = station.point.latitude ?? 0;
    const stationLon = station.point.longitude ?? 0;

    const distMeters = getHaversineDistanceMeters(trainLat, trainLon, stationLat, stationLon);

    if (distMeters < minDistanceMeters) {
      minDistanceMeters = distMeters;
      nearestStationName = station.name;
    }
  }

  const cleanName = nearestStationName.replace(" Railway Station", "");

  if (minDistanceMeters <= 200) {
    return `At ${cleanName} Station`;
  } else if (minDistanceMeters <= 2500) {
    return `Near ${cleanName} Station (${Math.round(minDistanceMeters)}m)`;
  }

  return "In Transit";
}

