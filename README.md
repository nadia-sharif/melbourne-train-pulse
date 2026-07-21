# Melbourne Metro Pulse
## Using ArcGIS Maps SDK for JavaScript Vite TypeScript template


An interactive 3D WebGIS application that visualizes Melbourne's passenger train network in real-time. Built with **TypeScript**, **Vite**, and the **ArcGIS Maps SDK for JavaScript**, this project streams live public transport data to deliver an immersive, high-performance spatial monitoring tool.
<img width="2880" height="1530" alt="chrome-capture-2026-7-21" src="https://github.com/user-attachments/assets/f53401f8-0af5-4e5f-9618-2f2d2c0b81ec" />

<img width="2880" height="1530" alt="chrome-capture-2026-7-21 (1)" src="https://github.com/user-attachments/assets/fd8f57b1-d0e2-49d9-b508-99dd05cebe3e" />
<img width="1000" height="531" alt="melbourne-train-pulse video capture" src="https://github.com/user-attachments/assets/cc82e594-76cd-45c2-b215-032287693596" />



---

##  Live Demo & Source Code

* **Live Application:** [https://nadia-sharif.github.io/melbourne-train-pulse/](https://nadia-sharif.github.io/melbourne-train-pulse/)


---

##  Features & Key Highlights

* **Real-Time GTFS Tracking:** Consumes live vehicle position updates from Transport Victoria's open API to maintain active train locations across the Melbourne metro area.
* **Cost-Effective WebGIS Architecture:** Leverages the ArcGIS Maps SDK for JavaScript with standard vector basemaps—demonstrating how to build robust, interactive 3D web mapping tools **without API keys or paid Esri licensing**.
* **Ethereal 3D Emissive Visuals:** Utilizes 3D point symbol material properties (`PointSymbol3D` / `IconSymbol3DLayer`) to render glowing, neon train markers against dark basemaps for striking, low-light visibility.
* **Client-Side Spatial Proximity:** Features on-the-fly station matching. When a user selects a train marker, the app executes a **Haversine distance calculation** against local station GeoJSON data to determine and display the nearest train station instantaneously.
* **Modern Shell & Layout:** Designed using Esri's **Calcite Design System** web components (`<calcite-shell>`, panels, and navigation) for a clean, responsive UI.

---

##  Tech Stack & Tools

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | TypeScript, HTML5, CSS3 |
| **Build Tooling** | Vite |
| **Mapping & 3D Engine** | ArcGIS Maps SDK for JavaScript (`@arcgis/core`, `@arcgis/map-components`) |
| **UI Components** | Esri Calcite Design System (`@esri/calcite-components`) |
| **Spatial Data** | GeoJSON, Transport Victoria GTFS-Realtime API |
| **CI/CD & Hosting** | GitHub Actions, GitHub Pages |

---

##  Spatial Logic & Calculations

### Nearest Station Proximity (Haversine Formula)
To eliminate reliance on external geoprocessing services or backend spatial databases for basic queries, the application handles spatial proximity client-side. 

When a user clicks on an active vehicle marker:
1. The app retrieves the current coordinates $(\text{lat}_1, \text{lon}_1)$ of the selected train.
2. It iterates through the features of the station dataset $(\text{lat}_2, \text{lon}_2)$.
3. The **Haversine formula** calculates the great-circle distance between the train and every station:

$$d = 2r \arcsin \left( \sqrt{\sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1) \cos(\phi_2) \sin^2\left(\frac{\Delta \lambda}{2}\right)} \right)$$

4. The station with the minimum calculated distance is flagged and rendered in the detail panel.

---


## About ArcGIS Maps SDK for JavaScript Vite TypeScript template

This template demonstrates how to use the [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/) in a Vite TypeScript application.

## Get started

To quickly scaffold a new application using this template, run the following command in your terminal:

```bash
npx @arcgis/create -n my-arcgis-app -t vite
```

This template uses the following packages:

- [`@arcgis/core`](https://www.npmjs.com/package/@arcgis/core)
- [`@arcgis/map-components`](https://www.npmjs.com/package/@arcgis/map-components)
- [`@arcgis/charts-components`](https://www.npmjs.com/package/@arcgis/charts-components)
- [`@esri/calcite-components`](https://www.npmjs.com/package/@esri/calcite-components)


## Resources

See the [Get started with npm guide](https://developers.arcgis.com/javascript/latest/get-started/#use-arcgiscreate) for full instructions.
