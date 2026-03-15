import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
}).required();

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Password reset requested for:", data.email);
    setIsSubmitted(true);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {isSubmitted ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Check Your Email
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                We've sent a password reset link to your email address.
              </Typography>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                fullWidth
                sx={{ bgcolor: "black" }}
              >
                Back to Sign In
              </Button>
            </Box>
          ) : (
            <>
              <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
                Reset Password
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
                Enter your email address and we'll send you a link to reset your password.
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Email Address"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  margin="normal"
                />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    bgcolor: "black",
                    "&:hover": { bgcolor: "#333" },
                  }}
                >
                  Send Reset Link
                </Button>

                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{ color: "text.secondary", textDecoration: "none" }}
                  >
                    Back to Sign In
                  </Link>
                </Box>
              </form>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
