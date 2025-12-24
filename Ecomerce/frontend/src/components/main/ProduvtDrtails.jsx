import { Box, Button, Stack, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ProduvtDrtails = ({clickedProduct}) => {
 const [selectedImg, setselectedImg] = useState(0);
  return (
    <Box sx={{ 
        display:"flex",
        alignItems:"center", 
        gap:2.5,
        flexDirection:{xs:"column ", sm:"row"}
        }}>
      <Box sx={{display:"flex"}} >
        <img width={320} style={{maxHeight: 500, objectFit:"contain"}} src={clickedProduct.produktImg[selectedImg].url} alt="" />
      </Box>
      <Box sx={{ py: 2, textAlign:{xs:"center", sm:"left"}}}>
        <Typography variant="h5"> {clickedProduct.produktTitle}</Typography>
        <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h5">
            {clickedProduct.produktPrice}TL
        </Typography>
        <Typography variant="body1">
          {clickedProduct.produktDescription}
        </Typography>

        <Stack sx={{justifyContent:{xs:"center", sm:"left"}}} direction={"row"} gap={1} my={2}>
          
           <ToggleButtonGroup
      value={selectedImg}
      exclusive
      
       sx={{
            ".Mui-selected": {
              border: "1px solid royalblie !important",
              borderRadius: "5px !important",
              opacity:"1",
              backgroundColor: "initial",
            },
          }}
      >
          
            {clickedProduct.produktImg.map((item, index) => {
              return(

                <ToggleButton key={item.id}  value={index} 
                sx={{
                  width:"140px",
                  height: "180px",
                  mx: 1,
                  p: "0",
                  opacity:"0.5",
                }}>
        
                  <img 
                  onClick={() => {
                    setselectedImg(index);
                  }}
                  style={{borderRadius: 3, objectFit:"contain"}} 
                  width={"100%"} 
                  height={"100%"} 
                  
                  src={item.url} 
                  alt="" />
                </ToggleButton>
              )
            }
            )}

        </ToggleButtonGroup>




        </Stack>


        
        <Button sx={{mb:{xs: 1, sm: 0}, textTransform:"capitalize"}} variant="contained" >
             <AddShoppingCartIcon sx={{mr:1}} fontSize="small"/>Buy now
             </Button>
        
      


      </Box>
    </Box>
  )
}

export default ProduvtDrtails
