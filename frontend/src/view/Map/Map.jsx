import React from "react";
import Sidebar from "./Sidebar";
import GoogleMapMap from "./GoogleMap";
import CardListComponent from "./CardListComponent";
import "./Map.scss";

const Map = () => {
  return (
    <div className="map-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="map">
        <GoogleMapMap />
      </div>
    </div>
  );
};

export default Map;
