import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, PartyPopper } from 'lucide-react';
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
            <div className="absolute -top-2 -left-1/2 w-[120%] h-[2px] bg-gray-300 rotate-12" />
            <div className={`w-8 h-10 md:w-12 md:h-14 ${colors[i % colors.length]} rounded-b-full shadow-sm mx-1`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Table = () => (
  <div className="absolute bottom-0 w-full h-[25vh] bg-[#fdf2f8] border-t-4 border-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-0 flex items-center justify-center">
    <div className="w-full h-full opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
  </div>
);

const BowDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 70" className={className}>
    <path
      d="M35 35c-15 0-30-10-30-20S20 0 35 10c10 7 17 17 25 25-8 8-15 18-25 25C20 70 5 60 5 50s15-15 30-15zm50 0c15 0 30-10 30-20S100 0 85 10c-10 7-17 17-25 25 8 8 15 18 25 25 15 10 30 0 30-10S100 35 85 35z"
      fill="rgba(255,255,255,0.75)"
    />
    <circle cx="60" cy="35" r="10" fill="rgba(255,255,255,0.8)" />
  </svg>
);

// --- Cake Parts ---

const Candle = ({ lit, delay }: { lit: boolean; delay: number }) => (
  <div className="relative flex flex-col items-center -mt-12 mx-1 md:mx-3">
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-blue-400 rounded-full opacity-60 blur-sm" />
        </motion.div>
      )}
    </AnimatePresence>

    <div className="w-0.5 h-3 bg-gray-800 mb-0 relative z-10" />
    <div className="w-3 h-14 bg-gradient-to-r from-pink-100 to-white border border-pink-200 rounded-sm shadow-sm flex flex-col justify-evenly overflow-hidden relative z-10">
      <div className="w-full h-2 bg-pink-300/30 -rotate-12 scale-150" />
      <div className="w-full h-2 bg-pink-300/30 -rotate-12 scale-150" />
      <div className="w-full h-2 bg-pink-300/30 -rotate-12 scale-150" />
      <div className="w-full h-2 bg-pink-300/30 -rotate-12 scale-150" />
    </div>
  </div>
);

const Strawberry = ({ style }: { style?: React.CSSProperties }) => (
  <div
    className="w-6 h-7 md:w-8 md:h-9 bg-red-500 rounded-b-2xl rounded-t-lg relative shadow-inner shrink-0 transform hover:scale-110 transition-transform"
    style={style}
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-0.5">
      <div className="w-2 h-3 bg-green-500 rounded-full rotate-45 border border-green-700/20" />
      <div className="w-2 h-3 bg-green-500 rounded-full -rotate-45 -ml-1 border border-green-700/20" />
    </div>
    <div className="w-full h-full opacity-30 bg-[radial-gradient(#fca5a5_1px,transparent_1px)] [background-size:4px_4px] rounded-b-2xl" />
  </div>
);

const CreamDollop = () => (
  <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full shadow-sm border-b-2 border-gray-100 flex items-center justify-center">
    <div className="w-1 h-1 bg-pink-100 rounded-full blur-[1px]" />
  </div>
);

// --- Main Component ---

const Cake: React.FC<CakeProps> = ({ onComplete }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isCut, setIsCut] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCakeTap = () => {
    if (isCut) return;

    if (candlesLit) {
      setCandlesLit(false);
      return;
    }

    setIsCut(true);
    setShowConfetti(true);

    setTimeout(() => {
      onComplete();
    }, 4200);
  };

  return (
    <div className="min-h-dvh bg-aesthetic overflow-hidden relative flex flex-col items-center select-none cursor-default">
      <Bunting />
      <Table />

      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={650}
          gravity={0.14}
          colors={['#f472b6', '#fb7185', '#fde047', '#ffffff', '#c4b5fd']}
        />
      )}

      {/* Girly Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* pastel blobs */}
        <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute top-10 -right-40 w-[36rem] h-[36rem] rounded-full bg-purple-200/20 blur-3xl" />
        <div className="absolute -bottom-44 left-1/3 w-[40rem] h-[40rem] rounded-full bg-amber-200/18 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] rounded-full bg-rose-200/16 blur-3xl" />

        {/* soft dots */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 0)',
            backgroundSize: '18px 18px',
          }}
        />

        {/* floating hearts + stars */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: [0, 0.55, 0], y: [-10, -90, -160] }}
            transition={{ duration: 5 + i * 0.35, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
            className="absolute"
            style={{
              left: `${8 + Math.random() * 84}%`,
              top: `${30 + Math.random() * 55}%`,
            }}
          >
            {i % 2 === 0 ? (
              <Heart size={18 + Math.random() * 14} className="text-pink-300/70" />
            ) : (
              <Star size={16 + Math.random() * 14} className="text-yellow-300/70" />
            )}
          </motion.div>
        ))}

        {/* bows */}
        <div className="absolute top-40 left-10 opacity-[0.18] rotate-12">
          <BowDoodle className="w-16 h-10" />
        </div>
        <div className="absolute top-56 right-12 opacity-[0.14] -rotate-12">
          <BowDoodle className="w-14 h-9" />
        </div>

        {/* sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.85, 0], scale: [0.7, 1.05, 0.7], y: -90 }}
            transition={{ duration: 3.2 + i * 0.3, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut' }}
            className="absolute text-yellow-300"
            style={{ left: `${10 + Math.random() * 80}%`, top: `${20 + Math.random() * 60}%` }}
          >
            <Sparkles size={14 + Math.random() * 16} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center w-full max-w-4xl px-4 mb-20">
        {/* Header Text */}
        <motion.div layout className="text-center mb-10 md:mb-16 relative">
          <AnimatePresence mode="wait">
            {candlesLit ? (
              <motion.div
                key="tap-blow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-3"
              >
                <h2 className="font-serif-title text-4xl md:text-5xl text-gray-800">Make a Wish</h2>
                <div className="flex items-center gap-2 text-pink-400 bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100 shadow-sm">
                  <PartyPopper size={18} />
                  <span className="font-sans-body uppercase tracking-widest text-xs font-bold">Tap the cake to blow candles</span>
                </div>
              </motion.div>
            ) : !isCut ? (
              <motion.div
                key="tap-cut"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-3"
              >
                <h2 className="font-serif-title text-4xl md:text-5xl text-gray-800">Cut the Cake</h2>
                <div className="flex items-center gap-2 text-purple-500 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100 shadow-sm">
                  <PartyPopper size={18} />
                  <span className="font-sans-body uppercase tracking-widest text-xs font-bold">Tap again to cut</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="yay"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <h2 className="font-serif-title text-5xl md:text-6xl text-pink-500 drop-shadow-sm">Yay!</h2>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CAKE CONTAINER */}
        <div className="relative mt-8 group cursor-pointer" onClick={handleCakeTap}>
          {/* Hidden Surprise Text Behind Cake */}
          <div className="absolute left-1/2 -translate-x-1/2 w-full text-center z-0 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isCut ? { opacity: 1, scale: 1, y: -120 } : { opacity: 0, scale: 0.85, y: -110 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 120, damping: 16 }}
              className="relative"
            >
              <div className="absolute inset-0 blur-2xl opacity-60 bg-gradient-to-r from-pink-300/35 via-purple-300/35 to-amber-200/35 rounded-full" />
              <p className="relative font-serif-title text-3xl md:text-4xl text-rose-500 italic drop-shadow-sm">
                Happy Birthday
              </p>
              <p className="relative font-sans-body text-xs md:text-sm text-gray-500 tracking-[0.35em] uppercase mt-2">
                Subu qt
              </p>
            </motion.div>
          </div>

          {/* Knife Effect */}
          <AnimatePresence>
            {isCut && (
              <motion.div
                initial={{ opacity: 0, x: 50, y: -100, rotate: 45 }}
                animate={{ opacity: [1, 1, 0], x: [50, 0, 0], y: [-100, 20, 50], rotate: [45, 0, -10] }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
              >
                <div className="w-2 h-40 bg-gradient-to-b from-gray-300 to-white border border-gray-400 rounded-b-full shadow-xl relative">
                  <div className="absolute top-0 w-4 h-12 bg-rose-900 -left-1 rounded-sm" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* The Cake Structure - Split in two halves */}
          <div className="relative flex items-end justify-center filter drop-shadow-2xl">
            {/* LEFT HALF */}
            <motion.div
              animate={isCut ? { x: -40, rotate: -5 } : { x: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              className="flex flex-col items-end relative z-10"
            >
              <div className="w-24 h-20 bg-[#fff5f5] rounded-tl-2xl border-l border-t border-white relative overflow-visible">
                <div className="absolute top-0 right-0 w-full h-4 bg-white rounded-bl-xl" />
                {isCut && <div className="absolute right-0 top-0 h-full w-2 bg-[#fbcfe8] opacity-50" />}

                <div className="absolute -top-4 right-2 flex gap-1 z-20">
                  <Candle lit={candlesLit} delay={0} />
                  <Strawberry style={{ transform: 'rotate(-10deg) scale(0.8)' }} />
                </div>
              </div>

              <div className="w-36 h-24 bg-pink-100 rounded-tl-3xl rounded-bl-2xl border-l border-t border-white relative mt-[-1px]">
                <div className="absolute top-1/2 w-full h-1 bg-white/50" />
                {isCut && <div className="absolute right-0 top-0 h-full w-2 bg-[#f9a8d4] opacity-50" />}

                <div className="absolute -top-3 right-6 z-20">
                  <CreamDollop />
                </div>
              </div>
            </motion.div>

            {/* RIGHT HALF */}
            <motion.div
              animate={isCut ? { x: 40, rotate: 5 } : { x: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              className="flex flex-col items-start relative z-10"
            >
              <div className="w-24 h-20 bg-[#fff5f5] rounded-tr-2xl border-r border-t border-white relative overflow-visible">
                <div className="absolute top-0 left-0 w-full h-5 bg-white rounded-br-xl" />
                {isCut && <div className="absolute left-0 top-0 h-full w-2 bg-[#fbcfe8] opacity-50" />}

                <div className="absolute -top-4 left-2 flex gap-1 z-20">
                  <Strawberry style={{ transform: 'rotate(10deg) scale(0.9)' }} />
                  <Candle lit={candlesLit} delay={0.2} />
                </div>
              </div>

              <div className="w-36 h-24 bg-pink-100 rounded-tr-3xl rounded-br-2xl border-r border-t border-white relative mt-[-1px]">
                <div className="absolute top-1/2 w-full h-1 bg-white/50" />
                {isCut && <div className="absolute left-0 top-0 h-full w-2 bg-[#f9a8d4] opacity-50" />}

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

        {/* Small hint near bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-500 text-xs tracking-[0.25em] uppercase font-sans-body">
            Tap the cake to continue
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Cake;
