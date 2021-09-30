import {
	Brush,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ComposedChart
} from "recharts";

function getRandomArbitrary(min: number, max: number) {
	return Math.ceil(Math.random() * (max - min) + min);
}

var data: any[] = [];
for (let i = 0; i < 2000; i++) {
	let d = {
		bitrate: getRandomArbitrary(3800, 4200),
		framerate: getRandomArbitrary(59, 61)
	};
	data.push(d);
}
data[900]["bitrate"] = 2300;
data[952]["bitrate"] = 2900;
data[1000]["bitrate"] = 4500;
data[1001]["bitrate"] = 4500;
data[1022]["bitrate"] = 4300;
data[1030]["bitrate"] = 4500;

export function ComposedTwoYAxisChart() {
	return (
		<ComposedChart
			width={600}
			height={400}
			data={data}
			margin={{
				top: 20,
				right: 20,
				left: 20,
				bottom: 20
			}}
		>
			<XAxis dataKey="name" tick={false} />
			<YAxis
				yAxisId="left"
				label={{ value: "Kbps", angle: -90, position: "insideLeft" }}
			/>
			<YAxis
				yAxisId="right"
				orientation="right"
				label={{ value: "fps", angle: 90, position: "insideRight" }}
			/>
			<Tooltip />
			<Legend />
			<Line yAxisId="left" dot={false} dataKey="bitrate" stroke="#8884d8" />
			<Line yAxisId="right" dot={false} dataKey="framerate" stroke="#82ca9d" />
			<Brush />
		</ComposedChart>
	);
}
