import { Container, Paper, Tab, Tabs, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { filterByStreamId } from "../adapters/stream";
import { BasicLineChart } from "../component/BasicLineChart";
import { ComposedTwoAreasChart } from "../component/ComposedTwoAreasChart";
import { ComposedTwoYAxisChart } from "../component/ComposedTwoYAxisChart";
import { HardwareInformationTable } from "../component/HardwareInformationTable";
import { LowAudioBitrateEvent, LowBitrateEvent, Map } from "../component/Map";
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
    lowBitrateEvents: [{ x: 0, y: 0, bitrate: 0, timestamp: new Date() }],
    lowAudioBitrateEvents: [
      { x: 0, y: 0, audioBitrate: 0, timestamp: new Date() },
    ],
    healthCellMetaData: [
      { x: 0, y: 0, bitrate: 0, timestamp: new Date() },
      { x: 0, y: 0, audioBitrate: 0, timestamp: new Date() },
    ],
    temperatureData: [],
  });

  const findLowBitrateEvents = async (streamData: StreamDatapointModel[]) => {
    const bitrateThreshold = 500;
    const lowBitrates = streamData.filter((model: StreamDatapointModel) => {
      return model.bitrate < bitrateThreshold;
    });
    const lowBitrateEvents: LowBitrateEvent[] = lowBitrates.map(
      (model: StreamDatapointModel) => {
        return {
          x: model.longitude,
          y: model.latitude,
          bitrate: model.bitrate,
          timestamp: model.timestamp,
        };
      }
    );
    return lowBitrateEvents;
  };

  const findLowAudioBitrateEvents = async (
    streamData: StreamDatapointModel[]
  ) => {
    const audiobitrateThreshold = 500;
    const lowAudiobitrates = streamData.filter(
      (model: StreamDatapointModel) => {
        return model.audioBitrate < audiobitrateThreshold;
      }
    );
    const lowAudioBitrateEvents: LowAudioBitrateEvent[] = lowAudiobitrates.map(
      (model: StreamDatapointModel) => {
        return {
          x: model.longitude,
          y: model.latitude,
          audioBitrate: model.audioBitrate,
          timestamp: model.timestamp,
        };
      }
    );
    return lowAudioBitrateEvents;
  };

  const formatAggregateModemData = async (modemDatapoints: ModemModel[][]) => {
    const modemKeys = new Set<string>();
    const aggregateUpstreamData: any = [];
    const aggregateDownstreamData: any = [];
    for (let i = 0; i < modemDatapoints.length; i++) {
      const modems = modemDatapoints[i];
      const aggregateDownstreamDatapoint: any = {};
      const aggregateUpstreamDatapoint: any = {};
      for (let j = 0; j < modems.length; j++) {
        const modem = modems[j];
        modemKeys.add(`modem-${j}`);
        aggregateDownstreamDatapoint[`modem-${j}`] = modem.downstreamBandwidth;
        aggregateUpstreamDatapoint[`modem-${j}`] = modem.upstreamBandwidth;
      }
      aggregateDownstreamData.push(aggregateDownstreamDatapoint);
      aggregateUpstreamData.push(aggregateUpstreamDatapoint);
    }
    return [modemKeys, aggregateDownstreamData, aggregateUpstreamData];
  };

  const formatIndivialModemData = async (
    transposeModemDatapoints: ModemModel[][]
  ) => {
    const formattedIndivialModemData = [];
    for (let i = 0; i < transposeModemDatapoints.length; i++) {
      const indivialModemData = transposeModemDatapoints[i];
      const formatted = indivialModemData.map((m: ModemModel) => {
        return {
          upstream: m.upstreamBandwidth,
          downstream: m.downstreamBandwidth,
        };
      });
      formattedIndivialModemData.push(formatted);
    }

    return formattedIndivialModemData;
  };

  const formatModemsTemperatureData = async (
    modemDatapoints: ModemModel[][]
  ) => {
    const modemKeys = new Set<string>();
    const temperatureData: any = [];
    for (let i = 0; i < modemDatapoints.length; i++) {
      const modems = modemDatapoints[i];
      const temperatureDatapoint: any = {};
      for (let j = 0; j < modems.length; j++) {
        const modem = modems[j];
        modemKeys.add(`modem-${j}`);
        temperatureDatapoint[`modem-${j}`] = modem.temperature;
      }
      temperatureData.push(temperatureDatapoint);
    }
    return temperatureData;
  };

  useEffect(() => {
    async function loadStreamData(streamId: string) {
      const streamData: StreamDatapointModel[] = await filterByStreamId(
        streamId
      );
      const modemDatapoints = streamData.map((x) => x.modems);

      // format modem datapoints to show them on a stack area graph
      const aggregateData = await formatAggregateModemData(modemDatapoints);
      const modemKeys = aggregateData[0];
      const aggregateDownstreamData = aggregateData[1];
      const aggregateUpstreamData = aggregateData[2];

      // modems temperature data
      const temperatureData = await formatModemsTemperatureData(
        modemDatapoints
      );

      // perform transpose, so each row has the data of a modem
      const transpose = modemDatapoints[0].map((col, c) =>
        modemDatapoints.map((row, r) => modemDatapoints[r][c])
      );
      // upstream and downstream data
      const formattedIndivialModemData = await formatIndivialModemData(
        transpose
      );

      const minBitrateReducer = (
        pre: StreamDatapointModel,
        val: StreamDatapointModel
      ) => (pre.bitrate < val.bitrate ? pre : val);

      const maxBitrateReducer = (
        pre: StreamDatapointModel,
        val: StreamDatapointModel
      ) => (pre.bitrate > val.bitrate ? pre : val);

      const minFPSReducer = (
        pre: StreamDatapointModel,
        val: StreamDatapointModel
      ) => (pre.fps < val.fps ? pre : val);

      const maxFPSReducer = (
        pre: StreamDatapointModel,
        val: StreamDatapointModel
      ) => (pre.fps > val.fps ? pre : val);

      const minAudioBitrateReducer = (
        pre: StreamDatapointModel,
        val: StreamDatapointModel
      ) => (pre.audioBitrate < val.audioBitrate ? pre : val);

      const maxAudioBitrateReducer = (
        pre: StreamDatapointModel,
        val: StreamDatapointModel
      ) => (pre.audioBitrate > val.audioBitrate ? pre : val);

      const accBitrateReducer = (acc: number, val: StreamDatapointModel) =>
        acc + val.bitrate;
      const accFPSReducer = (acc: number, val: StreamDatapointModel) =>
        acc + val.fps;
      const accAudioBitrateReducer = (acc: number, val: StreamDatapointModel) =>
        acc + val.audioBitrate;

      const minBitrate: number = streamData.reduce(minBitrateReducer).bitrate;
      const maxBitrate: number = streamData.reduce(maxBitrateReducer).bitrate;
      const avgBitrate: number = +(
        streamData.reduce(accBitrateReducer, 0) / streamData.length
      ).toFixed(2);

      const minFPS: number = streamData.reduce(minFPSReducer).fps;
      const maxFPS: number = streamData.reduce(maxFPSReducer).fps;
      const avgFPS: number = +(
        streamData.reduce(accFPSReducer, 0) / streamData.length
      ).toFixed(2);

      const minAudioBitrate: number = streamData.reduce(
        minAudioBitrateReducer
      ).audioBitrate;
      const maxAudioBitrate: number = streamData.reduce(
        maxAudioBitrateReducer
      ).audioBitrate;
      const avgAudioBitrate: number = +(
        streamData.reduce(accAudioBitrateReducer, 0) / streamData.length
      ).toFixed(2);

      // find datapoints where bitrates fail to meet bitrate threshold
      const lowBitrateEvents = await findLowBitrateEvents(streamData);

      // find datapoints where bitrate fail to meet audiobitrate threshold
      const lowAudioBitrateEvents = await findLowAudioBitrateEvents(streamData);

      // combine them for display in side table
      const healthCellMetaData = [
        lowBitrateEvents,
        lowAudioBitrateEvents,
      ].flat();

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

        lowBitrateEvents: lowBitrateEvents,
        lowAudioBitrateEvents: lowAudioBitrateEvents,

        healthCellMetaData: healthCellMetaData,

        temperatureData: temperatureData,
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
    lowBitrateEvents,
    lowAudioBitrateEvents,
    healthCellMetaData,
    temperatureData,
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
              <Tab label="Modems Temperature" style={{ marginRight: 12 }} />
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
            {value === 4 && (
              <BasicLineChart
                format={{
                  xAxisDataKey: "timestamp",
                  dataKeys: modemKeys,
                  data: temperatureData,
                  yAxisUnit: "Fahrenheit",
                }}
              />
            )}

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
            <StreamHealthTable healthCellMetaData={healthCellMetaData} />
          </Paper>
        </Stack>

        {/* Map */}
        <Map
          unstableEvents={{
            lowBitrateEvents: lowBitrateEvents,
            lowAudiobitrateEvents: lowAudioBitrateEvents,
          }}
        />

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
