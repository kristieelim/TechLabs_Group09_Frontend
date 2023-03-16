import React from "react";
import { Map, TileLayer, MapContainer } from "react-leaflet";

function MyMap() {
  const position = [1.35, 103.8];
  return (
    <MapContainer
      className="map"
      center={position}
      zoom={10}
      style={{ height: 500, width: "100%" }}
    >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    </MapContainer>
  );
}

export default MyMap;