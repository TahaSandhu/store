import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from './App.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

const theme = createTheme();

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </ThemeProvider>
)