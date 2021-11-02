import Typography from "@material-ui/core/Typography";
import React from "react";
import Navbar from "./Navbar";
import CreateIcon from "@mui/icons-material/Create";
import RoomIcon from "@mui/icons-material/Room";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, IconButton, Avatar, Paper, Tooltip } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    margin: "8px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  center: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
}));

export function ProfilePage() {
  const classes = useStyles();

  return (
    <>
      <Navbar />

      <Typography variant="h4">Your profile</Typography>

      <Paper className={classes.paper}>
        <IconButton disableRipple={true}>
          <Avatar style={{ margin: "1px", width: "100px", height: "100px" }} />
        </IconButton>

        <br />
        <Typography>userName</Typography>
        <div className={classes.center}>
          <Box pr={1} pt={1}>
            <Tooltip title="Your last known location">
              <RoomIcon style={{ fill: "#b71c1c", paddingLeft: "2px" }} />
            </Tooltip>
          </Box>
          <Box>
            {/*This info can be the last recorded location the streamer ended at */}
            <Typography variant="caption"> Last known location </Typography>
          </Box>
        </div>
      </Paper>

      <Paper className={classes.paper}>
        <div className={classes.center}>
          <Box pt={2} pl={8}>
            <Typography variant="body1"> Your email: </Typography>
          </Box>

          <Box pt={2} pl={4}>
            <Typography variant="body1">random@domain.com</Typography>
          </Box>

          <Box pt={1}>
            <IconButton>
              <CreateIcon />
            </IconButton>
          </Box>
        </div>

        <div className={classes.center}>
          <Box pt={2} pl={6} pr={3}>
            <Typography> Link to twitch: </Typography>
          </Box>

          <Box pt={2} pl={3}>
            <Button variant="contained">Dummy button</Button>
          </Box>
        </div>
      </Paper>

      {/*Maybe random funfacts here somewhere to pad out the profile page*/}
    </>
  );
}

export default ProfilePage;
