import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  InputBase,
  IconButton,
  Modal,
  Typography,
  Fade,
  Backdrop,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ open, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?keyword=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
      setSearchQuery("");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(4px)" },
        },
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            width: { xs: "90%", sm: "600px" },
            bgcolor: "white",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            borderRadius: 3,
            p: 4,
            outline: "none",
            position: "relative",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.secondary",
              "&:hover": { color: "#ff3d00" },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ mb: 3, fontWeight: 700, letterSpacing: 0.5, color: "text.primary" }}
          >
            Search Products
          </Typography>

          <form onSubmit={handleSearch}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                px: 2,
                py: 1,
                border: "2px solid transparent",
                transition: "all 0.3s ease",
                "&:focus-within": {
                  bgcolor: "white",
                  borderColor: "black",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                },
              }}
            >
              <InputBase
                autoFocus
                inputRef={inputRef}
                placeholder="What are you looking for?"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  flex: 1,
                }}
              />
              <IconButton type="submit" sx={{ p: 1 }}>
                <SearchIcon color="action" />
              </IconButton>
            </Box>
          </form>

          <Box sx={{ mt: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
              Suggested: MMA Gloves, Trousers, T-Shirts
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SearchOverlay;
