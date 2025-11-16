import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiMenuFries } from "react-icons/ci";
import { FiLogIn } from "react-icons/fi";
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const navLinks = [
    { label: "About", path: "#about" },
    { label: "Programs", path: "#programs" },
    { label: "Admissions", path: "/admissions" },
    { label: "Students", path: "/students" },
    { label: "Teachers", path: "/teacher" },
    { label: "Contact", path: "#contact" },
  ];

  return (
    <header className="w-full fixed top-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* School Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">SA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-900">Sunshine Academy</h1>
              <p className="text-sm text-yellow-600">Learning with joy</p>
            </div>
          </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ label, path }) => (
            <motion.div
              key={path}
              onHoverStart={() => setHoveredLink(path)}
              onHoverEnd={() => setHoveredLink(null)}
              className="relative"
            >
              <a
                href={path}
                className={`text-blue-900 font-medium transition-colors ${
                  hoveredLink === path ? "text-yellow-500" : ""
                }`}
              >
                {label}
              </a>
              {hoveredLink === path && (
                <motion.div
                  layoutId="navHover"
                  className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.div>
          ))}
          
          {/* Portal Login Button */}
          <Link
          to={'/login'}>
          <motion.button
          whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-md font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Student Portal <FiLogIn size={14} />
          </motion.button>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <CiMenuFries className="text-2xl text-blue-800" />
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden top-0 px-4 pb-4 space-y-2 bg-white absolute flex justify-center items-center flex-col w-full h-[100vh]"
          >
            <button
              className="absolute top-4 right-4 text-3xl text-blue-800"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
            {navLinks.map((link, i) => (
              <a
                href={link.path}
                key={i}
                onClick={() => setMenuOpen(false)}
                className="block text-2xl font-semibold text-blue-800 hover:text-yellow-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
          to={'/login'}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-md font-bold shadow-lg hover:shadow-xl transition-all text-lg mt-4"
            >
              Student Portal <FiLogIn size={14} />
            </motion.button>
          </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}