import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const WaitingPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const orderId = location.state?.orderId;
  const [loading, setLoading] = useState(false);

  const checkPaymentStatus = async () => {
    if (!orderId) {
      alert("رقم الطلب غير موجود");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
  `http://localhost:1337/api/orders/${orderId}?locale=all`
);
      const data = await res.json();

      const status = data?.data?.attributes?.statuss;

      if (status === "paid") {
        navigate("/success");
      } else {
        alert("الطلب لا يزال قيد المراجعة");
      }
    } catch (err) {
      console.log(err);
      alert("خطأ أثناء التحقق من الطلب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ py: 6, maxWidth: "sm" }}>
      <Stack spacing={3} textAlign="center" alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          {t("waiting.title", "طلبك قيد المراجعة")}
        </Typography>

        <Typography color="text.secondary">
          {t(
            "waiting.desc",
            "تم استلام طلبك. سيتم مراجعة الحوالة البنكية قريبًا."
          )}
        </Typography>

        <Button
          variant="contained"
          onClick={checkPaymentStatus}
          disabled={loading}
        >
          {loading ? "جاري التحقق..." : "تحقق من الدفع"}
        </Button>

        <Button onClick={() => navigate("/")}>
          {t("waiting.home", "العودة إلى الرئيسية")}
        </Button>
      </Stack>
    </Container>
  );
};

export default WaitingPayment;