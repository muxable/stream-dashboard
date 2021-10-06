import { Container, Paper, Tab, Tabs, Stack } from "@mui/material";
import { useState } from "react";
import { ComposedTwoAreasChart } from "../component/ComposedTwoAreasChart";
import { ComposedTwoYAxisChart } from "../component/ComposedTwoYAxisChart";
import { Map } from "../component/Map";
import { SimpleStatsTable } from "../component/SimpleStatsTable";
import { StreamHealthTable } from "../component/StreamHealthTable";


export function Analytics() {

	const [value, setValue] = useState(0)

	const handleChange = (event: any, newValue: number) => {
		setValue(newValue)
	}
	// style to be changed later, css help please
	return (
		<Container >
			<Stack direction='column' spacing={4}>
				<Stack direction='row' spacing={2}>
					<Paper style={{ width: 650 }}>
						<Tabs
							value={value}
							onChange={handleChange}
							variant="scrollable"
							scrollButtons="auto"
						// style={{ marginBottom: 20, marginTop: 20, background: '#a2fb1b' }}
						>
							<Tab label="bitrate/fps" style={{ marginRight: 12 }} />
							<Tab label="modem one bandwidth" style={{ marginRight: 12 }} />
							<Tab label="modem Two bandwidth" style={{ marginRight: 12 }} />
							<Tab label="modem Three bandwidth" style={{ marginRight: 12 }} />
						</Tabs>
						{value === 0 && <ComposedTwoYAxisChart />}
						{value === 1 && <ComposedTwoAreasChart />}
						{value === 2 && <ComposedTwoAreasChart />}
						{value === 3 && <ComposedTwoAreasChart />}

						{/* mock data */}
						<SimpleStatsTable rows={
							[
								{ name: 'bitrate', min: 2, max: 3, avg: 4, mode: 5 },
								{ name: 'fps', min: 1, max: 2, avg: 3, mode: 4 },
							]
						}></SimpleStatsTable>
					</Paper>
					<Paper>
						<StreamHealthTable />
						{/* <p> hardware info/stuff or another table view stufffffffff </p> */}
					</Paper>
				</Stack>

				{/* Map */}
				<Map />

				{/* card stuff */}
				<Container style={{ backgroundColor: '#3fab12', minHeight: 400 }}>
					<p> Card Stuff </p>
				</Container>
			</Stack >
		</Container >
	)
}