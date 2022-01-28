import { Grid, Button, TextField } from "@material-ui/core";

export function PasswordEdit({
  setOpenPasswordEdit,
}: {
  setOpenPasswordEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <TextField
        fullWidth
        label="Change password"
        name="changePassword"
        size="small"
        type="password"
        variant="standard"
        margin="dense"
      />

      <TextField
        fullWidth
        label="Reconfirm password"
        name="reconfirmPassword"
        size="small"
        type="password"
        variant="standard"
        margin="dense"
      />

      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item>
          <Button size="medium" variant="contained" color="primary">
            Change password
          </Button>
        </Grid>

        <Grid item>
          <Button
            size="medium"
            variant="contained"
            onClick={() => {
              setOpenPasswordEdit((openPasswordEdit) => !openPasswordEdit);
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
