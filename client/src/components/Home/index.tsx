import { Container, Grid } from "@mui/material";
import ProductCard from "./products";
import { PRODUCTS } from "./contants";

const Home = () => {
  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {PRODUCTS.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
