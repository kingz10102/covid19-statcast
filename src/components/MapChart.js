import React from 'react';
import '../css/MapChart.css';
import { Map as LeafletMap, TileLayer } from "react-leaflet";
function MapChart({countries, zoom, center}) {
    return (
        <div className="mapChart">
         <LeafletMap center={center} zoom={zoom}>
            <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
         </LeafletMap>
        </div>
    )
}

export default MapChart
