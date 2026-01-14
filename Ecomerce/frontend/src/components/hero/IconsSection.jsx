import { Container, Stack, Box, Typography ,useTheme, useMediaQuery } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt"
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined"
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined"
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined"





const IconsSection = () => {
  const theme= useTheme()
  return (
    <Container sx={{mt:3 ,bgcolor: theme.palette.mode ==="dark"?"#000":"#fff" }}>
      <Stack sx={{flexWrap:"wrap"}} direction={"row"} alignItems={"center"}>
        <MyBox 
        icon={<ElectricBoltIcon  fontSize="large"/>} 
        title={"Fast Delivery"} 
        subTitle={"Start from $10"}/>

        <MyBox 
        icon={<WorkspacePremiumOutlinedIcon fontSize="large"/>} 
        title={"Money Guarantee"} 
        subTitle={"7 Days Back"} />

        <MyBox 
        icon={<AccessAlarmOutlinedIcon fontSize="large"/>} 
        title={"365 Days"} 
        subTitle={"For free retum" }/>

        <MyBox 
        icon={<CreditScoreOutlinedIcon fontSize="large"/>}
        title={"payment"} 
        subTitle={"Secure system"} />
        
      </Stack>
    </Container>
  )
}
export default IconsSection;



const MyBox = ({icon, title, subTitle}) => {
  const theme = useTheme();
  return (
    <Box sx={{width:"250px",display:"flex", flexGrow:1, alignItems:"center", gap: 3,py:1.6, justifyContent: useMediaQuery("(min-width:600px)")? "center" : "left"}}>
      {icon}
      <Box>
        <Typography variant="body1">{title}</Typography>

        <Typography 
        sx={{fontWeight: 300, color: theme.palette.text.secondary}}
               variant="body1" >
                  {subTitle} 
               </Typography>
      </Box>
    </Box>
  )
}


