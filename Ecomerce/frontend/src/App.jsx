import Header1 from "./components/header/Header1.jsx";
import Header2 from "./components/header/Header2.jsx";
import Header3 from "./components/header/Header3.jsx";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Hero from "./components/hero/Hero.jsx";
import Login from "./components/header/login.jsx";
import Main from "./components/main/Main.jsx";
import Footer from "./components/footer/Footer.jsx";
import ScrollToTop from "./components/scroll/ScrollToTop.jsx";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import  ProductPage  from "./pages/ProductPage.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Payment from "./pages/Payment.jsx";
import BankTransfer from "./pages/BankTransfer.jsx";
import CardPayment from "./pages/CardPayment.jsx";
import Success from "./pages/Success.jsx";
import Register from "./pages/Register.jsx";
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