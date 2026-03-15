import { Container, Grid, CircularProgress, Box, Alert, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./products";
import HeroSlider from "../Hero";
import { IProduct } from "../../types/product";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = keyword 
          ? `http://localhost:8080/api/products?keyword=${encodeURIComponent(keyword)}`
          : "http://localhost:8080/api/products";
        const { data } = await axios.get(url);
        setProducts(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.response?.data?.message || err.message || "Failed to load products. Please ensure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <>
      <HeroSlider />
      <Container sx={{ py: 8 }} maxWidth="lg">
        {keyword && (
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
            Search results for: "{keyword}"
          </Typography>
        )}
        
        {error && (
          <Box sx={{ mb: 4 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {products.map((product: IProduct) => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Home;
