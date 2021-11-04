import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Chip, Container } from "@mui/material";
import { LowAudioBitrateEvent, LowBitrateEvent } from "./Map";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    sortable: false,
    filterable: false,
    hideSortIcons: true,
  },
  {
    field: "timestamp",
    headerName: "timestamp",
    width: 200,
  },
  {
    field: "event",
    headerName: "status",
    width: 200,
    hideSortIcons: true,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const healthMetaData: LowAudioBitrateEvent | LowBitrateEvent =
        params.value as LowAudioBitrateEvent | LowBitrateEvent;
      return (
        <Container>
          {"bitrate" in healthMetaData && (
            <Chip
              label={`low btirate ${healthMetaData.bitrate}`}
              color="error"
              variant="outlined"
            />
          )}
          {"audioBitrate" in healthMetaData && (
            <Chip
              label={`low audio bitrate ${healthMetaData.audioBitrate}`}
              color="error"
              variant="outlined"
            />
          )}
        </Container>
      );
    },
  },
];

export function StreamHealthTable({
  healthCellMetaData,
}: {
  healthCellMetaData: (LowAudioBitrateEvent | LowBitrateEvent)[];
}) {
  const rows = healthCellMetaData.map((event, index) => {
    return {
      id: index,
      event: event,
      timestamp: event.timestamp.toLocaleString(),
    };
  });
  console.log(rows);
  return (
    <div style={{ height: 400, width: 500 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        disableColumnMenu
      />
    </div>
  );
}
