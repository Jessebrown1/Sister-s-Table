import React, { useState, useEffect, useRef, useContext } from "react";
import { CartContext } from "../../components/CartContext";

import "./MenuPreview.css";
import dish1 from "../../assets/dish1.jpg";
import dish2 from "../../assets/dish2.jpg";
import dish3 from "../../assets/dish3.jpg";

const MENU_ITEMS = [
  {
    id: 1,
    name: "Signature Jollof Royale",
    description:
      "Slow-cooked aged basmati, fire-roasted peppers, heritage spices",
    price: "₵320",
    image: dish1,
    recommended: true,
  },
  {
    id: 2,
    name: "Golden Fried Free-Range Chicken",
    description: "Crisp skin, citrus brine, chef’s house glaze",
    price: "₵260",
    image: dish2,
    recommended: false,
  },
  {
    id: 3,
    name: "Caramelized Plantain Elegance",
    description: "Hand-selected ripe plantain, brown butter finish",
    price: "₵140",
    image: dish3,
    recommended: true,
  },
];

const MenuPreview = () => {
  const [quantities, setQuantities] = useState({});
  const cardRefs = useRef([]);

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (item) => {
    const qty = quantities[item.id] || 1;

    for (let i = 0; i < qty; i++) {
      addToCart(item);
    }

    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[item.id];
      return updated;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleIncrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 0;
      if (currentQty <= 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return {
        ...prev,
        [id]: currentQty - 1,
      };
    });
  };

  return (
    <section className="menu-preview">
      <header className="menu-header">
        <span className="menu-eyebrow">Curated Selection</span>
        <h2 className="menu-title">Signature Creations</h2>
        <p className="menu-subtitle">
          A refined expression of tradition, elevated by craft and precision.
        </p>
      </header>

      <div className="menu-grid">
        {MENU_ITEMS.map((item, index) => {
          const quantity = quantities[item.id] || 0;

          return (
            <article
              className="menu-card"
              key={item.id}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <div className="menu-image">
                <img src={item.image} alt={item.name} loading="lazy" />

                {item.recommended && (
                  <span className="recommended-tag">Chef's Choice</span>
                )}

                {quantity > 0 && (
                  <span className="quantity-badge">{quantity}</span>
                )}
              </div>

              <div className="menu-info">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>

                <div className="menu-footer">
                  <span className="price">{item.price}</span>

                  <div className="actions">
                    <div className="qty-control">
                      <button onClick={() => handleDecrease(item.id)}>−</button>
                      <span>{quantity}</span>
                      <button onClick={() => handleIncrease(item.id)}>+</button>
                    </div>

                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default MenuPreview;
