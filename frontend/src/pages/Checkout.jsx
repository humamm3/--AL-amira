import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Dialog,
  Divider,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

/* 📞 Phone input */
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import flags from "react-phone-number-input/flags";

/* =========================
   Helpers
========================= */
const OTP_DURATION = 180;

const maskPhone = (phone) => {
  if (!phone) return "";
  return phone.slice(0, 3) + "****" + phone.slice(-2);
};

const formatTime = (sec) => {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
};

const Checkout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const cart = getCart();

  /* =========================
     STATE
  ========================= */
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(OTP_DURATION);

  /* =========================
     EFFECTS
  ========================= */
  useEffect(() => {
    if (!otpOpen || secondsLeft === 0) return;
    const timer = setInterval(
      () => setSecondsLeft((p) => p - 1),
      1000
    );
    return () => clearInterval(timer);
  }, [otpOpen, secondsLeft]);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e = {};
    if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = t("checkout.errors.email");
    if (!form.firstName) e.firstName = t("checkout.errors.required");
    if (!form.lastName) e.lastName = t("checkout.errors.required");
    if (!form.phone) e.phone = t("checkout.errors.phone");
    if (!form.country) e.country = t("checkout.errors.required");
    if (!form.city) e.city = t("checkout.errors.required");
    if (!form.address) e.address = t("checkout.errors.required");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sendOtp = async () => {
    setSecondsLeft(OTP_DURATION);
    setOtpInput("");
    await fetch("http://localhost:1337/api/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: form.phone }),
    });
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await sendOtp();
    setOtpOpen(true);
  };

  const confirmOtp = async () => {
    if (secondsLeft === 0)
      return alert(t("checkout.otpExpired"));
    try {
      const res = await fetch("http://localhost:1337/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.phone,
          code: otpInput,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error();
      setOtpOpen(false);
      navigate("/payment", {
  state: {
    checkoutData: form,
  },
});
    } catch {
      alert(t("checkout.otpWrong"));
    }
  };

  const totalPrice = cart.reduce(
    (a, i) => a + i.price * i.quantity,
    0
  );

  /* =========================
     RENDER
  ========================= */
  return (
    <Container sx={{ py: 3, maxWidth: "md" }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">
          {t("checkout.title")}
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </Box>

      {/* ORDER SUMMARY */}
      <Stack spacing={2} mb={3}>
        {cart.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Box>
              <Typography fontWeight={600}>{item.title}</Typography>
              <Typography color="text.secondary">
                {item.quantity} × {item.price}TL
              </Typography>
            </Box>
            <Typography fontWeight={600}>
              {item.price * item.quantity}TL
            </Typography>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* FORM */}
      <Stack spacing={2}>
        <TextField
          label={t("checkout.email")}
          name="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label={t("checkout.firstName")}
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            fullWidth
          />
          <TextField
            label={t("checkout.lastName")}
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            fullWidth
          />
        </Stack>

        {/* PHONE */}
        <Box>
          <Typography fontSize={12} sx={{ ml: "14px", mb: "4px" }}>
            {t("checkout.phone")}
          </Typography>

          <Box
            sx={{
              border: "1px solid",
              borderColor: errors.phone
                ? "error.main"
                : "rgba(255,255,255,0.23)",
              borderRadius: "4px",
              px: "14px",
              minHeight: "56px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <PhoneInput
              international
              flags={flags}
              value={form.phone}
              onChange={(v) =>
                setForm({ ...form, phone: v || "" })
              }
              placeholder={t("checkout.phonePlaceholder")}
              style={{
                width: "100%",
                background: "transparent",
                color: "inherit",
                border: "none",
                outline: "none",
                fontSize: "16px",
              }}
            />
          </Box>

          {errors.phone && (
            <Typography color="error" fontSize={12} mt={0.5}>
              {errors.phone}
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={2}>
          <TextField
            label={t("checkout.country")}
            name="country"
            value={form.country}
            onChange={handleChange}
            error={!!errors.country}
            helperText={errors.country}
            fullWidth
          />
          <TextField
            label={t("checkout.city")}
            name="city"
            value={form.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
            fullWidth
          />
        </Stack>

        <TextField
          label={t("checkout.address")}
          name="address"
          value={form.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address}
          multiline
          rows={3}
          fullWidth
        />
      </Stack>

      <Box mt={4}>
        <Typography fontWeight={600}>
          {("Total")}: {totalPrice}TL
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          {t("checkout.confirm")}
        </Button>
      </Box>

      {/* OTP */}
      <Dialog open={otpOpen}>
        <IconButton
          onClick={() => setOtpOpen(false)}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ p: 3 }}>
          <Typography variant="h6" textAlign="center">
            {t("checkout.smsTitle")}
          </Typography>

          <Typography textAlign="center" mb={2}>
            {t("checkout.smsSent")}{" "}
            <strong>{maskPhone(form.phone)}</strong>
          </Typography>

          <Typography textAlign="center">
            {t("checkout.expires")} {formatTime(secondsLeft)}
          </Typography>

          <TextField
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value)}
            fullWidth
            inputProps={{
              maxLength: 6,
              style: { textAlign: "center", letterSpacing: 6 },
            }}
            sx={{ mt: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={confirmOtp}
          >
            {t("checkout.confirmCode")}
          </Button>
        </Box>
      </Dialog>
    </Container>
  );
};

export default Checkout;