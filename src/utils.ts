// Official Metro Train Line Color Mapping adapted from your Cesium configuration
export const trainLineColors: Record<string, string> = {
  // 'ALM': '#152C6B', // Alamein
  // 'BEG': '#152C6B', // Belgrave
  // 'GWY': '#152C6B', // Glen Waverley
  // 'LIL': '#152C6B', // Lilydale
  'ALM': '#d300ff', // Alamein
  'BEG': '#d300ff', // Belgrave
  'GWY': '#d300ff', // Glen Waverley
  'LIL': '#d300ff', // Lilydale
  'CBE': '#279FD5', // Cranbourne
  'PKM': '#2181d5', // Pakenham
  'FKN': '#028430', // Frankston
  //'WER': '#028430', // Werribee
  'WER': '#8dd105', // Werribee
  'STY': '#028430', // Stony Point
  'HBE': '#eb1572', // Hurstbridge
  'MDD': '#BE1014', // Mernda
  'SHM': '#F178AF', // Sandringham
  //'WIL': '#028430', // Williamstown
  'WIL': '#ff7300', // Williamstown
  'UFD': '#ffe600', // Upfield
  //'UFD': '#FFBE00', // Upfield
  'SUY': '#FFBE00', // Sunbury
  'CGB': '#8400ff', // Craigieburn

};
export const trainLineNames: Record<string, string> = {
  'ALM': 'Alamein Line',
  'BEG': 'Belgrave Line',
  'GWY': 'Glen Waverley Line',
  'LIL': 'Lilydale Line',
  'CBE': 'Cranbourne Line',
  'PKM': 'Pakenham Line',
  'FKN': 'Frankston Line',
  'WER': 'Werribee Line',
  'STY': 'Stony Point Line',
  'HBE': 'Hurstbridge Line',
  'MDD': 'Mernda Line',
  'SHM': 'Sandringham Line',
  'WIL': 'Williamstown Line',
  'UFD': 'Upfield Line',
  'SUY': 'Sunbury Line',
  'CGB': 'Craigieburn Line'
};


// Haversine formula to calculate exact distance in meters between two lat/lon points
export function getHaversineDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
}

// src/utils.ts

/**
 * Formats train count data into HTML for the side panel card
 */
export function generateStatusMarkup(totalCount: number): string {
  return `
<div>
  <!-- Summary Card -->
  <div style="
    background:#1f2937;
    color:white;
    padding:12px 14px;
    border-radius:8px;
    margin-bottom:10px;
  ">

    <div style="
      font-size:11px;
      font-weight:600;
      letter-spacing:.8px;
      opacity:.75;
      text-transform:uppercase;
    ">
      Active Trains
    </div>

    <div style="
      display:flex;
      justify-content:space-between;
      align-items:flex-end;
      margin-top:4px;
    ">

      <div style="
        font-size:40px;
        font-weight:700;
        line-height:1;
      ">
        ${totalCount}
      </div>

      <div style="
        font-size:12px;
        opacity:.75;
        text-align:right;
        line-height:1.3;
      ">
        Melbourne Metro
      </div>

    </div>

  </div>

  <!-- Fleet List -->
  <ul style="
    list-style:none;
    padding:0;
    margin:0;
  ">
`;
}

/**
 * Formats individual line status row
 */
export function generateLineItemMarkup(lineName: string, lineCount: number, lineColour: string): string {
  return `
   <li style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:8px 10px;
        margin-bottom:4px;
        background:white;
        border:1px solid #e5e7eb;
        border-radius:8px;
      ">

        <div style="display:flex;align-items:center;gap:8px;">

          <span style="
            width:10px;
            height:10px;
            border-radius:50%;
            background:${lineColour};
            flex-shrink:0;
          "></span>

          <span style="
            font-size:13px;
            font-weight:600;
            color:#1f2937;
          ">
            ${lineName}
          </span>

        </div>

        <span style="
          background:#e0f2fe;
          color:#0284c7;
          padding:2px 8px;
          border-radius:999px;
          font-size:12px;
          font-weight:700;
          min-width:24px;
          text-align:center;
        ">
          ${lineCount}
        </span>

      </li>
  `;
}


