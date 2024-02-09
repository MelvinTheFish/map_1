import React, { useState, useEffect, useRef } from "react";
import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import "leaflet/dist/leaflet.css";
import { addressPoints } from "./addressPoints";
import io from "socket.io-client";

const socket = io("ws://localhost:5000");

function KeepLocation({ zoomRef, centerRef }) {
  const eve = useMapEvents({
    moveend: () => {
      zoomRef.current = eve.getZoom();
      centerRef.current = eve.getCenter();
    },
  });
}
export default function Map({ showHeatMap }) {
  const [data, setData] = useState([]);

  const zoomRef = useRef(7);
  const centerRef = useRef([31.5, 34.75]);

  //   const [zoom, setZoom] = useState(7);
  //   const [center, setCenter] = useState([31.5, 34.75]);
  const [serverMessage, setServerMessage] = useState<string>('{"points": []}');

  const sendToServer = (msg: string) => {
    socket.emit("to-server", msg);
    //return serverMessage;
  };
  //const [heatmapData, setHeatmapData] = useState([[32, 34.8]]);
  useEffect(() => {
    socket.on("from-server", (msg) => {
      setServerMessage(msg);
    });
    sendToServer("select * from loc_data");
  }, []);

  useEffect(() => {
    // console.log(serverMessage);
    setData(JSON.parse(serverMessage).points);
  }, [serverMessage]);

  const heatmapOptions = {
    radius: 20,
    blur: 20,
    maxZoom: 18,
  };

  return (
    <>
      <MapContainer
        center={centerRef.current}
        zoom={zoomRef.current}
        key={Math.random()}
        zoomControl={false}
        attributionControl={false}
        style={{ height: "100vh", width: "100vw", zIndex: 0 }}
      >
        <KeepLocation zoomRef={zoomRef} centerRef={centerRef} />
        <Marker
          position={[32.8312, 35.3178]}
          //icon={customMarkerIcon}
        >
          <Popup>Popup for Marker</Popup>
          <Tooltip>Tooltip for Marker</Tooltip>
        </Marker>
        {showHeatMap && (
          <HeatmapLayer
            points={data}
            longitudeExtractor={(point) => point[1]}
            latitudeExtractor={(point) => point[0]}
            key={Math.random() + Math.random()}
            intensityExtractor={(point) => 2}
            {...heatmapOptions}
          />
        )}
        <TileLayer url="http://localhost:8080/tile/{z}/{x}/{y}.png" />
      </MapContainer>
    </>
  );
}
