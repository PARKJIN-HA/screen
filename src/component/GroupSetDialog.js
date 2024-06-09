import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

export default function GroupSetDialog({open, handleClose, handleOpen, handleSubmit, handleDelete, group = {id: 0, name: ""}}) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle>Group Setting</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Set Dialog
                    </DialogContentText>
                    <Box display={"flex"} flexDirection={"column"}>
                        <FormControl>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                name="name"
                                label="Group Name"
                                defaultValue={group ? group.name : ''}
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </FormControl>
                        {/*<FormControl>*/}
                        {/*    <InputLabel id="group-label">Group</InputLabel>*/}
                        {/*    <Select*/}
                        {/*        labelId="group-label"*/}
                        {/*        value={group}*/}
                        {/*        onChange={handleOpen}*/}
                        {/*        label="Group"*/}
                        {/*    >*/}
                        {/*        <MenuItem value={"10"}>Ten</MenuItem>*/}
                        {/*        <MenuItem value={"20"}>Twenty</MenuItem>*/}
                        {/*        <MenuItem value={"30"}>Thirty</MenuItem>*/}
                        {/*    </Select>*/}
                        {/*</FormControl>*/}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
