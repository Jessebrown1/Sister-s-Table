    import React, { useEffect, useState } from "react";
    import Navbar from "../../components/Navbar/Navbar";
    import Footer from "../../components/Footer/Footer";
    import { 
    FaFilter, 
    FaStar, 
    FaShoppingCart, 
    FaFire, 
    FaClock, 
    FaLeaf,
    FaPepperHot,
    FaGlassMartini,
    FaUtensils,
    FaSearch,
    FaSortAmountDown,
    FaSortAmountUp
    } from "react-icons/fa";
    import "./Menu.css"
    import { useMemo } from "react";

    /* ---- Custom image mapping ---- */
    const FOOD_IMAGE_MAP = {
    "Jollof Rice": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    "Fried Rice": "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    "Fried Chicken": "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
    "Kung Pao Chicken": "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
    "Cheeseburger": "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
    "Spaghetti Bolognese": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
    "Pizza": "https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg",
    };

    const FALLBACK_IMAGE = "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg";

    /* ---- Category Icons ---- */
    const CATEGORY_ICONS = {
    "All": <FaUtensils />,
    "Main": <FaUtensils />,
    "Sides": <FaLeaf />,
    "Beverages": <FaGlassMartini />,
    "Chinese": <FaPepperHot />,
    "Vegetarian": <FaLeaf />,
    "Spicy": <FaPepperHot />,
    "Popular": <FaFire />
    };

    /* ---- Default menu with enhanced data ---- */
    const DEFAULT_MENU = [
    { 
        id: 1,
        name: "Jollof Rice", 
        price: 25, 
        category: "Main", 
        img: FOOD_IMAGE_MAP["Jollof Rice"],
        description: "Authentic Ghanaian jollof rice with grilled chicken and vegetables",
        rating: 4.9,
        reviews: 124,
        prepTime: "25-30 min",
        tags: ["Popular", "Spicy"],
        calories: 420
    },
    { 
        id: 2,
        name: "Fried Chicken", 
        price: 18, 
        category: "Main", 
        img: FOOD_IMAGE_MAP["Fried Chicken"],
        description: "Crispy fried chicken with special Ghanaian spices",
        rating: 4.7,
        reviews: 89,
        prepTime: "20-25 min",
        tags: ["Crispy", "Family"],
        calories: 380
    },
    { 
        id: 3,
        name: "Spaghetti Bolognese", 
        price: 22, 
        category: "Main", 
        img: FOOD_IMAGE_MAP["Spaghetti Bolognese"],
        description: "Italian-style spaghetti with rich meat sauce",
        rating: 4.6,
        reviews: 67,
        prepTime: "30-35 min",
        tags: ["Italian", "Hearty"],
        calories: 450
    },
    { 
        id: 4,
        name: "Cheeseburger", 
        price: 20, 
        category: "Main", 
        img: FOOD_IMAGE_MAP["Cheeseburger"],
        description: "Juicy beef patty with cheese and fresh vegetables",
        rating: 4.8,
        reviews: 92,
        prepTime: "15-20 min",
        tags: ["Quick", "American"],
        calories: 520
    },
    { 
        id: 5,
        name: "Pizza", 
        price: 30, 
        category: "Main", 
        img: FOOD_IMAGE_MAP["Pizza"],
        description: "Freshly baked pizza with choice of toppings",
        rating: 4.5,
        reviews: 56,
        prepTime: "35-40 min",
        tags: ["Family", "Italian"],
        calories: 480
    },
    ];

    const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [priceRange, setPriceRange] = useState([0, 100]);

    const categories = [
        { id: "all", name: "All" },
        { id: "main", name: "Main" },
        { id: "sides", name: "Sides" },
        { id: "beverages", name: "Beverages" },
        { id: "chinese", name: "Chinese" },
        { id: "vegetarian", name: "Vegetarian" },
        { id: "spicy", name: "Spicy" },
        { id: "popular", name: "Popular" }
      ];
      

    useEffect(() => {
        const fetchMenu = async () => {
        try {
            const res = await fetch("http://localhost:8081/api/customer/menu");
            if (!res.ok) throw new Error("Menu fetch failed");

            const data = await res.json();

            if (Array.isArray(data) && data.length > 0) {
            const formatted = data
                .filter((item) => item.isAvailable)
                .map((item) => ({
                    id: item.id ?? `${item.foodName}-${item.price}`,
                name: item.foodName,
                price: item.price,
                category: item.category || "Main",
                img: FOOD_IMAGE_MAP[item.foodName] || FALLBACK_IMAGE,
                description: item.description || "Delicious dish prepared with fresh ingredients",
                rating: item.rating || 4.5,
                reviews: item.reviews || Math.floor(Math.random() * 100) + 20,
                prepTime: `${Math.floor(Math.random() * 20) + 15}-${Math.floor(Math.random() * 20) + 25} min`,
                tags: item.tags || ["Popular"],
                calories: Math.floor(Math.random() * 300) + 300
                }));

            setMenuItems(formatted);
            } else {
            setMenuItems(DEFAULT_MENU);
            }
        } catch (error) {
            console.error("Menu error:", error);
            setMenuItems(DEFAULT_MENU);
        } finally {
            setLoading(false);
        }
        };

        fetchMenu();
    }, []);

    // Filter and sort logic
 

    const filteredItems = useMemo(() => {
      return menuItems
        .filter(item => {
          const matchesCategory =
            activeCategory === "All" ||
            (activeCategory === "Popular" && item.tags?.includes("Popular")) ||
            item.category === activeCategory;
    
          const matchesSearch =
            !searchQuery ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
          const matchesPrice =
            item.price >= priceRange[0] && item.price <= priceRange[1];
    
          return matchesCategory && matchesSearch && matchesPrice;
        })
        .sort((a, b) => {
          switch (sortBy) {
            case "price-low":
              return a.price - b.price;
            case "price-high":
              return b.price - a.price;
            case "rating":
              return b.rating - a.rating;
            case "popular":
              return b.reviews - a.reviews;
            default:
              return 0;
          }
        });
    }, [menuItems, activeCategory, searchQuery, priceRange, sortBy]);
    

    const handleAddToCart = (item) => {
        // Add to cart logic here
        console.log("Added to cart:", item);
        // You can integrate with your CartContext here
    };

    const getCategoryCount = (categoryName) => {
        if (categoryName === "All") return menuItems.length;
        if (categoryName === "Popular") {
        return menuItems.filter(item => item.tags?.includes("Popular")).length;
        }
        return menuItems.filter(item => item.category === categoryName).length;
    };

    return (
        <>
        <Navbar />

        <div className="menu-page">
            {/* Hero Section */}
            <div className="menu-hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="menu-title">Our Exquisite <span className="title-accent">Menu</span></h1>
                <p className="menu-subtitle">
                Discover authentic flavors crafted with passion and tradition. Every dish tells a story.
                </p>
            </div>
            </div>

            {/* Filters and Search */}
            <div className="menu-filters">
            <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                />
            </div>

            <div className="filter-options">
                <div className="sort-container">
                <FaFilter className="filter-icon" />
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="default">Sort by</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
                </div>

                <div className="price-filter">
                <span className="price-label">Price Range: ₵{priceRange[0]} - ₵{priceRange[1]}</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="price-slider"
                />
                </div>
            </div>
            </div>

            {/* Category Navigation */}
            <div className="category-navigation">
            <div className="category-scroll">
                {categories.map((category) => {
                const count = getCategoryCount(category.name);
                return (
                    <button
                    key={category.id}
                    className={`category-btn ${activeCategory === category.name ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.name)}
                    >
                    <span className="category-icon">
                        {CATEGORY_ICONS[category.name] || <FaUtensils />}
                    </span>
                    <span className="category-name">{category.name}</span>
                    {count > 0 && (
                        <span className="category-count">{count}</span>
                    )}
                    </button>
                );
                })}
            </div>
            </div>

            {/* Menu Items Grid */}
            {loading ? (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading delicious dishes...</p>
            </div>
            ) : (
            <>
                <div className="menu-stats">
                <div className="stat-card">
                    <span className="stat-value">{filteredItems.length}</span>
                    <span className="stat-label">Dishes Available</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">4.8</span>
                    <span className="stat-label">Average Rating</span>
                </div>
                <div className="stat-card">
                <span className="stat-value">
                    {filteredItems.length > 0
                        ? Math.min(...filteredItems.map(i => i.price))
                        : 0}
                    </span>

                    <span className="stat-label">Starting from (₵)</span>
                </div>
                </div>

                {filteredItems.length === 0 ? (
                <div className="no-results">
                    <FaSearch className="no-results-icon" />
                    <h3>No dishes found</h3>
                    <p>Try adjusting your search or filters</p>
                    <button 
                    className="reset-btn"
                    onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("All");
                        setPriceRange([0, 100]);
                    }}
                    >
                    Reset Filters
                    </button>
                </div>
                ) : (
                <div className="menu-grid">
                    {filteredItems.map((item) => (
                    <div className="menu-item-card" key={item.id}>
                        <div className="item-image-container">
                        <img src={item.img} alt={item.name} className="item-image" />
                        <div className="item-badges">
                            {item.tags?.includes("Popular") && (
                            <span className="badge popular">
                                <FaFire /> Popular
                            </span>
                            )}
                            {item.tags?.includes("Spicy") && (
                            <span className="badge spicy">
                                <FaPepperHot /> Spicy
                            </span>
                            )}
                            <span className="badge time">
                            <FaClock /> {item.prepTime}
                            </span>
                        </div>
                        <div className="item-overlay">
                            <button 
                            className="quick-view-btn"
                            onClick={() => handleAddToCart(item)}
                            >
                            Quick View
                            </button>
                        </div>
                        </div>

                        <div className="item-content">
                        <div className="item-header">
                            <h3 className="item-name">{item.name}</h3>
                            <div className="item-rating">
                            <FaStar className="star-icon" />
                            <span className="rating-value">{item.rating}</span>
                            <span className="review-count">({item.reviews})</span>
                            </div>
                        </div>

                        <p className="item-description">{item.description}</p>

                        <div className="item-details">
                            <div className="detail">
                            <span className="detail-label">Category:</span>
                            <span className="detail-value">{item.category}</span>
                            </div>
                            <div className="detail">
                            <span className="detail-label">Calories:</span>
                            <span className="detail-value">{item.calories} kcal</span>
                            </div>
                        </div>

                        <div className="item-footer">
                            <div className="price-section">
                            <span className="price-currency">₵</span>
                            <span className="price-value">{item.price.toFixed(2)}</span>
                            </div>
                            <button 
                            className="add-to-cart-btn"
                            onClick={() => handleAddToCart(item)}
                            >
                            <FaShoppingCart />
                            <span>Add to Cart</span>
                            </button>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </>
            )}
    <br /><br /><br />
        </div>

        <Footer />
        </>
    );
    };

    export default Menu;