import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Paper,
  Box,
  Drawer,
} from "@mui/material";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "240px",
  },

  drawerPaper: {
    width: "240px",
    height: "100%",
    overflow: "auto",
  },

  toolbar: theme.mixins.toolbar,
}));

const Sidebar = () => {
  const classes = useStyles();
  const history = useHistory();
  const toHome = () => {
    history.push("/");
  };

  const toProfile = () => {
    history.push("/profile");
  };

  const toTest = () => {
    history.push("/test");
  };

  const toAnalytic = () => {
    history.push("/analytic");
  };
  return (
    <Box style={{ display: "flex" }}>
      <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />

        <List>
          <Paper elevation={1}>
            <ListItem key="home" button onClick={toHome}>
              <ListItemIcon>
                {" "}
                <HomeIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Paper>

          <Paper style={{ marginTop: "5px" }} elevation={1}>
            <ListItem key="profile" button onClick={toProfile}>
              <ListItemIcon>
                {" "}
                <AccountCircleIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Your Profile" />
            </ListItem>
          </Paper>

          <Paper style={{ marginTop: "5px" }} elevation={1}>
            <ListItem key="data" button onClick={toAnalytic}>
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
          </Paper>

          <Paper style={{ marginTop: "5px" }} elevation={1}>
            <ListItem key="settings" button>
              <ListItemIcon>
                {" "}
                <SettingsIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Paper>

          <Paper style={{ marginTop: "5px" }} elevation={1}>
            <ListItem key="faqs" button>
              <ListItemIcon>
                {" "}
                <InfoIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="FAQ" />
            </ListItem>
          </Paper>

          <Paper style={{ marginTop: "5px" }} elevation={1}>
            <ListItem key="about" button>
              <ListItemIcon>
                {" "}
                <HelpIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </Paper>

          <Paper style={{ marginTop: "5px" }} elevation={1}>
            <ListItem key="logout" button>
              <ListItemIcon>
                {" "}
                <LogoutIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </Paper>

          <Paper style={{ marginTop: "5px" }} elevation={1}>
            <ListItem key="test" button onClick={toTest}>
              <ListItemIcon>
                {" "}
                <HelpOutlineIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="test" />
            </ListItem>
          </Paper>

          <ListItem key="toggle">
            <ListItemText primary="Dark mode" />
            <Switch defaultChecked />
          </ListItem>
        </List>
        <div className={classes.toolbar} />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
