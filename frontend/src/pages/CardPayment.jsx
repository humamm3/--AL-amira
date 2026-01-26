import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useState } from "react";
import { getCart } from "../utils/cart";
import { useTranslation } from "react-i18next";

const CardPayment = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const cart = getCart();

  const [card, setCard] = useState({
    number: "",
    name: "",
    month: "",
    year: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const isValid =
    card.number.length >= 16 &&
    card.name &&
    card.month &&
    card.year &&
    card.cvv.length >= 3;

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
          mb: 2,
        }}
      >
        <Typography variant="h6">
          {t("cardPayment.title")}
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </Box>

      {/* ===== ORDER SUMMARY ===== */}
      <Box
        sx={{
          border: "1px solid #eee",
          borderRadius: 3,
          p: 2,
          mb: 3,
        }}
      >
        <Typography fontWeight={600} mb={1}>
          {t("cardPayment.orderSummary")}
        </Typography>

        {cart.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 0.5,
            }}
          >
            <Typography fontSize={14}>
              {item.quantity} × {item.title}
            </Typography>
            <Typography fontSize={14}>
              {item.price * item.quantity}TL
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontWeight={600}>
            {t("cardPayment.total")}
          </Typography>
          <Typography fontWeight={700} color="error.main">
            {totalPrice}TL
          </Typography>
        </Box>
      </Box>

      {/* ===== CARD FORM ===== */}
      <Stack spacing={2}>
        <TextField
          label={t("cardPayment.cardNumber")}
          name="number"
          value={card.number}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          inputProps={{ maxLength: 19 }}
          fullWidth
        />

        <TextField
          label={t("cardPayment.cardHolder")}
          name="name"
          value={card.name}
          onChange={handleChange}
          placeholder="JOHN DOE"
          fullWidth
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label={t("cardPayment.month")}
            name="month"
            value={card.month}
            onChange={handleChange}
            placeholder="MM"
            inputProps={{ maxLength: 2 }}
            fullWidth
          />
          <TextField
            label={t("cardPayment.year")}
            name="year"
            value={card.year}
            onChange={handleChange}
            placeholder="YY"
            inputProps={{ maxLength: 2 }}
            fullWidth
          />
          <TextField
            label={t("cardPayment.cvv")}
            name="cvv"
            value={card.cvv}
            onChange={handleChange}
            placeholder="123"
            inputProps={{ maxLength: 3 }}
            fullWidth
          />
        </Stack>
      </Stack>

      {/* ===== PAY BUTTON ===== */}
      <Button
        variant="contained"
        fullWidth
        disabled={!isValid}
        sx={{
          mt: 3,
          py: 1.3,
          bgcolor: isValid ? "primary.main" : "#cfcfcf",
          "&:hover": {
            bgcolor: isValid ? "primary.dark" : "#cfcfcf",
          },
        }}
        onClick={() => navigate("/success")}
      >
        {t("cardPayment.pay")} {totalPrice}TL
      </Button>
    </Container>
  );
};

export default CardPayment;