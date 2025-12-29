import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import {
  Box,
  IconButton,
  useTheme,
  Typography,
  Stack,
  Container,
  Link
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined
} from "@mui/icons-material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ExpandMore from "@mui/icons-material/ExpandMore";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";


const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/905347080488", 
  facebook: "https://www.facebook.com/share/1BdW4nydkK/",
  instagram: "https://www.instagram.com/alamira_kasir?igsh=MXR2d3Q2aWszbnNn",
};

const options = ["AR", "EN"];

const Header1 = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const open = Boolean(anchorEl);

  return (
   <Box sx={{ bgcolor: "#2B3445", py: "4px" }}>
    <Container maxWidth={false} disableGutters>
      <Stack direction="row" alignItems="center" sx={{ px: 2, width:"100%",overflow:"hidden"}}>
          <Typography
            sx={{
                mr: 2,
              p: "4px 10px",
              display:{xs:{bgcolor:"#dbd6b0c3"},},
              borderRadius: "16px",
              fontSize: "12px",
              fontWeight: "bold",
              
            }}
          >
            <img src="../../../public/imgs/alamira.png" alt="" width={68}/>
          </Typography>

          <Typography sx={{ display:{xs: "none", sm:"block"},fontSize: "18px", color: "#D23F57" }}>
            ALAMIRA
          </Typography>

          <Box flexGrow={1} />

          {/* Dark / Light */}
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "light" ? (
              <LightModeOutlined sx={{ fontSize: 18, color: "#fff" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: 18, color: "#fff" }} />
            )}
          </IconButton>

          {/* Language */}
          <List sx={{ p: 0 }}>
            <ListItem onClick={(e) => setAnchorEl(e.currentTarget)}>
              <ListItemText
                secondary={options[selectedIndex]}
                sx={{ ".MuiTypography-root": { color: "#fff" } }}
              />
              <ExpandMore sx={{ color: "#fff" }} />
            </ListItem>
          </List>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={() => {
                  setSelectedIndex(index);
                  setAnchorEl(null);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>

          {/* Social Icons */}
          <Link href={SOCIAL_LINKS.facebook} target="_blank">
            <FacebookIcon sx={{ mx: 1, color: "#fff", fontSize:"16" }} />
          </Link>

          <Link href={SOCIAL_LINKS.whatsapp} target="_blank">
            <WhatsAppIcon sx={{ mx: 1, color: "#fff", fontSize:"16" }} />
          </Link>

          <Link href={SOCIAL_LINKS.instagram} target="_blank">
            <InstagramIcon sx={{ mx: 1, color: "#fff", fontSize:"16" }} />
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header1;