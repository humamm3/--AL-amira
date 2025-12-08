import   { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import { Box, IconButton, useTheme, Typography, Stack, Container } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ExpandMore from  '@mui/icons-material/ExpandMore';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


const options = [
  'AR',
  'EN',
  
];








const Header1 = () => {
   const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
   const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{
      bgcolor:"#2B3445",
      py:"4px",
      borderBottomLeftRadius:4,
      borderBottomRightRadius:4,
    }}>

 <Container>
  <Stack direction={"row"} alignItems={"center"}>
       <Typography 
       sx={{
         mr: 2,
         p: "3px 10px",
         bgcolor: "#D23F57",
         borderRadius: "12px",
         fontSize: "10x",
         fontWeight: "bold",
         color: "#fff",
  
       }}variant="body2">
         HOT
         
         
       </Typography>
       <Typography sx={{
         fontSize: "12px",
         fontWeight: "300",
         color: "#fff",
       }}variant= "body2">
       Free Express Shipping
       </Typography>
  <Box flexGrow={1}/>

  
        <div>
       {theme.palette.mode === "light" ? (
         <IconButton
           onClick={() => {
             localStorage.setItem(
               "mode",
               theme.palette.mode === "dark" ? "light" : "dark"
             );
             colorMode.toggleColorMode();
           }}
           color="inherit"
         >
           <LightModeOutlined sx={{fontSize:"18px", color:"#fff"}} />
         </IconButton>
       ) : (
         <IconButton
           onClick={() => {
             localStorage.setItem(
               "mode",
               theme.palette.mode === "dark" ? "light" : "dark"
             );
             colorMode.toggleColorMode();
           }}
           color="inherit"
         >
           <DarkModeOutlined sx={{fontSize:"18px"}}/>
         </IconButton>
       )}
        </div>



          <List
        component="nav"
        aria-label="Device settings"
        sx={{p: 0, m: 0 }}
      >
        <ListItem
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
          
        >
          <ListItemText
            sx={{".MuiTypography-root":{fontSize:"13px", color:"#fff" } }}
            secondary={options[selectedIndex]}
          />
          <ExpandMore sx={{fontSize:"18px", color:"#fff"}} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
          sx={{fontSize: "13px", p:"4px 12px", minHeight:"10px"}}
            key={option}
            
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>


                
        <FacebookIcon
        sx={{
          fontSize:"16",
          mx:1,
          color:"#fff",
        }}/>

        <WhatsAppIcon
        sx={{
          fontSize:"16",
          color:"#fff",
          mx:1,
        }}/>

        <InstagramIcon
        sx={{
          fontSize:"16",
          color:"#fff",
          mx:1,
        }}/>
 </Stack>
 </Container>
    </Box>
  );
};

export default Header1
