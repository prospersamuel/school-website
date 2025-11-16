import { motion } from "framer-motion";
import { FaBook, FaFlask, FaMusic, FaPaintBrush, FaFutbol, FaLaptop } from "react-icons/fa";

const programs = [
  {
    icon: <FaBook className="text-blue-500" size={28} />,
    title: "Literacy Program",
    desc: "Comprehensive reading and writing curriculum that builds strong communication skills from early childhood.",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: <FaFlask className="text-green-500" size={28} />,
    title: "STEM Education",
    desc: "Hands-on science, technology, engineering, and math activities that spark curiosity and innovation.",
    color: "from-green-400 to-green-600"
  },
  {
    icon: <FaMusic className="text-purple-500" size={28} />,
    title: "Arts & Music",
    desc: "Creative expression through visual arts, music, drama, and dance to develop well-rounded individuals.",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: <FaPaintBrush className="text-pink-500" size={28} />,
    title: "Creative Learning",
    desc: "Project-based learning that encourages critical thinking, problem-solving, and collaboration.",
    color: "from-pink-400 to-pink-600"
  },
  {
    icon: <FaFutbol className="text-yellow-500" size={28} />,
    title: "Sports & Fitness",
    desc: "Comprehensive physical education program promoting health, teamwork, and sportsmanship.",
    color: "from-yellow-400 to-yellow-600"
  },
  {
    icon: <FaLaptop className="text-cyan-500" size={28} />,
    title: "Technology Skills",
    desc: "Digital literacy and coding classes preparing students for the future with modern technology.",
    color: "from-cyan-400 to-cyan-600"
  }
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="relative py-16 px-5 sm:px-8 overflow-hidden bg-white">

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            OUR PROGRAMS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
            Comprehensive <span className="text-yellow-500">Learning</span> Experience
          </h2>
          <p className="text-lg text-blue-700 max-w-3xl mx-auto">
            We offer diverse educational programs designed to nurture every child's unique talents and interests
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-md border-2 border-blue-100 p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 rounded-md bg-blue-50 flex items-center justify-center mb-4">
                {program.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">{program.title}</h3>
              <p className="text-blue-700 leading-relaxed">{program.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Age Groups */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-400 to-green-400 rounded-md p-8 text-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              AGE GROUPS
            </div>
            <h3 className="text-2xl font-bold mb-4">Programs for All Ages</h3>
            <p className="text-white/90 mb-6">
              We provide age-appropriate learning experiences from preschool through elementary
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/20 p-4 rounded-md backdrop-blur-sm">
                <div className="text-sm font-medium mb-1">Preschool</div>
                <div className="text-xl font-bold">Ages 3-5</div>
              </div>
              <div className="bg-white/20 p-4 rounded-md backdrop-blur-sm">
                <div className="text-sm font-medium mb-1">Lower Elementary</div>
                <div className="text-xl font-bold">Ages 6-8</div>
              </div>
              <div className="bg-white/20 p-4 rounded-md backdrop-blur-sm">
                <div className="text-sm font-medium mb-1">Upper Elementary</div>
                <div className="text-xl font-bold">Ages 9-12</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}