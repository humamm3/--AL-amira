import {
  Drawer,
  Container,
  Typography,
  Box,
  useTheme,
  IconButton,
  Stack,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import CloseIcon from "@mui/icons-material/Close";

import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";

import useMediaQuery from "@mui/material/useMediaQuery";

const CONTACTS = {
  whatsapp: "https://wa.me/905347080488",
  call: "tel:+905347080488",
  facebook: "https://www.facebook.com/share/1BdW4nydkK/",
};

const Header3 = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  /* ===== Contact menu ===== */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  /* ===== Mobile drawer ===== */
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = [
    { label: "Home", icon: <HomeIcon />, action: "home" },
    { label: "Products", icon: <ShoppingBagIcon />, action: "products" },
    { label: "Cart", icon: <ShoppingCartIcon />, action: "cart" },
    { label: "Login", icon: <LoginIcon />, action: "login" },
  ];

  const handleNavigate = (action) => {
    if (action === "home") {
      navigate("/");
    }

    if (action === "products") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("filters-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }

    if (action === "cart") {
      navigate("/cart");
    }

    if (action === "login") {
      navigate("/login");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 1,
      }}
    >
      {/* ================== CONTACT BUTTON ================== */}
      <Box>
        <Button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            width: 200,
            bgcolor: theme.palette.myColor.main,
            color: theme.palette.text.secondary,
          }}
        >
          <EmailIcon />
          <Typography sx={{ mx: 1 }}>Contact</Typography>
          <Box flexGrow={1} />
          <KeyboardArrowRightOutlinedIcon />
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          sx={{
            ".MuiList-root": {
              width: 200,
              bgcolor: theme.palette.myColor.main,
            },
          }}
        >
          <MenuItem component="a" href={CONTACTS.whatsapp} target="_blank">
            <ListItemIcon>
              <WhatsAppIcon fontSize="small" />
            </ListItemIcon>
            WhatsApp
          </MenuItem>

          <MenuItem component="a" href={CONTACTS.call}>
            <ListItemIcon>
              <CallIcon fontSize="small" />
            </ListItemIcon>
            Call
          </MenuItem>

          <MenuItem component="a" href={CONTACTS.facebook} target="_blank">
            <ListItemIcon>
              <FacebookIcon fontSize="small" />
            </ListItemIcon>
            Facebook
          </MenuItem>
        </Menu>
      </Box>

      {/* ================== DESKTOP LINKS ================== */}
      {useMediaQuery("(min-width:1200px)") && (
        <Stack direction="row" spacing={4}>
          {links.map((link) => (
            <Button
              key={link.label}
              startIcon={link.icon}
              onClick={() => handleNavigate(link.action)}
              sx={{ color: "text.primary" }}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
      )}

      {/* ================== MOBILE MENU ================== */}
      {useMediaQuery("(max-width:1200px)") && (
        <IconButton onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ ".MuiDrawer-paper": { height: "100%" } }}
      >
        <Box sx={{ width: 300, mx: "auto", mt: 8, position: "relative" }}>
          <IconButton
            sx={{ position: "absolute", top: -50, right: 0 }}
            onClick={() => setDrawerOpen(false)}
          >
            <CloseIcon />
          </IconButton>

          <Stack spacing={3} mt={4}>
            {links.map((link) => (
              <Button
                key={link.label}
                startIcon={link.icon}
                fullWidth
                onClick={() => {
                  handleNavigate(link.action);
                  setDrawerOpen(false);
                }}
              >
                {link.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </Container>
  );
};

export default Header3;