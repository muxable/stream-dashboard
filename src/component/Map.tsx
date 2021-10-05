import { CircleMarker, MapContainer, TileLayer, Popup } from 'react-leaflet'


const unstableEvents: UnstableEvent[] = [
	{ x: 40.7831, y: -73.9712, fps: 60, bitrate: 4000, upstream: 0, downstream: 0, temperature: 88 },
	{ x: 40.7811, y: -73.8712, fps: 60, bitrate: 4000, upstream: 0, downstream: 0, temperature: 50 },
	{ x: 40.7531, y: -73.9712, fps: 59, bitrate: 3000, upstream: 2, downstream: 0, temperature: 55 },
	{ x: 40.7831, y: -73.9733, fps: 60, bitrate: 4000, upstream: 0, downstream: 0, temperature: 88 },
	{ x: 40.7631, y: -73.9612, fps: 60, bitrate: 4000, upstream: 0, downstream: 0, temperature: 88 },
]

type UnstableEvent = {
	x: number
	y: number
	fps: number
	bitrate: number
	upstream: number
	downstream: number
	temperature: number
}


export function Map() {
	return (
		<MapContainer
			center={[40.7831, -73.9712]}
			zoom={13}
			scrollWheelZoom={true}
			style={{ height: "500px", width: "100%" }}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{
				unstableEvents.map((unstableEvent, i) => {
					const { x, y, fps, bitrate, upstream, downstream, temperature } = unstableEvent
					return (
						<CircleMarker center={[x, y]} pathOptions={{ color: 'red' }} radius={10}>
							<Popup>
								bitrate: {bitrate} <br />
								fps: {fps} <br />
								upstream: {upstream} <br />
								downstream: {downstream} <br />
								temperature: {temperature} <br />
							</Popup>
						</CircleMarker>
					)
				})
			}
		</MapContainer>
	)
}