import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid =
    form.username && form.email && form.password;

  const handleRegister = async () => {
    try {
      const res = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      if (data?.error) {
        alert(data.error.message);
        return;
      }

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert(t("register.success"));
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(t("register.error"));
    }
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          mx: "auto",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          position: "relative",
        }}
      >
        {/* زر الرجوع */}
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ position: "absolute", top: 12, left: 12 }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5" textAlign="center" mb={3}>
          {t("register.title")}
        </Typography>

        <Stack spacing={2}>
          <TextField
            label={t("register.username")}
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label={t("register.email")}
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label={t("register.password")}
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
          />
        </Stack>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.2 }}
          disabled={!isFormValid}
          onClick={handleRegister}
        >
          {t("register.create")}
        </Button>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" textAlign="center">
          {t("register.haveAccount")}{" "}
          <Box
            component="span"
            sx={{ color: "primary.main", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            {t("register.login")}
          </Box>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;