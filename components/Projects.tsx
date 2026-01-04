
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Siren, Activity } from 'lucide-react';
import { Project } from '../types';

const projectData: Project[] = [
  {
    title: 'Real-Time Weapon Detection System',
    description: 'Developed a basic AI system to detect weapons using YOLOv8 and Python. Features live camera input processing and automated alert notifications.',
    tags: ['YOLOv8', 'Python', 'Computer Vision', 'Alerting'],
    category: 'Security',
    icon: <Eye size={14} />
  },
  {
    title: 'Smart Women’s Safety Device',
    description: 'Built an IoT-based safety device using ESP32, LoRa, GPS, and GSM module. Sends real-time emergency alerts with exact location details to pre-configured contacts.',
    tags: ['ESP32', 'LoRa', 'IoT', 'Embedded Systems'],
    category: 'Personal Safety',
    icon: <Siren size={14} />
  },
  {
    title: 'Personal Health and Fitness Assistant',
    description: 'Created a mobile application providing personalized workout routines and health tips. Built with Flutter for cross-platform support and FastAPI backend.',
    tags: ['Flutter', 'Python', 'FastAPI', 'HealthTech'],
    category: 'Health Care',
    icon: <Activity size={14} />
  }
];

const Projects: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-white">Featured Projects</h2>
        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectData.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group flex flex-col bg-gray-900/50 rounded-3xl border border-white/5 overflow-hidden hover:bg-gray-900 hover:shadow-2xl hover:border-blue-500/20 transition-all duration-500 p-8 min-h-[300px] relative"
          >
            {/* Background Accent Gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors" />

            <div className="flex flex-col flex-grow">
              <div className="flex items-center space-x-2 mb-4 text-blue-400">
                <div className="p-1.5 bg-blue-500/10 rounded-lg">
                  {project.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{project.category}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-100 mb-3 leading-tight group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-8 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                {project.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-gray-800/50 text-[10px] font-bold text-gray-500 rounded-lg border border-white/5 uppercase tracking-tighter"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;