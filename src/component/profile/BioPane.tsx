import { Grid, Button, TextField } from "@material-ui/core";

export function BioEdit({
  setOpenBioEdit,
}: {
  setOpenBioEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <TextField
        fullWidth
        label="Change Bio"
        name="changeBio"
        multiline
        rows={4}
        size="small"
        variant="filled"
        margin="dense"
      />

      <br />
      <br />

      <Grid container direction="row" justifyContent="center" spacing={3}>
        <Grid item>
          <Button size="medium" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>

        <Grid item>
          <Button
            size="medium"
            variant="contained"
            onClick={() => {
              setOpenBioEdit((openBioEdit) => !openBioEdit);
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
      <br />
    </div>
  );
}
