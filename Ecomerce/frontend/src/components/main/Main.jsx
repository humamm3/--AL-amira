import{ Box, Container, Stack, Typography, useTheme,IconButton } from "@mui/material"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Dialog from '@mui/material/Dialog';
import { Close } from "@mui/icons-material";
import ProduvtDrtails from "./ProduvtDrtails";
import {  useGetproductByNameQuery } from "../../Redux/product";
function Main() {
      const [Alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    setmyDate(newAlignment)
  }
  };
     const theme= useTheme()
       const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const allProductsAPI = "products?populate=*"
  const namazkiyafetleriAPI = "products?populate=*&filters[category][$eq]=Namaz%20k%C4%B1yafetleri"
  const başörtüsüAPI = "products?populate=*&filters[category][$eq]=başörtüsü"
  
  const [myDate, setmyDate] = useState(allProductsAPI)
  const { data, error, isLoading } =  useGetproductByNameQuery(
    myDate)
  

  if (data) {
    return (
    <Container sx={{py: 9}}>
      <Stack direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexWrap={"wrap"}
      gap={3}
      >
        <Box>
            <Typography variant="h6">
                Selected Products
            </Typography>
            <Typography fontWeight={300} variant="body1">
                All our new arrivals in a exclusive selection
            </Typography>
        </Box>

        <ToggleButtonGroup
        color="error"
      value={myDate}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      sx={{ 
        ".Mui-selected":{
            border:"1px solid rgba(233, 69, 96, 0.5) !important", 
            color:"#e94560",
            backgroundColor:"initial",
        },
      }}
    >
      <ToggleButton sx={{color:theme.palette.text.primary }}
       ClassNames={"myButton"} value={allProductsAPI} aria-label="left aligned">
        All Products
      </ToggleButton>
      <ToggleButton sx={{mx:"16px !important", color:theme.palette.text.primary}} 
      ClassNames={"myButton"} value={başörtüsüAPI} aria-label="centered">
        Başörtüsü
      </ToggleButton>
      <ToggleButton sx={{color:theme.palette.text.primary }}
       ClassNames={"myButton"} value={namazkiyafetleriAPI} aria-label="right aligned">
        Namaz kiyafetleri
      </ToggleButton>
      
        </ToggleButtonGroup>
      </Stack>

      <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"space-between"} alignItems={"center"}>
         {data.data.map((item) => {
           return(
            <Card key={item} sx={{ maxWidth: 300, mt:6,}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="390px"
        image={`${item.produktImg[0].formats.small.url}`}
/>
      <CardContent>
      <Stack 
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}>
        <Typography gutterBottom variant="h6" component="div">
          {item.produktTitle}
        </Typography>
         <Typography variant="subtitle1" component="p">
          {item.produktPrice} <span>TL</span>
        </Typography>
      </Stack>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {item.produktDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClickOpen} sx={{textTransform:"capitalize"}} size="large">
             <AddShoppingCartIcon sx={{mr:1}} fontSize="small"/>Add Card
             </Button>
        
      </CardActions>
         </Card>
           )
         }
         )}
      </Stack>

              <Dialog
              sx={{".MuiPaper-root":{minWidth:{xs:"100%",md:800}}}}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       <IconButton sx={{ 
        ":hover":{color:"red", rotate:"180deg",transition:"0.3s" },
         position:"absolute",
         top: 0,
         right: 10}} 
         onClick={handleClose}>
             <Close/>
            </IconButton>

            <ProduvtDrtails/>

      </Dialog>

    </Container>
  )
  }

  if (isLoading) {
    return(
      <Typography variant="h6">
        LOADING.........
      </Typography>
    )
    
  }
   if (error) {
    return(
      <Typography variant="h6">
        {error.message}
      </Typography>
    )
    
  }
}

export default Main
