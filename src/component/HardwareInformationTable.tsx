import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";

type HardwareInformation = {
  audioCodec: string;
  videoCodec: string;
  videoResolution: string;
  avgBitrate: number;
  avgFramerate: number;
  avgAudioBitrate: number;
  AVCLevel: number;
  keyframeInterval: number;
};

function HardwareInformationStack({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Stack direction="column">
      <h3> {title} </h3>
      <text> {value} </text>
    </Stack>
  );
}

export function HardwareInformationTable({
  hardwareInfo,
}: {
  hardwareInfo: HardwareInformation;
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }}>
        <TableBody>
          <TableRow>
            <TableCell align="center">
              <HardwareInformationStack
                title={"Audio Codec"}
                value={hardwareInfo.audioCodec}
              />
            </TableCell>
            <TableCell align="center">
              <HardwareInformationStack
                title={"Video Codec"}
                value={hardwareInfo.videoCodec}
              />
            </TableCell>
            <TableCell align="center">
              <HardwareInformationStack
                title={"Video Resolution"}
                value={hardwareInfo.videoResolution}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <HardwareInformationStack
                title={"Avg Bitrate"}
                value={`${hardwareInfo.avgBitrate}`}
              />
            </TableCell>
            <TableCell align="center">
              <HardwareInformationStack
                title={"Avg Framerate"}
                value={`${hardwareInfo.avgFramerate}`}
              />
            </TableCell>
            <TableCell align="center">
              <HardwareInformationStack
                title={"Avg Audio Bitrate"}
                value={`${hardwareInfo.avgAudioBitrate}`}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <HardwareInformationStack
                title={"AVC Level"}
                value={`${hardwareInfo.AVCLevel}`}
              />
            </TableCell>
            <TableCell align="center">
              <HardwareInformationStack
                title={"Keyframe Interval"}
                value={`${hardwareInfo.keyframeInterval}`}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
