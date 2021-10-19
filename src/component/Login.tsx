import React, { useState, useRef } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebaseSetup";
import Logo from "./Logo";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const provider = new GoogleAuthProvider();

export function Login() {
  function logInWithGoogle() {
    signInWithPopup(auth, provider);
  }

  const [error, setError] = useState<string>("");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const history = useHistory();

  const loginSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    const loginAuth = getAuth();

    if (passwordRef.current === null || emailRef.current === null) {
      return;
    }

    if (!emailRef.current.value) {
      setError("Email field is empty");
      return;
    }

    if (!passwordRef.current.value) {
      setError("Password field is empty");
      return;
    }

    if (passwordRef.current.value.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await signInWithEmailAndPassword(
        loginAuth,
        emailRef.current.value,
        passwordRef.current.value
      );
      history.push("/");
    } catch (error) {
      setError("Failed to login.");
      console.error(error);
    }
  };

  return (
    <Container>
      <Logo />
      <p> Stream Dashboard by Muxable</p>
      <Grid container spacing={3} direction="column" alignContent="center">
        {error && <Alert severity="error">{error}</Alert>}
        <Grid item>
          <Box width={350}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              size="small"
              variant="outlined"
              inputRef={emailRef}
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
              inputRef={passwordRef}
            />
          </Box>
        </Grid>
        <Grid item>
          <Box width={350}>
            <Button
              fullWidth
              size="medium"
              variant="outlined"
              onClick={loginSubmit}
            >
              Login
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
              Forgot password?
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box width={350} textAlign="left">
            <Typography variant="subtitle1">
              Don't have an account?
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
