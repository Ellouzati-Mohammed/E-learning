import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from '@mui/icons-material/Logout';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import { Link, NavLink } from "react-router-dom";
import {
  AppBareStyle,
  FirstSec,
  Logo,
  LogoTitle,
  Navigation,
  SelectedButtonNavigation,
  ButtonNavigation,
  SecondSec,
  PersonalInfo,
  AvatarStyle,
  FullName,
  LogOutButton,
  LogOutIcon,
  BoxLogo
} from '../styles/NavBarStyle'
import { useAuth } from "../hooks/useAuth";


const Navbar = () => {

  const {Full_Name, email, role, token, loading ,logout } = useAuth();
  const [avatarUrl] = useState("https://via.placeholder.com/150");

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar sx={AppBareStyle}>
      <Toolbar>
        <Box sx={FirstSec}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={BoxLogo}>
              <DesktopWindowsOutlinedIcon sx={Logo} />
              <Typography variant="h6" sx={LogoTitle}>
                Digital-Culture
              </Typography>
            </Box>
          </Link>
          <Box sx={Navigation}>
            <NavLink to="/" style={{ textDecoration: 'none' }} activeClassName="active">
              <Button color="inherit" sx={SelectedButtonNavigation}>
                Domains
              </Button>
            </NavLink>
  
            
          </Box>
        </Box>

        <Box sx={SecondSec}>
          <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={PersonalInfo}>
              <Avatar
                src={avatarUrl}
                alt="User Avatar"
                sx={AvatarStyle}
                aria-label="user avatar"
              />
              <Typography variant="body1" sx={FullName}>
                {Full_Name}
              </Typography>
            </Box>
          </Link>
          
          {/* Log Out Button */}
          <Button 
            variant="outlined" 
            sx={LogOutButton} 
            onClick={handleLogout}
            aria-label="log out"
          >
            <LogoutIcon sx={LogOutIcon} />
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
