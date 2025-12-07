import { ExpandMore,KeyboardArrowRightOutlined } from '@mui/icons-material'
import { Box ,Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
 const Links = ({title}) => {
  return (
    <Box sx={{ ":hover .show-when-hover":{display:"block",}, ":hove":{cursor:"pointer",},position: "relative", display:"flex", alignItems:"center"}}>
      <Typography veriant="body1">
        {title}
      </Typography>

      <ExpandMore sx={{ fontSize:"16px", m1: 1}} />

     <Box className="show-when-hover"
      sx={{position:"absolute", top:"100%", minWidth:"170px",left:"50%", transform:"translateX(-50%)" ,display:"none", zIndex:2}}>
         <Paper sx={{mt: 2}}>
            <nav aria-label="secondary mailbox folders">
           <List>
             <ListItem disablePadding>
               <ListItemButton sx={{display:"flex", p:0,px:1.5,}}>
                 <ListItemText sx={{"& .MuiTypography-root": {fontSize:"15px", fontWeight:300}}} 
                 primary="Dashboard" />
                 <Box flexGrow={1} />
               </ListItemButton>
             </ListItem>

              <ListItem sx={{":hover .sub-link":{display:"block"},
               position:"relative"}}>
               <ListItemButton sx={{ display:"flex", p:0,}}>
                 <ListItemText sx={{"& .MuiTypography-root":
                  {fontSize:"15px", fontWeight: 300}}} 
                 primary="products" />
                 <Box flexGrow={1} />
                 <KeyboardArrowRightOutlined fontSize="small" />
               </ListItemButton>

                  <Box className="sub-link" sx={{display:"none", position:"absolute", top: 0,left:"100%"}}>
                    <Paper sx={{ml: 1, minWidth: 150}}>
                         <nav aria-label="secondary mailbox folders">
                            <List>
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemText primary="Trash" />
                                </ListItemButton>
                              </ListItem>
                              <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                  <ListItemText primary="Spam" />
                                </ListItemButton>
                              </ListItem>
                            </List>
                          </nav>
                    </Paper>
                  </Box>

             </ListItem>

              <ListItem disablePadding>
               <ListItemButton sx={{display:"flex", p:0,px:1.5,}}>
                 <ListItemText sx={{"& .MuiTypography-root": {fontSize:"15px", fontWeight:300}}} 
                 primary="orders" />
                 <Box flexGrow={1} />
               </ListItemButton>
             </ListItem>

              <ListItem disablePadding>
               <ListItemButton sx={{display:"flex", p:0,px:1.5,}}>
                 <ListItemText sx={{"& .MuiTypography-root": {fontSize:"15px", fontWeight:300}}} 
                 primary="Profile" />
                 <Box flexGrow={1} />
               </ListItemButton>
             </ListItem>
             
           </List>
         </nav>
         </Paper>
     </Box>
    </Box>
  )
}
export default Links;