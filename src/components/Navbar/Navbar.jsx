import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import {
  FaHome,
  FaUtensils,
  FaPhoneAlt,
  FaBoxOpen,
  FaUser,
  FaShoppingCart,
  FaChevronRight,
} from "react-icons/fa";
import "./Navbar.css";

import { CartContext } from "../../components/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false); 
  const [lastScroll, setLastScroll] = useState(0);

  const { totalItems } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        setHidden(true);
      } else {
        // Scrolling up
        setHidden(false);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <>
      <header className={`topbar ${hidden ? "topbar-hidden" : ""}`}>
        <span className="brand">Golden Spoon</span>

        <nav className="navbar-links">
          <Link to="/"><FaHome className="nav-icon" /> Home</Link>
          <Link to="/menu"><FaUtensils className="nav-icon" /> Menu</Link>
          <Link to="/contact"><FaPhoneAlt className="nav-icon" /> Contact Us</Link>
        </nav>

        <div className="topbar-actions">
          <Link to="/cart" className="action-btn cart-btn">
            <FaShoppingCart />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          <button className="action-btn"><FaUser /></button>

          <button className="menu-btn" onClick={() => setIsOpen(true)} aria-label="Open menu">
            ☰
          </button>
        </div>
      </header>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      <aside className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h2>Golden Spoon</h2>
          <p>Authentic Home Cuisine</p>
          <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="welcome-card">
          <FaUser className="avatar" />
          <div>
            <h4>Welcome, Guest!</h4>
            <p>Sign in for better experience</p>
          </div>
          <button className="signin-btn">Sign in</button>
        </div>

        <nav className="drawer-menu">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <FaHome /><span>Home</span><FaChevronRight />
          </Link>
          <Link to="/menu" onClick={() => setIsOpen(false)}>
            <FaUtensils /><span>Menu</span><FaChevronRight />
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            <FaPhoneAlt /><span>Contact Us</span><FaChevronRight />
          </Link>
          <Link to="/orders" onClick={() => setIsOpen(false)}>
            <FaBoxOpen /><span>Track Orders</span><FaChevronRight />
          </Link>
        </nav>

        <footer className="drawer-footer">
          <p>© 2025 Sister’s Table</p>
          <span>Made with ♥ in Ghana</span>
        </footer>
      </aside>
    </>
  );
};

export default Navbar;
