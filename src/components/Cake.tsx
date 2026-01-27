import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Wind, Heart, Sparkles } from 'lucide-react';
import { useBlowDetection } from '../hooks/useBlowDetection';
import Confetti from 'react-confetti';

interface CakeProps {
  onComplete: () => void;
}

const Strawberry = ({ className }: { className?: string }) => (
  <div className={`relative w-6 h-7 bg-red-400 rounded-b-full rounded-t-lg shadow-inner ${className}`}>
    <div className="absolute top-2 left-1 w-0.5 h-0.5 bg-yellow-100 rounded-full opacity-60" />
    <div className="absolute top-4 left-3 w-0.5 h-0.5 bg-yellow-100 rounded-full opacity-60" />
    <div className="absolute top-3 right-1.5 w-0.5 h-0.5 bg-yellow-100 rounded-full opacity-60" />
    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 flex">
        <div className="w-2 h-2 bg-green-400 rounded-full -ml-1" />
        <div className="w-2 h-2 bg-green-400 rounded-full" />
        <div className="w-2 h-2 bg-green-400 rounded-full -mr-1" />
    </div>
  </div>
);

const Cake: React.FC<CakeProps> = ({ onComplete }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isCut, setIsCut] = useState(false);
  const [blowCount, setBlowCount] = useState(0);
  const { isBlowing, startListening, hasPermission } = useBlowDetection(candlesLit);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isBlowing && candlesLit) {
      setBlowCount(prev => prev + 1);
    }
  }, [isBlowing, candlesLit]);

  useEffect(() => {
    if (blowCount > 20) {
      setCandlesLit(false);
    }
  }, [blowCount]);

  const handleCut = () => {
    if (!candlesLit && !isCut) {
      setIsCut(true);
      setShowConfetti(true);
      setShowMessage(true);
      
      setTimeout(() => setShowMessage(false), 3000);
      setTimeout(() => {
        onComplete();
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-aesthetic overflow-hidden relative touch-none select-none">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
           <motion.div
             key={i}
             initial={{ y: "100vh", opacity: 0 }}
             animate={{ y: "-10vh", opacity: [0, 0.5, 0] }}
             transition={{ 
               duration: Math.random() * 10 + 10, 
               repeat: Infinity, 
               delay: Math.random() * 5,
               ease: "linear"
             }}
             className="absolute"
             style={{ left: `${Math.random() * 100}%` }}
           >
              {i % 2 === 0 ? <Heart size={20} className="text-pink-200" /> : <Sparkles size={16} className="text-yellow-100" />}
           </motion.div>
        ))}
      </div>

      {showConfetti && (
        <Confetti 
            recycle={false} 
            numberOfPieces={400} 
            colors={['#fbcfe8', '#f9a8d4', '#fce7f3', '#ffffff', '#bbf7d0']} 
            gravity={0.2}
        />
      )}
      
      <motion.div 
        layout
        className="text-center mb-16 z-10 px-6 max-w-md"
      >
        <h2 className="font-serif-title text-4xl text-gray-800 mb-3 tracking-wide">
          {candlesLit ? "Make a Wish" : !isCut ? "Cut the Cake" : ""}
        </h2>
        <p className="font-sans-body text-gray-500 font-light tracking-widest text-sm uppercase">
          {candlesLit ? "Close your eyes & blow" : !isCut ? "Tap to serve the first slice" : ""}
        </p>
      </motion.div>

      <div className="relative cursor-pointer mt-8" onClick={handleCut}>
        <AnimatePresence>
            {showMessage && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: -120, scale: 1 }}
                    exit={{ opacity: 0, y: -150 }}
                    transition={{ duration: 1.2, type: "spring" }}
                    className="absolute top-0 left-0 right-0 z-50 text-center pointer-events-none"
                >
                    <span className="font-serif-title italic text-5xl text-pink-500 drop-shadow-sm">
                        Happy Birthday!
                    </span>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="relative transform scale-110 md:scale-125">
            <div className="flex gap-8 absolute -top-24 left-1/2 transform -translate-x-1/2 z-20">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center relative">
                    {candlesLit && (
                        <motion.div
                        animate={{ scale: [1, 1.15, 1], rotate: [-2, 2, -2], opacity: [0.9, 1, 0.8] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.3 }}
                        className="w-4 h-6 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full mb-1 shadow-[0_0_20px_rgba(255,200,100,0.6)] mix-blend-screen origin-bottom absolute -top-6"
                        />
                    )}
                    <div className="w-2 h-16 bg-gradient-to-b from-pink-100 to-pink-200 border-x border-white/50 rounded-sm shadow-sm" />
                </div>
            ))}
            </div>

            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-48 flex justify-between px-2 z-10">
                <Strawberry className="transform -rotate-12" />
                <Strawberry className="transform translate-y-1" />
                <Strawberry className="transform rotate-12" />
            </div>
            
            <div className="relative drop-shadow-xl">
                <motion.div 
                    animate={isCut ? { x: -20, rotate: -3 } : {}}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="w-56 h-24 bg-white rounded-t-3xl relative z-20 overflow-hidden"
                >
                    <div className="absolute top-0 w-full h-full bg-pink-50/30"></div>
                </motion.div>
                
                <motion.div
                    animate={isCut ? { x: -20, rotate: -3 } : {}}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="w-56 h-4 bg-pink-300 relative z-20"
                />

                <motion.div 
                     animate={isCut ? { x: 20, rotate: 3 } : {}}
                     transition={{ type: "spring", stiffness: 80, damping: 15 }}
                     className="w-64 h-28 bg-[#fff0f5] rounded-b-2xl relative z-10 -mt-2 mx-auto flex items-center justify-center border-t border-pink-100"
                >
                   <div className="absolute bottom-4 w-full flex justify-around px-4">
                      {[...Array(6)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-white rounded-full shadow-sm" />
                      ))}
                   </div>
                </motion.div>
            </div>

            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-0">
                <div className="w-72 h-4 bg-gray-100 rounded-full shadow-md border border-gray-200" />
                <div className="w-4 h-12 bg-gray-100 border-x border-gray-300" />
                <div className="w-32 h-3 bg-gray-100 rounded-full shadow-lg border border-gray-200" />
            </div>
        </div>
      </div>

      {candlesLit && (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="mt-28 flex flex-col items-center gap-4 z-10 w-full px-8"
        >
          {!hasPermission && (
            <button 
              onClick={startListening}
              className="bg-white/90 backdrop-blur-sm text-pink-500 px-6 py-3 rounded-full shadow-md border border-pink-100 flex items-center gap-2 active:scale-95 transition-transform font-sans-body text-sm font-medium tracking-wide hover:bg-pink-50"
            >
              <Mic size={18} /> Enable Microphone
            </button>
          )}
          
          {isBlowing && (
            <div className="flex items-center gap-2 text-pink-400 font-sans-body text-sm font-medium animate-pulse bg-white/60 px-4 py-1 rounded-full">
              <Wind size={16} /> Good job! Keep blowing!
            </div>
          )}
          
          <button 
             onClick={() => setBlowCount(30)}
             className="text-gray-400 text-xs mt-2 p-2 hover:text-pink-400 transition-colors font-sans-body underline decoration-dotted"
          >
            (Tap if mic doesn't work)
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Cake;
