import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useGetproductByNameQuery } from "../Redux/product";
import { useState, useEffect } from "react";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Close from "@mui/icons-material/Close";

import ProduvtDrtails from "../components/main/ProduvtDrtails";
import Main from "../components/main/Main";
import "../pages/productViewer.css"

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } =
    useGetproductByNameQuery(`products/${id}?populate=*`);

  const product = data?.data;

  const [viewerOpen, setViewerOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  /* ================= Swipe ================= */

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipe = 50;

    if (distance > minSwipe) handleNext();
    if (distance < -minSwipe) handlePrev();

    setTouchStart(null);
    setTouchEnd(null);
  };

  /* ================= Navigation ================= */

  const handleNext = () => {
    setImgIndex((prev) =>
      prev === product.produktImg.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setImgIndex((prev) =>
      prev === 0 ? product.produktImg.length - 1 : prev - 1
    );
  };

  /* ================= States ================= */

  if (isLoading)
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (error || !product)
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography color="error">Error loading product</Typography>
      </Box>
    );

  return (
    <Container sx={{ py: 1 }}>
      {/* زر الرجوع */}
      <Button onClick={() => navigate(-1)} sx={{ mb: 1 }}>
        <KeyboardBackspaceIcon />
      </Button>

      {/* المنتج */}
      <Box
        onClick={(e) => {
          if (e.target.tagName === "IMG") {
            setViewerOpen(true);
            setImgIndex(0);
          }
        }}
        sx={{
          "& img": {
            maxWidth: "100%",
            maxHeight: "70vh",
            cursor: "zoom-in",
          },
        }}
      >
        <ProduvtDrtails clickedProduct={product} />
      </Box>

      {/* ================= Full Screen Viewer ================= */}
      {viewerOpen && (
        <Box
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.95)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* إغلاق */}
          <IconButton
            onClick={() => setViewerOpen(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "white",
              zIndex: 1301,
              ":hover": {
                color: "red",
                rotate: "180deg",
                transition: "0.3s",
              },
            }}
          >
            <Close />
          </IconButton>

          {/* الصورة */}
          <img
            src={product?.produktImg?.[imgIndex]?.url}
            alt=""
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              userSelect: "none",
            }}
          />

          {/* ===== Dots ===== */}
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              display: "flex",
              gap: 1,
            }}
          >
            {product.produktImg.map((_, index) => (
              <Box
                key={index}
                onClick={() => setImgIndex(index)}
                sx={{
                  width: imgIndex === index ? 12 : 8,
                  height: imgIndex === index ? 12 : 8,
                  borderRadius: "50%",
                  backgroundColor:
                    imgIndex === index ? "#2196f3" : "#777",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" mb={3}>
          More Products
        </Typography>
        <Main />
      </Box>
    </Container>
  );
};

export default ProductPage;