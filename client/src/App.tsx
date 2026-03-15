import { BrowserRouter, Routes, Route } from "react-router-dom";
import MessageBar from "./components/Header/message"
import Header from "./components/Header"
import Footer from "./components/Footer";
import HeroSlider from "./components/Hero";
import Home from "./components/Home";
import ProductDetail from "./components/Home/product-detail";

function App() {
  return (
    <BrowserRouter>
      <MessageBar />
      <Header />
      <HeroSlider/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;