import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebaseSetup";
import Logo from "./Logo";

const provider = new GoogleAuthProvider();

export function Login() {
  function logInWithGoogle() {
    signInWithPopup(auth, provider);
  }

  return (
    <Container>
      <Logo />
      <p> Stream Dashboard by Muxable</p>
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
        <Grid item>
          <Box width={350}>
            <Button
              fullWidth
              size="medium"
              variant="outlined"
              onClick={logInWithGoogle}
            >
              Continue with Google
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
              <Link to="/signup" style={{ textDecoration: "none" }}>
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
