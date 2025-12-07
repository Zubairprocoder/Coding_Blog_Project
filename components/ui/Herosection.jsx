"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TypeWriter from "../Typed";
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&h=600&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&h=600&q=80",
  "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&h=600&q=80",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&h=600&q=80",
];
const buttons = [
  { label: "Get Started", href: "/blog" },
  { label: "Explore Roadmaps", href: "/blogpost" },
  { label: "Join Community", href: "/contact" }, // example
];
export default function Herosection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Content Below Image */}
      <div className="flex flex-col items-center justify-center gap-5 ">
        <section className="max-w-7xl prose lg:prose-xl mx-auto px-4 pb-6 ">
          {/* Hero Heading with Gradient & Underline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:text-3xl font-bold tracking-tight text-center lg:text-left relative w-fit mx-auto lg:mx-0"
          >
            {/* Flex container: column on mobile, row on md+ */}
            <span className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-5">
              {/* NEW WELCOME LINE */}
              <span className="text-3xl mt-1">Welcome to Our</span>

              {/* MAIN TITLE with underline */}
              <span className="relative group inline-block">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text dark:text-white text-transparent text-2xl md:text-3xl">
                  <TypeWriter />
                </span>
                {/* Underline only under this title */}
                <span className="absolute left-0 -bottom-1 h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </span>
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-4 max-w-xl mx-auto lg:mx-0 text-base lg:text-lg leading-relaxed 
               text-center lg:text-left"
          >
            A complete platform to learn Frontend, Backend, and Full-Stack
            Development with modern roadmaps, tutorials, and projects.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            {buttons.map((btn, i) => (
              <motion.div key={i} whileHover={{ scale: 1.08 }}>
                <Link href={btn.href} passHref legacyBehavior>
                  <Button
                    variant={
                      i === 1 ? "outline" : i === 2 ? "secondary" : "default"
                    }
                  >
                    {btn.label}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Features - Loop Animation */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.25 },
              },
            }}
            className="mt-10 grid grid-cols-2   md:grid-cols-3 gap-3 text-center"
          >
            {[
              { title: "Guides", desc: "Step-by-step" },
              { title: "Projects", desc: "Real apps" },
              { title: "Certificates", desc: "Skill proof" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.6 },
                  show: { opacity: 1, scale: 1 },
                }}
                animate={{
                  scale: [1, 1.07, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                className="p-3 rounded-xl shadow-sm bg-white/10 backdrop-blur-sm"
              >
                <div className="font-semibold text-lg">{item.title}</div>
                <div className="text-sm opacity-80">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ===========================
          HERO BANNER SLIDER
      ============================ */}
        <section className="relative w-full h-96 md:h-[500px] lg:h-screen overflow-hidden ">
          <AnimatePresence mode="wait">
            <motion.img
              key={HERO_IMAGES[currentIndex]}
              src={HERO_IMAGES[currentIndex]}
              alt={`Hero ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 0.96, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: -50 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover rounded-md"
            />
          </AnimatePresence>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 rounded-md"></div>
        </section>
      </div>
    </>
  );
}
