import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CartProvider } from "./components/CartContext";

import Home from "../src/Pages/Home/Home";
import Menu from "../src/Pages/Menu/Menu";
import Contact from "../src/Pages/Contact/Contact";
import Cart from "../src/Pages/Cart/Cart";

/* ---------- Overlay Component ---------- */

const Overlay = ({ title }) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0F0F0F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <h1
        style={{
          color: "#D4AF37",
          fontSize: "4rem",
          letterSpacing: "6px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h1>
    </motion.div>
  );
};

/* ---------- Animated Routes ---------- */

function AnimatedRoutes() {
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setShowOverlay(true);

      setTimeout(() => {
        setDisplayLocation(location);
        setShowOverlay(false);
      }, 700); // must match overlay duration
    }
  }, [location, displayLocation]);

  const getTitle = (path) => {
    if (path === "/") return "Home";
    return path.replace("/", "");
  };

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <Overlay key={location.pathname} title={getTitle(location.pathname)} />
        )}
      </AnimatePresence>

      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

/* ---------- App ---------- */

function App() {
  return (
    <CartProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;
