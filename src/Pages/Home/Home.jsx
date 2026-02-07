import React from "react";
import Navbar from "../../components/Navbar/Navbar"
import Hero from "../../components/Hero/Hero";
import FeaturedDishes from "../../components/FeaturedDishes/FeaturedDishes";
import MenuPreview from "../../components/MenuPreview/MenuPreview";
import Footer from "../../components/Footer/Footer";
import MenuCategories from "../../components/MenuCategories/MenuCategories";
import TodaysSpecials from "../../components/TodaysSpecials/TodaysSpecials";


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedDishes />
      <MenuCategories />
      <TodaysSpecials />
      <Footer />
    </>
  );
}

export default Home;
