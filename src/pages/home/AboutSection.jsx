import { motion } from "framer-motion";
import { FaGraduationCap, FaUsers, FaAward, FaHeart } from "react-icons/fa";
// import aboutImage from '../../assets/girl-writing-notebook-studio.png';


const stats = [
  { icon: <FaGraduationCap className="text-blue-500" />, number: "250+", label: "Students" },
  { icon: <FaHeart className="text-pink-500" />, number: "98%", label: "Parent Satisfaction" },
  { icon: <FaUsers className="text-green-500" />, number: "25+", label: "Teachers" },
  { icon: <FaAward className="text-yellow-500" />, number: "15+", label: "Years Experience" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 px-5 sm:px-8 bg-gradient-to-br from-blue-50 to-cyan-50">

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-md p w-[90%] shadow-lg">
              <img 
                src={'https://img.freepik.com/premium-photo/school-teacher-teaching-students-learning-concept_53876-2599.jpg?_gl=1*1tebwtq*_gcl_au*OTA5NDk4NDAzLjE3NjE5NzY2MTI.*_ga*MTI5NzcwNDQxNC4xNzYxOTc2NjIy*_ga_QWX66025LC*czE3NjE5NzY2MjEkbzEkZzEkdDE3NjE5NzkzNTkkajkkbDAkaDA.'} 
                alt="Sunshine Academy Students" 
                className="h-auto drop-shadow-2xl rounded-md"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-white p-6 rounded-md shadow-lg">
              <div className="text-2xl font-bold">Since 2008</div>
              <div className="text-sm">Nurturing Young Minds</div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              ABOUT OUR SCHOOL
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">
              Welcome to <span className="text-yellow-500">Sunshine Academy</span>
            </h2>
            <p className="text-lg text-blue-700 mb-6 leading-relaxed">
              For over 15 years, Sunshine Academy has been dedicated to providing exceptional 
              education in a nurturing environment. We believe every child deserves a bright 
              start and the opportunity to discover their unique talents.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-5 justify-center items-center"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="flex flex-col">
                  <div className="text-2xl font-bold text-blue-900">{stat.number}</div>
                  <div className="text-blue-600 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r w-fit m-auto from-blue-500 to-green-500 text-white px-8 py-3 rounded-md font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Meet Our Teachers
            </motion.button>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
        >
          <div className="bg-white rounded-md p-8 shadow-lg border-l-4 border-blue-500">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
            <p className="text-blue-700 leading-relaxed">
              To provide a safe, nurturing, and stimulating environment where children 
              can develop intellectually, emotionally, socially, and physically through 
              play-based and experiential learning.
            </p>
          </div>
          <div className="bg-white rounded-md p-8 shadow-lg border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h3>
            <p className="text-blue-700 leading-relaxed">
              To be the leading educational institution that inspires lifelong learning, 
              fosters creativity, and prepares students to become compassionate leaders 
              in a global community.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}