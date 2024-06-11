// TaskDialog.js
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Box from "@mui/material/Box";
import moment from "moment";

const TaskDialog = ({ open, handleClose, task, onSave }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(moment());
    const [end, setEnd] = useState(moment());
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setStart(moment(task.start) || moment());
            setEnd(moment(task.end) || moment());
            setProgress(task.progress || 0);
        }
    }, [task]);

    const handleSave = () => {
        const updatedTask = {
            ...task,
            title,
            start: start.toISOString(),
            end: end.toISOString(),
            progress
        };
        console.log(task);
        console.log(updatedTask);
        onSave(updatedTask);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Task Details</DialogTitle>
            <DialogContent>
                <TextField
                    margin="normal"
                    label="Title"
                    fullWidth
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Box my={2}>
                        <DateTimePicker
                            label="Start Time"
                            value={start}
                            onChange={(newValue) => setStart(newValue)}
                        />
                    </Box>
                    <Box my={2}>
                        <DateTimePicker
                            label="End Time"
                            value={end}
                            onChange={(newValue) => setEnd(newValue)}
                        />
                    </Box>
                </LocalizationProvider>
                <TextField
                    margin="normal"
                    label="Progress"
                    fullWidth
                    variant="outlined"
                    type="number"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskDialog;
