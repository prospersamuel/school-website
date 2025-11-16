import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { 
  FaPaperPlane, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaSpinner
} from "react-icons/fa";
import toast from 'react-hot-toast';

export default function ContactPage() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    subject: '',
    grade_level: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading("Sending your message...");

    emailjs
      .sendForm(
        "service_mstv264", // Your service ID
        "template_uf5uh6t", // Your template ID
        formRef.current,
        "yMtn4yWVTM7fiZS8_" // Your public key
      )
      .then(
        (result) => {
          toast.dismiss(loadingToast);
          toast.success("Message sent successfully! We'll get back to you soon.");
          setLoading(false);
          setFormData({
            user_name: '',
            user_email: '',
            user_phone: '',
            subject: '',
            grade_level: '',
            message: ''
          });
        },
        (error) => {
          toast.dismiss(loadingToast);
          toast.error("Failed to send message. Please try again.");
          setLoading(false);
          console.error('EmailJS Error:', error);
        }
      );
  };

  // ... rest of your component remains the same
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-blue-500 text-xl" />,
      title: "Visit Our Campus",
      details: ["123 Sunshine Avenue", "Education City, EC 12345", "Abuja Nigeria"],
      link: "https://maps.google.com",
      linkText: "Get Directions →"
    },
    {
      icon: <FaPhone className="text-green-500 text-xl" />,
      title: "Call Us",
      details: ["Main Office: +234-123-45678", "Admissions: +234-123-45678", "Fax: +234-123-45678"],
      link: "tel:+23412345678",
      linkText: "Call Now →"
    },
    {
      icon: <FaEnvelope className="text-yellow-500 text-xl" />,
      title: "Email Us",
      details: ["info@sunshineacademy.edu", "admissions@sunshineacademy.edu", "support@sunshineacademy.edu"],
      link: "mailto:info@sunshineacademy.edu",
      linkText: "Send Email →"
    },
    {
      icon: <FaClock className="text-purple-500 text-xl" />,
      title: "Office Hours",
      details: ["Monday - Friday: 7:30 AM - 6:00 PM", "Saturday: 8:00 AM - 12:00 PM", "Sunday: Closed"],
      link: "#",
      linkText: "View Calendar →"
    }
  ];

  const departments = [
    {
      name: "Admissions Office",
      phone: "+234-123-45678",
      email: "admissions@sunshineacademy.edu",
      description: "For enrollment inquiries and campus tours"
    },
    {
      name: "Academic Office",
      phone: "+234-123-45678",
      email: "academics@sunshineacademy.edu",
      description: "Curriculum and academic program questions"
    },
    {
      name: "Student Services",
      phone: "+234-123-45678",
      email: "studentservices@sunshineacademy.edu",
      description: "Student support and counseling services"
    },
    {
      name: "Finance Office",
      phone: "+234-123-45678",
      email: "finance@sunshineacademy.edu",
      description: "Tuition and financial aid information"
    }
  ];

  const socialMedia = [
    { icon: <FaFacebookF />, name: "Facebook", link: "https://facebook.com/sunshineacademy", color: "bg-blue-600" },
    { icon: <FaInstagram />, name: "Instagram", link: "https://instagram.com/sunshineacademy", color: "bg-pink-600" },
    { icon: <FaTwitter />, name: "Twitter", link: "https://twitter.com/sunshineacademy", color: "bg-sky-500" },
    { icon: <FaLinkedinIn />, name: "LinkedIn", link: "https://linkedin.com/school/sunshineacademy", color: "bg-blue-700" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pt-20">
      <section id="contact" className="relative py-16 px-5 sm:px-8 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl drop-shadow-xl sm:text-5xl md:text-6xl font-bold mb-6">
              Contact <span className="text-yellow-300">Sunshine Academy</span>
            </h1>
            <p className="text-xl sm:text-2xl max-w-3xl mx-auto opacity-90">
              We're here to help! Reach out to us with any questions about our programs, admissions, or campus life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Content */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-6"
            >
              {/* School Image */}
              <div className="bg-white rounded-md p-6 shadow-lg border border-blue-100">
                <img 
                  src={'https://img.freepik.com/premium-photo/old-paper-mill-used-produce-paper-world-war-ii-kanchanaburi-thailand_1048944-21805620.jpg?_gl=1*59kttd*_gcl_au*OTA5NDk4NDAzLjE3NjE5NzY2MTI.*_ga*MTI5NzcwNDQxNC4xNzYxOTc2NjIy*_ga_QWX66025LC*czE3NjIwMzIzMDUkbzIkZzEkdDE3NjIwMzM3MDEkajIxJGwwJGgw'} 
                  alt="Sunshine Academy Campus" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Sunshine Academy</h3>
                <p className="text-blue-700">
                  Where every child shines bright through quality education and caring guidance.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-md p-6 shadow-lg border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0 mt-1">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-blue-900 mb-2">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-blue-700 text-sm mb-1">{detail}</p>
                        ))}
                        <a 
                          href={info.link} 
                          className="text-blue-600 hover:text-yellow-500 font-medium text-sm transition-colors inline-flex items-center gap-1 mt-2"
                        >
                          {info.linkText}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-md p-6 shadow-lg border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white p-3 rounded-md text-center hover:opacity-90 transition-opacity hover:scale-105 transform duration-200`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {social.icon}
                        <span className="text-sm font-medium">{social.name}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form and Departments */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Contact Form */}
              <div className="bg-white rounded-md p-8 shadow-lg border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-md flex items-center justify-center">
                    <FaPaperPlane className="text-yellow-500 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-blue-900">Send Us a Message</h2>
                    <p className="text-blue-700">We typically respond within 24 hours</p>
                  </div>
                </div>

                <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-blue-900 font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full border-2 border-blue-200 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-blue-900 font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full border-2 border-blue-200 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-blue-900 font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="user_phone"
                        value={formData.user_phone}
                        onChange={handleInputChange}
                        placeholder="+234-123-45678"
                        className="w-full  border-2 border-blue-200 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-900 font-medium mb-2">Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full  border-2 border-blue-200 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="admissions">Admissions Inquiry</option>
                        <option value="academics">Academic Programs</option>
                        <option value="tour">Schedule Campus Tour</option>
                        <option value="financial">Financial Aid</option>
                        <option value="general">General Information</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-blue-900 font-medium mb-2">Student Grade Level (if applicable)</label>
                    <select
                      name="grade_level"
                      value={formData.grade_level}
                      onChange={handleInputChange}
                      className="w-full  border-2 border-blue-200 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    >
                      <option value="">Select Grade Level</option>
                      <option value="preschool">Preschool (Ages 3-4)</option>
                      <option value="pre-k">Pre-Kindergarten (Ages 4-5)</option>
                      <option value="k">Kindergarten</option>
                      <option value="1">1st Grade</option>
                      <option value="2">2nd Grade</option>
                      <option value="3">3rd Grade</option>
                      <option value="4">4th Grade</option>
                      <option value="5">5th Grade</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-blue-900 font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you today..."
                      rows={6}
                      className="w-full  border-2 border-blue-200 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-4 px-6 rounded-md shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
                  >
                    {loading ? (
                      <>
                       <FaSpinner className="animate-spin-clockwise animate-iteration-count-infinite"/>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane /> Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>

              {/* Department Contacts */}
              <div className="bg-white rounded-md p-8 shadow-lg border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Department Contacts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {departments.map((dept, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-blue-50 rounded-md p-6 hover:shadow-md transition-shadow border border-blue-200"
                    >
                      <h3 className="text-lg font-bold text-blue-900 mb-2">{dept.name}</h3>
                      <p className="text-blue-700 text-sm mb-3">{dept.description}</p>
                      <div className="space-y-1">
                        <a href={`tel:${dept.phone}`} className="block text-blue-600 hover:text-yellow-500 transition-colors">
                          {dept.phone}
                        </a>
                        <a href={`mailto:${dept.email}`} className="block text-blue-600 truncate hover:text-yellow-500 transition-colors text-sm">
                          {dept.email}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Campus Map Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="bg-white rounded-md p-8 shadow-lg border border-blue-100">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Visit Our Campus</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Map Information */}
                <div className="bg-blue-50 rounded-md p-8 text-center border border-blue-200">
                  <div className="w-16 h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-4">
                    <FaMapMarkerAlt className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Campus Location</h3>
                  <p className="text-blue-700 mb-4">
                    123 Sunshine Avenue, Education City<br />
                    EC 12345, Abuja Nigeria
                  </p>
                  <motion.a
                    href="https://maps.google.com/maps?q=123+Sunshine+Avenue,+Education+City,+Abuja+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors"
                  >
                    <FaMapMarkerAlt /> Open in Google Maps
                  </motion.a>
                </div>

                {/* Google Maps Iframe */}
                <div className="rounded-md overflow-hidden shadow-lg border border-blue-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.715208328057!2d7.489268275019336!3d9.012299988150003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b292d8b6d9d%3A0x1e9b90c1c8f0e1b8!2sAbuja%2C%20Federal%20Capital%20Territory%2C%20Nigeria!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sunshine Academy Campus Location"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Action Banner */}
      <section className="py-12 px-5 sm:px-8 bg-gradient-to-r from-yellow-500 to-yellow-500 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Schedule a Campus Tour?</h2>
          <p className="text-xl mb-6 opacity-90">
            See our facilities and meet our teachers in person.
          </p>
          <a href="#contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-yellow-600 px-8 py-4 rounded-md font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Schedule Your Tour Today
          </motion.button>
          </a>
        </div>
      </section>
    </div>
  );
}