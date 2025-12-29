import {
  Drawer,
  Container,
  Typography,
  Box,
  useTheme,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Close } from "@mui/icons-material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import useMediaQuery from "@mui/material/useMediaQuery";
import Links from "./Links";


const CONTACTS = {
  whatsapp: "https://wa.me/905347080488",
  call: "tel:+905347080488",
  facebook: "https://www.facebook.com/share/1BdW4nydkK/",
};


const Header3 = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const [state, setState] = useState({
    top: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: "5",
      }}
    >
      {/* ================== CATEGORIES BUTTON ================== */}
      <Box>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            width: 222,
            bgcolor: theme.palette.myColor.main,
            color: theme.palette.text.secondary
          }}
        >
          <EmailIcon />
          <Typography sx={{ mx: 1, textTransform: "capitalize" }}>
            Contact
          </Typography>
          <Box flexGrow={1} />
          <KeyboardArrowRightOutlinedIcon />
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            ".MuiList-root": {
              width: 220,
              background: theme.palette.myColor.main,
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <WhatsAppIcon fontSize="small" />
            </ListItemIcon>
            <a
              href={CONTACTS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none", width: "100%" }}
            >
              WhatsApp
            </a>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <CallIcon fontSize="small" />
            </ListItemIcon>
            <a
              href={CONTACTS.call}
              style={{ color: "inherit", textDecoration: "none", width: "100%" }}
            >
              Call
            </a>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <FacebookIcon fontSize="small" />
            </ListItemIcon>
            <a
              href={CONTACTS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none", width: "100%" }}
            >
              Facebook
            </a>
          </MenuItem>
        </Menu>
      </Box>

      {/* ================== LINKS DESKTOP ================== */}
      {useMediaQuery("(min-width:1200px)") && (
        <Stack gap={4} alignItems="center" direction="row">
          <Links title={"Home"} />
          <Links title={"Mega Menu"} />
          <Links title={"Full Screen Menu"} />
          <Links title={"Pages"} />
          <Links title={"User Account"} />
          <Links title={"Vendor Account"} />
        </Stack>
      )}

      {/* ================== MOBILE MENU ================== */}
      {useMediaQuery("(max-width:1200px)") && (
        <IconButton onClick={toggleDrawer("top", true)}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        anchor="top"
        open={state.top}
        onClose={toggleDrawer("top", false)}
        sx={{
          ".MuiDrawer-paper": { height: "100%" },
        }}
      >
        <Box sx={{ width: 444, mx: "auto", mt: 6, position: "relative", pt: 10 }}>
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              mr: 1,
              ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
            }}
            onClick={toggleDrawer("top", false)}
          >
            <Close />
          </IconButton>

          {[
            { mainlink: "Home", sublink: ["link1", "link2"] },
            { mainlink: "Mega menu", sublink: ["link1", "link2"] },
            { mainlink: "Pages", sublink: ["link1", "link2"] },
          ].map((item) => (
            <Accordion key={item.mainlink} elevation={0} sx={{ bgcolor: "initial" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{item.mainlink}</Typography>
              </AccordionSummary>

              <List>
                {item.sublink.map((link) => (
                  <ListItem key={link} sx={{ py: 0 }}>
                    <ListItemButton>
                      <ListItemText primary={link} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Accordion>
          ))}
        </Box>
      </Drawer>
    </Container>
  );
};

export default Header3;