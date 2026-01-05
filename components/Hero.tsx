
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Cpu, Download, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 64,
        behavior: 'smooth'
      });
    }
  };

  const MyComponent = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'TharaneeshJ_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest"
        >
          Available for Opportunities
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Tharaneesh J
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl text-xl text-gray-400 leading-relaxed mb-10"
        >
          Creative and curious <span className="text-blue-400 font-semibold">AI & Data Science student</span> with a blend of design thinking and technical skills. 
          Passionate about building practical and meaningful solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.div 
            whileHover={{ y: -5, scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.5)' }}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 rounded-full shadow-lg border border-white/5 transition-colors cursor-default"
          >
            <Brain size={18} className="text-blue-400" />
            <span className="text-sm font-medium text-gray-300">AI Projects</span>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5, scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.5)' }}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 rounded-full shadow-lg border border-white/5 transition-colors cursor-default"
          >
            <Cpu size={18} className="text-purple-400" />
            <span className="text-sm font-medium text-gray-300">IoT Systems</span>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5, scale: 1.05, borderColor: 'rgba(99, 102, 241, 0.5)' }}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 rounded-full shadow-lg border border-white/5 transition-colors cursor-default"
          >
            <Code size={18} className="text-indigo-400" />
            <span className="text-sm font-medium text-gray-300">Visual Design</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#1d4ed8' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-2xl shadow-blue-500/20 transition-all border border-blue-400/20"
          >
            <span>Hire Me</span>
            <ArrowRight size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(31, 41, 55, 1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadResume}
            className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-xl border border-white/5 transition-all"
          >
            <Download size={18} className="text-blue-400" />
            <span>Download Resume</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
};

export default Hero;
