import React, { useState, useEffect } from "react";
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
import { Client } from "@stomp/stompjs";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Notifications() {
    const [anchorNotiEl, setAnchorNotiEl] = useState(null);

    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const [readNotifications, setReadNotifications] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        fetchReadNotifications();
    }, []);

    useEffect(() => {
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

        stompClient.onConnect = (frame) => {
            stompClient.subscribe('http://localhost:9000/topic/notifications', (message) => {
                const notification = JSON.parse(message.body);
                setUnreadNotifications((prev) => [notification, ...prev]);
                alert(`New notification: ${notification.message}`);
            });
        };

        stompClient.activate();

        return () => {
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
            setUnreadNotifications((prev) => [...prev, ...data.content]);
            setHasMore(!data.last);
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

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box>
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleNotiClick}
                aria-describedby={"noti-popover"}
            >
                <Badge badgeContent={unreadNotifications ? unreadNotifications.totalElements : 0} color="error">
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
                <Box sx={{ width: 300, maxHeight: 500 }}>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Unread" />
                        <Tab label="Read" />
                    </Tabs>
                    <Box p={2}>
                        {tabIndex === 0 && (
                            <List>
                                {unreadNotifications.map((notification) => (
                                    <ListItem key={notification.id} button>
                                        <ListItemText primary={notification.message} />
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                edge="end"
                                                onChange={() => markAsRead(notification.id)}
                                                checked={false}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        {tabIndex === 1 && (
                            <List>
                                {readNotifications.map((notification) => (
                                    <ListItem key={notification.id}>
                                        <ListItemText primary={notification.message} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
}
