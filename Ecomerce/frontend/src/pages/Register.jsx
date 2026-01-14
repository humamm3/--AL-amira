import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      }
    );

    const data = await res.json();

    if (data.error) {
      alert(data.error.message);
      return;
    }

    // حفظ التوكن
    localStorage.setItem("token", data.jwt);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Account created successfully ✅");
    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
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
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Create Account
        </Typography>

        

        <Stack spacing={2}>
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Password"
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
          Create Account
        </Button>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" textAlign="center">
          Already have an account?{" "}
          <Box
            component="span"
            sx={{ color: "primary.main", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Box>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;