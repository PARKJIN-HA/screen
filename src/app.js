import * as React from 'react';
import {useState} from "react";
import {styled, useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Outlet} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import ProfileDialog from "@component/ProfileDialog";
import './public/css/App.css';
import {Avatar, Popover} from "@mui/material";


const drawerWidth = 240;

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function App() {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorNotiEl, setAnchorNotiEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const location = useLocation();

    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleNotiClick = (event) => {
        setAnchorNotiEl(event.currentTarget);
    };

    const handleNotiClose = () => {
        setAnchorNotiEl(null);
    };

    const openNoti = Boolean(anchorNotiEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = (path) => {
        setHamburgerOpen(false); // Drawer를 닫습니다
        setAnchorEl(null);
        navigate(path);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleHamburgerOpen = () => {
        setHamburgerOpen(!hamburgerOpen);
    };

    const handleHamburgerClose = () => {
        setHamburgerOpen(false);
    };

    const getTitle = (path) => {
        switch (path) {
            case '/':
                return 'Home';
            case '/calendar':
                return 'Calendar';
            case '/todo':
                return 'Todo';
            case '/gantt':
                return 'Gantt Chart';
            default:
                return 'MUI'; // 기본값, 혹은 다른 경로를 추가할 수 있습니다.
        }
    };

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleHamburgerOpen}
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >
                        <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                            {getTitle(location.pathname)}
                        </Link>
                    </Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={handleNotiClick}
                            aria-describedby={"noti-popover"}
                        >
                            <Badge badgeContent={17} color="error">
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
                            The content of the Popover.
                        </Popover>
                        <ProfileDialog/>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={hamburgerOpen}
            >
                <Box style={{display: 'flex', flexDirection: 'column', justifyContent: "space-between", height: "100%"}}>
                    <Box>
                        <DrawerHeader>
                            <IconButton onClick={handleHamburgerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                            </IconButton>
                        </DrawerHeader>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => handleMenuClose('/')}>
                                    <ListItemText primary="Home"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => handleMenuClose('/calendar')}>
                                    <ListItemText primary="Calendar"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => handleMenuClose('/gantt')}>
                                    <ListItemText primary="Gantt"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => handleMenuClose('/todo')}>
                                    <ListItemText primary="Todo"/>
                                </ListItemButton>
                            </ListItem>
                            {/* 추가적인 메뉴 항목을 여기에 삽입할 수 있습니다 */}
                        </List>
                    </Box>
                    <Box>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar/>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
            <Outlet/>
        </Box>
    );
}
