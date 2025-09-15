import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Divider,
  CircularProgress
} from "@mui/material";
import {
  Dashboard,
  Category,
  ExpandMore,
  ChevronRight,
  Settings,
  HelpOutline
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import  useDomaines  from "../hooks/useDomains.js";
import { 
  listItemStyle, 
  iconStyle, 
  primaryTextStyle, 
  nestedItemStyle, 
  SideBarContainer, 
  SideBarBoxTitle, 
  SideBarTitle, 
  IconSideStyle, 
  FetchIcon, 
  DomainList, 
  ListItemMap, 
  listItemTextStyle, 
  DividerStyle 
} from '../styles/SideBar.js';

const Sidebar = () => {
  const [openDomain, setOpenDomain] = useState(false);
  const { domaines, loading,fetchDomaines } = useDomaines();

  useEffect(() => {
    fetchDomaines();
  }, [fetchDomaines]);

  const handleDomainToggle = () => {
    setOpenDomain((prevState) => !prevState);
  };

  return (
    <Box sx={SideBarContainer}>
      <Box sx={SideBarBoxTitle}>
        <Typography variant="h6" sx={SideBarTitle}>
          Digital Culture for All
        </Typography>
      </Box>

      <List disablePadding>
        <Link to="/" style={{ textDecoration: "none" }}>
          <ListItem button sx={listItemStyle}>
            <ListItemIcon sx={IconSideStyle}>
              <Dashboard sx={iconStyle} />
            </ListItemIcon>
            <ListItemText 
              primary="Page des domaines" 
              primaryTypographyProps={primaryTextStyle} 
            />
          </ListItem>
        </Link>

        <ListItem 
          button 
          onClick={handleDomainToggle} 
          sx={listItemStyle}
          disabled={loading}
        >
          <ListItemIcon sx={IconSideStyle}>
            <Category sx={iconStyle} />
          </ListItemIcon>
          <ListItemText 
            primary="Liste des domaines" 
            primaryTypographyProps={primaryTextStyle} 
          />
          {loading ? (
            <CircularProgress size={20} sx={FetchIcon} />
          ) : openDomain ? (
            <ExpandMore sx={FetchIcon} />
          ) : (
            <ChevronRight sx={FetchIcon} />
          )}
        </ListItem>

        <Collapse in={openDomain} timeout="auto" unmountOnExit>
          <List disablePadding sx={DomainList}>
            {domaines.map((domainItem) => (
              <ListItem
                key={domainItem.id}
                button
                sx={ListItemMap}
                component={Link}
                to={`/DomainsCours/${domainItem.id}`}
              >
                <ListItemText
                  primary={domainItem.domain_title}
                  sx={listItemTextStyle}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      <Divider sx={DividerStyle} />

      <List disablePadding>
        <ListItem button sx={listItemStyle}>
          <ListItemIcon sx={IconSideStyle}>
            <Settings sx={iconStyle} />
          </ListItemIcon>
          <ListItemText 
            primary="Paramètres" 
            primaryTypographyProps={primaryTextStyle} 
          />
        </ListItem>

        <ListItem button sx={listItemStyle}>
          <ListItemIcon sx={IconSideStyle}>
            <HelpOutline sx={iconStyle} />
          </ListItemIcon>
          <ListItemText 
            primary="Aide" 
            primaryTypographyProps={primaryTextStyle} 
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;