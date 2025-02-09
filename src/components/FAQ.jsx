import React from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
  const faqs = [
    { 
      q: "Comment fonctionne NAAT ?", 
      a: "NAAT digitalise les tontines traditionnelles en les rendant accessibles via une application mobile." 
    },
    { 
      q: "Est-ce sécurisé ?", 
      a: "Oui, nous utilisons des technologies de pointe pour sécuriser toutes les transactions." 
    },
    { 
      q: "Quels sont les frais ?", 
      a: "NAAT propose un modèle freemium avec des options premium pour plus de fonctionnalités." 
    }
  ];

  return (
    <div className="grid gap-6">
      {faqs.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h3 className="text-lg font-semibold text-blue-600 mb-2">{item.q}</h3>
          <p className="text-gray-600">{item.a}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default FAQ;
