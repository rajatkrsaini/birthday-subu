import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Wind, Sparkles, Star, PartyPopper } from 'lucide-react';
import { useBlowDetection } from '../hooks/useBlowDetection';
import Confetti from 'react-confetti';

interface CakeProps {
  onComplete: () => void;
}

// --- Decorative Components ---

const Bunting = () => {
  const colors = ['bg-pink-300', 'bg-purple-300', 'bg-yellow-300', 'bg-blue-300', 'bg-green-300'];
  return (
    <div className="absolute top-0 left-0 w-full h-32 overflow-hidden pointer-events-none z-0">
      <div className="flex justify-center items-start gap-1 md:gap-4 -mt-4">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ rotate: -5, transformOrigin: 'top center' }}
            animate={{ rotate: 5 }}
            transition={{ duration: 2 + i * 0.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="relative"
          >
            {/* String segment */}
            <div className="absolute -top-2 -left-1/2 w-[120%] h-[2px] bg-gray-300 rotate-12" />
            {/* Flag */}
            <div className={`w-8 h-10 md:w-12 md:h-14 ${colors[i % colors.length]} rounded-b-full shadow-sm mx-1`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Table = () => (
  <div className="absolute bottom-0 w-full h-[25vh] bg-[#fdf2f8] border-t-4 border-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-0 flex items-center justify-center">
     <div className="w-full h-full opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
  </div>
);

// --- Cake Parts ---

const Candle = ({ lit, delay }: { lit: boolean; delay: number }) => (
  <div className="relative flex flex-col items-center -mt-12 mx-1 md:mx-3">
    {/* Flame */}
    <AnimatePresence>
      {lit && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-6 w-4 h-6 z-20"
        >
           <motion.div 
             animate={{ scale: [1, 1.2, 0.9, 1], rotate: [-2, 2, -1, 0] }}
             transition={{ duration: 0.8, repeat: Infinity, delay }}
             className="w-full h-full bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-100 rounded-full shadow-[0_0_15px_rgba(255,180,50,0.8)] blur-[1px]" 
           />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-blue-400 rounded-full opacity-60 blur-sm"></div>
        </motion.div>
      )}
    </AnimatePresence>
    
    {/* Wick */}
    <div className="w-0.5 h-3 bg-gray-800 mb-0 relative z-10" />
    
    {/* Body */}
    <div className="w-3 h-14 bg-gradient-to-r from-pink-100 to-white border border-pink-200 rounded-sm shadow-sm flex flex-col justify-evenly overflow-hidden relative z-10">
       <div className="w-full h-2 bg-pink-300/30 -rotate-12 scale-150"></div>
       <div className="w-full h-2 bg-pink-300/30 -rotate-12 scale-150"></div>
       <div className="w-full h-2 bg-pink-300/30 -rotate-12 scale-150"></div>
       <div className="w-full h-2 bg-pink-300/30 -rotate-12 scale-150"></div>
    </div>
  </div>
);

const Strawberry = ({ style }: { style?: React.CSSProperties }) => (
  <div className="w-6 h-7 md:w-8 md:h-9 bg-red-500 rounded-b-2xl rounded-t-lg relative shadow-inner shrink-0 transform hover:scale-110 transition-transform" style={style}>
     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-0.5">
        <div className="w-2 h-3 bg-green-500 rounded-full rotate-45 border border-green-700/20"></div>
        <div className="w-2 h-3 bg-green-500 rounded-full -rotate-45 -ml-1 border border-green-700/20"></div>
     </div>
     <div className="w-full h-full opacity-30 bg-[radial-gradient(#fca5a5_1px,transparent_1px)] [background-size:4px_4px] rounded-b-2xl"></div>
  </div>
);

const CreamDollop = () => (
    <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full shadow-sm border-b-2 border-gray-100 flex items-center justify-center">
        <div className="w-1 h-1 bg-pink-100 rounded-full blur-[1px]"></div>
    </div>
)

// --- Main Component ---

const Cake: React.FC<CakeProps> = ({ onComplete }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isCut, setIsCut] = useState(false);
  const [blowCount, setBlowCount] = useState(0);
  const { isBlowing, startListening, hasPermission } = useBlowDetection(candlesLit);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Audio detection logic
  useEffect(() => {
    if (isBlowing && candlesLit) {
      setBlowCount(prev => prev + 1);
    }
  }, [isBlowing, candlesLit]);

  useEffect(() => {
    if (blowCount > 40) { // Increased threshold slightly for realism
      setCandlesLit(false);
    }
  }, [blowCount]);

  const handleCut = () => {
    if (!candlesLit && !isCut) {
      setIsCut(true);
      setShowConfetti(true);
      
      // Delay navigation to let animation play
      setTimeout(() => {
        onComplete();
      }, 4500);
    }
  };

  return (
    <div className="min-h-dvh bg-aesthetic overflow-hidden relative flex flex-col items-center select-none cursor-default">
      {/* Environment */}
      <Bunting />
      <Table />
      
      {showConfetti && (
        <Confetti 
            recycle={false} 
            numberOfPieces={600} 
            gravity={0.15}
            colors={['#f472b6', '#fb7185', '#fde047', '#ffffff']}
        />
      )}

      {/* Floating Sparkles Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5], y: -100 }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                className="absolute text-yellow-300"
                style={{ left: `${10 + Math.random() * 80}%`, top: `${20 + Math.random() * 60}%` }}
             >
                <Sparkles size={16 + Math.random() * 16} />
             </motion.div>
          ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center w-full max-w-4xl px-4 mb-20">
        
        {/* Header Text */}
        <motion.div 
            layout 
            className="text-center mb-10 md:mb-16 relative"
        >
            <AnimatePresence mode='wait'>
                {candlesLit ? (
                    <motion.div 
                        key="wish"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <h2 className="font-serif-title text-4xl md:text-5xl text-gray-800">Make a Wish</h2>
                        <p className="font-sans-body text-gray-500 uppercase tracking-[0.2em] text-sm">Blow into your mic</p>
                        
                        {/* Audio Indicator */}
                        <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden mt-2 border border-white/50 shadow-inner">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-pink-300 to-purple-300"
                                animate={{ width: isBlowing ? '100%' : '5%' }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                    </motion.div>
                ) : !isCut ? (
                    <motion.div 
                        key="cut"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <h2 className="font-serif-title text-4xl md:text-5xl text-gray-800">Cut the Cake</h2>
                        <div className="flex items-center gap-2 text-pink-400 bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100">
                           <PartyPopper size={18} />
                           <span className="font-sans-body uppercase tracking-wider text-xs font-bold">Tap the cake</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="yay"
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center"
                    >
                        <h2 className="font-serif-title text-5xl md:text-6xl text-pink-500 drop-shadow-sm">Yay!</h2>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>

        {/* CAKE CONTAINER */}
        <div className="relative mt-8 group cursor-pointer" onClick={handleCut}>
            
            {/* Hidden Surprise Text Behind Cake */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isCut ? { opacity: 1, scale: 1, y: -80 } : {}}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                >
                     <p className="font-serif-title text-3xl text-pink-500 italic">Happy Birthday</p>
                     <p className="font-sans-body text-sm text-gray-400 tracking-widest uppercase mt-1">Subu qt</p>
                </motion.div>
            </div>

            {/* Knife Effect */}
            <AnimatePresence>
                {isCut && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, y: -100, rotate: 45 }}
                        animate={{ opacity: [1, 1, 0], x: [50, 0, 0], y: [-100, 20, 50], rotate: [45, 0, -10] }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                    >
                        <div className="w-2 h-40 bg-gradient-to-b from-gray-300 to-white border border-gray-400 rounded-b-full shadow-xl relative">
                           <div className="absolute top-0 w-4 h-12 bg-rose-900 -left-1 rounded-sm"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Cake Structure - Split in two halves */}
            <div className="relative flex items-end justify-center filter drop-shadow-2xl">
                
                {/* LEFT HALF */}
                <motion.div 
                    animate={isCut ? { x: -40, rotate: -5 } : { x: 0, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    className="flex flex-col items-end relative z-10"
                >
                    {/* Top Tier Left */}
                    <div className="w-24 h-20 bg-[#fff5f5] rounded-tl-2xl border-l border-t border-white relative overflow-visible">
                        {/* Frosting Drip */}
                        <div className="absolute top-0 right-0 w-full h-4 bg-white rounded-bl-xl"></div>
                         {/* Sponge texture inside */}
                        {isCut && <div className="absolute right-0 top-0 h-full w-2 bg-[#fbcfe8] opacity-50"></div>}
                        
                        {/* Toppings & Candles Left */}
                        <div className="absolute -top-4 right-2 flex gap-1 z-20">
                           <Candle lit={candlesLit} delay={0} />
                           <Strawberry style={{ transform: 'rotate(-10deg) scale(0.8)' }} />
                        </div>
                    </div>

                    {/* Bottom Tier Left */}
                    <div className="w-36 h-24 bg-pink-100 rounded-tl-3xl rounded-bl-2xl border-l border-t border-white relative mt-[-1px]">
                         {/* Decorative Line */}
                         <div className="absolute top-1/2 w-full h-1 bg-white/50"></div>
                         {/* Sponge texture inside */}
                         {isCut && <div className="absolute right-0 top-0 h-full w-2 bg-[#f9a8d4] opacity-50"></div>}
                         
                         {/* Toppings on ledge */}
                         <div className="absolute -top-3 right-6 z-20">
                            <CreamDollop />
                         </div>
                    </div>
                </motion.div>

                {/* RIGHT HALF */}
                <motion.div 
                    animate={isCut ? { x: 40, rotate: 5 } : { x: 0, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    className="flex flex-col items-start relative z-10"
                >
                    {/* Top Tier Right */}
                    <div className="w-24 h-20 bg-[#fff5f5] rounded-tr-2xl border-r border-t border-white relative overflow-visible">
                         <div className="absolute top-0 left-0 w-full h-5 bg-white rounded-br-xl"></div>
                         {/* Sponge texture inside */}
                         {isCut && <div className="absolute left-0 top-0 h-full w-2 bg-[#fbcfe8] opacity-50"></div>}
                         
                         {/* Toppings & Candles Right */}
                         <div className="absolute -top-4 left-2 flex gap-1 z-20">
                           <Strawberry style={{ transform: 'rotate(10deg) scale(0.9)' }} />
                           <Candle lit={candlesLit} delay={0.2} />
                        </div>
                    </div>

                    {/* Bottom Tier Right */}
                    <div className="w-36 h-24 bg-pink-100 rounded-tr-3xl rounded-br-2xl border-r border-t border-white relative mt-[-1px]">
                        <div className="absolute top-1/2 w-full h-1 bg-white/50"></div>
                        {/* Sponge texture inside */}
                        {isCut && <div className="absolute left-0 top-0 h-full w-2 bg-[#f9a8d4] opacity-50"></div>}
                        
                         {/* Toppings on ledge */}
                         <div className="absolute -top-3 left-6 z-20">
                            <CreamDollop />
                         </div>
                    </div>
                </motion.div>
            </div>
            
            {/* Cake Plate/Stand Base */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-0">
                <div className="w-80 h-4 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-full shadow-lg border border-gray-200" />
                <div className="w-24 h-12 bg-gradient-to-b from-gray-100 to-gray-200 border-x border-white/50 skew-x-12 opacity-90" />
                <div className="w-48 h-3 bg-gray-200 rounded-full shadow-xl" />
            </div>

        </div>

        {/* Microphone Warning / Controls */}
        {candlesLit && (
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 2 } }}
               className="absolute bottom-10 md:bottom-20"
             >
                {!hasPermission ? (
                    <button 
                        onClick={startListening}
                        className="bg-white/80 backdrop-blur text-pink-500 px-6 py-2 rounded-full shadow-sm text-sm border border-pink-100 hover:bg-white transition-colors flex items-center gap-2"
                    >
                        <Mic size={14} /> Allow Microphone
                    </button>
                ) : (
                    <button 
                        onClick={() => setBlowCount(50)} 
                        className="text-pink-300 text-xs hover:text-pink-500 transition-colors underline decoration-dotted"
                    >
                        (Skip blowing)
                    </button>
                )}
             </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cake;
