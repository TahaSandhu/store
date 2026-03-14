import { Box, Typography } from "@mui/material";

const MessageBar = () =>{
  return (
    <Box sx={{ backgroundColor: "#000", color: "#fff", textAlign: "center", py: 1 }}>
      <Typography variant="body2">
        Free Shipping on All Orders Over $50
      </Typography>
    </Box>
  );
}

export default MessageBar;