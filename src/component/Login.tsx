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
import {
  AuthErrorCodes,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import Logo from "./Logo";
import Footer from "./Footer";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const provider = new GoogleAuthProvider();

export function Login() {
  async function logInWithGoogle() {
    try {
      await signInWithPopup(getAuth(), provider);
      history.replace("/");
    } catch (error: any) {
      switch (error.code) {
        case AuthErrorCodes.INTERNAL_ERROR:
          setError("Internal Error, notify admin");
          break;
        case AuthErrorCodes.POPUP_BLOCKED:
          setError("Popup is blocked");
          break;
        case AuthErrorCodes.POPUP_CLOSED_BY_USER:
          setError("Popup closed by user, try again");
          break;
        case AuthErrorCodes.EXPIRED_POPUP_REQUEST:
          setError("Only one popup request at a time");
          break;
        case AuthErrorCodes.OPERATION_NOT_ALLOWED:
          setError("Account type cannot use this auth method");
          break;
      }
    }
  }

  const [error, setError] = useState<string>("");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const history = useHistory();

  const toForgotPassword = () => {
    history.push("/forgotpassword");
  };

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

    if (passwordRef.current.value.length < 6) {
      setError("Please check your password length");
      return;
    }

    try {
      await signInWithEmailAndPassword(
        loginAuth,
        emailRef.current.value,
        passwordRef.current.value
      );
      history.replace("/");
    } catch (error: any) {
      // TO DO: improve error type
      switch (error.code) {
        case AuthErrorCodes.USER_DELETED:
          setError("Couldn't find your account.");
          break;
        case AuthErrorCodes.INVALID_EMAIL:
          setError("Invalid email provided.");
          break;
        case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
          setError("Too many attempts, try again later.");
          break;
        case AuthErrorCodes.INVALID_PASSWORD:
          setError("Invalid Password");
          break;
        case AuthErrorCodes.INTERNAL_ERROR:
          setError("Internal Error, notify an administrator.");
          break;
      }
    }
  };

  return (
    <Container style={{ paddingBottom: "165px" }}>
      <Logo />
      <p> Stream Dashboard by Muxable</p>
      <Grid container spacing={3} direction="column" alignContent="center">
        <Grid item>{error && <Alert severity="error">{error}</Alert>}</Grid>
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
        <Grid item>
          <Box width={350}>
            <Button
              fullWidth
              size="medium"
              variant="outlined"
              href="/auth/redirect"
            >
              Continue with Twitch
            </Button>
          </Box>
        </Grid>
        <Grid item textAlign="left">
          <Box width={350}>
            <Button
              fullWidth
              size="medium"
              variant="outlined"
              onClick={toForgotPassword}
            >
              Forgot password?
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box width={350} textAlign="left">
            <Typography variant="subtitle1">
              Don't have an account?&nbsp;
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </Container>
  );
}
