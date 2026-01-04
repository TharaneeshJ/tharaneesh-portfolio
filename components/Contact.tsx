
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:tharaneeshj@gmail.com?subject=Inquiry from Portfolio";
  };

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/tharaneeshj", "_blank");
  };

  const handleGithubClick = () => {
    window.open("https://github.com/TharaneeshJ", "_blank");
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+917395936932";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          Let's connect and build something <span className="text-blue-400">incredible</span> together.
        </h2>
        <p className="text-gray-400 text-lg mb-16 leading-relaxed max-w-2xl mx-auto">
          I'm currently seeking opportunities to apply my AI and Data Science skills to real-world challenges. 
          Feel free to reach out for collaborations or just a friendly chat about tech!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Email Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={handleEmailClick}
            className="flex flex-col items-center p-8 bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] group hover:border-blue-400/30 transition-all cursor-pointer"
          >
            <div className="w-14 h-14 mb-4 flex items-center justify-center bg-gray-950 rounded-2xl text-blue-400 border border-white/5 group-hover:bg-blue-400 group-hover:text-white transition-all shadow-lg">
              <Mail size={28} />
            </div>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Email Me</p>
            <span className="text-sm text-white group-hover:text-blue-400 transition-colors break-all mb-4">
              tharaneeshj@gmail.com
            </span>
            <div className="mt-auto flex items-center space-x-2 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
              <span>Send Message</span>
              <Send size={12} />
            </div>
          </motion.div>

          {/* 2. LinkedIn Card (Network) */}
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={handleLinkedInClick}
            className="flex flex-col items-center p-8 bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] group hover:border-blue-600/30 transition-all cursor-pointer"
          >
            <div className="w-14 h-14 mb-4 flex items-center justify-center bg-gray-950 rounded-2xl text-blue-600 border border-white/5 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
              <Linkedin size={28} />
            </div>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Network</p>
            <span className="text-sm text-white group-hover:text-blue-400 transition-colors mb-4">
              LinkedIn Profile
            </span>
            <div className="mt-auto flex items-center space-x-2 text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>View Profile</span>
              <Linkedin size={12} />
            </div>
          </motion.div>

          {/* 3. GitHub Card (Source Code) */}
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={handleGithubClick}
            className="flex flex-col items-center p-8 bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] group hover:border-gray-400/30 transition-all cursor-pointer"
          >
            <div className="w-14 h-14 mb-4 flex items-center justify-center bg-gray-950 rounded-2xl text-gray-400 border border-white/5 group-hover:bg-white group-hover:text-gray-950 transition-all shadow-lg">
              <Github size={28} />
            </div>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Source Code</p>
            <span className="text-sm text-white group-hover:text-gray-300 transition-colors mb-4">
              GitHub Profile
            </span>
            <div className="mt-auto flex items-center space-x-2 text-xs font-semibold text-gray-400 group-hover:translate-x-1 transition-transform">
              <span>View Projects</span>
              <Github size={12} />
            </div>
          </motion.div>

          {/* 4. Phone Card (Call Me) */}
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={handlePhoneClick}
            className="flex flex-col items-center p-8 bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] group hover:border-emerald-400/30 transition-all cursor-pointer"
          >
            <div className="w-14 h-14 mb-4 flex items-center justify-center bg-gray-950 rounded-2xl text-emerald-400 border border-white/5 group-hover:bg-emerald-400 group-hover:text-white transition-all shadow-lg">
              <Phone size={28} />
            </div>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Call Me</p>
            <span className="text-sm text-white group-hover:text-emerald-400 transition-colors mb-4">
              +91 73959 36932
            </span>
            <div className="mt-auto flex items-center space-x-2 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Call Now</span>
              <Phone size={12} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
