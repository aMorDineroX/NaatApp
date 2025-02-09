import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => (
  <div className="grid md:grid-cols-3 gap-8">
    {[
      { name: "Fatou D.", role: "Utilisatrice", text: "NAAT a révolutionné ma façon de gérer mes tontines." },
      { name: "Mohamed S.", role: "Entrepreneur", text: "Une solution innovante qui répond à un vrai besoin." },
      { name: "Sophie M.", role: "Diaspora", text: "Enfin une application qui facilite l'épargne collaborative!" }
    ].map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="text-blue-600 text-4xl mb-4">"</div>
        <p className="text-gray-600 italic mb-4">{item.text}</p>
        <div className="font-semibold">{item.name}</div>
        <div className="text-gray-500 text-sm">{item.role}</div>
      </motion.div>
    ))}
  </div>
);

export default Testimonials;
