import { BrowserRouter, Routes, Route } from "react-router-dom";
import MessageBar from "./components/Header/message"
import Header from "./components/Header"
import Footer from "./components/Footer";
import HeroSlider from "./components/Hero";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <MessageBar />
      <Header />
      <HeroSlider/>
      <Routes>
        <Route path="/" element={<Home/>} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;