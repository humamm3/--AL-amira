import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { getCart, clearCart } from "../utils/cart";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Success = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // نخزن الطلب محلياً قبل مسح السلة
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cart = getCart();

    setOrderItems(cart);

    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);

    // نفرغ السلة بعد ما نخزن البيانات
    clearCart();
  }, []);

  return (
    <Container sx={{ py: 6, maxWidth: "sm" }}>
      <Stack spacing={3} alignItems="center" textAlign="center">
        {/* أيقونة النجاح */}
        <CheckCircleOutlineIcon
          sx={{ fontSize: 90, color: "success.main" }}
        />

        <Typography variant="h5" fontWeight={600}>
          {t("success.title")}
        </Typography>

        <Typography color="text.secondary">
          {t("success.subtitle")}
        </Typography>

        <Divider sx={{ width: "100%", my: 2 }} />

        {/* ملخص الطلب */}
        <Box width="100%" textAlign="left">
          <Typography fontWeight={600} mb={1}>
            {t("success.summary")}
          </Typography>

          {orderItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography>
                {item.quantity} × {item.title}
              </Typography>
              <Typography fontWeight={500}>
                {item.price * item.quantity} TL
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 1 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography fontWeight={600}>
              {t("success.total")}
            </Typography>
            <Typography fontWeight={600} color="crimson">
              {totalPrice} TL
            </Typography>
          </Box>
        </Box>

        {/* زر */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.2 }}
          onClick={() => navigate("/")}
        >
          {t("success.ok")}
        </Button>
      </Stack>
    </Container>
  );
};

export default Success;