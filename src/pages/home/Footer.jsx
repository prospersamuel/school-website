import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer() {
  const socials = [
    { icon: <FaFacebookF size={16} />, link: 'https://www.facebook.com/' },
    { icon: <FaInstagram size={16} />, link: 'https://www.instagram.com/' },
    { icon: <FaTwitter size={16} />, link: 'https://twitter.com/' },
  ];

  const quickLinks = [
    { name: 'About Us', link: '#about' },
    { name: 'Programs', link: '#programs' },
    { name: 'Admissions', link: '#admissions' },
    { name: 'Students', link: '#students' },
    { name: 'Contact', link: '#contact' },
  ];
  
  const parentLinks = [
    { name: 'Student Portal', link: '/login' },
    { name: 'School Calendar', link: '#calendar' },
    { name: 'School Supplies', link: '#supplies' },
    { name: 'Volunteer', link: '#volunteer' },
  ];

  return (
    <footer className="relative px-6 py-12 bg-blue-900 text-white">

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* School Info */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-extrabold mb-4">
              Sunshine <span className="text-yellow-400">Academy</span>
            </div>
            <p className="text-blue-200 mb-6 max-w-md">
              Nurturing young minds with quality education, creativity, and care since 2010. 
              Building the foundation for lifelong learning and success.
            </p>
            <div className="flex space-x-4">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-white hover:bg-yellow-500 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.link} className="text-blue-200 hover:text-yellow-400 transition-colors flex items-center">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Student Resources</h3>
            <ul className="space-y-2">
              {parentLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.link} className="text-blue-200 hover:text-yellow-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-blue-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-yellow-400" />
              <span className="text-blue-200">123 Learning Street, Education City</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-yellow-400" />
              <span className="text-blue-200">+234-123-45678</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-yellow-400" />
              <span className="text-blue-200">info@sunshineacademy.edu</span>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-6 border-t border-blue-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-blue-300 text-sm">
            &copy; {new Date().getFullYear()} Sunshine Academy. All rights reserved.
          </div>
          <Link to={'/login'} className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md font-semibold transition-all flex items-center gap-2">
            Student Portal <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </footer>
  );
}