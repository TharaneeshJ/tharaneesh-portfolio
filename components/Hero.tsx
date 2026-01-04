
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Cpu } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
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
          className="flex flex-wrap justify-center gap-4"
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
      </div>
    </section>
  );
};

export default Hero;
