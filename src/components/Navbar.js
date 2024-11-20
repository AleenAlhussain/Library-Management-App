import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Container,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Link } from "react-router-dom";
import logo from "../images/logo33.png";

const Navbar = ({ cartCount }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#C3EBF5" }}>
      <Container>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img
              src={logo}
              alt="Library Logo"
              style={{
                height: "80px",
                marginRight: "10px",
                [theme.breakpoints.down("sm")]: {
                  height: "60px",
                },
              }}
            />
          </Box>
          {!isMobile ? (
            <Box sx={{ display: "flex", gap: "20px", flexGrow: 2 }}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" component={Link} to="/about">
                About
              </Button>
            </Box>
          ) : (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenuClick}
                sx={{ flexGrow: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose} component={Link} to="/">
                  <HomeIcon sx={{ mr: 1 }} />
                  Home
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/profile"
                >
                  <PersonIcon sx={{ mr: 1 }} />
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/about"
                >
                  <InfoIcon sx={{ mr: 1 }} />
                  About
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/contact"
                >
                  <ContactMailIcon sx={{ mr: 1 }} />
                  Contact
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/pages"
                >
                  <Typography sx={{ mr: 1 }}>📄</Typography>{" "}
                  Pages
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/cart">
                  <Badge
                    badgeContent={cartCount}
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#FC6C6B",
                        color: "#223148",
                      },
                    }}
                  >
                    <ShoppingBagIcon />
                  </Badge>
                  Cart
                </MenuItem>
              </Menu>
            </>
          )}

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <IconButton color="inherit" component={Link}>
                <PersonIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} to="/cart">
                <Badge
                  badgeContent={cartCount}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#FC6C6B",
                      color: "#223148",
                    },
                  }}
                >
                  <ShoppingBagIcon />
                </Badge>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
