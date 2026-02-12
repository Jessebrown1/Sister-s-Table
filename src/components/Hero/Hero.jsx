// src/components/Hero/Hero.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import heroImg from "../../assets/heroImg.jpg";
import { FaArrowRight } from "react-icons/fa";

// CountUp component for scroll-triggered stats
function CountUp({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasCounted, setHasCounted] = useState(false);

  // Observe when the number enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCounted) {
          setHasCounted(true);
        }
      },
      { threshold: 0.5 } // trigger when 50% visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasCounted]);

  // Count animation
  useEffect(() => {
    if (!hasCounted) return;

    let start = 0;
    const increment = end / (duration / 20);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.ceil(start));
    }, 20);

    return () => clearInterval(counter);
  }, [hasCounted, end, duration]);

  return <span ref={ref}>{count}</span>;
}

function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {/* Animated Background with Parallax */}
      <div
        className="hero-bg-container"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img
          src={heroImg}
          alt="Delicious Ghanaian cuisine"
          className="hero-bg"
        />
        <div className="hero-grain-overlayy"></div>
        <div className="hero-gradient-overlayy"></div>
      </div>

      {/* Main Content */}
      <div className="hero-contentt">
        {/* Hero Title */}
        <div className="text-reveal">
          <h1 className="hero-ttitle">
            <span className="line line-1">Welcome to</span>
            <span className="line line-2">
              <span className="highlightt-text">The Golden Spoon</span>
            </span>
            <span className="line line-3">
              Ghanaian Cuisine, Crafted with Care
            </span>
          </h1>
        </div>

        {/* Subtitle with Typing Animation */}
        <p className="hero-subtitlee">
          <span className="typed-text">Refined Flavors, Rooted in Tradition</span>
          <span className="cursor"></span>
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions">
          <a href="/menu" className="hero-btn primary-btn">
            <span>Order Now</span>
            <FaArrowRight className="btn-icon" />
            <div className="btn-hover-effect"></div>
          </a>
          <a href="/menu" className="hero-btn secondary-btn">
            <span>View Menu</span>
            <div className="btn-hover-effect"></div>
          </a>
        </div>

        {/* Stats Section */}
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number"><CountUp end={100} /></div>
            <div className="stat-label">+ Happy Guests</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number"><CountUp end={98} /></div>
            <div className="stat-label">Satisfaction Rate (%)</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number"><CountUp end={30} /></div>
            <div className="stat-label">Minutes Average Delivery</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span className="scroll-text">Scroll to explore</span>
      </div>
    </section>
  );
}

export default Hero;
