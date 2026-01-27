import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Heart } from 'lucide-react';

interface LetterProps {
  onComplete: () => void;
}

const Letter: React.FC<LetterProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-aesthetic p-6 relative overflow-hidden">
        
      {/* Background Decor */}
      <motion.div 
        animate={{ y: [-10, 10, -10] }} 
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 left-10 text-pink-200 opacity-50"
      >
        <Heart size={40} />
      </motion.div>
       <motion.div 
        animate={{ y: [10, -10, 10] }} 
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-20 right-10 text-green-200 opacity-50"
      >
        <Heart size={30} />
      </motion.div>

      {!isOpen ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="cursor-pointer z-10"
          onClick={() => setIsOpen(true)}
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-12 rounded-[2rem] shadow-xl border border-pink-50 w-80 h-64 flex flex-col items-center justify-center relative group"
          >
             {/* Envelope Seal */}
             <div className="bg-pink-100 p-4 rounded-full mb-6 group-hover:bg-pink-200 transition-colors">
                <Mail size={40} className="text-pink-400" />
             </div>
             <p className="font-serif-title text-2xl text-gray-700 italic">For You</p>
             <p className="font-sans-body text-xs text-gray-400 mt-2 tracking-widest uppercase">Tap to open</p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-md max-w-lg p-12 rounded-[2rem] shadow-lg border border-white text-center z-10"
        >
          <div className="mb-8">
             <Heart size={24} className="text-pink-300 mx-auto mb-4" fill="currentColor" />
             <h3 className="font-serif-title text-4xl text-gray-800 mb-2">A Note</h3>
             <div className="w-12 h-1 bg-green-100 mx-auto rounded-full"></div>
          </div>
          
          <p className="font-serif-title italic text-xl text-gray-600 leading-loose mb-10">
            "Happy Birthday to the most amazing person I know. I hope this little surprise brings a smile to your face!"
          </p>
          
          <button
            onClick={onComplete}
            className="bg-gray-800 text-white py-4 px-10 rounded-full shadow-lg flex items-center gap-3 mx-auto hover:bg-gray-700 transition-colors font-sans-body text-sm tracking-widest uppercase"
          >
            Continue <ArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Letter;