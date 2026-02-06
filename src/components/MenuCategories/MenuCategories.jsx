    // src/components/MenuCategories.jsx
    import React, { useEffect, useRef, useState } from 'react';
    import {
    FaUtensils,
    FaHamburger,
    FaCookie,
    FaGlassMartini,
    FaPepperHot,
    FaArrowRight,
    FaFire
    } from 'react-icons/fa';
    import { Link } from 'react-router-dom';
    import './MenuCategories.css';

    import jollof from '../../assets/jollof.jpg';
    import appetizers from '../../assets/appetizers.jpg';
    import specialty from '../../assets/specialty.jpg';
    import sides from '../../assets/sides.jpg';
    import desserts from '../../assets/desserts.jpg';
    import drinks from '../../assets/drinks.jpg';

    const MenuCategories = () => {
    const [visibleItems, setVisibleItems] = useState([]);
    const cardsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                setVisibleItems(prev =>
                prev.includes(entry.target.dataset.id)
                    ? prev
                    : [...prev, entry.target.dataset.id]
                );
            }
            });
        },
        { threshold: 0.25 }
        );

        cardsRef.current.forEach(card => card && observer.observe(card));
        return () => observer.disconnect();
    }, []);

    const categories = [
        {
        id: 1,
        name: "Main Courses",
        image: jollof,
        icon: <FaUtensils />,
        description: "Hearty traditional meals and signature dishes",
        itemCount: 24
        },
        {
        id: 2,
        name: "Appetizers",
        image: appetizers,
        icon: <FaHamburger />,
        description: "Elegant starters to awaken the palate",
        itemCount: 18
        },
        {
        id: 3,
        name: "Specialty Dishes",
        image: specialty,
        icon: <FaFire />,
        description: "Chef-curated selections and seasonal highlights",
        itemCount: 12
        },
        {
        id: 4,
        name: "Sides & Toppings",
        image: sides,
        icon: <FaPepperHot />,
        description: "Thoughtful accompaniments to elevate your meal",
        itemCount: 15
        },
        {
        id: 5,
        name: "Desserts",
        image: desserts,
        icon: <FaCookie />,
        description: "Refined sweet finishes",
        itemCount: 10
        },
        {
        id: 6,
        name: "Beverages",
        image: drinks,
        icon: <FaGlassMartini />,
        description: "Traditional and modern refreshments",
        itemCount: 14
        }
    ];

    return (
        <section className="menu-categories" aria-labelledby="menu-heading">
        <div className="section-header">
            <h2 id="menu-heading" className="section-title">
            Explore Our <span className="title-accent">Menu</span>
            </h2>
            <p className="section-subtitle">
            A curated expression of Ghanaian cuisine, crafted with elegance
            </p>
        </div>

        <div className="categories-grid">
            {categories.map((cat, index) => (
            <article
                key={cat.id}
                ref={el => (cardsRef.current[index] = el)}
                data-id={cat.id}
                className={`category-card image-card ${
                visibleItems.includes(String(cat.id)) ? 'is-visible' : ''
                }`}
                aria-label={cat.name}
            >
                {/* Image */}
                <div className="card-image-wrapper">
                <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="card-image"
                />
                </div>

                {/* Overlay Content */}
                <div className="image-overlay">
                <div className="overlay-top">
                    <span className="overlay-icon" aria-hidden="true">
                    {cat.icon}
                    </span>
                    <span className="overlay-count">{cat.itemCount}</span>
                </div>

                <div className="overlay-content">
                    <h3 className="category-name">{cat.name}</h3>
                    <p className="category-description">{cat.description}</p>

                    <Link
                    to={`/menu?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="explore-btn"
                    aria-label={`Explore ${cat.name}`}
                    >
                    Explore <FaArrowRight />
                    </Link>
                </div>
                </div>
            </article>
            ))}
        </div>
        </section>
    );
    };

    export default MenuCategories;
