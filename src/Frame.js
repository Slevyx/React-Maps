import React from "react";
import GoogleMapReact from "google-map-react";
import markerImage from "./marker.png";

const AnyReactComponent = ({ text }) => (
  <img src={markerImage} alt="..." height="40vh" />
);

export default function Frame(props) {
  return (
    <div style={{ height: "75vh", width: "100%", marginTop: "25px" }}>
      <GoogleMapReact center={props.center} defaultZoom={10}>
        <AnyReactComponent
          lat={props.center.lat}
          lng={props.center.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
