import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  const shopLinks = ["Men", "Women", "Accessories", "New Arrivals"];
  const blogLinks = ["Fitness Tips", "MMA Training", "Workout Guide", "Nutrition"];
  const payments = ["Visa", "Mastercard", "JazzCash", "Easypaisa"];

  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", mt: 8, pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>LOGO</Typography>
            <Typography variant="body2" sx={{ color: "#ccc" }}>
              Premium combat sports and fitness gear designed for performance and comfort.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton sx={{ color: "#fff" }}><FacebookIcon /></IconButton>
              <IconButton sx={{ color: "#fff" }}><InstagramIcon /></IconButton>
              <IconButton sx={{ color: "#fff" }}><TwitterIcon /></IconButton>
            </Box>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>Shop</Typography>
            {shopLinks.map((item, i) => (
              <Typography key={i} sx={{ mb: 1 }}>
                <Link href="#" underline="none" color="#ccc">{item}</Link>
              </Typography>
            ))}
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>Blog</Typography>
            {blogLinks.map((item, i) => (
              <Typography key={i} sx={{ mb: 1 }}>
                <Link href="#" underline="none" color="#ccc">{item}</Link>
              </Typography>
            ))}
          </Grid>
        </Grid>

        <Box sx={{
          borderTop: "1px solid #333",
          mt: 5,
          pt: 3,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}>
          <Typography variant="body2" sx={{ color: "#aaa" }}>
            © 2026 Your Store. All Rights Reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: { xs: 1, md: 0 } }}>
            {payments.map((pay, i) => (
              <Typography key={i} sx={{ fontSize: 14, color: "#ccc" }}>{pay}</Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;