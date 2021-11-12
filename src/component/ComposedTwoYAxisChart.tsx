import {
  Brush,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ComposedChart,
} from "recharts";

export function ComposedTwoYAxisChart({
  data,
}: {
  data: {
    bitrate: number;
    framerate: number;
  }[];
}) {
  return (
    <ComposedChart
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
      <Brush>
        <ComposedChart>
          <Line yAxisId="left" dot={false} dataKey="bitrate" stroke="#8884d8" />
          <Line
            yAxisId="right"
            dot={false}
            dataKey="framerate"
            stroke="#82ca9d"
          />
        </ComposedChart>
      </Brush>
    </ComposedChart>
  );
}
