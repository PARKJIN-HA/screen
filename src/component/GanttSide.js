import React from 'react';
import {
    Box,
    Button,
    Typography,
    Grid,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import moment from "moment";
import dayjs from "dayjs";

const Sidebar = ({tasks, startDate, endDate, onDateChange, onAddTask}) => {
    return (
        <Box sx={{padding: 2, borderLeft: '1px solid #ccc', width: '200px'}}>
            <Button variant="contained" color="primary" onClick={onAddTask}>ADD</Button>
            <Typography variant="h6" sx={{marginTop: 2}}>List</Typography>
            <List>
                {tasks.map((task, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={task.name}/>
                        <ListItemSecondaryAction>
                            <Typography variant="body2">{task.completePercentage}%</Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Grid container spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={12}>
                        <Typography>Start</Typography>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => onDateChange('start', dayjs(newValue))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>End</Typography>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => onDateChange('end', dayjs(newValue))}
                        />
                    </Grid>
                </LocalizationProvider>
            </Grid>
        </Box>
    );
};

export default Sidebar;
