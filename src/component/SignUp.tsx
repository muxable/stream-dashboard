import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import Logo from "./Logo";
import Footer from "./Footer";
import React, { useState, useRef } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  AuthErrorCodes,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export function SignUp() {
  const [error, setError] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(false)
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const history = useHistory();
  // TODO Improve typing
  const signup = async (event: any) => {
    event.preventDefault();
    const signupAuth = getAuth();
    setError("");
    if (
      passwordRef.current === null ||
      emailRef.current === null ||
      passwordConfirmRef.current === null
    )
      return;

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Password doesn't match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        signupAuth,
        emailRef.current.value,
        passwordRef.current.value
      );
      history.replace("/");
    } catch (error: any) {
      switch (error.code) {
        case AuthErrorCodes.INVALID_EMAIL:
          setError("Invalid email provided.");
          break;
        case AuthErrorCodes.EMAIL_EXISTS:
          setError("Email already used");
          break;
        case AuthErrorCodes.WEAK_PASSWORD:
          setError("Please use a stronger password");
          break;
        case AuthErrorCodes.OPERATION_NOT_ALLOWED:
          setError("Please ensure email registration is enabled");
          break;
        case AuthErrorCodes.INTERNAL_ERROR:
          setError("Internal Error, notify admin");
          break;
      }
    }
  };

  // These are only some of the popup errors handled
  async function signInWithGoogle() {
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
        case AuthErrorCodes.NEED_CONFIRMATION:
          setError("Email already in use");
          break;
        case AuthErrorCodes.MISSING_AUTH_DOMAIN:
          setError("Notify admin, domain config required");
          break;
        case AuthErrorCodes.OPERATION_NOT_ALLOWED:
          setError("Account type cannot use this auth method");
          break;
      }
    }
  }

  return (
    <Container style={{ paddingBottom: "165px" }}>
      <Logo />
      <p> Stream Dashboard by Muxable </p>
      <Grid container spacing={3} direction="column" alignContent="center">
        <Grid item>{error && <Alert severity="error">{error}</Alert>}</Grid>
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
          <Box width={350}>
            <Button
              fullWidth
              size="medium"
              variant="outlined"
              href="/auth/redirect"
            >
              Sign up with Twitch
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box width={350} textAlign="left">
            <Typography variant="subtitle1">
              Have an account?&nbsp;
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}
