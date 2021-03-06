import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { StreamKeyModel } from "../../models/stream_key";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "date",
    headerName: "Date",
    width: 200,
  },
  {
    field: "streamKey",
    headerName: "Stream Key",
    width: 300,
  },
  {
    field: "delete",
    headerName: "Delete",
    renderCell: (cell) => {
      return (
        <IconButton disableRipple={true}>
          <DeleteIcon style={{ fill: "#CF2400" }} />
        </IconButton>
      );
    },
    width: 100,
  },
];
export function StreamKeyTable({
  streamKeyList,
}: {
  streamKeyList: StreamKeyModel[];
}) {
  const rows = streamKeyList.map((streamKeyModel, index) => {
    return {
      id: index,
      streamKey: streamKeyModel.streamKey,
      date: streamKeyModel.timestamp.toLocaleString(),
    };
  });
  return (
    <div style={{ height: 400, width: "600px", paddingBottom: "115px" }}>
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
