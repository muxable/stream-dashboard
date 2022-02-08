import { Grid, Button, TextField } from "@material-ui/core";

export function BioEdit({
  setOpenBioPanel,
  setBioText,
}: {
  setOpenBioPanel: React.Dispatch<React.SetStateAction<boolean>>;
  setBioText: React.Dispatch<React.SetStateAction<string>>;
}) {
  let bio = "";
  {
    /* passed in openBioPanel to flag if bio panel is open, and also pass in setBioText to update the bio text  */
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setBioText(bio);
    {/*bio text will be updated but will also need to be checked/compared for anything malicious*/}
    setOpenBioPanel((openBioPanel) => !openBioPanel);
  };

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
        onChange={(e) => (bio = e.target.value)}
      />

      <br />
      <br />

      <Grid container direction="row" justifyContent="center" spacing={3}>
        <Grid item>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>

        <Grid item>
          <Button
            size="medium"
            variant="contained"
            onClick={() => {
              setOpenBioPanel((openBioPanel) => !openBioPanel);
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
