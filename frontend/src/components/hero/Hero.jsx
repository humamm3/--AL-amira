import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import IconsSection from "../hero/IconsSection";

import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Box sx={{ pt: 2, mt: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
        <Swiper
          loop={true}
          pagination={{ dynamicBullets: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {/* ===== SLIDE 1 ===== */}
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "24em", objectFit: "cover" }}
              src="./imgs/15.jpg"
              alt=""
            />

            {/* ===== TEXT BOX ===== */}
          <Box
  sx={{
    position: "absolute",
    left: { xs: "5%", md: "10%" },
    top: "20%",
     // شفاف
    backdropFilter: "blur(10px)",                // ضبابي
    WebkitBackdropFilter: "blur(10px)",
    p: { xs: 2.5, md: 3.5 },
    borderRadius: "10px",
    maxWidth: "240px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
    textAlign: "left", // لأن عربي
  }}
>
              <Typography
                sx={{
                  color: "#555b66",
                  letterSpacing: "1px",
                  fontSize: "13px",
                  mb: 1,
                }}
              >
                AL AMIRA SHOP
              </Typography>

              <Typography
  sx={{
    color: "#D23F57",   // أحمر أنيق (هوية المتجر)
    fontWeight: 700,
    fontSize: { xs: "22px", md: "28px" },
    mb: 1,
  }}
>
  {t("hero.wholesaleTitle")}
</Typography>

              <Typography
                sx={{
                  color: "#2a313d",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  mb: 2,
                }}
              >
                {t("hero.wholesaleDesc")}
              </Typography>

              <Button
                component="a"
                href="https://wa.me/905348405300"
                target="_blank"
                sx={{
                  px: 4,
                  py: 1.2,
                  backgroundColor: "#111827",
                  color: "#fff",
                  borderRadius: "4px",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#000",
                  },
                }}
              >
                {t("hero.whatsapp")}
                <ArrowForwardIcon sx={{ ml: 1 }} />
              </Button>
            </Box>
          </SwiperSlide>

          {/* ===== SLIDE 2 ===== */}
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "24em", objectFit: "cover" }}
              src="./imgs/00.jpg"
              alt=""
            />
          </SwiperSlide>
        </Swiper>

        {/* ===== SIDE IMAGES ===== */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Box>
            <img
              src="./imgs/12.jpg"
              alt=""
              style={{ width: "15em", height: "13.2em", objectFit: "contain" }}
            />
          </Box>

          <Box>
            <img
              src="./imgs/logo.jpg"
              alt=""
              style={{
                width: "12.2em",
                height: "13.2em",
                marginLeft: "22px",
              }}
            />
          </Box>
        </Box>
      </Box>

      <IconsSection />
    </Container>
  );
};

export default Hero;