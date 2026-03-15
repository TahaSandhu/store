import { Grid, Container } from "@mui/material";
import { PRODUCTS } from "./contants";
import ProductCard from "./products";

const Home = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {PRODUCTS.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;