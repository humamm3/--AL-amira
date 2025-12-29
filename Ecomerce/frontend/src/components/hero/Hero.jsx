import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import IconsSection from "../hero/IconsSection";
import 'swiper/css';
import 'swiper/css/pagination';
import "./style.css"

const Hero = () => {
  return (
    <Container >
   
     <Box sx={{pt:2,mt: 2.5, display:"flex", alignItems:"center", gap:2,}}>
       <Swiper 
       loop={true}
         pagination={{
           dynamicBullets: true,
         }}
         modules={[Pagination]}
         className="mySwiper"
       >
         
         <SwiperSlide>
             <img style={{ width: "100%",height: "24em"}} src="./imgs/15.jpg" alt="" />
             <Box sx={{position:"absolute",left:"10%" , textAlign:"left", backgroundColor:"#a39b9b81", top:"3em"}}>
             <Typography sx={{color:"#222"}}
             variant="h6">
                 LTFESTYLE COLLECTTION
             </Typography>
             <Typography sx={{color:"#222",fontWeight:400, my:1}}
             variant="h4">
                 WOMAN
             </Typography>
      
            <Stack 
            direction={"row"}
            alignItems={"center"} >
              <Typography mr={1} color={"#333"}
              variant="h5">
                  SLE UP TO 
              </Typography>
              <Typography color={"#D23F57"}
              variant="h5">
                  30% OFF
              </Typography>
            </Stack>
            <Typography sx={{color:"#000",fontWeight:300, my:1}}
              variant="body1">
                  Get Free Shipping on orders over 
              </Typography>
      
              <Button sx={{
                 px:5,
                 py:1,
                 mt:2,
                 backgroundColor:"#222",
                 boxShadow:" 0px 4px 16px rgba(43, 52, 69, 0.1)",
                 color:"#fff",
                 borderRadius:"1px",
                 "&:hover":{
                     bgcolor:"#151515",
                     boxShadow:"0px 4px 16px rgba(43, 52, 69, 0.1)"
                 }
              }}
              variant="containedd">
                 shop now <ArrowForwardIcon sx={{fontSize:"120%", ml:2}}/>
              </Button>
         </Box>
         </SwiperSlide> 
         <SwiperSlide>
             <img style={{ width: "100%",height: "24em"}} src=".//imgs/00.jpg" alt="" />
            
         </SwiperSlide>
       </Swiper>
      
       <Box sx={{display: {xs: "none", md:"block"}}}>
         <Box sx={{position:"relative"}}>
           <img src="./imgs/12.jpg" alt="" style={{width:"15em", height:"13.2em" , objectFit:"contain"}}/>
         </Box>
      
         <Box sx={{position:"relative"}}>
            <img src="./imgs/logo.jpg" alt="" style={{width:"12.2em", height:"13.2em", marginLeft:"22px"}}/>
         </Box>
       </Box>
     </Box>



      <IconsSection />
    </Container>
  );
}

export default Hero;