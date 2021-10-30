import { Container, Paper, Tab, Tabs, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { filterByStreamId } from "../adapters/stream";
import { ComposedTwoAreasChart } from "../component/ComposedTwoAreasChart";
import { ComposedTwoYAxisChart } from "../component/ComposedTwoYAxisChart";
import { HardwareInformationTable } from "../component/HardwareInformationTable";
import { Map } from "../component/Map";
import { SimpleStatsTable } from "../component/SimpleStatsTable";
import { StackAreasChart } from "../component/StackAreasChart";
import { StreamHealthTable } from "../component/StreamHealthTable";
import { ModemModel } from "../models/modem";
import { StreamDatapointModel } from "../models/stream_datepoint";
import { StreamModel } from "../models/stream_sessions";

export function Analytics() {
  const [value, setValue] = useState(0);

  const { streamId }: { streamId: string } = useParams();
  const location = useLocation();
  const streamModel = location.state as StreamModel;
  const videoCodec = streamModel.videoCodec;
  const audioCodec = streamModel.audioCodec;
  const videoResolution = streamModel.videoResolution;

  const [streamData, setStreamData] = useState<StreamDatapointModel[]>([]);
  const [displayData, setDisplayData] = useState({
    minBitrate: 0,
    maxBitrate: 0,
    avgBitrate: 0,
    minFPS: 0,
    maxFPS: 0,
    avgFPS: 0,
    minAudioBitrate: 0,
    maxAudioBitrate: 0,
    avgAudioBitrate: 0,
    modemKeys: [""],
    aggregateUpstreamData: [],
    aggregateDownstreamData: [],
    individualModemsData: [[{ upstream: 0, downstream: 0 }]],
  });

  useEffect(() => {
    async function loadStreamData(streamId: string) {
      const streamData: StreamDatapointModel[] = await filterByStreamId(
        streamId
      );
      const modemDatapoints = streamData.map((x) => x.modems);

      // transpose
      const transpose: ModemModel[][] = [];

      const modemKeys = new Set<string>();
      const aggregateUpstreamData: any = [];
      const aggregateDownstreamData: any = [];
      for (let i = 0; i < modemDatapoints.length; i++) {
        const modems = modemDatapoints[i];
        const aggregateDownstreamDatapoint: any = {};
        const aggregateUpstreamDatapoint: any = {};
        const transposeCol = [];
        for (let j = 0; j < modems.length; j++) {
          const modem = modems[j];
          modemKeys.add(`modem-${j}`);
          aggregateDownstreamDatapoint[`modem-${j}`] =
            modem.downstreamBandwidth;
          aggregateUpstreamDatapoint[`modem-${j}`] = modem.upstreamBandwidth;
          transposeCol.push(modemDatapoints[j][i]);
        }
        aggregateDownstreamData.push(aggregateDownstreamDatapoint);
        aggregateUpstreamData.push(aggregateUpstreamDatapoint);
        transpose.push(transposeCol);
      }

      const formattedIndivialModemData = [];
      for (let i = 0; i < transpose.length; i++) {
        const indivialModemData = transpose[i];
        const formatted = indivialModemData.map((m: ModemModel) => {
          return {
            upstream: m.upstreamBandwidth,
            downstream: m.downstreamBandwidth,
          };
        });
        formattedIndivialModemData.push(formatted);
      }

      const minBitrate: number = streamData.reduce((acc, val) =>
        acc.bitrate < val.bitrate ? acc : val
      ).bitrate;
      const maxBitrate: number = streamData.reduce((acc, val) =>
        acc.bitrate > val.bitrate ? acc : val
      ).bitrate;
      const avgBitrate: number =
        streamData.reduce((acc, val) => acc + val.bitrate, 0) /
        streamData.length;

      const minFPS: number = streamData.reduce((acc, val) =>
        acc.fps < val.fps ? acc : val
      ).fps;
      const maxFPS: number = streamData.reduce((acc, val) =>
        acc.fps > val.fps ? acc : val
      ).fps;
      const avgFPS: number =
        streamData.reduce((acc, val) => acc + val.fps, 0) / streamData.length;

      const minAudioBitrate: number = streamData.reduce((acc, val) =>
        acc.audioBitrate < val.audioBitrate ? acc : val
      ).audioBitrate;
      const maxAudioBitrate: number = streamData.reduce((acc, val) =>
        acc.audioBitrate > val.audioBitrate ? acc : val
      ).audioBitrate;
      const avgAudioBitrate: number =
        streamData.reduce((acc, val) => acc + val.audioBitrate, 0) /
        streamData.length;

      setStreamData(streamData);
      setDisplayData({
        minBitrate: minBitrate,
        maxBitrate: maxBitrate,
        avgBitrate: avgBitrate,

        minFPS: minFPS,
        maxFPS: maxFPS,
        avgFPS: avgFPS,

        minAudioBitrate: minAudioBitrate,
        maxAudioBitrate: maxAudioBitrate,
        avgAudioBitrate: avgAudioBitrate,

        modemKeys: Array.from(modemKeys),

        aggregateUpstreamData: aggregateUpstreamData,
        aggregateDownstreamData: aggregateDownstreamData,

        individualModemsData: formattedIndivialModemData,
      });
    }

    loadStreamData(streamId);
  }, [streamId]);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const {
    minBitrate,
    maxBitrate,
    avgBitrate,
    minFPS,
    maxFPS,
    avgFPS,
    minAudioBitrate,
    maxAudioBitrate,
    avgAudioBitrate,
    modemKeys,
    aggregateUpstreamData,
    aggregateDownstreamData,
    individualModemsData,
  } = displayData;

  return (
    <Container>
      <Stack direction="column" spacing={4}>
        <Stack direction="row" spacing={2}>
          <Paper style={{ width: 650 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              // style={{ marginBottom: 20, marginTop: 20, background: '#a2fb1b' }}
            >
              <Tab label="bitrate/fps" style={{ marginRight: 12 }} />
              <Tab label="Aggregate upstream" style={{ marginRight: 12 }} />
              <Tab label="Aggregate downstream" style={{ marginRight: 12 }} />
              <Tab label="Individual modems" style={{ marginRight: 12 }} />
            </Tabs>
            {value === 0 && <ComposedTwoYAxisChart data={streamData} />}
            {value === 1 && (
              <StackAreasChart
                format={{
                  data: aggregateUpstreamData,
                  yAxisUnit: "Mbps",
                  xAxisDataKey: "timestamp",
                  dataKeys: modemKeys,
                }}
              />
            )}
            {value === 2 && (
              <StackAreasChart
                format={{
                  data: aggregateDownstreamData,
                  yAxisUnit: "Mbps",
                  xAxisDataKey: "timestamp",
                  dataKeys: modemKeys,
                }}
              />
            )}
            {value === 3 &&
              individualModemsData.map((data, index) => {
                return (
                  <ComposedTwoAreasChart
                    format={{
                      data: data,
                      dataKeyOne: "downstream",
                      dataKeyTwo: "upstream",
                      yAxisUnit: "Mbps",
                    }}
                  />
                );
              })}

            {/* mock data */}
            <SimpleStatsTable
              rows={[
                {
                  name: "bitrate",
                  min: minBitrate,
                  max: maxBitrate,
                  avg: avgBitrate,
                },
                { name: "fps", min: minFPS, max: maxFPS, avg: avgFPS },
                {
                  name: "audio bitrate",
                  min: minAudioBitrate,
                  max: maxAudioBitrate,
                  avg: avgAudioBitrate,
                },
              ]}
            ></SimpleStatsTable>
          </Paper>
          <Paper>
            <StreamHealthTable />
          </Paper>
        </Stack>

        {/* Map */}
        <Map />

        {/* Additional Information */}
        <HardwareInformationTable
          hardwareInfo={{
            audioCodec: audioCodec,
            videoCodec: videoCodec,
            videoResolution: videoResolution,
            avgBitrate: avgBitrate,
            avgFramerate: avgFPS,
            avgAudioBitrate: avgAudioBitrate,
            AVCLevel: 42,
            keyframeInterval: 2,
          }}
        />
      </Stack>
    </Container>
  );
}
