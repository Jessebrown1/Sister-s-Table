import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import {
  FaHome,
  FaUtensils,
  FaPhoneAlt,
  FaBoxOpen,
  FaUser,
  FaSearch,
  FaShoppingCart,
  FaChevronRight,
} from "react-icons/fa";
import "./Navbar.css";

import { CartContext } from "../../components/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Consume cart context properly
  const { totalItems } = useContext(CartContext);

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <header className="topbar">
        {/* Logo */}
        <span className="brand">Golden Spoon</span>

        {/* Desktop Navigation */}
        <nav className="navbar-links">
          <Link to="/">
            <FaHome className="nav-icon" /> Home
          </Link>
          <Link to="/menu">
            <FaUtensils className="nav-icon" /> Menu
          </Link>
          <Link to="/contact">
            <FaPhoneAlt className="nav-icon" /> Contact Us
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="topbar-actions">


          {/* ✅ Cart link fixed (no button wrapping Link) */}
          <Link to="/cart" className="action-btn cart-btn">
            <FaShoppingCart />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>

          <button className="action-btn">
            <FaUser />
          </button>

          {/* Hamburger (mobile only via CSS) */}
          <button
            className="menu-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </header>

      {/* ================= OVERLAY ================= */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* ================= DRAWER ================= */}
      <aside className={`drawer ${isOpen ? "open" : ""}`}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <h2>Golden Spoon</h2>
          <p>Authentic Home Cuisine</p>
          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Welcome Card */}
        <div className="welcome-card">
          <FaUser className="avatar" />
          <div>
            <h4>Welcome, Guest!</h4>
            <p>Sign in for better experience</p>
          </div>
          <button className="signin-btn">Sign in</button>
        </div>

        {/* Drawer Navigation */}
        <nav className="drawer-menu">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <FaHome />
            <span>Home</span>
            <FaChevronRight />
          </Link>

          <Link to="/menu" onClick={() => setIsOpen(false)}>
            <FaUtensils />
            <span>Menu</span>
            <FaChevronRight />
          </Link>

          <Link to="/contact" onClick={() => setIsOpen(false)}>
            <FaPhoneAlt />
            <span>Contact Us</span>
            <FaChevronRight />
          </Link>

          <Link to="/orders" onClick={() => setIsOpen(false)}>
            <FaBoxOpen />
            <span>Track Orders</span>
            <FaChevronRight />
          </Link>
        </nav>

        {/* Drawer Footer */}
        <footer className="drawer-footer">
          <p>© 2025 Sister’s Table</p>
          <span>Made with ♥ in Ghana</span>
        </footer>
      </aside>
    </>
  );
};

export default Navbar;
