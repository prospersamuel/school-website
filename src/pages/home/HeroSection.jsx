import { motion } from "framer-motion";
import SchoolIllustration from "../../assets/girl.png"; 
import { FaArrowRight, FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden flex flex-col-reverse lg:flex-row items-center justify-between px-5 sm:px-8 pt-20 sm:py-24 max-w-7xl mx-auto gap-8 sm:gap-12 min-h-[85vh] bg-gradient-to-br from-blue-50 to-green-50">

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-green-300 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-300 rounded-full opacity-20 blur-xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 text-center lg:text-left"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6"
        >
          <FaGraduationCap />
          <span>Welcome to Sunshine Academy</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl drop-shadow-xl font-extrabold mb-6 text-blue-900 leading-tight">
          Where Every Child <span className="text-yellow-500">Shines</span> Bright
        </h1>

        <p className="text-lg sm:text-xl max-w-2xl mb-10 font-medium text-blue-700 leading-relaxed">
          At Sunshine Academy, we nurture young minds with quality education, 
          creative learning, and a supportive environment that helps every student 
          reach their full potential.
        </p>

        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
          <Link
           to={'login'} 
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-5 rounded-md font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Apply Now <FaArrowRight />
          </Link>

          <a
            href="#about"
            className="flex items-center justify-center gap-3 border-2 border-blue-400 text-blue-700 px-8 py-4 rounded-md font-semibold hover:shadow-lg transition-all"
          >
            Learn More
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{borderRadius: '56% 44% 23% 77% / 68% 50% 50% 32% '}}
        className="flex-1 relative bg-gradient-to-br from-blue-100 to-green-100 roundl p-6 shadow-2xl"
      >
        <div className="absolute -top-6 right-64 opacity-50 w-48 h-48 bg-yellow-300 rounded-full opacimty-20 blur-3xl"></div>
        <img
          src={SchoolIllustration}
          alt="Sunshine Academy Students"
          className="h-auto w-full max-w-2xl mx-auto drop-shadow-lg"
        />
      </motion.div>
    </section>
  );
}