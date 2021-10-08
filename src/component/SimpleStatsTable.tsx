import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type SimpleStatistic = {
  name: string;
  min: number;
  max: number;
  avg: number;
  mode: number;
};

export function SimpleStatsTable({ rows }: { rows: SimpleStatistic[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right"> min </TableCell>
            <TableCell align="right"> max </TableCell>
            <TableCell align="right"> avg </TableCell>
            <TableCell align="right"> mode </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.min}</TableCell>
              <TableCell align="right">{row.max}</TableCell>
              <TableCell align="right">{row.avg}</TableCell>
              <TableCell align="right">{row.mode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
