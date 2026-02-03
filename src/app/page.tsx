"use client";

import Navigation from "@/components/ui/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import DataVisualization from "@/components/sections/DataVisualization";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div style={{ width: "100%", minWidth: "100%", overflowX: "hidden" }}>
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main style={{ width: "100%", minHeight: "100vh" }}>
        {/* Hero Section with 3D Background */}
        <HeroSection />

        {/* About Section - "Über Uns" */}
        <AboutSection />

        {/* Products Section - B2B & B2C */}
        <ProductsSection />

        {/* Data Visualization Section */}
        <DataVisualization />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
