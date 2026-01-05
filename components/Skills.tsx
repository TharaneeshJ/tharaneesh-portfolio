
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Wrench, Users, Languages } from 'lucide-react';
import { SkillCategory } from '../types';

const skillCategories: (SkillCategory & { icon: React.ReactNode })[] = [
  {
    title: 'Technical Skills',
    icon: <Code2 size={24} />,
    skills: ['Java', 'Python']
  },
  {
    title: 'Tools',
    icon: <Wrench size={24} />,
    skills: ['Canva', 'MS Excel', 'Power BI', 'Tableau']
  },
  {
    title: 'Soft Skills',
    icon: <Users size={24} />,
    skills: ['Creativity', 'Problem Solving', 'Adaptability', 'Time Management', 'Teamwork']
  },
  {
    title: 'Languages',
    icon: <Languages size={24} />,
    skills: ['English', 'Tamil']
  }
];

const Skills: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-white">Core Competencies</h2>
        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)"
            }}
            className="p-8 rounded-2xl bg-gray-900/50 border border-white/5 hover:border-blue-500/40 hover:bg-gray-900 transition-all duration-300 group cursor-default"
          >
            <div className="text-blue-400 mb-6 bg-gray-800 w-12 h-12 flex items-center justify-center rounded-xl shadow-inner group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
              {cat.icon}
            </div>
            <h3 className="text-lg font-bold mb-4 text-gray-100 group-hover:text-blue-400 transition-colors">{cat.title}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map(skill => (
                <motion.span 
                  key={skill}
                  whileHover={{ scale: 1.1, backgroundColor: '#1f2937' }}
                  className="px-3 py-1 bg-gray-800 text-xs font-medium text-gray-400 rounded-lg border border-white/5 transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
