import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Paper,
  Box,
  Drawer,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";

const useStyles = makeStyles({
  drawer: {
    width: "240px",
  },

  drawerPaper: {
    width: "240px",
  },

  
});

const Sidebar = () => {
  const classes = useStyles();
  return (
    <Box style={{display:"flex"}} >
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography
            variant="h6"
            align="center"
          >
            Streamer Dashboard
          </Typography>
        </div>

        <List>
          <Paper style={{ marginTop: "2px" }} elevation={1}>
            <ListItem key="home" button>
              <ListItemIcon>
                {" "}
                <HomeIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Paper>

          <Paper style={{ marginTop: "5px" }} elevation={1}>
            <ListItem key="profile" button>
              <ListItemIcon>
                {" "}
                <AccountCircleIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Your Profile" />
            </ListItem>
          </Paper>

          <Paper style={{ marginTop: "5px" }} elevation={1}>
            <ListItem key="data" button>
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

          <ListItem key="toggle">
            <ListItemText primary="Dark mode" />
            <Switch defaultChecked />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
