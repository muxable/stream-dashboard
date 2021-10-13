import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  Legend,
} from "recharts";

// type StackAreasDataFormat = {
// 	xAxisDataKey: string
// 	dataKey: string
// 	size: number
// 	data: any[]
// 	YAxisUnit: string
// }

// hardcode example
const YAxisUnit = "Mbps";
const xAxisDataKey: string = "timestamp";
const dataKey: string = "downstream";
var dataKeys: string[] = [];
const size = 5;
for (let i = 1; i <= size; i++) {
  dataKeys.push(`${dataKey}-${i}`);
}
const colors = ["#8884d8", "#3474eb", "#34eb77", "#e3406b", "#e3cc66"];

function getRandomArbitrary(min: number, max: number) {
  return Math.ceil(Math.random() * (max - min) + min);
}

var data: any[] = [];
for (let i = 0; i < 200; i++) {
  let d: any = {};
  for (let k = 1; k <= size; k++) {
    d[`${dataKey}-${k}`] = getRandomArbitrary(0, 10);
  }
  data.push(d);
}

export function StackAreasChart() {
  return (
    <AreaChart
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
        label={{ value: `${YAxisUnit}`, angle: -90, position: "insideLeft" }}
      />
      <Legend />
      <Tooltip />
      {dataKeys.map((key, index) => {
        return (
          <Area
            dataKey={key}
            stackId="stackId"
            stroke={colors[index % colors.length]}
            fill={colors[index % colors.length]}
          />
        );
      })}
      <Brush>
        <AreaChart>
          {dataKeys.map((key, index) => {
            return (
              <Area
                dataKey={key}
                stackId="stackId"
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
              />
            );
          })}
        </AreaChart>
      </Brush>
    </AreaChart>
  );
}
