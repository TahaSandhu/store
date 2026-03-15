import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Grid,
  Breadcrumbs,
  Link,
  Rating,
  Button,
  Stack,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Alert,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReplayIcon from "@mui/icons-material/Replay";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../context/CartContext";
import { IProduct, IColor } from "../../types/product";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(data);
        if (data) {
          setSelectedImage(data.image);
          setSelectedSize(data.sizes?.[0] || "");
          setSelectedColor(data.colors?.[0]?.value || "");
        }
        setError(null);
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || err.message || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 20 }}>
      <CircularProgress color="inherit" />
    </Box>
  );

  if (error) return (
    <Container sx={{ py: 10, textAlign: "center" }}>
      <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      <Button component={RouterLink} to="/" variant="contained">Back to Store</Button>
    </Container>
  );

  if (!product || product.message) return (
    <Container sx={{ py: 10, textAlign: "center" }}>
      <Typography variant="h5">Product not found</Typography>
      <Button component={RouterLink} to="/" sx={{ mt: 2 }}>Back to Store</Button>
    </Container>
  );

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAddToCart = () => {
    const colorName = product.colors.find((c: any) => c.value === selectedColor)?.name || "Default";
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: `${colorName} / ${selectedSize}`,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="#">
          {product.category}
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={6}>
        {/* Left Column: Gallery */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "sticky", top: 20 }}>
            <Box
              sx={{
                width: "100%",
                height: { xs: 350, sm: 500, md: 600 },
                borderRadius: 4,
                overflow: "hidden",
                mb: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={selectedImage || product.image}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 1 }}>
              {images.map((img: string, index: number) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: (selectedImage === img || (!selectedImage && index === 0)) ? "2px solid #ff3d00" : "2px solid transparent",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  <img src={img} alt={`${product.name} ${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* Right Column: Details */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 2 }}>
              {product.brand}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.1 }}>
              {product.name}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.reviews} reviews)
              </Typography>
            </Stack>

            <Box sx={{ mb: 4 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: product.onSale ? "#ff3d00" : "text.primary" }}>
                  ${product.price}
                </Typography>
                {product.originalPrice && (
                  <Typography variant="h5" sx={{ textDecoration: "line-through", color: "text.disabled", fontWeight: 500 }}>
                    ${product.originalPrice}
                  </Typography>
                )}
                {product.onSale && product.originalPrice && (
                  <Box sx={{ bgcolor: "#ff3d00", color: "white", px: 1, py: 0.5, borderRadius: 1, fontWeight: 700, fontSize: "0.8rem" }}>
                    SAVE {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Box>
                )}
              </Stack>
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
              {product.description}
            </Typography>

            <Divider sx={{ mb: 4 }} />

            {/* Color Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                SELECT COLOR: {product.colors.find((c: IColor) => c.value === selectedColor)?.name}
              </Typography>
              <Stack direction="row" spacing={1.5}>
                {product.colors.map((color: IColor, index: number) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedColor(color.value)}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: color.value,
                      border: selectedColor === color.value ? "2px solid black" : "1px solid #ddd",
                      cursor: "pointer",
                      padding: "3px",
                      backgroundClip: "content-box",
                      transition: "transform 0.2s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  SELECT SIZE
                </Typography>
                <Link href="#" color="inherit" sx={{ fontSize: "0.8rem", textDecoration: "underline" }}>
                  Size Chart
                </Link>
              </Stack>
              <ToggleButtonGroup
                value={selectedSize}
                exclusive
                onChange={(_, size) => size && setSelectedSize(size)}
                aria-label="product size"
                sx={{ gap: 1, flexWrap: "wrap", display: "flex", "& .MuiToggleButtonGroup-grouped": { border: "1px solid #ddd !important", borderRadius: "8px !important" } }}
              >
                {product?.sizes?.map((size: string) => (
                  <ToggleButton
                    key={size}
                    value={size}
                    sx={{
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      "&.Mui-selected": { bgcolor: "black", color: "white", "&:hover": { bgcolor: "#333" } },
                    }}
                  >
                    {size}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{
                py: 2,
                bgcolor: "black",
                borderRadius: 2,
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: 1,
                mb: 4,
                "&:hover": { bgcolor: "#333" },
              }}
            >
              ADD TO CART
            </Button>

            <Grid container spacing={2} sx={{ bgcolor: "#f9f9f9", p: 2, borderRadius: 2 }}>
              <Grid item xs={4}>
                <Stack alignItems="center" textAlign="center" spacing={1}>
                  <LocalShippingIcon sx={{ color: "#ff3d00" }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Free Shipping</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack alignItems="center" textAlign="center" spacing={1}>
                  <ReplayIcon sx={{ color: "#00c853" }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>30 Days Returns</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack alignItems="center" textAlign="center" spacing={1}>
                  <VerifiedUserIcon sx={{ color: "#2979ff" }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Secure Payment</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;