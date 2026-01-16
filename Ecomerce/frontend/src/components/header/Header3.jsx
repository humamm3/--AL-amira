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
import { useTranslation } from "react-i18next";

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

/* ================= CONTACT LINKS ================= */

const CONTACTS = {
  whatsapp: "https://wa.me/905347080488",
  call: "tel:+905347080488",
  facebook: "https://www.facebook.com/share/1BdW4nydkK/",
};

const Header3 = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  /* ===== Contact menu ===== */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  /* ===== Mobile drawer ===== */
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = [
    { label: t("nav.home"), icon: <HomeIcon />, action: "home" },
    { label: t("nav.products"), icon: <ShoppingBagIcon />, action: "products" },
    { label: t("nav.cart"), icon: <ShoppingCartIcon />, action: "cart" },
    { label: t("nav.login"), icon: <LoginIcon />, action: "login" },
  ];

  const handleNavigate = (action) => {
    if (action === "home") navigate("/");

    if (action === "products") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("filters-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }

    if (action === "cart") navigate("/cart");
    if (action === "login") navigate("/login");
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
      {/* ================= CONTACT BUTTON ================= */}
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
          <Typography sx={{ mx: 1 }}>{t("nav.contact")}</Typography>
          <Box flexGrow={1} />
          <KeyboardArrowRightOutlinedIcon />
        </Button>

        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
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
            {t("call")}
          </MenuItem>

          <MenuItem component="a" href={CONTACTS.facebook} target="_blank">
            <ListItemIcon>
              <FacebookIcon fontSize="small" />
            </ListItemIcon>
            Facebook
          </MenuItem>
        </Menu>
      </Box>

      {/* ================= DESKTOP LINKS ================= */}
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

      {/* ================= MOBILE MENU ================= */}
      {useMediaQuery("(max-width:1200px)") && (
        <IconButton onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}>

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