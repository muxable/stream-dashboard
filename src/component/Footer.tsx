import { Link, Typography, Grid } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import DiscordIcon from "./DiscordIcon";

const copyright = new Date().getFullYear() + " Muxable";

const Footer = () => {
  return (
    <div
      style={{
        color: "white",
        backgroundColor: "#3f51b5",
        position: "absolute",
        left: "0",
        right: "0",
        paddingTop: "13px",
        padding: "5px",
        marginTop: "45px",
        display: "flex",
        flexDirection: "column",
        zIndex: 1201,
      }}
    >
      {/*z index so that the footer can overlap the sidebar whenever implemented (either as anchored to a hamburger menu or always on beneath the navbar and above the footer)*/}
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        spacing={3}
        style={{ padding: "3px" }}
      >
        <Grid item style={{ marginLeft: "20px" }}>
          <Typography variant="h6">Socials</Typography>
          <Divider />
          <DiscordIcon />{" "}
          <Link
            href="https://discord.gg/UKHJMQs74u"
            target="_blank"
            rel="noopener"
            style={{ color: "white", fontSize: 20 }}
          >
            Discord
          </Link>
          <br />
          <InstagramIcon fontSize="small" />{" "}
          <Link style={{ color: "white", fontSize: 20 }}>Instagram</Link>
          <br />
          <TwitterIcon fontSize="small" />{" "}
          <Link style={{ color: "white", fontSize: 20 }}>Twitter</Link>
        </Grid>
      </Grid>
      <Divider />
      <div style={{ marginBottom: "5px" }}>
        <span style={{ fontSize: 18 }}> &copy; {copyright} &#183; </span>
        <span style={{ fontSize: 18 }}> Privacy Policy &#183; </span>
        <span style={{ fontSize: 18 }}> Terms of Service </span>
      </div>
    </div>
  );
};

export default Footer;
