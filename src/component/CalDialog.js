import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {FormControl, Grid, InputLabel, Select} from "@mui/material";
import Box from "@mui/material/Box";
import {AddLocation, Article, Description, Groups, Repeat} from "@mui/icons-material";
import "../public/css/calendar.css"
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export default function CalDialog() {
    const [open, setOpen] = React.useState(false);
    const [repeat, setRepeat] = React.useState('None');

    const handleChange = (event) => {
        setRepeat(event.target.value);
    };

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
                          className={"dialogGrid"}
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid container alignItems={"center"}>
                                <Grid item xs={6} mb={2}>
                                    <Typography>Start:</Typography>
                                </Grid>
                                <Grid item xs={6} mb={2}>
                                    <DateTimePicker
                                        format="YYYY-MM-DD HH:mm"
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>End:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <DateTimePicker
                                        style={{width: "100%"}}
                                        format="YYYY-MM-DD HH:mm"
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </LocalizationProvider>

                        <Box className={"textBox"}>
                            <AddLocation sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="Location" label="Location" variant="standard"
                                       fullWidth/>
                        </Box>

                        <Box className={"textBox"}>
                            <Description sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="Description" label="Description" variant="standard"
                                       fullWidth/>
                        </Box>

                        <Box className={"textBox"}>
                            <Groups sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="Member" label="Member" variant="standard"
                                       fullWidth/>
                        </Box>

                        <Box className={"textBox"}>
                            <Article sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="Document" label="Document" variant="standard"
                                       fullWidth/>
                        </Box>

                        <Box className={"textBox"}>
                            <Repeat sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <FormControl fullWidth>
                                <InputLabel id="Repeat">반복 여부</InputLabel>
                                <Select
                                    labelId="Repeat"
                                    id="Repeat"
                                    value={repeat}
                                    label="반복 여부"
                                    onChange={handleChange}
                                    fullWidth
                                    displayEmpty
                                    variant="standard"
                                    size="small"
                                >
                                    <MenuItem value="None">
                                        <em>반복 안함</em>
                                    </MenuItem>
                                    <MenuItem value={"Day"}>매일</MenuItem>
                                    <MenuItem value={"Week"}>매주</MenuItem>
                                    <MenuItem value={"Month"}>매월</MenuItem>
                                    <MenuItem value={"Year"}>매년</MenuItem>
                                </Select>
                            </FormControl>
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
