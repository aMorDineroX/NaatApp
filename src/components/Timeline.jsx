import React from 'react';
import { motion } from 'framer-motion';

const Timeline = () => {
  const events = [
    { year: '2024', title: 'Lancement', desc: 'Lancement officiel de NAAT' },
    { year: '2024 Q2', title: 'Extension', desc: 'Développement dans toute l\'Afrique de l\'Ouest' },
    { year: '2024 Q3', title: 'Innovation', desc: 'Nouvelles fonctionnalités de paiement' },
    { year: '2024 Q4', title: 'International', desc: 'Expansion internationale' }
  ];

  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
      {events.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
        >
          <div className="w-1/2"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
          <div className="w-1/2 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-blue-600">{item.year}</h3>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
