    import React from "react";
    import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaShieldAlt,
    FaTruck
    } from "react-icons/fa";
    import { Link } from "react-router-dom";
    import "./Footer.css";

    const Footer = () => {
    return (
        <footer className="footer">
        <div className="footer-top">
            <div className="footer-container">

            {/* Brand Section */}
            <div className="footer-brand">
                <h2 className="footer-logo">The Golden Spoon</h2>
                <p className="footer-tagline">
                Authentic Ghanaian Cuisine Delivered to Your Door
                </p>

                <div className="social-links">
                <a href="https://facebook.com" className="social-link" aria-label="Facebook">
                    <FaFacebookF />
                </a>
                <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                    <FaTwitter />
                </a>
                <a href="https://instagram.com" className="social-link" aria-label="Instagram">
                    <FaInstagram />
                </a>
                <a href="https://youtube.com" className="social-link" aria-label="YouTube">
                    <FaYoutube />
                </a>
                </div>

                <div className="trust-badges">
    <div className="trust-badge">
        <FaShieldAlt className="trust-icon" />
        <span>100% Safe & Secure</span>
    </div>
    <div className="trust-badge">
        <FaTruck className="trust-icon" />
        <span>Fast Delivery</span>
    </div>
    </div>

            </div>

            {/* Quick Links */}
            <div className="footer-links">
                <h3 className="footer-heading">Quick Links</h3>
                <ul className="footer-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/toppings">Toppings</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                </ul>
            </div>

            {/* Categories */}
            <div className="footer-links">
                <h3 className="footer-heading">Our Menu</h3>
                <ul className="footer-menu">
                <li><Link to="/menu?category=main-courses">Main Courses</Link></li>
                <li><Link to="/menu?category=appetizers">Appetizers</Link></li>
                <li><Link to="/menu?category=specialty">Specialty Dishes</Link></li>
                <li><Link to="/menu?category=sides">Sides & Toppings</Link></li>
                <li><Link to="/menu?category=desserts">Desserts</Link></li>
                <li><Link to="/menu?category=beverages">Beverages</Link></li>
                </ul>
            </div>

            {/* Contact */}
            <div className="footer-contact">
                <h3 className="footer-heading">Contact & Hours</h3>

                <div className="contact-info">
                <div className="contact-item">
                    <FaPhone />
                    <span>+233 123 456 789</span>
                </div>

                <div className="contact-item">
                    <FaEnvelope />
                    <span>hello@sisterstable.com</span>
                </div>

                <div className="contact-item">
                    <FaMapMarkerAlt />
                    <span>123 Food Street, Accra, Ghana</span>
                </div>

                <div className="contact-item">
                    <FaClock />
                    <span>Mon–Sun: 8AM – 11PM</span>
                </div>
                </div>
            </div>

            </div>
        </div>

        <div className="footer-love">
            <span>Made with ♥ in Ghana</span>
        </div>
        </footer>
    );
    };

    export default Footer;
