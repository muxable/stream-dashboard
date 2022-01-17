import * as React from "react";
import { useState, useEffect } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
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
  const [earthquakes, setEarthQuakes] = useState(null);

  useEffect(() => {
    fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
      .then((resp) => resp.json())
      .then((json) => {
        // Note: In a real application you would do a validation of JSON data before doing anything with it,
        // but for demonstration purposes we ingore this part here and just trying to select needed data...
        setEarthQuakes(json);
      });
  }, []);

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
          <Source type="geojson" data={earthquakes!}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
      </MapGL>
    </div>
  );
}
