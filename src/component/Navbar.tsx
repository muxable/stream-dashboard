import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, IconButton, Menu, MenuItem, MenuList } from "@mui/material";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import Search from "./Search";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  offset: {
    ...theme.mixins.toolbar,
    flexGrow: 1,
  },
}));

const Navbar = (props: any) => {
  const classes = useStyles();

  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const toProfile = () => {
    history.push("/profile");
  };

  const toSettings = () => {
    history.push("/settings");
  };
  function signOutUser() {
    signOut(getAuth()).then(() => history.push("/login"));
  }

  return (
    <div style={{ marginBottom: "55px" }}>
      <AppBar position="absolute" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="overline">{props.title}</Typography>

          <Search />

          <Tooltip title="Your profile">
            <IconButton
              color="inherit"
              size="large"
              style={{ marginLeft: "auto" }}
              onClick={openMenu}
              aria-controls="iconMenu"
            >
              <Avatar style={{ height: "25px", width: "25px" }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <div className={classes.offset} />

      <Menu
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        id="iconMenu"
        anchorEl={anchorEl}
        style={{ marginTop: "25px" }}
      >
        {/*Menu that pops up when pressing the profile icon*/}
        <MenuList>
          <MenuItem onClick={toProfile}>
            <AccountCircleIcon color="primary" style={{ paddingRight: "2%" }} />{" "}
            View profile
          </MenuItem>

          <MenuItem onClick={toSettings}>
            <SettingsIcon style={{ paddingRight: "2%" }} /> Settings
          </MenuItem>

          <Divider />

          <MenuItem onClick={signOutUser}>
            <LogoutIcon color="primary" style={{ padding: "2%" }} /> Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

Navbar.defaultProps = {
  title: "Streamer Dashboard",
};

export default Navbar;
