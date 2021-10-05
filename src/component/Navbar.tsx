import React from 'react'
import { CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@material-ui/core/Menu'
import { MenuList } from '@mui/material'
import { MenuItem } from '@mui/material'
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider'; 
import Tooltip from '@mui/material/Tooltip';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

	const openMenu = (event:any) => {
		setAnchorEl(event.currentTarget);
	};
	
	const closeMenu = () => {
		setAnchorEl(null);
	};

    return (
        <>
		<CssBaseline />
		
		<AppBar position = 'fixed' color = 'primary' >
			<Toolbar>
				<Typography variant='overline'>Stream Dashboard</Typography>

				<IconButton color = 'inherit' size = "large">
					<SearchIcon />
				</IconButton>
				
				{/*Profile icon if ever decided to show a profile page*/}
				<Tooltip title="Your account">
					<IconButton color = 'inherit' size = "large" style={{marginLeft:'auto'}} onClick = {openMenu} aria-controls = "iconMenu">
						<AccountCircleIcon  />
					</IconButton>

				</Tooltip>

			</Toolbar>
		</AppBar>

		<Menu open = {Boolean(anchorEl)} onClose = {closeMenu} id = "iconMenu" anchorEl={anchorEl} style={{marginTop:'50px'}}>
			{/*Menu that pops up when pressing the profile icon*/}
			<MenuList>
				<MenuItem onClick = {closeMenu}>
					View profile
				</MenuItem>

				<Divider />

				<MenuItem onClick = {closeMenu}>
					<IconButton color = 'info' size = "small" disabled = {false} disableRipple = {true} disableFocusRipple = {true}> 
						<LogoutIcon />
					</IconButton>
					Logout
				</MenuItem>
			</MenuList>
			
		</Menu>
        </>
        )
};

export default Navbar