import { Box, Button, Stack, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { addToCart } from "../../utils/cart"
import { useNavigate } from "react-router-dom";
const ProduvtDrtails = ({ clickedProduct }) => {
  const [selectedImg, setselectedImg] = useState(0);
   const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <img
          key={selectedImg}
          src={clickedProduct.produktImg[selectedImg].url}
          alt=""
          style={{
            width: "100%",
            maxWidth: "350px",
            maxHeight: "300px",
            objectFit: "contain",
            transition: "0.3s",
            transform: "scale(1.03)",
          }}
        />
      </Box>

     
      <Box
        sx={{
          paddingBottom: 2,
          width: "100%",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        
        <Stack direction="row" justifyContent="center" my={2}>
          <ToggleButtonGroup value={selectedImg} exclusive>
            {clickedProduct.produktImg.map((item, index) => {
              const isActive = selectedImg === index;

              return (
                <ToggleButton
                  key={item.id}
                  value={index}
                  onClick={() => setselectedImg(index)}
                  sx={{
                    width: { xs: 70, sm: 100 },
                    height: { xs: 80, sm: 120 },
                    mx: { xs: 0.5, sm: 1 },
                    p: 0,
                    
                    opacity: isActive ? 1 : 0.5,
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                    transition: "0.25s",
                    "&:hover": {
                      opacity: 1,
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <img
                    src={item.url}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: 4,
                    }}
                  />
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Stack>

       <Stack sx={{
        display:"flex",
        alignItems:"flex-start",
        paddingLeft:"18%"
       }}>
         {/* title */}
         <Typography sx={{ fontSize: { xs: 18, sm: 22 }, fontWeight: 600 }}>
           {clickedProduct.produktTitle}
         </Typography>
        
         {/* price */}
         <Typography
           my={0.5}
           sx={{ fontSize: { xs: 20, sm: 22 }, color: "crimson" }}
         >
           {clickedProduct.produktPrice} TL
         </Typography>
        
         {/* description */}
         <Typography variant="body1">
           {clickedProduct.produktDescription}
         </Typography>
        
         {/* button */}
         <Box
         variant="contained" 
         onClick={() => navigate("/Cart")}
          fullWidth
          
          sx={{
            mt: 2,
            textTransform: "capitalize",
               width: { xs: "56%", sm: "auto" },
               alignSelf:"flex-end",
               marginRight:"18%"
             }}>
                  <Button
             onClick={() => addToCart({
               id: clickedProduct.id,
               title: clickedProduct.produktTitle,
               price: clickedProduct.produktPrice,
               produktImg: clickedProduct.produktImg,
               img: clickedProduct.produktImg[0].url,
             })}variant="contained">
             <AddShoppingCartIcon sx={{ mr: 1 }} fontSize="small"  />
                Buy now
           </Button>
         </Box>
       </Stack >
      </Box>
    </Box>
  );
};

export default ProduvtDrtails;