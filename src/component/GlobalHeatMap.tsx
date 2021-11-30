import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { render } from "react-dom";
import MapGL, { Source, LayerProps, Layer } from "react-map-gl";
import { heatmapLayer } from "./MapStyle";
// import ControlPanel from './control-panel';

const MAPBOX_TOKEN = ""; // Set your mapbox token here

export function GlobalHeatMap() {
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });
  const [allDays, useAllDays] = useState(true);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, selectTime] = useState(0);
  const [earthquakes, setEarthQuakes] = useState(null);

  useEffect(() => {
    /* global fetch */
    fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
      .then((resp) => resp.json())
      .then((json) => {
        // Note: In a real application you would do a validation of JSON data before doing anything with it,
        // but for demonstration purposes we ingore this part here and just trying to select needed data...
        const features = json.features;
        const endTime = features[0].properties.time;
        const startTime = features[features.length - 1].properties.time;

        setTimeRange([startTime, endTime]);
        setEarthQuakes(json);
        selectTime(endTime);
      });
  }, []);

  // const data = useMemo(() => {
  // 	return allDays ? earthquakes : filterFeaturesByDay(earthquakes, selectedTime);
  // }, [earthquakes, allDays, selectedTime]);

  return (
    <div>
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {true && (
          <Source type="geojson" data={earthquakes!}>
            <Layer {...heatmapLayer} />
            {/* <Layer layerProps={...heatmapLayer} /> */}
          </Source>
        )}
      </MapGL>
      {/* <ControlPanel
				startTime={timeRange[0]}
				endTime={timeRange[1]}
				selectedTime={selectedTime}
				allDays={allDays}
				onChangeTime={selectTime}
				onChangeAllDays={useAllDays}
			/> */}
    </div>
  );
}
