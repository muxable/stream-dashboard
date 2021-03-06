import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { StreamModel } from "../models/stream_sessions";
import { filterByUserId } from "../adapters/stream_sessions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "duration",
    headerName: "Duration",
    width: 130,
  },
  {
    field: "formattedStartDate",
    headerName: "Start Date",
    width: 200,
  },
  {
    field: "formattedEndDate",
    headerName: "End Date",
    width: 200,
  },
  {
    field: "modemCount",
    headerName: "Modem Count",
    width: 100,
  },
  {
    field: "unstableEvents",
    headerName: "Unstable Events",
    width: 100,
  },
  {
    field: "server",
    headerName: "Server",
    width: 130,
    hideSortIcons: true,
  },
  {
    field: "location",
    headerName: "Location",
    width: 130,
  },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    hideSortIcons: true,
    sortable: false,
    filterable: false,
    renderCell: (param) => {
      const streamModel: StreamModel = param.value as StreamModel;
      return (
        <Link
          to={{
            pathname: `/analytic/${streamModel.streamId}`,
            state: streamModel,
          }}
        >
          <Tooltip title="Learn more" placement="right">
            <IconButton>
              <AnalyticsIcon />
            </IconButton>
          </Tooltip>
        </Link>
      );
    },
  },
];

export function StreamsTableView({ userId }: { userId: string }) {
  const [rows, setRows] = useState<
    {
      userId: string;
      streamId: string;
      videoCodec: string;
      audioCodec: string;
      videoResolution: string;
      duration: number;
      modemCount: number;
      unstableEvents: number;
      startDate: Date;
      endDate: Date;
    }[]
  >([]);

  async function loadStreams(userId: string) {
    const streams: StreamModel[] = await filterByUserId(userId);
    const formattedStreams = streams.map((streamModel, index) => {
      const formattedStartDate = streamModel.startDate.toLocaleString();
      const formattedEndDate = streamModel.endDate.toLocaleString();
      return {
        ...streamModel,
        id: index,
        formattedStartDate: formattedStartDate,
        formattedEndDate: formattedEndDate,
        action: streamModel,
      };
    });
    setRows(formattedStreams);
  }

  useEffect(() => {
    loadStreams(userId);
  }, [userId]);

  return (
    <div>
      <Navbar />

      <div style={{ height: 400, width: "1100px", paddingBottom: "115px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>

      <Footer />
    </div>
  );
}
