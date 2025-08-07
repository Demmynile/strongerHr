"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion , Variants } from "framer-motion";
import { Menu } from "lucide-react";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">StrongerHR</h1>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/hr/auth/login" className="text-blue-600 font-semibold">Login</Link>
            <Link href="/hr/auth/register" className="text-blue-600 font-semibold">Register</Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md px-6 py-4 flex flex-col gap-4 text-sm font-medium">
            
            <Link href="/hr/auth/login" className="text-blue-600 font-semibold" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link href="/hr/auth/register" className="text-blue-600 font-semibold" onClick={() => setMenuOpen(false)}>Register</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-6 bg-gradient-to-br from-blue-100 to-blue-50 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-4"
        >
          Empowering HR with Smart Insights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg max-w-2xl mx-auto"
        >
          Explore advanced analytics, predictive staffing, and volunteer talent scouting—all from a single platform.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Link href="/login">
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </motion.div>
      </section>

  

      {/* Info Sections */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-2">About SmartHR</h3>
          <p>
            AI-powered platform for HR operations—fast, flexible, and intuitive.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Design-Driven Efficiency</h3>
          <p>
            Clear dashboards, smart tools, and zero complexity.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Why Choose Us</h3>
          <p>
            Predict, retain, and scout talent with confidence.
          </p>
        </div>
          <div id="onboarding" className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-2">HR Onboarding</h3>
          <p>
            Automate new hire setup with ease.
          </p>
        </div>

        <div id="analytics" className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Analytics</h3>
          <p>
            Monitor real-time performance and engagement.
          </p>
        </div>

        <div id="prediction" className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Staff Prediction & Retention</h3>
          <p>
            Forecast attrition and boost retention.
          </p>
        </div>

        <div id="prompting" className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Prompting</h3>
          <p>
            Smart suggestions for team leads and HRs.
          </p>
        </div>

        <div id="scouting" className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Talent Scouting for Volunteers</h3>
          <p>
            Match volunteers with roles effortlessly.
          </p>
        </div>
      </section>

          {/* New Design Sections with Blue Variants */}
           <section className="py-32 px-8 bg-blue-100 text-center grid place-items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-extrabold mb-6 text-blue-900"
          >
            Human-Centered HR Design
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg text-gray-700 mb-4"
          >
            Built for real people. Simple, powerful, intuitive. Our tools empower your HR team with seamless workflows and compassionate tech.
          </motion.p>
          <motion.div variants={fadeInUp} custom={3}>
            <ul className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-left text-gray-700">
              <li className="bg-white p-6 rounded-2xl shadow-md">
                ✅ Intuitive Interface
              </li>
              <li className="bg-white p-6 rounded-2xl shadow-md">
                ✅ Smart Employee Profiles
              </li>
              <li className="bg-white p-6 rounded-2xl shadow-md">
                ✅ Personalized Dashboards
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2 */}
      <section className="py-32 px-8 bg-blue-200 text-center grid place-items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-extrabold mb-6 text-blue-900"
          >
            Built for the Future of Work
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg text-gray-700 mb-4"
          >
            Automate, analyze, and adapt with ease. We equip your organization for rapid change and a data-driven tomorrow.
          </motion.p>
          <motion.div variants={fadeInUp} custom={3}>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-left text-gray-700">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                📊 Advanced Analytics Dashboard
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md">
                🤖 Workflow Automation Tools
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md">
                🔄 Continuous Feedback Loops
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 3 */}
      <section className="py-32 px-8 bg-blue-300 text-center grid place-items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-extrabold mb-6 text-blue-900"
          >
            About the Application
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg text-gray-700 mb-4"
          >
            One platform for smart HR—from onboarding to talent engagement. Scalable, secure, and designed to grow with your team.
          </motion.p>
          <motion.div variants={fadeInUp} custom={3}>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-left text-gray-700">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                🎯 Centralized Employee Hub
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md">
                🚀 Onboarding Journeys
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md">
                🌟 Talent Retention Analytics
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>


      <footer className="text-center py-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} StrongerHR. All rights reserved.
      </footer>
    </main>
  );
}
