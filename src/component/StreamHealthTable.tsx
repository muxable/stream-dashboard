import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Chip, Container } from '@mui/material';


export class HealthCellMetaData {
	isStable: boolean;
	duration: number;

	constructor(isStable: boolean, duration: number) {
		this.isStable = isStable;
		this.duration = duration
	}
}

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 50,
		sortable: false,
		filterable: false,
		hideSortIcons: true
	},
	{
		field: 'timestamp',
		headerName: 'timestamp',
		width: 250,
	},
	{
		field: 'health',
		headerName: 'status',
		width: 160,
		hideSortIcons: true,
		sortable: false,
		filterable: false,
		renderCell: (params) => {
			const healthMetaData: HealthCellMetaData = params['value'] as HealthCellMetaData
			const isStable = healthMetaData.isStable
			const duration = healthMetaData.duration
			return (
				// < Chip label="stable" color="success" />
				<Container>
					{isStable && <Chip label={`stable(${duration}s)`} color="success" variant="outlined" />}
					{!isStable && <Chip label={`unstable${duration}s`} color="error" variant="outlined" />}
				</Container>

				// { !health.isStable && < Chip label="unstable" color="success" /> }
			);
		}
	},
];

const rows = [
	{ id: 1, timestamp: Date(), health: new HealthCellMetaData(true, 12) },
	{ id: 2, timestamp: Date(), health: new HealthCellMetaData(false, 12) },
	{ id: 3, timestamp: Date(), health: new HealthCellMetaData(false, 12) },
	{ id: 4, timestamp: Date(), health: new HealthCellMetaData(true, 12) },
	{ id: 5, timestamp: Date(), health: new HealthCellMetaData(true, 12) },
	{ id: 6, timestamp: Date(), health: new HealthCellMetaData(true, 12) },
	{ id: 7, timestamp: Date(), health: new HealthCellMetaData(false, 12) },
	{ id: 8, timestamp: Date(), health: new HealthCellMetaData(false, 12) },
	{ id: 9, timestamp: Date(), health: new HealthCellMetaData(true, 12) },
];

export default function StreamHealthTable() {
	return (
		<div style={{ height: 400, width: 500 }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				disableSelectionOnClick
				disableColumnMenu
			/>
		</div>
	);
}
