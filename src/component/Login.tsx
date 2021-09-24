import { Container, Box, Button, Grid, TextField, Link } from "@mui/material";

export function Login() {
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
              variant="outlined"
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
              variant="outlined"
            />
          </Box>
        </Grid>
        <Grid item>
          <Box width={350}>
            <Button fullWidth size='medium' variant="outlined"> Login </Button>
          </Box>
        </Grid>
        <Grid item textAlign='left'>
          <Box width={350}>
            <Button fullWidth size='medium' variant="outlined"> Forgot password? </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box width={350} textAlign='left'>
            <text> Don't have an account?
              <Link href="#" underline="none">
                {' Sign up'}
              </Link>
            </text>
          </Box>
        </Grid>
      </Grid>
    </Container >
  )
}