import { Container, Stack, Box, Typography ,useTheme, useMediaQuery } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt"
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined"
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined"
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined"
import { useTranslation } from "react-i18next";




const IconsSection = () => {
  const theme= useTheme()
  const { t } = useTranslation();
  return (
    <Container sx={{mt:3 ,bgcolor: theme.palette.mode ==="dark"?"#000":"#fff" }}>
      <Stack sx={{flexWrap:"wrap"}} direction={"row"} alignItems={"center"}>
       <MyBox 
  icon={<ElectricBoltIcon fontSize="large" />} 
  title={t("icons.fastDelivery")} 
  subTitle={t("icons.startFrom")} 
/>

<MyBox 
  icon={<WorkspacePremiumOutlinedIcon fontSize="large" />} 
  title={t("icons.moneyGuarantee")} 
  subTitle={t("icons.daysBack")} 
/>

<MyBox 
  icon={<AccessAlarmOutlinedIcon fontSize="large" />} 
  title={t("icons.days365")} 
  subTitle={t("icons.freeReturn")} 
/>

<MyBox 
  icon={<CreditScoreOutlinedIcon fontSize="large" />}
  title={t("icons.payment")} 
  subTitle={t("icons.secureSystem")} 
/>
        
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


