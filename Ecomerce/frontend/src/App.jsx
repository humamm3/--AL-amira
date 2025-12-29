import Header1 from "./components/header/Header1";
import Header2 from "./components/header/Header2";
import Header3 from "./components/header/Header3";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Hero from "./components/hero/Hero";
import Main from "./components/main/Main";
import Footer from "./components/footer/footer";
import ScrollToTop from "./components/scroll/ScrollToTop";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import  ProductPage  from "./pages/ProductPage";

function App() {
  const [theme, colorMode] = useMode()
  const [searchText, setSearchText] = useState("");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Header1 />
        <Header2 setSearchText={setSearchText} />
        <Header3 />

        <Box bgcolor={theme.palette.bg.main} sx={{ minHeight: "100vh" }}>
          <Routes>
            {/* الصفحة الرئيسية */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Main searchText={searchText} />
                </>
              }
            />

            {/* صفحة المنتج */}
            <Route
              path="/product/:id"
              element={<ProductPage />}
            />
          </Routes>
        </Box>

        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;