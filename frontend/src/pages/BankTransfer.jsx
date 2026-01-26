import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getCart } from "../utils/cart";
import { useTranslation } from "react-i18next";

const BankTransfer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const customer = location.state?.customer;
  const cart = getCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleConfirm = async () => {
    if (!customer) {
      alert("بيانات الزبون غير موجودة");
      return;
    }

    try {
      const res = await fetch("http://localhost:1337/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            cart,
            total: totalPrice,
            paymentMethod: "bank",
            statuss: "pending",

            email: customer.email,
            phone: customer.phone,
            firstName: customer.firstName,
            lastName: customer.lastName,
            address: customer.address,
            city: customer.city,
            country: customer.country,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        alert("فشل حفظ الطلب");
        return;
      }

      // ⬅️ نمرر ID الطلب
      navigate("/waiting-payment", {
        state: { orderId: data.data.id },
      });
    } catch (err) {
      console.log(err);
      alert("خطأ بالاتصال بالسيرفر");
    }
  };

  return (
    <Container sx={{ py: 3, maxWidth: "sm" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">{t("bankTransfer.title")}</Typography>
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" color="text.secondary" mb={2}>
        {t("bankTransfer.description")}
      </Typography>

      <Stack spacing={1.5} sx={{ border: "1px solid #eee", p: 2, mb: 3 }}>
        <Box>
          <Typography fontSize={13}>{t("bankTransfer.bankName")}</Typography>
          <Typography fontWeight={600}>Ziraat Bankası</Typography>
        </Box>

        <Box>
          <Typography fontSize={13}>{t("bankTransfer.accountHolder")}</Typography>
          <Typography fontWeight={600}>Yaman Kasır</Typography>
        </Box>

        <Box>
          <Typography fontSize={13}>{t("bankTransfer.iban")}</Typography>
          <Typography fontWeight={600}>
            TR250020500009636109200001
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>{t("bankTransfer.totalAmount")}</Typography>
          <Typography color="error.main">{totalPrice} TL</Typography>
        </Box>
      </Stack>

      <Button fullWidth variant="contained" onClick={handleConfirm}>
        {t("bankTransfer.confirm")}
      </Button>

      <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/payment")}>
        {t("bankTransfer.changeMethod")}
      </Button>
    </Container>
  );
};

export default BankTransfer;