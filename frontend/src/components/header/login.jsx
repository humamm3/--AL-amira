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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.identifier) newErrors.identifier = t("common.required");
    if (!form.password) newErrors.password = t("common.required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: form.identifier,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(t("login.invalid"));
        return;
      }

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert(t("login.success"));
      navigate("/");
    } catch {
      alert(t("login.failed"));
    }
  };

  const isFormValid = form.identifier && form.password;

  return (
    <Container sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          mx: "auto",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
         <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon />
        </IconButton>
        {/* HEADER */}
        <Typography variant="h5" textAlign="center" mb={1}>
          {t("login.title")}
        </Typography>

        <Typography color="text.secondary" mb={3} textAlign="center">
          {t("login.subtitle")}
        </Typography>

        {/* FORM */}
        <Stack spacing={2}>
          <TextField
            label={t("login.identifier")}
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            error={!!errors.identifier}
            helperText={errors.identifier}
            fullWidth
          />

          <TextField
            label={t("login.password")}
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword((p) => !p)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
        </Stack>

        {/* ACTION */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.2 }}
          onClick={handleLogin}
          disabled={!isFormValid}
        >
          {t("login.button")}
        </Button>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" textAlign="center">
          {t("login.noAccount")}{" "}
          <Box
            component="span"
            sx={{ color: "primary.main", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            {t("login.create")}
          </Box>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;