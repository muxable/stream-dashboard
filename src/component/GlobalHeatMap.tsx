import * as React from "react";
import { useState } from "react";
import MapGL, { Layer, Source } from "react-map-gl";
import { heatmapLayer } from "./MapStyle";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoia2V2bW8zMTQiLCJhIjoiY2t3bjR3cTloMDJ1ajJ1cW9obGh2ZmcybCJ9.uWdEuy9ilDupIiaOQIcMpQ";

export function GlobalHeatMap() {
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });

  return (
    <div>
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {true && (
          <Source type="geojson" data="/data/sample.json">
            <Layer {...heatmapLayer} />
          </Source>
        )}
      </MapGL>
    </div>
  );
}
