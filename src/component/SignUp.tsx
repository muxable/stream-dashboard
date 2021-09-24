import { Container, Box, Button, Grid, TextField } from "@mui/material";

export function SignUp() {
	return (
		<Container>
			<p> Stream Dashboard by Muxable </p>
			<Grid container spacing={3} direction='column' alignContent='center'>
				<Grid item>
					<Box width={350}>
						<TextField
							fullWidth
							label="Email"
							name="email"
							size="small"
							variant="standard"
						/>
					</Box>
				</Grid>
				<Grid item>
					<Box width={350}>
						<TextField
							fullWidth
							label="Password"
							name="password"
							size="small"
							type="password"
							variant="standard"
						/>
					</Box>
				</Grid>
				<Grid item>
					<Box width={350}>
						<TextField
							fullWidth
							label="Confirm password"
							name="Confirm password"
							size="small"
							type="password"
							variant="standard"
						/>
					</Box>
				</Grid>
				<Grid item>
					<Box width={350}>
						<Button fullWidth size='medium' variant="outlined"> Create Account </Button>
					</Box>
				</Grid>
			</Grid>
		</Container >
	)
}