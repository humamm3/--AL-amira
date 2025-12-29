import { ExpandMore, ShoppingCartOutlined } from "@mui/icons-material";
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
import { useState, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const Search = styled("div")(({ theme }) => ({
  flexGrow: 0.4,
  position: "relative",
  borderRadius: 22,
  border: "1px solid #777",
  display: "flex",
  "&:hover": {
    border: "1px solid #333",
  },
  width:"266px",
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`
  }
}))

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header2 = ({ setSearchText }) => {
  const options = [
    "Show MUI",
    "All content",
    "Hide sensitive notification content",
    "Hide all notification content",
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const hasScrolled = useRef(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.length > 0 && !hasScrolled.current) {
      const filters = document.getElementById("filters-section");
      filters?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      hasScrolled.current = true;
    }

    if (value.length === 0) {
      hasScrolled.current = false;
    }
  };

  return (
    // 🔴 البحث Sticky
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1200,
        bgcolor: "background.paper",
        
      }}
    >
      <Container sx={{ my: 2, display: "flex", justifyContent: "space-between", }}>
        

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>

          <StyledInputBase
            placeholder="Search…"
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

        <Stack direction="row" alignItems="center">
          <IconButton>
            <StyledBadge badgeContent={4} color="primary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>

          <IconButton>
            <Person2OutlinedIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header2;