
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { Education as EduType } from '../types';

const educationData: EduType[] = [
  {
    degree: 'B.Tech – Artificial Intelligence & Data Science',
    institution: 'Kongunadu College of Engineering and Technology, Trichy',
    period: '3rd Year',
    grade: 'CGPA: 7.3'
  },
  {
    degree: 'Higher Secondary Education',
    institution: 'Sri Vidya Mandir Matriculation Higher Secondary School, Rasipuram',
    period: '2023',
    grade: '77%'
  }
];

const Education: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-white">Academic Background</h2>
        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {educationData.map((edu, idx) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="p-8 rounded-3xl bg-gray-900/50 border border-white/5 shadow-xl hover:border-blue-500/30 hover:bg-gray-900 transition-all cursor-default group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                <GraduationCap size={28} />
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 group-hover:border-green-400 transition-colors">
                <Award size={14} />
                <span className="text-xs font-bold">{edu.grade}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-100 mb-2 leading-tight group-hover:text-blue-400 transition-colors">
              {edu.degree}
            </h3>
            <p className="text-gray-400 font-medium mb-4">{edu.institution}</p>
            <span className="text-sm text-gray-500 bg-gray-800 px-3 py-1 rounded-lg border border-white/5 group-hover:text-gray-300 transition-colors">
              {edu.period}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;
