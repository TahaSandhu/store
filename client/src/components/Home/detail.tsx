import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Fade,
  Rating,
} from "@mui/material";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProductCard = ({ product }:any) => {
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.value);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: hovered ? "0 10px 30px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.08)",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="280"
          image={product.image}
          alt={product.name}
          sx={{
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />
        
        {product.onSale && (
          <Chip
            label="SALE"
            color="error"
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              fontWeight: "bold",
            }}
          />
        )}

        <Fade in={hovered}>
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <IconButton
              size="small"
              sx={{
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Box>
        </Fade>

        <Fade in={hovered}>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: "rgba(0,0,0,0.8)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              py: 1.5,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "black",
              },
            }}
          >
            <ShoppingCartIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              ADD TO CART
            </Typography>
          </Box>
        </Fade>
      </Box>

      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
            {product.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {product.originalPrice && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "text.disabled",
                }}
              >
                ${product.originalPrice}
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: product.onSale ? "#ff3d00" : "text.primary",
              }}
            >
              ${product.price}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Rating value={product.rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            ({product.reviews})
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            Colors:
          </Typography>
          {product.colors.map((color:any, index:number) => (
            <Box
              key={index}
              onClick={() => setSelectedColor(color.value)}
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                bgcolor: color.value,
                border: selectedColor === color.value ? "2px solid #000" : "2px solid transparent",
                outline: selectedColor === color.value ? "2px solid #fff" : "none",
                outlineOffset: "2px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;