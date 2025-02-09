import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ message, type = 'success', onClose }) => {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50`}
      >
        <div className="flex items-center space-x-2">
          <span>{message}</span>
          <button onClick={onClose} className="ml-2 hover:opacity-75">✕</button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;
