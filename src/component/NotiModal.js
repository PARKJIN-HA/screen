import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Alert} from "@mui/lab";
import {Grid, Stack} from "@mui/material";
import Divider from "@mui/material/Divider";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function NotiModal({open, setOpen}) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack
                          direction="column"
                          divider={<Divider flexItem />}
                          spacing={1}
                    >
                        <Alert severity="success" fullWidth>success!</Alert>
                        <Alert severity="info">info</Alert>
                        <Alert severity="warning">warning</Alert>
                        <Alert severity="error">error</Alert>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
