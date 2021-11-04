import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Chip, Container } from "@mui/material";
import { LowAudioBitrateEvent, LowBitrateEvent } from "./Map";

type HealthCellMetaData = {
  isStable: boolean;
  duration: number;
};

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

const rows = [
  { id: 1, timestamp: Date(), health: { isStable: true, duration: 12 } },
  { id: 2, timestamp: Date(), health: { isStable: false, duration: 32 } },
  { id: 3, timestamp: Date(), health: { isStable: false, duration: 22 } },
  { id: 4, timestamp: Date(), health: { isStable: true, duration: 12 } },
  { id: 5, timestamp: Date(), health: { isStable: false, duration: 42 } },
  { id: 6, timestamp: Date(), health: { isStable: true, duration: 12 } },
  { id: 7, timestamp: Date(), health: { isStable: true, duration: 12 } },
  { id: 8, timestamp: Date(), health: { isStable: false, duration: 52 } },
  { id: 9, timestamp: Date(), health: { isStable: true, duration: 12 } },
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
