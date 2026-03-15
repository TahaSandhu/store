import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../../context/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 400 }, p: 0 },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #eee",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            SHOPPING CART ({cartCount})
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Items List */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 0 }}>
          {cartItems.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "60vh",
                gap: 2,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Your cart is currently empty.
              </Typography>
              <Button variant="contained" color="primary" onClick={onClose}>
                CONTINUE SHOPPING
              </Button>
            </Box>
          ) : (
            <List disablePadding>
              {cartItems.map((item) => (
                <React.Fragment key={`${item.id}-${item.color}`}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ py: 2, position: "relative" }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => removeFromCart(item.id, item.color)}
                        sx={{ color: "text.secondary", "&:hover": { color: "#ff3d00" } }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar sx={{ mr: 2 }}>
                      <Avatar
                        src={item.image}
                        variant="square"
                        sx={{ width: 80, height: 100, borderRadius: 1 }}
                      />
                    </ListItemAvatar>
                    <Box sx={{ pr: 4 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, lineHeight: 1.2, mb: 0.5 }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Color: {item.color}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                          sx={{ border: "1px solid #ddd" }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ width: 20, textAlign: "center" }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                          sx={{ border: "1px solid #ddd" }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 700, ml: "auto !important" }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Stack>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {/* Footer */}
        {cartItems.length > 0 && (
          <Box sx={{ p: 3, bgcolor: "#fff", borderTop: "1px solid #eee" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                SUBTOTAL
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#ff3d00" }}>
                ${cartTotal.toFixed(2)}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Shipping and taxes calculated at checkout.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                py: 2,
                bgcolor: "black",
                fontWeight: 700,
                letterSpacing: 1,
                "&:hover": { bgcolor: "#333" },
              }}
            >
              PROCEED TO CHECKOUT
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
