import { ExpandMore } from "@mui/icons-material";
import {
  Container,
  Typography,
  Stack,
  InputBase,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState, useRef, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../utils/cart";
import { useTranslation } from "react-i18next";
/* ================= STYLES ================= */

const Search = styled("div")(({ theme }) => ({
  flexGrow: 0.4,
  position: "relative",
  borderRadius: 22,
  border: "1px solid #777",
  display: "flex",
  "&:hover": {
    border: "1px solid #333",
  },
  width: "266px",
  [theme.breakpoints.up("sm")]: {
    width: "330px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "absolute",
  height: "100%",
  display: "flex",
  alignItems: "center",
  pointerEvents: "none",
  color: "#777",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

/* ================= COMPONENT ================= */

const Header2 = ({ setSearchText }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

 const options = [
  t("showMui"),
  t("allContent"),
  t("hideSensitive"),
  t("hideAll"),
];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const hasScrolled = useRef(false);

  /* ===== 🛒 تحديث عدد السلة مباشرة ===== */
  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const count = cart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setCartCount(count);
    };

    updateCartCount(); // أول تحميل

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  /* ===== 🔍 البحث ===== */
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.length > 0 && !hasScrolled.current) {
      const filters = document.getElementById("filters-section");
      filters?.scrollIntoView({ behavior: "smooth", block: "start" });
      hasScrolled.current = true;
    }

    if (value.length === 0) {
      hasScrolled.current = false;
    }
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1200,
        bgcolor: "background.paper",
      }}
    >
      <Container
        sx={{ my: 2, display: "flex", justifyContent: "space-between" }}
      >
        {/* ===== Search ===== */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>

          <StyledInputBase
  placeholder={t("search")}
  onChange={handleSearch}
/>

          <List
            component="nav"
            sx={{
              bgcolor: "myColor.main",
              borderTopRightRadius: 22,
              borderBottomRightRadius: 22,
              p: 0,
            }}
          >
            <ListItem onClick={(e) => setAnchorEl(e.currentTarget)}>
              <ListItemText
                sx={{ width: 80, textAlign: "center" }}
                secondary={options[selectedIndex]}
              />
              <ExpandMore sx={{ fontSize: 16 }} />
            </ListItem>
          </List>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
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
        </Search>

        {/* ===== Icons ===== */}
        <Stack direction="row" alignItems="center">
          {/* 🛒 Cart */}
          <IconButton onClick={() => navigate("/cart")}>
            <StyledBadge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>

          {/* 👤 User */}
          <IconButton onClick={() => navigate("/login")}>
            <Person2OutlinedIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header2;