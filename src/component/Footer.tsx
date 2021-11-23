import { Link, Typography, Grid } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

const copyright = new Date().getFullYear() + " MuxLabs";

const Footer = () => {
  return (
    <div
      style={{
        color: "white",
        backgroundColor: "#3f51b5",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        width: "100%",
        paddingTop: "5px",
        zIndex: 1201,
      }}
    >
      <Grid
        container
        direction="row"
        justify="flex-start"
        spacing={3}
        style={{ padding: "5px" }}
      >
        <Grid item style={{ marginLeft: "20px" }}>
          <Typography variant="h6">Support</Typography>
          <Divider />
          <Link style={{ color: "white", fontSize: 20 }}>Contact Us</Link>
        </Grid>

        <Grid item style={{ marginLeft: "20px" }}>
          <Typography variant="h6">Socials</Typography>
          <Divider />
          <FacebookIcon fontSize="small" />{" "}
          <Link style={{ color: "white", fontSize: 20 }}>Facebook</Link>
          <br />
          <InstagramIcon fontSize="small" />{" "}
          <Link style={{ color: "white", fontSize: 20 }}>Instagram</Link>
          <br />
          <TwitterIcon fontSize="small" />{" "}
          <Link style={{ color: "white", fontSize: 20 }}>Twitter</Link>
        </Grid>
      </Grid>
      <Divider />
      <div>
        <span style={{ fontSize: 18 }}> &copy; {copyright} &#183; </span>
        <span style={{ fontSize: 18 }}> Privacy Policy &#183; </span>
        <span style={{ fontSize: 18 }}> Terms of Service </span>
      </div>
    </div>
  );
};

export default Footer;
