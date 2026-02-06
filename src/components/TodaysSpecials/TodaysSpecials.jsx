    import React, { useState, useEffect, useRef } from "react";
    import { FaClock, FaShoppingCart } from "react-icons/fa";
    import "./TodaysSpecials.css";
    import bundle from "../../assets/bundle.jpg"
    import combo from "../../assets/combo.jpg"
    import spicy from "../../assets/spicy.jpg"

    const TodaysSpecials = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 4,
        minutes: 30,
        seconds: 0,
    });

    const cardsRef = useRef([]);

    const specials = [
        {
        id: 1,
        name: "Family Feast Bundle",
        description: "Complete meal for 4–6 people with signature dishes",
        image: bundle,
        originalPrice: 89.99,
        discountedPrice: 69.99,
        discount: 22,
        tag: "Best Value",
        features: ["Feeds 4–6 People", "4 Signature Dishes", "Free Delivery"],
        },
        {
        id: 2,
        name: "Lunch Special Combo",
        description: "Perfect midday meal with drink and side included",
        image: combo,
        originalPrice: 24.99,
        discountedPrice: 18.99,
        discount: 24,
        tag: "Limited Time",
        features: ["11AM–2PM Only", "Free Drink", "Quick Service"],
        },
        {
        id: 3,
        name: "Spicy Lover’s Package",
        description: "Extra spicy selection for heat lovers",
        image: spicy,
        originalPrice: 34.99,
        discountedPrice: 27.99,
        discount: 20,
        tag: "Chef’s Pick",
        features: ["3 Spicy Dishes", "Extra Shito Sauce", "Cooling Drink"],
        },
    ];

    /* Countdown timer */
    useEffect(() => {
        const timer = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev.seconds > 0)
            return { ...prev, seconds: prev.seconds - 1 };
            if (prev.minutes > 0)
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
            if (prev.hours > 0)
            return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
            return prev;
        });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    /* Scroll reveal */
    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
            });
        },
        { threshold: 0.2 }
        );

        cardsRef.current.forEach((card) => card && observer.observe(card));
        return () => observer.disconnect();
    }, []);

    const formatTime = (t) => (t < 10 ? `0${t}` : t);

    return (
        <section className="todays-specials" aria-labelledby="specials-title">
        <div className="specials-container">
            {/* HEADER */}
            <header className="specials-header">
            <div>
                <h2 id="specials-title" className="section-title">
                Today’s <span className="title-accent">Special</span> Offers
                </h2>
                <p className="section-subtitle">
                Carefully curated dishes, available for a limited time.
                </p>
            </div>

            <div className="countdown">
                <FaClock />
                <span>
                Ends in{" "}
                <strong>
                    {formatTime(timeLeft.hours)}:
                    {formatTime(timeLeft.minutes)}:
                    {formatTime(timeLeft.seconds)}
                </strong>
                </span>
            </div>
            </header>

            {/* GRID */}
            <div className="specials-grid">
            {specials.map((special, index) => (
                <article
                key={special.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="special-card"
                >
                <div className="special-image">
                    <img
                    src={special.image}
                    alt={special.name}
                    loading="lazy"
                    />

                    <span className="special-tag">{special.tag}</span>
                    <span className="discount-pill">
                    {special.discount}% OFF
                    </span>
                </div>

                <div className="special-content">
                    <h3 className="special-name">{special.name}</h3>
                    <p className="special-description">
                    {special.description}
                    </p>

                    <div className="price-row">
                    <span className="price-old">
                        ${special.originalPrice.toFixed(2)}
                    </span>
                    <span className="price-new">
                        ${special.discountedPrice.toFixed(2)}
                    </span>
                    </div>

                    <ul className="features">
                    {special.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                    ))}
                    </ul>

                    <button className="order-btn" aria-label="Order now">
                    <FaShoppingCart />
                    Order Now
                    </button>
                </div>
                </article>
            ))}
            </div>

            {/* FOOTER */}
            <footer className="specials-footer">
            <p className="disclaimer">
                * Offers valid today only. Limited quantities available.
            </p>
            </footer>
        </div>
        </section>
    );
    };

    export default TodaysSpecials;
