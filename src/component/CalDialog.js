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

export default function CalDialog({groups = [], members = [], open, handleOpen, handleClose, handleSubmit}) {
    const [repeat, setRepeat] = React.useState('None');
    const [group, setGroup] = React.useState('');
    const [member, setMember] = React.useState('');

    const handleChange = (event) => {
        setRepeat(event.target.value);
    };

    const handleGrpChange = (event) => {
        setGroup(event.target.value);
    }

    const handleMbmChange = (event) => {
        setMember(event.target.value);
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
                                       label="Location" variant="standard"
                                       fullWidth/>
                        </Box>

                        <Box className={"textBox"}>
                            <Description sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField id="Description"
                                       name={"description"}
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

                        <Box className={"textBox"}>
                            <Repeat sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <FormControl fullWidth>
                                <InputLabel id="Member">멤버 선택</InputLabel>
                                <Select
                                    labelId="Member"
                                    id="Member"
                                    value={member}
                                    label="멤버 선택"
                                    onChange={handleMbmChange}
                                    fullWidth
                                    displayEmpty
                                    variant="standard"
                                    size="small"
                                >
                                    {members.map((item, index) => (
                                        <MenuItem key={index} value={item.name}
                                                  sx={{display: "flex", flexDirection: "row"}}>
                                            <Checkbox checked={members.indexOf(item) > -1}/>
                                            <ListItemText primary={item.name}/>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
    )
        ;
}
