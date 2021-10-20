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
      // TODO: Check to see if we need to promise chain scenarios
      // .then((userCredential) => {
      //   // Signed in
      //   const user = userCredential.user;
      //   console.log(user)
      // })
      // .catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   console.log('errorcode', errorCode, errorMessage)
      // });
    } catch (error) {
      // setError(error)
      console.error(error);
    }
  };

  function signInWithGoogle() {
    signInWithPopup(getAuth(), provider);
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
