import Header1 from "./components/header/Header1"
import Header2 from "./components/header/Header2"
import Header3 from "./components/header/Header3"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Hero from "./components/hero/Hero";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import ScrollToTop from "./components/scroll/ScrollToTop"
import { Box } from "@mui/material"
function App() {
 
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>

      <ThemeProvider theme={theme}>
        <CssBaseline />

    <Header1/>
    <Header2/>
    <Header3/> 


     
      <Box bgcolor={theme.palette.bg.main}>
        <Hero/>
        <Main/>
      </Box>
      <Footer/>

      <ScrollToTop/>

    </ThemeProvider>
    </ColorModeContext.Provider>
     
   
  )
}


export default App

