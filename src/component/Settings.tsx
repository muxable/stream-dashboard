import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Button,
  TextField,
} from "@material-ui/core";
import ReactDOM from "react-dom";
import React from "react";
import CreateIcon from "@mui/icons-material/Create";

export function Settings() {
  const maskPassword = "•";

  function closeFields(divID: any) {
    ReactDOM.render(<div></div>, document.getElementById(divID));
  }

  const passwordFields = (
    <div>
      <TextField
        fullWidth
        label="Change password"
        name="changePassword"
        size="small"
        type="password"
        variant="standard"
        margin="dense"
      />

      <TextField
        fullWidth
        label="Reconfirm password"
        name="reconfirmPassword"
        size="small"
        type="password"
        variant="standard"
        margin="dense"
      />

      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item>
          <Button size="medium" variant="contained" color="primary">
            Change password
          </Button>
        </Grid>

        <Grid item>
          <Button
            size="medium"
            variant="contained"
            onClick={() => closeFields("passwordDiv")}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  const emailFields = (
    <div>
      <TextField
        fullWidth
        label="Change email"
        name="changeEmail"
        size="small"
        type="password"
        variant="standard"
        margin="dense"
      />

      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item>
          <Button size="medium" variant="contained" color="primary">
            Change Email
          </Button>
        </Grid>

        <Grid item>
          <Button
            size="medium"
            variant="contained"
            onClick={() => closeFields("emailDiv")}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  const openEmailFields = () => {
    ReactDOM.render(emailFields, document.getElementById("emailDiv"));
  };

  const openPasswordFields = () => {
    ReactDOM.render(passwordFields, document.getElementById("passwordDiv"));
  };

  return (
    <div id="root">
      <Navbar />

      <Typography align="center" variant="h4">
        Settings
      </Typography>

      <Grid container direction="row" justifyContent="flex-start" spacing={3}>
        <Grid item>
          <span>
            Email: test@muxable.com
            <Tooltip title="Change your email">
              <IconButton disableRipple={true} onClick={openEmailFields}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <div id="emailDiv"></div>
          </span>

          <br />

          <span>
            Password: {maskPassword.repeat(5)}
            <Tooltip title="Change your password">
              <IconButton disableRipple={true} onClick={openPasswordFields}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <div id="passwordDiv"></div>
          </span>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Settings;
