import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import {
  getCart,
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} from "../utils/cart";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const refreshCart = () => setCartItems(getCart());

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Container sx={{ py: 4 }}>
      {/* ===== HEADER ===== */}
      <Typography
        variant="h5"
        mb={3}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {t("cart.title")}
        <Button onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon />
        </Button>
      </Typography>

      {/* ===== EMPTY CART ===== */}
      {cartItems.length === 0 ? (
        <Typography>{t("cart.empty")}</Typography>
      ) : (
        <Box px={0}>
          {cartItems.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              alignItems="center"
              spacing={0.6}
              sx={{
                mb: 2,
                py: 2,
                px: 1,
                border: "1px solid #eee",
                borderRadius: 4,
              }}
            >
              {/* IMAGE */}
              <Box
                component="img"
                src={item.img}
                sx={{ width: 80, height: 80, objectFit: "contain" }}
              />

              {/* TITLE + PRICE + QTY */}
              <Box sx={{ flexGrow: 1, px: 0 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography fontWeight={600}>
                    {item.title}
                  </Typography>
                  <Typography color="crimson">
                    {item.price}TL
                  </Typography>
                </Stack>

                {/* QUANTITY CONTROL */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    size="small"
                    disabled={item.quantity === 1}
                    onClick={() => {
                      decreaseQty(item.id);
                      refreshCart();
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography
                    key={item.quantity}
                    sx={{
                      minWidth: 20,
                      textAlign: "center",
                      animation: "qtyPop 0.18s ease",
                    }}
                  >
                    {item.quantity}
                  </Typography>

                  <IconButton
                    size="small"
                    onClick={() => {
                      increaseQty(item.id);
                      refreshCart();
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* DELETE */}
              <IconButton
                color="error"
                sx={{ mr: 1 }}
                onClick={() => {
                  removeFromCart(item.id);
                  refreshCart();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}

          {/* TOTAL */}
          <Typography mt={2} fontWeight={600}>
            {("Total")} : {totalPrice} TL 
          </Typography>

          {/* ACTIONS */}
          <Stack direction="row" spacing={2} mt={3}>
            <Button
              variant="contained"
              onClick={() => navigate("/checkout")}
            >
              {t("cart.checkout")}
            </Button>
            <Button
              color="error"
              onClick={() => {
                clearCart();
                setCartItems([]);
              }}
            >
              {t("cart.clear")}
            </Button>
          </Stack>
        </Box>
      )}

      {/* ANIMATION */}
      <style>
        {`
          @keyframes qtyPop {
            0% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Container>
  );
};

export default Cart;