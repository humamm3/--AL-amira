import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import {
  Box,
  IconButton,
  useTheme,
  Typography,
  Stack,
  Container,
  Link,
  Menu,
  MenuItem
} from "@mui/material";

import {
  DarkModeOutlined,
  LightModeOutlined,
  ExpandMore
} from "@mui/icons-material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { useTranslation } from "react-i18next";

const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/905347080488",
  facebook: "https://www.facebook.com/share/1BdW4nydkK/",
  instagram: "https://www.instagram.com/alamira_kasir"
};

const languages = [
  { label: "AR", code: "ar" },
  { label: "EN", code: "en" },
  { label: "TR", code: "tr" }
];

const Header1 = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [lang, setLang] = useState("AR");

  return (
    <Box sx={{ bgcolor: "#2B3445", py: 1 }}>
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography color="#D23F57" fontWeight="bold">
            ALAMIRA
          </Typography>

          <Box flexGrow={1} />

          {/* Dark / Light */}
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "light" ? (
              <LightModeOutlined sx={{ color: "#fff" }} />
            ) : (
              <DarkModeOutlined sx={{ color: "#fff" }} />
            )}
          </IconButton>

          {/* Language */}
          <Box onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ cursor: "pointer", color: "#fff" }}>
            {lang} <ExpandMore fontSize="small" />
          </Box>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            {languages.map((l) => (
              <MenuItem
                key={l.code}
                onClick={() => {
                  setLang(l.label);
                  i18n.changeLanguage(l.code);
                  setAnchorEl(null);
                }}
              >
                {l.label}
              </MenuItem>
            ))}
          </Menu>

          <Link href={SOCIAL_LINKS.facebook} target="_blank">
            <FacebookIcon sx={{ color: "#fff" }} />
          </Link>

          <Link href={SOCIAL_LINKS.whatsapp} target="_blank">
            <WhatsAppIcon sx={{ color: "#fff" }} />
          </Link>

          <Link href={SOCIAL_LINKS.instagram} target="_blank">
            <InstagramIcon sx={{ color: "#fff" }} />
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header1;