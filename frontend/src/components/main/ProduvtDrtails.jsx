import { Box, Button, Stack, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProduvtDrtails = () => {
  return (
    <Box sx={{ 
        display:"flex",
        alignItems:"center", 
        gap:2.5,
        flexDirection:{xs:"column ", sm:"row"}
        }}>
      <Box sx={{display:"flex"}} >
        <img width={200}  src="src\imgs\003.jpg" alt="" />
      </Box>
      <Box sx={{textAlign:{xs:"center", sm:"left"}}}>
        <Typography variant="h5"> WOMENS FASHION</Typography>
        <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h5">
            $12.99
        </Typography>
        <Typography variant="body1">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>

        <Stack sx={{justifyContent:{xs:"center", sm:"left"}}} direction={"row"} gap={1} my={2}>
            {["src/imgs/0004.jpg", "src/imgs/0005.jpg" ].map((item) => {
              return(
                <img style={{borderRadius: 3}} width={90} height={"50%"} key={item} src={item} alt="" />
              )
            }
            )}

        </Stack>


        
        <Button sx={{mb:{xs: 1, sm: 0}, textTransform:"capitalize"}} variant="contained" >
             <AddShoppingCartIcon sx={{mr:1}} fontSize="small"/>Buy now
             </Button>
        
      


      </Box>
    </Box>
  )
}

export default ProduvtDrtails
