"use client";

import React, { useState, useEffect } from "react";

const BackToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="btn btn-success btn-xl text-white hover:bg-green-700 transition-all fixed bottom-8 right-8 shadow-lg"
        aria-label="Back to Top"
      >
        Back to Top
      </button>
    )
  );
};

export default BackToTopBtn;
