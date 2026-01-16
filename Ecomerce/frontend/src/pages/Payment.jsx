import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCart } from "../utils/cart";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Payment = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const cart = getCart();

  const [paymentMethod, setPaymentMethod] = useState("bank");

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Container sx={{ py: 3, maxWidth: "sm" }}>
      {/* ===== HEADER ===== */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h6">
          {t("payment.title")}
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </Box>

      {/* ===== ORDER SUMMARY ===== */}
      <Typography fontWeight={600} mb={1}>
        {t("payment.orderSummary")}
      </Typography>

      <Stack spacing={1}>
        {cart.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
            }}
          >
            <Typography>
              {item.quantity} × {item.title}
            </Typography>
            <Typography>
              {item.price * item.quantity} {t("payment.currency")}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 700,
        }}
      >
        <Typography>{t("payment.total")}</Typography>
        <Typography color="error.main">
          {totalPrice} {t("payment.currency")}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* ===== PAYMENT METHOD ===== */}
      <Typography fontWeight={600} mb={1}>
        {t("payment.method")}
      </Typography>

      <RadioGroup
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <FormControlLabel
          value="bank"
          control={<Radio />}
          label={t("payment.bank")}
        />
        <FormControlLabel
          value="card"
          control={<Radio />}
          label={t("payment.card")}
        />
      </RadioGroup>

      <Typography variant="body2" color="text.secondary" mt={1}>
        {t("payment.note")}
      </Typography>

      {/* ===== CONFIRM BUTTON ===== */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 4, py: 1.3 }}
        onClick={() => {
          if (paymentMethod === "bank") {
            navigate("/bank-transfer");
          } else {
            navigate("/card-payment");
          }
        }}
      >
        {t("payment.confirm")}
      </Button>
    </Container>
  );
};

export default Payment;