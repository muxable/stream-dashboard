import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import React, { useState, useRef } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export function SignUp() {
  const [error, setError] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(false)
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  // TODO Improve typing
  const signup = async (event: any) => {
    event.preventDefault();
    const signupAuth = getAuth();

    if (
      passwordRef.current === null ||
      emailRef.current === null ||
      passwordConfirmRef.current === null
    )
      return;

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Password doesn't match");
    }

    try {
      await createUserWithEmailAndPassword(
        signupAuth,
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (error: any) {
      // TODO improve typing of error
      if (error.code === "auth/invalid-email")
        setError("Invalid email provided");
      else if (error.code === "auth/email-already-in-use")
        setError("Email already used");
      else if (error.code === "auth/weak-password")
        setError("Please use a stronger password");
      else if (error.code === "auth/operation-not-allowed")
        setError("Please ensure email registration is enabled");
    }
  };

  // These are only some of the popup errors handled
  function signInWithGoogle() {
    signInWithPopup(getAuth(), provider).catch((error) => {
      if (error.code === "auth/popup-blocked") setError("Popup is blocked");
      else if (error.code === "auth/popup-closed-by-user")
        setError("Popup closed by user, try again");
      else if (error.code === "auth/cancelled-popup-request")
        setError("Only one popup request at a time");
      else if (error.code === "auth/account-exists-with-different-credential")
        setError("Email already in use");
      else if (error.code === "auth/auth-domain-config-required")
        setError("Notify admin, domain config required");
      else if (error.code === "auth/operation-not-allowed")
        setError("Account type cannot use this auth method");
    });
  }

  return (
    <Container>
      <Logo />
      <p> Stream Dashboard by Muxable </p>
      <Grid container spacing={3} direction="column" alignContent="center">
        {error && <Alert severity="error">{error}</Alert>}
        <Grid item>
          <Box width={350}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              size="small"
              variant="standard"
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
              variant="standard"
              inputRef={passwordRef}
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
              inputRef={passwordConfirmRef}
            />
          </Box>
        </Grid>
        <Grid item>
          <Box width={350}>
            <Button fullWidth size="medium" variant="outlined" onClick={signup}>
              Create Account
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box width={350}>
            <Button
              fullWidth
              size="medium"
              variant="outlined"
              onClick={signInWithGoogle}
            >
              Sign up with Google
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box width={350} textAlign="left">
            <Typography variant="subtitle1">
              Have an account?
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
