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
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {useEffect} from "react";

export default function GroupSetDialog({
                                           open,
                                           handleClose,
                                           handleOpen,
                                           handleSubmit,
                                           handleDelete,
                                           group = {
                                               "id": 1,
                                               "name": "placeholder",
                                               "owner": {
                                                   "id": 1,
                                                   "username": "admin",
                                                   "email": "admin@admin@.com",
                                                   "role": null,
                                                   "password": null
                                               },
                                               "groupMembers": [1],
                                               "schedules": [1, 2],
                                               "ownerId": 1
                                           }
                                       }) {
    const [groupMembers, setGroupMembers] = React.useState([]);

    useEffect(() => {
        if (!group) {
            return;
        }
        if (group.groupMembers === []) {
            setGroupMembers([])
            return;
        }

        fetch(`http://localhost:9000/api/user/${group.groupMembers}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setGroupMembers(data);
            });
    }, [group])

    const handleMemberDelete = (memberId) => {
        if (!memberId) {
            return;
        }
        if (memberId === group.owner.id) {
            alert("You can't delete the owner of the group")
            return;
        }
        fetch(`http://localhost:9000/api/user/${memberId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // Remove the deleted member from the groupMembers state
                setGroupMembers(groupMembers.filter(member => member.id !== memberId));
            });
    }

    const handleInvite = () => {
        const email = document.getElementById("member").value;
        if (!email) {
            alert("Please enter the email of the member you want to invite")
            return;
        }
        fetch(`http://localhost:9000/api/groups/${group.id}/join-request`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: email
        })
            .then(response => {
                if (!response.ok) {
                    alert('Failed to invite the member');
                    return;
                }
                if (response.status === 400) {
                    alert("The user you want to invite is already a member of the group")
                    return;
                }
                alert('Successfully invited the member');
                handleClose();
            })
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
                fullWidth
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
                        <Box marginY={2} textAlign={"center"}>
                            <Typography>
                                Group Owner: {group ? group.owner.username : ''}
                            </Typography>
                        </Box>
                        <Divider/>
                        <Box>
                            {/* We need to do listing group's member*/}
                            <Box marginY={2} textAlign={"center"}>
                                <Typography>
                                    Group Members
                                </Typography>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"}>
                                {
                                    groupMembers ? groupMembers.map((member, index) => (
                                        <Box key={index} display={"flex"} justifyContent={"space-between"} marginY={1}>
                                            <Typography>
                                                {member.username}
                                            </Typography>
                                            <Button onClick={() => handleMemberDelete(member.id)}>
                                                Delete
                                            </Button>
                                        </Box>
                                    )) : null
                                }
                            </Box>
                        </Box>
                        <Divider/>
                        <Box marginY={2} textAlign={"center"}>
                            <Typography>
                                Invite Group Member
                            </Typography>
                            <Box display={"flex"}>
                                <TextField
                                    margin="dense"
                                    id="member"
                                    name="member"
                                    label="Member Email"
                                    type="email"
                                    variant="standard"
                                    sx={{flexGrow: 1}}
                                />
                                <Button size={"small"} onClick={handleInvite}>
                                    Invite
                                </Button>
                            </Box>
                        </Box>
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
