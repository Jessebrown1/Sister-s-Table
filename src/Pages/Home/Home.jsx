import React from "react";
import Navbar from "../../components/Navbar/Navbar"
import Hero from "../../components/Hero/Hero";
import MenuPreview from "../../components/MenuPreview/MenuPreview";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MenuPreview />
      <Footer />
    </>
  );
}

export default Home;
