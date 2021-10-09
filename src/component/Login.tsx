import {
  Typography,
  Container,
  Box,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export function Login() {
  return (
    <Container>
      <Logo />
      <p> Stream Dashboard by Muxable </p>
      <Grid container spacing={3} direction="column" alignContent="center">
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
            <Button fullWidth size="medium" variant="outlined">
              {" "}
              Login{" "}
            </Button>
          </Box>
        </Grid>
        <Grid item textAlign="left">
          <Box width={350}>
            <Button fullWidth size="medium" variant="outlined">
              {" "}
              Forgot password?{" "}
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box width={350} textAlign="left">
            <Typography variant="subtitle1">
              {" "}
              Don't have an account?
              <Link to="/sign-up" style={{ textDecoration: "none" }}>
                {" "}
                Sign up{" "}
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
