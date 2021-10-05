import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@material-ui/core/Menu'
import { MenuList } from '@mui/material'
import { MenuItem } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider'; 
import Tooltip from '@mui/material/Tooltip';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100, },
	{
		field: 'duration',
		headerName: 'Duration',
		width: 130,
	},
	{
		field: 'startDate',
		headerName: 'Start Date',
		width: 130,
	},
	{
		field: 'endDate',
		headerName: 'End Date',
		width: 130,
	},
	{
		field: 'modemCount',
		headerName: 'Modem Count',
		width: 100,
	},
	{
		field: 'unstableEvents',
		headerName: 'Unstable Events',
		width: 100,
	},
	{
		field: 'server',
		headerName: 'Server',
		width: 130,
		hideSortIcons: true,
	},
	{
		field: 'location',
		headerName: 'Location',
		width: 130,
	},
	{
		field: 'action',
		headerName: 'Action',
		width: 100,
		hideSortIcons: true,
		sortable: false,
		filterable: false,
		renderCell: (params) => {
			return (
				<Tooltip title="Learn more" placement="right">
					<IconButton>
						<AnalyticsIcon />
					</IconButton>
				</Tooltip>
			);
		}
	},
];

const rows = [
	{ id: 1, duration: '33', startDate: Date(), endDate: Date(), modemCount: 3, unstableEvents: 4, server: 'A', location: 'Brooklyn, NY' },
	{ id: 2, duration: '322', startDate: Date(), endDate: Date(), modemCount: 4, unstableEvents: 4, server: 'B', location: 'Queens, NY' },
	{ id: 3, duration: '33', startDate: Date(), endDate: Date(), modemCount: 1, unstableEvents: 4, server: 'C', location: 'Brooklyn, NY' },
	{ id: 4, duration: '54', startDate: Date(), endDate: Date(), modemCount: 2, unstableEvents: 4, server: 'C', location: 'Rochester, NY' },
	{ id: 5, duration: '1234', startDate: Date(), endDate: Date(), modemCount: 1, unstableEvents: 4, server: 'A', location: 'Stony Brook, NY' },
	{ id: 6, duration: '123', startDate: Date(), endDate: Date(), modemCount: 1, unstableEvents: 4, server: 'D', location: 'Staten Islands, NY' },
	{ id: 7, duration: '43', startDate: Date(), endDate: Date(), modemCount: 3, unstableEvents: 4, server: 'E', location: 'Bronx, NY' },
	{ id: 8, duration: '22', startDate: Date(), endDate: Date(), modemCount: 2, unstableEvents: 4, server: 'F', location: 'Syracuse, NY' },
	{ id: 9, duration: '22', startDate: Date(), endDate: Date(), modemCount: 3, unstableEvents: 4, server: 'A', location: 'Yonkers, NY' },
];

export default function DataGridDemo() {
	
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

		<div style={{ height: 400, width: '1100px' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
				disableSelectionOnClick
			/>
		</div>
		</>
	);
}
