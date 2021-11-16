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
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");
  const [success, toggleSuccessMessage] = useState<boolean>(false);

  function sendResetEmail() {
    sendPasswordResetEmail(getAuth(), emailRef!.current!.value)
      .then(() => {
        toggleSuccessMessage(true);
        setError("");
      })
      .catch((error) => {
        toggleSuccessMessage(false);
        switch (error.code) {
          case "auth/invalid-email":
            setError("Invalid email provided.");
            break;
          case "auth/missing-email":
            setError("Please provide your email address.");
            break;
          case "auth/too-many-requests":
            setError("Too many attempts, try again later.");
            break;
          case "auth/internal-error":
            setError("Internal Error, notify an administrator.");
            break;
          case "auth/user-not-found":
            setError("This email does not seem to be registered.");
            break;
          default:
            setError(error.message);
        }
      });
  }

  return (
    <Container>
      <Logo />
      <p> Forgot your password? </p>
      <Grid container spacing={3} direction="column" alignContent="center">
        {error && (
          <Alert
            severity="error"
            style={{ marginTop: "15px", marginLeft: "23px" }}
          >
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            severity="success"
            style={{ marginTop: "15px", marginLeft: "23px" }}
          >
            You will receive an email shortly.
          </Alert>
        )}
        <Grid item>
          <Typography variant="body1">Enter your email address.</Typography>
          <Grid item></Grid>
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
    </Container>
  );
}
