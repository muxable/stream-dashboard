import { Container } from "@mui/material";
import { ComposedTwoAreasChart } from "../component/ComposedTwoAreasChart";
import { ComposedTwoYAxisChart } from "../component/ComposedTwoYAxisChart";

export function Analytics() {
	return (
		<Container>
			<ComposedTwoYAxisChart />
			<ComposedTwoAreasChart />
		</Container >
	)
}