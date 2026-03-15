import { BrowserRouter, Routes, Route } from "react-router-dom";
import MessageBar from "./components/Header/message";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductDetail from "./components/Home/product-detail";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

function App() {
  return (
    <BrowserRouter basename="/store">
      <MessageBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;