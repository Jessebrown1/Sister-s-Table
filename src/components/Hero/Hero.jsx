import React from "react";
import "./Hero.css";
import heroImg from "../../assets/heroImg.jpg"; 

function Hero() {
  return (
    <section className="hero">
      <img src={heroImg} alt="Delicious Jollof" className="hero-bg" />

      {/* Overlay for premium frosted effect */}
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">
          Delicious <span>Jollof Rice</span> Delivered to You
        </h1>
        <p className="hero-subtitle">
          Authentic taste, fresh ingredients, and lightning-fast delivery!
        </p>
        <a href="/menu" className="hero-btn">
          Order Now
        </a>
      </div>
    </section>
  );
}

export default Hero;
