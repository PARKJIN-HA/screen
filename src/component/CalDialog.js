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
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import moment from "moment";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

export default function CalDialog({
                                      groups = [],
                                      members = [],
                                      selectedEvent = [],
                                      open,
                                      handleOpen,
                                      handleClose,
                                      handleDelete,
                                      handleSubmit
                                  }) {
    const [group, setGroup] = React.useState('');

    const handleGrpChange = (event) => {
        setGroup(event.target.value);
    }

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleOpen}>
                Create
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
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
                            defaultValue={selectedEvent ? selectedEvent.title : ""}
                            label="Add title"
                            fullWidth
                            variant="standard"
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid container alignItems={"center"}>
                                <Grid item xs={6} mb={2}>
                                    <Typography>Start:</Typography>
                                </Grid>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <Grid item xs={6} mb={2}>
                                        <DateTimePicker
                                            id={"start"}
                                            name={"start"}
                                            format="YYYY-MM-DD HH:mm"
                                            size="small"
                                            defaultValue={moment()}
                                            value={selectedEvent ? moment(selectedEvent.start) : moment()}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>End:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <DateTimePicker
                                            id={"end"}
                                            name={"end"}
                                            style={{width: "100%"}}
                                            format="YYYY-MM-DD HH:mm"
                                            size="small"
                                            defaultValue={moment().add(1, "week").clone()}
                                            value={selectedEvent ? moment(selectedEvent.end) : moment().add(1, "week").clone()}
                                            fullWidth
                                        />
                                    </Grid>
                                </LocalizationProvider>
                            </Grid>
                        </LocalizationProvider>

                        <Box className={"textBox"}>
                            <AddLocation sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="Location"
                                       name={"location"}
                                       defaultValue={selectedEvent ? selectedEvent.location : ""}
                                       label="Location" variant="standard"
                                       fullWidth/>
                        </Box>

                        <Box className={"textBox"}>
                            <Description sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="Description"
                                       name={"description"}
                                       defaultValue={selectedEvent ? selectedEvent.description : ""}
                                       label="Description" variant="standard"
                                       fullWidth/>
                        </Box>

                        <Box className={"textBox"}>
                            <Repeat sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <FormControl fullWidth>
                                <InputLabel id="Group">그룹 선택</InputLabel>
                                <Select
                                    labelId="Group"
                                    id="Group"
                                    name={"group"}
                                    defaultValue={selectedEvent ? selectedEvent.groupId : ""}
                                    value={group}
                                    label="그룹 선택"
                                    onChange={handleGrpChange}
                                    fullWidth
                                    displayEmpty
                                    variant="standard"
                                    size="small"
                                >
                                    {groups.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
        ;
}
