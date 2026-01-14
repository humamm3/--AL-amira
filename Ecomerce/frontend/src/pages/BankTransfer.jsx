import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getCart } from "../utils/cart";

const BankTransfer = () => {
  const navigate = useNavigate();
  const cart = getCart();

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
        <Typography variant="h6">Bank Transfer</Typography>
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </Box>

      {/* ===== INFO ===== */}
      <Typography variant="body2" color="text.secondary" mb={2}>
        Please transfer the total amount to the bank account below.
        After completing the transfer, your order will be processed.
      </Typography>

      {/* ===== BANK DETAILS ===== */}
      <Stack
        spacing={1.5}
        sx={{
          border: "1px solid #eee",
          borderRadius: 3,
          p: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography fontSize={13} color="text.secondary">
            Bank Name
          </Typography>
          <Typography fontWeight={600}>Ziraat Bankası</Typography>
        </Box>

        <Box>
          <Typography fontSize={13} color="text.secondary">
            Account Holder
          </Typography>
          <Typography fontWeight={600}>yaman kasır</Typography>
        </Box>

        <Box>
          <Typography fontSize={13} color="text.secondary">
            IBAN
          </Typography>
          <Typography fontWeight={600}>
            TR250020500009636109200001
          </Typography>
        </Box>

        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 700,
          }}
        >
          <Typography>Total Amount</Typography>
          <Typography color="error.main">{totalPrice} TL</Typography>
        </Box>
      </Stack>

      {/* ===== ACTION ===== */}
      <Button
        variant="contained"
        fullWidth
        sx={{ py: 1.3 }}
        onClick={() => {
          // لاحقاً: هون نعمل success + clearCart
          navigate("/success");
        }}
      >
        I Will Transfer & Continue
      </Button>

      <Button
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => navigate("/payment")}
      >
        Change Payment Method
      </Button>
    </Container>
  );
};

export default BankTransfer;
