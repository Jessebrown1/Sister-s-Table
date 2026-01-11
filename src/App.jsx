import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Home from "../src/Pages/Home/Home";
import Menu from "../src/Pages/Menu/Menu";
import Contact from "../src/Pages/Contact/Contact";
import Cart from "../src/Pages/Cart/Cart";

function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
