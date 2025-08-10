'use client'
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
    />
  </svg>
);

const fadeInContainer = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.18,
      ease: "easeOut",
      duration: 0.7,
    },
  },
};

const fadeInItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

const imageAnimation = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.6 },
  },
};

const FaqsHero = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    // Focus heading on mount (optional)
    const heading = document.getElementById("faqs-hero-heading");
    if (heading) {
      heading.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const onIntersection = ([entry], observer) => {
      if (entry.isIntersecting) {
        controls.start("visible");
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(onIntersection, { threshold: 0.3 });
    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [controls]);

  return (
    <section
      className="bg-white min-h-[440px] flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-20 md:py-28 gap-12 md:gap-20"
      aria-label="Frequently Asked Questions Hero Section"
      ref={sectionRef}
    >
      <motion.div
        className="flex-1 max-w-xl md:max-w-2xl"
        variants={fadeInContainer}
        initial="hidden"
        animate={controls}
      >
        <motion.h1
          id="faqs-hero-heading"
          tabIndex={-1}
          className="text-4xl md:text-5xl font-extrabold leading-snug mb-6 text-black"
          variants={fadeInItem}
        >
          Got Questions? <br />
          <span className="text-blue-600">We’ve Got Answers.</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl font-light text-gray-900 max-w-3xl mx-auto lg:mx-0 mb-10"
          variants={fadeInItem}
        >
          Explore our Frequently Asked Questions to get quick support and detailed
          insights about our services and offerings.
        </motion.p>

        <motion.form
          onSubmit={(e) => e.preventDefault()}
          className="relative max-w-md"
          role="search"
          aria-label="Search FAQs"
          variants={fadeInItem}
        >
          <input
            type="search"
            placeholder="Search FAQs..."
            aria-label="Search FAQs"
            className="w-full border border-gray-300 rounded-md py-4 px-5 pr-14 text-gray-800 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
          />
          <button
            type="submit"
            aria-label="Submit FAQ search"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 transition"
          >
            <SearchIcon />
          </button>
        </motion.form>
      </motion.div>

      <motion.div
        className="flex-1 max-w-md md:max-w-lg flex justify-center md:justify-end"
        variants={imageAnimation}
        initial="hidden"
        animate={controls}
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1678000616499-2f27d9bc0c78?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Illustration showing questions and answers concept"
          className="w-full h-auto rounded-xl shadow-xl"
          loading="lazy"
          width={600}
          height={400}
          decoding="async"
          fetchPriority="low"  // <--- Corrected here
          draggable={false}
        />
      </motion.div>
    </section>
  );
};

export default FaqsHero;
