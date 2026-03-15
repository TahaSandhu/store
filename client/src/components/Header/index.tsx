import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Modal,
  Collapse,
  Badge,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SearchOverlay from "./search";
import CartDrawer from "./cart";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const menItems = ["Trousers", "MMA Gloves", "T-Shirts", "Shorts"];
  const womenItems = ["Leggings", "Sports Bra", "Tops", "Shorts"];
  const otherLinks = ["About", "Contact"];

  const [anchorElMen, setAnchorElMen] = useState(null);
  const [anchorElWomen, setAnchorElWomen] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const [menOpen, setMenOpen] = useState(false);
  const [womenOpen, setWomenOpen] = useState(false);
  
  const [mobileMenOpen, setMobileMenOpen] = useState(false);
  const [mobileWomenOpen, setMobileWomenOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#f5f5f5", color: "#000", boxShadow: "none" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          position: "relative",
          minHeight: { xs: "64px", md: "70px" },
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Box sx={{ display: { xs: "flex", md: "none" }, flex: 1 }}>
          <IconButton onClick={() => setDrawerOpen(true)} edge="start">
            <MenuIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            flex: { xs: 1, md: "0 0 auto" },
            position: { xs: "absolute", md: "static" },
            left: { xs: "50%", md: "auto" },
            transform: { xs: "translateX(-50%)", md: "none" },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: "1rem", sm: "1.25rem" } }}>
            LOGO
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Button
            color="inherit"
            onMouseEnter={(e) => {
              setAnchorElMen(e.currentTarget as any);
              setMenOpen(true);
            }}
            onMouseLeave={() => setMenOpen(false)}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              transition: "0.3s",
              "&:hover": { color: "#ff3d00" },
            }}
          >
            Men {menOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>
          <Menu
            anchorEl={anchorElMen}
            open={Boolean(anchorElMen)}
            onClose={() => setAnchorElMen(null)}
            MenuListProps={{ onMouseLeave: () => setAnchorElMen(null) }}
          >
            {menItems.map((item, i) => (
              <MenuItem key={i} onClick={() => setAnchorElMen(null)}>
                {item}
              </MenuItem>
            ))}
          </Menu>

          <Button
            color="inherit"
            onMouseEnter={(e) => {
              setAnchorElWomen(e.currentTarget as any);
              setWomenOpen(true);
            }}
            onMouseLeave={() => setWomenOpen(false)}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              transition: "0.3s",
              "&:hover": { color: "#ff3d00" },
            }}
          >
            Women {womenOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>
          <Menu
            anchorEl={anchorElWomen}
            open={Boolean(anchorElWomen)}
            onClose={() => setAnchorElWomen(null)}
            MenuListProps={{ onMouseLeave: () => setAnchorElWomen(null) }}
          >
            {womenItems.map((item, i) => (
              <MenuItem key={i} onClick={() => setAnchorElWomen(null)}>
                {item}
              </MenuItem>
            ))}
          </Menu>

          {otherLinks.map((link, i) => (
            <Button
              key={i}
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                transition: "0.3s",
                "&:hover": { color: "#ff3d00" },
              }}
            >
              {link}
            </Button>
          ))}
        </Box>

        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: { xs: 0.5, sm: 1 }, 
          flex: 1, 
          justifyContent: "flex-end" 
        }}>
          <IconButton 
            size="small" 
            onClick={() => setSearchOpen(true)}
            sx={{ display: { xs: "inline-flex", sm: "inline-flex" } }}
          >
            <SearchIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => setCartOpen(true)}>
            <Badge badgeContent={cartCount} color="error" overlap="circular">
              <ShoppingCartIcon fontSize="small" />
            </Badge>
          </IconButton>
          <IconButton size="small" onClick={() => setLoginOpen(true)}>
            <PersonIcon fontSize="small" />
          </IconButton>
        </Box>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box
            sx={{ width: 280 }}
            role="presentation"
            onKeyDown={() => setDrawerOpen(false)}
          >
            <List>
              <ListItem>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  LOGO
                </Typography>
              </ListItem>
              <Divider />
              
              <ListItem button onClick={() => setMobileMenOpen(!mobileMenOpen)}>
                <ListItemText primary="Men" />
                {mobileMenOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={mobileMenOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menItems.map((item, i) => (
                    <ListItem button key={i} sx={{ pl: 4 }}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>

              <ListItem button onClick={() => setMobileWomenOpen(!mobileWomenOpen)}>
                <ListItemText primary="Women" />
                {mobileWomenOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={mobileWomenOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {womenItems.map((item, i) => (
                    <ListItem button key={i} sx={{ pl: 4 }}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>

              {otherLinks.map((link, i) => (
                <ListItem button key={i}>
                  <ListItemText primary={link} />
                </ListItem>
              ))}
              
              <Divider sx={{ my: 1 }} />
              
              <ListItem 
                button 
                onClick={() => {
                  setDrawerOpen(false);
                  setLoginOpen(true);
                }}
              >
                <ListItemText primary="Login" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 400 },
              maxWidth: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: { xs: 3, sm: 4 },
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Login
            </Typography>
            <Button fullWidth variant="contained" sx={{ mb: 1 }}>
              Login with Email
            </Button>
            <Button fullWidth variant="outlined">
              Login with Google
            </Button>
          </Box>
        </Modal>

        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;