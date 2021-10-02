import { Container, Paper, Tab, Tabs, Stack } from "@mui/material";
import { useState } from "react";
import { ComposedTwoAreasChart } from "../component/ComposedTwoAreasChart";
import { ComposedTwoYAxisChart } from "../component/ComposedTwoYAxisChart";
import StreamHealthTable from "../component/StreamHealthTable";

export function Analytics() {

	const [value, setValue] = useState(0)

	const handleChange = (event: any, newValue: number) => {
		setValue(newValue)
	}
	// style to be changed later, css help please
	return (
		<Container style={{ backgroundColor: '#3443eb' }}>
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
							<Tab label="bitrate/fps" />
							<Tab label="modem one bandwidth" />
							<Tab label="modem Two bandwidth" />
							<Tab label="modem Three bandwidth" />
						</Tabs>
						{value === 0 && <ComposedTwoYAxisChart />}
						{value === 1 && <ComposedTwoAreasChart />}
						{value === 2 && <ComposedTwoAreasChart />}
						{value === 3 && <ComposedTwoAreasChart />}
					</Paper>
					<Paper>
						<StreamHealthTable />
						{/* <p> hardware info/stuff or another table view stufffffffff </p> */}
					</Paper>
				</Stack>

				{/* Map */}
				<Container style={{ backgroundColor: '#3fab12', minHeight: 400 }}>
					<p> MAP </p>
				</Container>

				{/* card stuff */}
				<Container style={{ backgroundColor: '#3fab12', minHeight: 400 }}>
					<p> Card Stuff </p>
				</Container>
			</Stack >
		</Container >
	)
}