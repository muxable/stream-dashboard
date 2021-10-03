import { Typography, Container, Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from './Logo';

export function SignUp() {
  return (
    <Container>
      <Logo/>
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
        <Grid item>
          <Box width={350} textAlign='left'>
            <Typography variant = "subtitle1"> Have an account?
              <Link to="/login" style={{textDecoration: 'none'}}> Login </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container >
  )
}