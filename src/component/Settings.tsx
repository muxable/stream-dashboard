import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Typography,
  Grid,
  IconButton,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import ReactDOM from "react-dom";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import CreateIcon from "@mui/icons-material/Create";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

let rows = [];
let keyGenDateTime = new (Date.toLocaleString() as any)();
console.log(keyGenDateTime);
function createData() {
  {
    /*Procedure:
    1. Click button -> createData function returns an object containing a stream key and the date time it was created
    2. append that object to "rows" array
    3. rerender the table everytime theres a new index to the rows array
   */
  }

  let streamKey = uuidv4();
  let currentDateandTime = new (Date.toLocaleString() as any)();

  return { currentDateandTime, streamKey };
}

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

  const streamKeyTable = (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Stream key</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>{new Date().toLocaleString()}</TableCell>
            <TableCell>AAA-BBB-CCC-DDD</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  const openEmailFields = () => {
    ReactDOM.render(emailFields, document.getElementById("emailDiv"));
  };

  const openPasswordFields = () => {
    ReactDOM.render(passwordFields, document.getElementById("passwordDiv"));
  };

  const openKeyTable = () => {
    ReactDOM.render(streamKeyTable, document.getElementById("keyTable"));
  };

  return (
    <div id="root">
      <Navbar />

      <Typography align="center" variant="h4">
        Settings
      </Typography>

      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        spacing={3}
      >
        <Grid item>
          <span>
            Email: test@muxable.com
            <IconButton disableRipple={true} onClick={openEmailFields}>
              <CreateIcon />
            </IconButton>
            <div id="emailDiv"></div>
          </span>

          <br />

          <span>
            Password: {maskPassword.repeat(5)}
            <IconButton disableRipple={true} onClick={openPasswordFields}>
              <CreateIcon />
            </IconButton>
            <div id="passwordDiv"></div>
          </span>
        </Grid>

        <Grid item>
          <Button variant="contained" color="primary" onClick={openKeyTable}>
            Generate stream key
          </Button>
        </Grid>

        <Grid item>
          <div id="keyTable"></div>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Settings;
