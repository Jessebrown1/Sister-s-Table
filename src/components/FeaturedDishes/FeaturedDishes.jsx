    import React, { useState, useEffect, useCallback, useRef } from "react";
    import "./FeaturedDishes.css";

    import red from "../../assets/red.jpg";
import jollof from "../../assets/jollof.jpeg";
import waakye from "../../assets/waakye.jpeg";
import tilapia from "../../assets/tilapia.jpg";
import kelewele from "../../assets/kelewele.jpg";








const featuredDishes = [
    {
      id: 1,
      name: "Signature Jollof Rice",
      description: "Premium Ghanaian jollof rice with grilled chicken, plantains, and special spices",
      price: 24.99,
      rating: 4.9,
      reviewCount: 127,
      image: jollof,
      prepTime: "25-30 min",
      tags: ["Most Popular", "Chef's Special"]
    },
    {
      id: 2,
      name: "Grilled Tilapia",
      description: "Fresh tilapia marinated in local spices, grilled to perfection with banku",
      price: 28.99,
      rating: 4.8,
      reviewCount: 89,
      image: tilapia,
      prepTime: "30-35 min",
      tags: ["Fresh Catch", "Spicy"]
    },
    {
      id: 3,
      name: "Waakye Supreme",
      description: "Traditional waakye with gari, spaghetti, fried fish, and shito sauce",
      price: 22.99,
      rating: 4.7,
      reviewCount: 94,
      image: waakye,
      prepTime: "20-25 min",
      tags: ["Traditional", "Hearty"]
    },
    {
      id: 4,
      name: "Red Red Platter",
      description: "Black-eyed peas stew with fried plantains and spicy pepper sauce",
      price: 19.99,
      rating: 4.6,
      reviewCount: 76,
      image: red,
      prepTime: "15-20 min",
      tags: ["Vegetarian", "Quick"]
    },
    {
      id: 5,
      name: "Beef Kelewele Bowl",
      description: "Tender beef chunks with spicy fried plantains and jollof rice",
      price: 26.99,
      rating: 4.8,
      reviewCount: 63,
      image: kelewele,
      prepTime: "35-40 min",
      tags: ["Premium", "Spicy"]
    }
  ];

    export default function FeaturedDishes() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const autoPlayTimeout = useRef(null);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) =>
        prev === featuredDishes.length - 1 ? 0 : prev + 1
        );
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prev) =>
        prev === 0 ? featuredDishes.length - 1 : prev - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);

        if (autoPlayTimeout.current) {
        clearTimeout(autoPlayTimeout.current);
        }

        autoPlayTimeout.current = setTimeout(() => {
        setIsAutoPlaying(true);
        }, 5000);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    useEffect(() => {
        return () => {
        if (autoPlayTimeout.current) {
            clearTimeout(autoPlayTimeout.current);
        }
        };
    }, []);

    const getCardClass = (index) => {
        if (index === currentIndex) return "dish-card active";
        if (index === (currentIndex + 1) % featuredDishes.length)
        return "dish-card next";
        if (
        index ===
        (currentIndex - 1 + featuredDishes.length) % featuredDishes.length
        )
        return "dish-card prev";
        return "dish-card";
    };

    return (
        <section className="featured-dishes">
        <div className="section-header">
            <h2 className="section-tiitle">
            Our <span className="title-acccent">Signature</span> Dishes
            </h2>
            <p className="section-subtitle">
            Crafted with tradition, refined with premium ingredients.
            </p>
        </div>

        <div className="carousel-container">
            <button className="carousel-btn prev-btn" onClick={prevSlide}>
            ‹
            </button>

            <div className="carousel-track">
            {featuredDishes.map((dish, index) => (
                <div key={dish.id} className={getCardClass(index)}>
                <div className="dish-image-container">
                    <img
                    src={dish.image}
                    alt={dish.name}
                    className="dish-image"
                    />

                    <div className="dish-tags">
                    {dish.tags.map((tag, i) => (
                        <span key={i} className="dish-tag">
                        {tag}
                        </span>
                    ))}
                    </div>

                    <div className="prep-time">⏱ {dish.prepTime}</div>
                </div>

                <div className="dish-content">
                    <h3 className="dish-name">{dish.name}</h3>
                    <p className="dish-description">{dish.description}</p>

                    <div className="dish-rating">
                    <div className="stars">
                        {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className={
                            i < Math.round(dish.rating)
                                ? "star-filled"
                                : "star-empty"
                            }
                        >
                            ★
                        </span>
                        ))}
                    </div>
                    <span className="rating-value">{dish.rating}</span>
                    <span className="review-count">
                        ({dish.reviews} reviews)
                    </span>
                    </div>

                    <div className="dish-footer">
                    <div className="price-section">
                        <span className="price-currency">₵</span>
                        <span className="price-value">{dish.price}</span>
                    </div>

                    <button className="add-to-cart-btn">
                        Add to cart
                    </button>
                    </div>
                </div>
                </div>
            ))}
            </div>

            <button className="carousel-btn next-btn" onClick={nextSlide}>
            ›
            </button>

            <div className="carousel-dots">
            {featuredDishes.map((_, index) => (
                <button
                key={index}
                className={`carousel-dot ${
                    index === currentIndex ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
                />
            ))}
            </div>

            <div className="carousel-indicator">
            <span className="current-slide">{currentIndex + 1}</span>
            <span className="total-slides">
                /{featuredDishes.length}
            </span>
            </div>
        </div>
        </section>
    );
    }
    