
import { motion } from "framer-motion";
import { FaBook, FaUsers, FaTrophy, FaSmile } from "react-icons/fa";

export default function StudentsSection() {
  const studentLife = [
    {
      icon: <FaBook className="text-blue-500" size={24} />,
      title: "Academic Clubs",
      description: "Math Club, Reading Circle, Science Explorers"
    },
    {
      icon: <FaUsers className="text-green-500" size={24} />,
      title: "Sports Teams",
      description: "Soccer, Basketball, Swimming, Track & Field"
    },
    {
      icon: <FaTrophy className="text-yellow-500" size={24} />,
      title: "Competitions",
      description: "Spelling Bee, Science Fair, Math Olympiad"
    },
    {
      icon: <FaSmile className="text-purple-500" size={24} />,
      title: "Arts & Drama",
      description: "School Play, Choir, Art Exhibition"
    }
  ];

  return (
    <section id="students" className="relative py-16 px-5 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
            Student <span className="text-yellow-500">Life</span>
          </h2>
          <p className="text-lg text-blue-700 max-w-3xl mx-auto">
            Beyond the classroom, we offer diverse activities that help students 
            discover their passions and build lifelong friendships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentLife.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-blue-50 rounded-md p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto bg-white rounded-md flex items-center justify-center mb-4 shadow-lg">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
              <p className="text-blue-700">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}