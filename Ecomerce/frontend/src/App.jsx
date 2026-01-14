import Header1 from "./components/header/Header1";
import Header2 from "./components/header/Header2";
import Header3 from "./components/header/Header3";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Hero from "./components/hero/Hero";
import Login from "./components/header/login";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ScrollToTop from "./components/scroll/ScrollToTop";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import  ProductPage  from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import BankTransfer from "./pages/BankTransfer";
import CardPayment from "./pages/CardPayment";
import Success from "./pages/Success";
import Register from "./pages/Register";
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* صفحة المنتج */}
            <Route
              path="/product/:id"
              element={<ProductPage />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/bank-transfer" element={<BankTransfer />} />
            <Route path="/card-payment" element={<CardPayment />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </Box>


        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;