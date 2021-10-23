import React from "react";
import { CssBaseline, AppBar, Toolbar, Typography } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu, MenuList, MenuItem, IconButton, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles ( (theme) => ({

  searchBox: {
    display:"flex",
    backgroundColor: alpha(theme.palette.common.white, 0.30),
    marginLeft: "20px",
  },

  searchField:{
    width:"200px",
    border: 5,
    padding: "18px",
    fontSize: "12px",
    height: "20px",
  },

}));

const Navbar = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CssBaseline />

      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="overline">Stream Dashboard</Typography>

            <div className={classes.searchBox}>
              <InputBase type="text" placeholder="Search" className={classes.searchField} endAdornment = { <IconButton> <SearchIcon /> </IconButton> } />
            </div>

          {/*Profile icon if ever decided to show a profile page*/}
          <Tooltip title="Your account">
            <IconButton
              color="inherit"
              size="large"
              style={{ marginLeft: "auto" }}
              onClick={openMenu}
              aria-controls="iconMenu"
            >
              <Avatar style={{height:'25px', width:'25px'}}/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Menu
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        id="iconMenu"
        anchorEl={anchorEl}
        style={{ marginTop: "25px" }}
      >
        {/*Menu that pops up when pressing the profile icon*/}
        <MenuList>
          <MenuItem onClick={closeMenu}>
            <AccountCircleIcon color = "primary" style={{paddingRight:"2%"}}/> View profile
            </MenuItem>

          <MenuItem onClick={closeMenu}>
              <SettingsIcon style={{paddingRight:"2%"}}/> Settings
          </MenuItem>

          <Divider />

          <MenuItem onClick={closeMenu}>
              <LogoutIcon color="primary" style = {{padding:"2%"}}/> Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default Navbar;