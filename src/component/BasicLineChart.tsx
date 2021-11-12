import {
	XAxis,
	YAxis,
	Tooltip,
	Brush,
	Legend,
	LineChart,
	Line,
} from "recharts";

type BasicLinesDataFormat = {
	xAxisDataKey: string;
	dataKeys: string[];
	data: any[];
	yAxisUnit: string;
};

const colors = ["#8884d8", "#3474eb", "#34eb77", "#e3406b", "#e3cc66"];

export function BasicLineChart({ format }: { format: BasicLinesDataFormat }) {
	const { xAxisDataKey, dataKeys, data, yAxisUnit } = format;

	return (
		<LineChart
			width={600}
			height={400}
			data={data}
			margin={{
				top: 20,
				right: 20,
				left: 20,
				bottom: 20,
			}}
		>
			<XAxis dataKey={xAxisDataKey} tick={false} />
			<YAxis
				label={{ value: `${yAxisUnit}`, angle: -90, position: "insideLeft" }}
			/>
			<Legend />
			<Tooltip />
			{dataKeys.map((key, index) => {
				return (
					<Line
						dataKey={key}
						stroke={colors[index % colors.length]}
						fill={colors[index % colors.length]}
						dot={false}
					/>
				);
			})}
			<Brush>
				<LineChart>
					{dataKeys.map((key, index) => {
						return (
							<Line
								dataKey={key}
								stroke={colors[index % colors.length]}
								fill={colors[index % colors.length]}
								dot={false}
							/>
						);
					})}
				</LineChart>
			</Brush>
		</LineChart>
	);
}
