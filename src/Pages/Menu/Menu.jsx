    import React from "react";
    import Navbar from "../../components/Navbar/Navbar";
    import Footer from "../../components/Footer/Footer";
    import "./Menu.css";

    import dish1 from "../../assets/dish1.jpg";
    import dish2 from "../../assets/dish2.jpg";
    import dish3 from "../../assets/dish3.jpg";


    const Menu = () => {
    const menuItems = [
        { name: "Jollof Rice Combo", price: 25, img: dish1, category: "Main" },
        { name: "Fried Chicken", price: 15, img: dish2, category: "Main" },
        { name: "Plantain Side", price: 5, img: dish3, category: "Sides" },
    ];

    const categories = ["All", "Main", "Sides", "Beverages"];
    const [activeCategory, setActiveCategory] = React.useState("All");

    const filteredItems =
        activeCategory === "All"
        ? menuItems
        : menuItems.filter((item) => item.category === activeCategory);

    return (
        <>
        <Navbar />
        <div className="menu-page">
            <h1>Our Menu</h1>
            <div className="category-buttons">
            {categories.map((cat) => (
                <button
                key={cat}
                className={activeCategory === cat ? "active" : ""}
                onClick={() => setActiveCategory(cat)}
                >
                {cat}
                </button>
            ))}
            </div>

            <div className="menu-items">
            {filteredItems.map((item, idx) => (
                <div className="menu-card" key={idx}>
                <img src={item.img} alt={item.name} />
                <div className="menu-info">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        <Footer />
        </>
    );
    };

    export default Menu;
