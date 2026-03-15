import { Container, Grid, Typography, Box, MenuItem, FormControl, InputLabel, Select, Pagination } from "@mui/material";
import ProductCard from "./detail"; // This will be the detailed card
import { PRODUCTS } from "./contants";

const ProductGrid = () => {
  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Our Products
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Showing {PRODUCTS.length} products
            </Typography>
          </Typography>
          
          <Box sx={{ display: "flex", gap: 2, minWidth: 200 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select label="Sort By" defaultValue="featured">
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Top Rated</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {PRODUCTS.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination count={5} color="primary" size="large" />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductGrid;
