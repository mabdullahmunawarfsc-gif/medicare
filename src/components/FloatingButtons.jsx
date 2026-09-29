import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
      <motion.a
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </motion.a>
      <motion.a
        href="tel:080012345"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
        title="Emergency Call"
      >
        <Phone size={24} />
      </motion.a>
    </div>
  );
}
