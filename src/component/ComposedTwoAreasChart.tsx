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
  xAxisDataKey: string;
  dataKeyOne: string;
  dataKeyTwo: string;
  data: any[];
  yAxisUnit: string;
};

// function getRandomArbitrary(min: number, max: number) {
//   return Math.ceil(Math.random() * (max - min) + min);
// }

// var data: any[] = [];
// for (let i = 0; i < 2000; i++) {
//   let d = {
//     upstream: getRandomArbitrary(0, 10),
//     downstream: getRandomArbitrary(0, 30),
//   };
//   data.push(d);
// }

export function ComposedTwoAreasChart({
  format,
}: {
  format: ComposedTwoAreasChartFormat;
}) {
  const { xAxisDataKey, dataKeyOne, dataKeyTwo, data, yAxisUnit } = format;

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
      <YAxis
        label={{ value: { yAxisUnit }, angle: -90, position: "insideLeft" }}
      />
      <Tooltip />
      <Legend />
      <Area dot={false} dataKey={dataKeyOne} fill="#8884d8" stroke="#8884d8" />
      <Area dot={false} dataKey={dataKeyTwo} fill="#f5426c" stroke="#f5426c" />
      <Brush />
    </ComposedChart>
  );
}
