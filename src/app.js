import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Outlet } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ProfileDialog from "@component/ProfileDialog";
import {useEffect} from "react";
import NotiModal from "@component/NotiModal";



const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PrimarySearchAppBar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [hambugerOpen, setHambugerOpen] = React.useState(false);
  const location = useLocation(); // 현재 위치 정보를 가져옵니다.
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    event?.preventDefault();
    setOpenProfile(true);
  };

  const handleProfileMenuClose = (event) => {
    event?.preventDefault();
    setOpenProfile(false);
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (path) => {
    setHambugerOpen(false); // Drawer를 닫습니다
    setAnchorEl(null);
    navigate(path);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleHambugerOpen = () => {
    setHambugerOpen(!hambugerOpen);
  };

  const handleHambugerClose = () => {
    setHambugerOpen(false);
  };

  const getTitle = (path) => {
    switch(path) {
      case '/':
        return 'Home';
      case '/calendar':
        return 'Calendar';
        case '/todo':
          return 'Todo';
      default:
        return 'MUI'; // 기본값, 혹은 다른 경로를 추가할 수 있습니다.
    }
  };

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleHambugerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
           <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            {getTitle(location.pathname)} 
           </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => setOpenModal(true)}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <ProfileDialog openProfile={openProfile} setOpenProfile={setOpenProfile} />
            <NotiModal open={openModal} setOpen={setOpenModal}/>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
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
      open={hambugerOpen}
    >
      <DrawerHeader>
        <IconButton onClick={handleHambugerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClose('/')}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClose('/calendar')}>
            <ListItemText primary="Calendar" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClose('/gantt')}>
            <ListItemText primary="Gantt" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClose('/todo')}>
            <ListItemText primary="Todo" />
          </ListItemButton>
        </ListItem>
      {/* 추가적인 메뉴 항목을 여기에 삽입할 수 있습니다 */}
      </List>

    </Drawer>
      <Outlet />
    </Box>
  );
}
