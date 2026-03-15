import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { PRODUCTS } from "./contants";

const ProductDetail = () => {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id.toString() === id);

  if (!product) return <Typography>Product not found</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box>
        <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: 10 }} />
        <Typography variant="h4" mt={3}>
          {product.name}
        </Typography>
        <Typography variant="h5" color="primary" mt={1}>
          ${product.price}
        </Typography>
        <Typography mt={2}>{product.description}</Typography>
      </Box>
    </Container>
  );
};

export default ProductDetail;