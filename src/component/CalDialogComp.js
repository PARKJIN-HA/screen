import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {AddLocation, Article, Description, Groups, Repeat} from "@mui/icons-material";

export default function CalDialogComp() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Create
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogContent>
                    <Grid container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                    >
                        <TextField
                            required
                            margin="dense"
                            id="title"
                            name="title"
                            label="Add title"
                            fullWidth
                            variant="standard"
                        />

                        {/*align-items: center;*/}
                        {/*justify-content: space-around;*/}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box style={{display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%"}}>
                                Start:
                                <DateTimePicker
                                    format="YYYY-MM-DD HH:mm"
                                />
                            </Box>
                            <Box style={{display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%"}}>
                                End:
                                <DateTimePicker
                                    style={{width: "100%"}}
                                    format="YYYY-MM-DD HH:mm"
                                    fullWidth
                                />
                            </Box>
                        </LocalizationProvider>

                        <Box sx={{display: 'flex', alignItems: 'flex-end', width: "100%"}}>
                            <AddLocation sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="Location" label="Location" variant="standard"
                                       fullWidth/>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'flex-end', width: "100%"}}>
                            <Description sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="Description" label="Description" variant="standard"
                                       fullWidth/>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'flex-end', width: "100%"}}>
                            <Groups sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="Member" label="Member" variant="standard"
                                       fullWidth/>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'flex-end', width: "100%"}}>
                            <Article sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="Document" label="Document" variant="standard"
                                       fullWidth/>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'flex-end', width: "100%"}}>
                            <Repeat sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="Repeat" label="Repeat" variant="standard"
                                       fullWidth/>
                        </Box>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
