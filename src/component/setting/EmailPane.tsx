import {
	Grid,
	Button,
	TextField,
} from "@material-ui/core";


export function EmailEdit() {
	return (
		<div>
			<TextField
				fullWidth
				label="Change email"
				name="changeEmail"
				size="small"
				type="password"
				variant="standard"
				margin="dense"
			/>

			<Grid container direction="row" justifyContent="center" spacing={2}>
				<Grid item>
					<Button size="medium" variant="contained" color="primary">
						Change Email
					</Button>
				</Grid>

				<Grid item>
					<Button
						size="medium"
						variant="contained"
						onClick={() => { }}
					>
						Cancel
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}