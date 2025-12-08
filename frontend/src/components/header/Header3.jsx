import { Drawer, Container, Typography, Box, useTheme, IconButton, ListItemIcon, ListItemText, Stack} from "@mui/material"
import {useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from "@mui/icons-material/Menu";
import WindowIcon from "@mui/icons-material/Window";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Close, Info } from "@mui/icons-material";


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import useMediaQuery from '@mui/material/useMediaQuery';
import Links from './Links';
const Header3 = () =>{
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



   const theme = useTheme()
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor, open) =>
    (event) => {
      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' ||
          event.key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };


  
  return (
    <Container 
    sx={{display:"flex",
     alignItems:"center",
      justifyContent:"space-between",
      mt:"5"}}>




      <Box>
         <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{width: 222, bgcolor: theme.palette.myColor.main,
            color: theme.palette.text.secondary
          }}
        >
          <WindowIcon/>
        
          <Typography 
          sx={{
            padding:"0",
            textTransform: "capitalize",
            mx:1,
          }}
          >
        
          Categories
          </Typography>
          <Box flexGrow={1}/>
        
          <KeyboardArrowRightOutlinedIcon/>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
          sx={{".MuiList-root": {width: 220, background:theme.palette.myColor.main,} }}
        >
            <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <WhatsAppIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Whatsapp</ListItemText>
          
        </MenuItem>

          <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CallIcon fontSize="small" />
          </ListItemIcon>
          
          <ListItemText>Call</ListItemText>
          
        </MenuItem>

          <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FacebookIcon fontSize="small" />
          </ListItemIcon>
          
          <ListItemText>Facebook</ListItemText>
               
        </MenuItem>
          
        </Menu>
      </Box>



    {useMediaQuery('(min-width:1200px)') && (
      <Stack gap={4} alignItems={"center"} direction={"row"} >
        <Links title={"Home"}/>
        <Links title={"Maga Menu"}/>
        <Links title={"Full Screen Menu"}/>
        <Links title={"Pages"}/>
        <Links title={"User Accont"}/>
        <Links title={"Vendor Account"}/>
      </Stack>
      )}
      




      {useMediaQuery('(max-width:1200px)') && (<IconButton onClick={toggleDrawer("top", true)}>
       <MenuIcon/>
     </IconButton>)}
     

     <Drawer
            anchor={"top"}
            open={state["top"]}
            onClose={toggleDrawer("top", false)}
           sx={{".MuiPaper-root.css-k1yagv-MuiPaper-root-MuiDrawer-paper": {height:"100%"}}}
          >
           <Box  sx={{width: 444, mx: "auto", mt: 6, position:"relative", pt: 10}}>
            <IconButton sx={{ ":hover":{color:"red", rotate:"180deg",transition:"0.3s" }, position:"absolute", top: 0, right: 10}} onClick={toggleDrawer("top", false)}>
             <Close/>
            </IconButton>


            {[
              {mainlink:"Home",
                sublink:["link1","link2","link2"]},
              {mainlink:"Maga menu",
                sublink:["link1","link2","link2"]},
              {mainlink:"full screen menu",
                sublink:["link1","link2","link2"]},
              {mainlink:"pages",
                sublink:["link1","link2","link2"]},
              {mainlink:"User Accont",
                sublink:["link1","link2","link2"]},
              {mainlink:"vendor account",
                sublink:["link1","link2","link2"]},
            ].map((item) => {
              return(
                

             <Accordion key={item.mainlink} elevation={0} sx={{bgcolor: "initial"}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{item.mainlink} </Typography>
        </AccordionSummary>

        <List sx={{ my: 0, py: 0}}>
          {item.sublink.map((link) => {
            return(
              <ListItem key={link} sx={{py: 0,  my: 0}}>

                <ListItemButton>
                  <ListItemText primary={link} />
                </ListItemButton>
              </ListItem>
            ) 
          })}
        </List>
      </Accordion>
              )
            })}
         </Box>
          </Drawer>
    </Container>
  )
}

export default Header3
