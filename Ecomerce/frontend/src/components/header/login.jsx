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
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "", // email أو username
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.identifier) newErrors.identifier = "Required";
    if (!form.password) newErrors.password = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleLogin = async () => {
  if (!validate()) return;

  try {
    const res = await fetch(
      "http://localhost:1337/api/auth/local",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: form.identifier, // email أو username
          password: form.password,
        }),
      }
    );

    const data = await res.json();

    if (data.error) {
      alert("Invalid credentials ❌");
      return;
    }

    localStorage.setItem("token", data.jwt);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Logged in successfully ✅");
    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Login failed");
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
        {/* ===== HEADER ===== */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2,justifyContent:"center" }}>
          <Typography variant="h5" ml={1}>
            Login
          </Typography>
          
        </Box>

        <Typography color="text.secondary" mb={3}>
          please login to your account
        </Typography>

        {/* ===== FORM ===== */}
        <Stack spacing={2}>
          <TextField
            label="Email or Username"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            error={!!errors.identifier}
            helperText={errors.identifier}
            fullWidth
          />

          <TextField
  label="Password"
  name="password"
  type={showPassword ? "text" : "password"}
  value={form.password}
  onChange={handleChange}
  error={!!errors.password}
  helperText={errors.password}
  fullWidth
  autoComplete="new-password"   // مهم جداً
  InputProps={{
    endAdornment: (
      <IconButton
        onClick={() => setShowPassword((prev) => !prev)}
        edge="end"
      >
        {showPassword ? <Visibility />:<VisibilityOff />  }
      </IconButton>
    ),
  }}
  sx={{
    "& input::-ms-reveal": {
      display: "none",
    },
    "& input::-ms-clear": {
      display: "none",
    },
  }}
/>
        </Stack>

        {/* ===== ACTIONS ===== */}
        <Button
  variant="contained"
  fullWidth
  sx={{ mt: 3, py: 1.2 }}
  onClick={handleLogin}
  disabled={!isFormValid}
>
  Login
</Button>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" textAlign="center">
          Don’t have an account?{" "}
          <Box
            component="span"
            sx={{ color: "primary.main", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Create one
          </Box>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;