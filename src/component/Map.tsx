import { CircleMarker, MapContainer, TileLayer, Popup } from "react-leaflet";

type UnstableEvents = {
  lowBitrateEvents: LowBitrateEvent[];
  lowAudiobitrateEvents: LowAudioBitrateEvent[];
};

export type LowBitrateEvent = {
  x: number;
  y: number;
  bitrate: number;
  timestamp: Date;
};

export type LowAudioBitrateEvent = {
  x: number;
  y: number;
  audioBitrate: number;
  timestamp: Date;
};

export function MapComponent({
  unstableEvents,
}: {
  unstableEvents: UnstableEvents;
}) {
  const { lowBitrateEvents, lowAudiobitrateEvents } = unstableEvents;
  return (
    <MapContainer
      center={[40.7831, -73.9712]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {lowBitrateEvents.map(({ x, y, bitrate, timestamp }, i) => {
        return (
          <CircleMarker
            center={[x, y]}
            pathOptions={{ color: "red" }}
            radius={10}
            key={i}
          >
            <Popup>
              longitude: {x} <br />
              latitude: {y} <br />
              bitrate: {bitrate} <br />
              {timestamp.toLocaleString()} <br />
            </Popup>
          </CircleMarker>
        );
      })}
      {lowAudiobitrateEvents.map(({ x, y, audioBitrate, timestamp }, i) => {
        return (
          <CircleMarker
            center={[x, y]}
            pathOptions={{ color: "yellow" }}
            radius={10}
            key={i}
          >
            <Popup>
              longitude: {x} <br />
              latitude: {y} <br />
              audio bitrate: {audioBitrate} <br />
              {timestamp.toLocaleString()} <br />
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
