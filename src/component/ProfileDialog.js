import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {Avatar, Grid} from "@mui/material";
import Box from "@mui/material/Box";

export default function ProfileDialog({openProfile, setOpenProfile}) {

    const handleClose = () => {
        console.log("handleClose function called");
        setOpenProfile(false);
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={"xs"}
                open={openProfile}
                onClose={handleClose}
            >
                <DialogContent>
                    <Box>
                        <Grid container
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              spacing={2}
                        >
                            <Grid item>
                                <Avatar>H</Avatar>
                            </Grid>
                            <Grid item style={{width: "100%"}}>
                                <Button variant="contained" fullWidth>Group Change</Button>
                            </Grid>
                            <Grid item style={{width: "100%"}}>
                                <Button variant="contained" fullWidth>Profile</Button>
                            </Grid>
                            <Grid item style={{width: "100%"}}>
                                <Button variant="contained" fullWidth>로그아웃</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
