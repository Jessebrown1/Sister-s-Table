import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Contact = () => {
  useEffect(() => {
    // Remove any existing Visme form (if coming back to page)
    const existingForm = document.querySelector(".visme_d");
    if (existingForm) existingForm.remove();

    // Create the Visme form container
    const formContainer = document.createElement("div");
    formContainer.className = "visme_d";
    formContainer.setAttribute("data-title", "Sample Custom Form");
    formContainer.setAttribute(
      "data-url",
      "6vzm6nvn-sample-custom-form?fullPage=true"
    );
    formContainer.setAttribute("data-domain", "forms");
    formContainer.setAttribute("data-full-page", "false");
    formContainer.setAttribute("data-min-height", "100vh");
    formContainer.setAttribute("data-form-id", "166470");

    // Append it inside main
    const main = document.querySelector("main");
    main.appendChild(formContainer);

    // Load the Visme script dynamically
    const script = document.createElement("script");
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      script.remove();
      formContainer.remove();
    };
  }, []); // run every time Contact mounts

  return (
    <>
      <Navbar />
      <main style={{ background: "#0F0F0F", minHeight: "100vh" }}></main>
      <Footer />
    </>
  );
};

export default Contact;
