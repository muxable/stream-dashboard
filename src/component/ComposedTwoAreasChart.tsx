import {
	Brush,
	ComposedChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	Legend
} from "recharts";

function getRandomArbitrary(min: number, max: number) {
	return Math.ceil(Math.random() * (max - min) + min);
}

var data: any[] = [];
for (let i = 0; i < 2000; i++) {
	let d = {
		upstream: getRandomArbitrary(0, 10),
		downstream: getRandomArbitrary(0, 30)
	};
	data.push(d);
}

export function ComposedTwoAreasChart() {
	return (
		<ComposedChart
			width={600}
			height={400}
			data={data}
			margin={{
				top: 20,
				right: 20,
				bottom: 20,
				left: 20
			}}
		>
			<XAxis dataKey="name" tick={false} />
			<YAxis label={{ value: "Mbps", angle: -90, position: "insideLeft" }} />
			<Tooltip />
			<Legend />
			<Area
				dot={false}
				dataKey="downstream"
				fill="#8884d8"
				stroke="#8884d8"
			/>
			<Area
				dot={false}
				dataKey="upstream"
				fill="#f5426c"
				stroke="#f5426c"
			/>
			<Brush />
		</ComposedChart>
	);
}
