import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const schema = Yup.object({
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
}).required();

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      console.log("Resetting password with token:", token, "and new password:", data.password);
      // Realistic backend call would go here
      // await axios.post(`/api/users/reset-password/${token}`, { password: data.password });
      navigate("/login");
    } catch (err: any) {
      setError("Failed to reset password. Link may be invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            New Password
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Enter your new password below.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                bgcolor: "black",
                "&:hover": { bgcolor: "#333" },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Update Password"}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default ResetPassword;
