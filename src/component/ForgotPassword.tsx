import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AuthErrorCodes, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Footer from "./Footer";

export function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");
  const [success, toggleSuccessMessage] = useState<boolean>(false);

  async function sendResetEmail() {
    try {
      await sendPasswordResetEmail(getAuth(), emailRef!.current!.value);
      toggleSuccessMessage(true);
      setError("");
    } catch (error: any) {
      toggleSuccessMessage(false);
      switch (error.code) {
        case AuthErrorCodes.INVALID_EMAIL:
          setError("Invalid email provided.");
          break;
        case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
          setError("Too many attempts, try again later.");
          break;
        case AuthErrorCodes.INTERNAL_ERROR:
          setError("Internal Error, notify an administrator.");
          break;
        case AuthErrorCodes.USER_DELETED:
          setError("This email does not seem to be registered.");
          break;
        default:
          setError(error.message);
      }
    }
  }

  return (
    <Container style={{ paddingBottom: "165px" }}>
      <Logo />
      <p> Forgot your password? </p>
      <Grid container spacing={3} direction="column" alignContent="center">
        <Grid item>
          {error && <Alert severity="error">{error}</Alert>}
          {success && (
            <Alert severity="success">You will receive an email shortly.</Alert>
          )}
        </Grid>
        <Grid item>
          <Typography variant="body1">Enter your email address.</Typography>
          <Box width={350}>
            <TextField
              fullWidth
              label="Email"
              name="sendEmail"
              size="small"
              variant="outlined"
              inputRef={emailRef}
            />
          </Box>
        </Grid>

        <Grid item>
          <Box width={350}>
            <Button
              fullWidth
              size="medium"
              variant="outlined"
              endIcon={<SendIcon />}
              onClick={sendResetEmail}
            >
              Send Email
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box width={350} textAlign="left">
            <Typography variant="subtitle1">
              {" "}
              Don't need to change your password?
              <Link to="/login" style={{ textDecoration: "none" }}>
                {" "}
                Login{" "}
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}
