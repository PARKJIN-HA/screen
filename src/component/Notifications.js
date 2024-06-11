import React, {useState, useEffect} from "react";
import {
    Button,
    Popover,
    Typography,
    Tabs,
    Tab,
    Box,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from "@mui/material/ListItemButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

export default function Notifications() {
    const [anchorNotiEl, setAnchorNotiEl] = useState(null);

    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const [readNotifications, setReadNotifications] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [openJoin, setOpenJoin] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchReadNotifications();
        fetchUnreadNotifications(page);
    }, [page]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:9000/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        let subscription;

        stompClient.onConnect = (frame) => {
            subscription = stompClient.subscribe('http://localhost:9000/topic/notifications', (message) => {
                const notification = JSON.parse(message.body);
                setUnreadNotifications((prev) => [notification, ...prev]);
                alert(`New notification: ${notification.message}`);
            });
        };

        stompClient.activate();

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
            stompClient.deactivate();
        };
    }, []);

    const openNoti = Boolean(anchorNotiEl);

    const handleNotiClick = (event) => {
        setAnchorNotiEl(event.currentTarget);
    };

    const handleNotiClose = () => {
        setAnchorNotiEl(null);
    };

    const handleJoinClose = () => {
        setOpenJoin(false);
    }

    const handleJoinAgree = () => {
        try {
            console.log(selectedEvent.userGroup.id)
            fetch(`http://localhost:9000/api/groups/${selectedEvent.userGroup.id}/accept-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            setOpenJoin(false);
        } catch (error) {
            console.error('Error joining event', error);
        }
    }

    const fetchReadNotifications = async () => {
        try {
            const response = await fetch('http://localhost:9000/api/notifications/read', {credentials: 'include'});
            if (!response.ok) throw new Error('Failed to fetch read notifications');
            const data = await response.json();
            setReadNotifications(data);
        } catch (error) {
            console.error('Error fetching read notifications', error);
        }
    };

    const fetchUnreadNotifications = async (page) => {
        try {
            const response = await fetch(`http://localhost:9000/api/notifications/unread?page=${page}&size=10`, {credentials: 'include'});
            if (!response.ok) throw new Error('Failed to fetch unread notifications');
            const data = await response.json();
            setHasMore(!data.last);
            if (!hasMore) {
                setUnreadNotifications((prev) => [...prev, ...data.content]);
            } else {
                setUnreadNotifications(data.content);
            }
        } catch (error) {
            console.error('Error fetching unread notifications', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            await fetch(`http://localhost:9000/api/notifications/mark-as-read/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            setUnreadNotifications((prev) => prev.filter((notification) => notification.id !== id));
            await fetchReadNotifications();
        } catch (error) {
            console.error('Error marking notification as read', error);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) {
            return;
        }
        setPage((prev) => prev + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleNotificationClick = (event) => {
        if (event.type === 0 ) {
            setSelectedEvent(event);
            setOpenJoin(true);
        }
        console.log(event)
    }

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <>
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleNotiClick}
                aria-describedby={"noti-popover"}
            >
                <Badge badgeContent={unreadNotifications ? unreadNotifications.length : 0} color="error">
                    <NotificationsIcon/>
                </Badge>
            </IconButton>
            <Popover
                id={"noti-popover"}
                open={openNoti}
                anchorEl={anchorNotiEl}
                onClose={handleNotiClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{width: 300, maxHeight: 500}}>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Unread"/>
                        <Tab label="Read"/>
                    </Tabs>
                    <Box p={2}>
                        {tabIndex === 0 && (
                            <List>
                                {unreadNotifications.map((notification, index) => (
                                    <ListItemButton key={index} onClick={() => handleNotificationClick(notification)}>
                                        <ListItemText primary={notification.message}/>
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                edge="end"
                                                onChange={() => markAsRead(notification.id)}
                                                checked={false}/>
                                        </ListItemSecondaryAction>
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                        {tabIndex === 1 && (
                            <List>
                                {readNotifications.map((notification) => (
                                    <ListItem key={notification.id}>
                                        <ListItemText primary={notification.message}/>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        <Dialog
                            open={openJoin}
                            onClose={handleJoinClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Join Request Arrived"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {selectedEvent? selectedEvent.message : ""}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleJoinClose}>Disagree</Button>
                                <Button onClick={handleJoinAgree} autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Box>
            </Popover>
        </>
    );
}
