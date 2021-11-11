import { Link, Typography, Grid } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const copyright = new Date().getFullYear() + " MuxLabs";

const Footer = () => {
    return (
        <div style={{color:"white", backgroundColor:"#3f51b5", position:"fixed", bottom:"0", left:"0", right:"0", width:"100%", paddingTop:"18px"}} >
            <Grid container direction="row" justify="flex-start" spacing={3} style={{padding:"5px"}}>
                <Grid item style={{marginLeft:"20px"}}>
                    <Typography variant="h5">Support</Typography> 
                    <Divider/>
                    <Link style={{color:"white"}}>Contact Us</Link>
                </Grid>

                <Grid item style={{marginLeft:"20px"}}>
                    <Typography variant="h5">Socials</Typography>
                    <Divider/>
                    <FacebookIcon/> <Link style={{color:"white"}}>Facebook</Link>
                    <br/>
                    <InstagramIcon/> <Link style={{color:"white"}}>Instagram</Link>
                    <br/>
                    <TwitterIcon/> <Link style={{color:"white"}}>Twitter</Link>
                </Grid>
            </Grid>
            <Divider style={{width:"100%"}}/>
            <div style={{display:"flexStart"}}>
                <span> &copy; {copyright} | </span>
                <span> Privacy Policy | </span>
                <span> Terms of Service </span>
            </div>
        </div>
    );
}

export default Footer