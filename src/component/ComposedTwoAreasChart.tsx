import {
  Brush,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

type ComposedTwoAreasChartFormat = {
  dataKeyOne: string;
  dataKeyTwo: string;
  data: any[];
  yAxisUnit: string;
};

export function ComposedTwoAreasChart({
  format,
}: {
  format: ComposedTwoAreasChartFormat;
}) {
  const { dataKeyOne, dataKeyTwo, data, yAxisUnit } = format;

  return (
    <ComposedChart
      width={600}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <XAxis dataKey="name" tick={false} />
      <YAxis label={{ value: yAxisUnit, angle: -90, position: "insideLeft" }} />
      <Tooltip />
      <Legend />
      <Area dot={false} dataKey={dataKeyOne} fill="#8884d8" stroke="#8884d8" />
      <Area dot={false} dataKey={dataKeyTwo} fill="#f5426c" stroke="#f5426c" />
      <Brush />
    </ComposedChart>
  );
}
