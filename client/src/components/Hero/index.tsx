import Slider from "react-slick";
import { Box, Typography, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    id: 1,
    title: "Train Hard, Fight Easy",
    subtitle: "Premium MMA & Fitness Gear",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1600&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Gear Up for Victory",
    subtitle: "High-Quality Sports Equipment",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1600&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Power. Speed. Performance.",
    subtitle: "Workout Gear That Works",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=600&fit=crop",
  },
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <Box
            key={slide.id}
            sx={{
              height: { xs: 250, sm: 400, md: 600 },
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                px: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                  mb: 1,
                }}
              >
                {slide.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "#fff", mb: 2, fontSize: { xs: "0.9rem", sm: "1.2rem" } }}
              >
                {slide.subtitle}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff3d00",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#e63600" },
                }}
              >
                Shop Now
              </Button>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroSlider;