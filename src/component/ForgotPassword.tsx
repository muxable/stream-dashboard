import {
  Typography,
  Container,
  Box,
  Button,
  Grid,
  TextField,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Footer from "./Footer";

export function ForgotPassword() {
  return (
    <Container style={{ paddingBottom: "165px" }}>
      <Logo />
      <p> Stream Dashboard by Muxable </p>
      <Grid container spacing={3} direction="column" alignContent="center">
        <Grid item>
          <Box width={350}>
            <TextField
              fullWidth
              label="Email"
              name="sendEmail"
              size="small"
              variant="outlined"
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
            >
              {" "}
              Send Email{" "}
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
