import Typography from '@material-ui/core/Typography'
import Navbar from "./Navbar";
import CreateIcon from '@mui/icons-material/Create';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, IconButton, Avatar, Paper } from '@mui/material';

const useStyles = makeStyles ( (theme) => ({


    paper:{
        padding: theme.spacing(1),
        margin: "8px",
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    center:{

    display: "flex",
    justifyContent: "center",
    textAlign: "center",

    },

}));

export function ProfilePage(){
    const classes = useStyles();

    return(
        <>
            <Navbar />

            <Typography variant = "h4">Your profile</Typography>

                    <Paper className={classes.paper}> 

                    <IconButton disableRipple = {true} >
                        <Avatar style = {{margin: "1px", width: "100px", height: "100px"}} />

                        
                    </IconButton>

                    <br/>
                        <Typography>Upload an avatar!</Typography>
                    
                    </Paper>

                    <Paper className = {classes.paper}>
            
                    <div className={classes.center}>
                        <Box pr={7}>
                            <Typography variant="body1">Your username:</Typography>
                        </Box>

                        <Box>
                            <Typography variant="body1">userName</Typography>
                        </Box>
                    </div>

                        <div className={classes.center}>

                            <Box pl = {10} pt = {3}>
                                <Typography variant = 'body1'> Your password: </Typography>
                            </Box>

                            <Box pl= {5} pt={3}>
                                <Typography variant = 'body1'>randomPassword</Typography>
                            </Box>

                            <Box pl={1} pt={2}>

                                    <IconButton >
                                        <CreateIcon/>
                                    </IconButton>
                            </Box>
                        
                        </div>
                            
                        
                        <div className={classes.center}>
                            <Box pt = {4} pl={13}>
                                <Typography variant = 'body1'> Your email: </Typography>
                            </Box>

                            <Box pt= {4} pl = {4}>
                                <Typography variant = 'body1'>random@domain.com</Typography>
                            </Box>

                            <Box pt={3}>
                                    <IconButton>
                                        <CreateIcon/>
                                    </IconButton>
                            </Box>
                        
                        </div>

                        <div className={classes.center}>
                            <Box pt={4} pl={8} pr={3}>
                                <Typography> Link to twitch: </Typography>
                            </Box>

                            <Box pt={3} pl={4}>
                                <Button variant = 'contained'>
                                        Dummy button
                                </Button>
                            </Box>
                        </div>
                        
                    </Paper>
        </>
    )
}

export default ProfilePage;