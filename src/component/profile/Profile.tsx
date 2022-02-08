import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import { BioEdit } from "./BioPane";
import CreateIcon from "@mui/icons-material/Create";
import RoomIcon from "@mui/icons-material/Room";
import {
  Button,
  IconButton,
  Avatar,
  Paper,
  Tooltip,
  Grid,
} from "@mui/material";

export function Profile() {
  const [openBioPanel, setOpenBioPanel] = useState(false);
  const [bioText, setBioText] = useState("No bio set, add one now!");

  console.log(openBioPanel);
  console.log(bioText);

  return (
    <div>
      <Navbar />

      <Typography variant="h4">Your profile</Typography>
      <br />

      {/*<Sidebar>*/}

      <Grid container direction="column" justifyContent="center" spacing={3}>
        <Grid item>
          <Paper style={{ padding: "15px" }}>
            <IconButton disableRipple={true}>
              <Avatar style={{ height: "100px", width: "100px" }} />
            </IconButton>

            <br />

            <Typography>userName</Typography>
            <span>
              <Tooltip title="Your last known location">
                <RoomIcon style={{ fill: "#b71c1c", paddingLeft: "2px" }} />
              </Tooltip>
              <Typography variant="caption">Last known location</Typography>
              <br />
              <Typography style={{ textAlign: "center" }} component={"span"}>
                {bioText}
                <Tooltip title="Edit your bio">
                  <IconButton
                    onClick={() => {
                      setOpenBioPanel(!openBioPanel);
                    }}
                  >
                    <CreateIcon style={{ height: "25px", width: "25px" }} />
                  </IconButton>
                </Tooltip>
              </Typography>
              {openBioPanel && (
                <BioEdit
                  setOpenBioPanel={setOpenBioPanel}
                  setBioText={setBioText}
                />
              )}
            </span>
          </Paper>
        </Grid>

        <Grid item>
          <Paper style={{ padding: "5px" }}>
            <Typography>Link to twitch:</Typography>
            <Button variant="contained">Link</Button>
          </Paper>
        </Grid>
      </Grid>

      {/*<Footer/>*/}
    </div>
  );
}
