import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';

interface CakeProps {
  onComplete: () => void;
}

const Candle = ({ lit, onTap }: { lit: boolean; onTap: () => void }) => (
  <motion.div
    onClick={onTap}
    className="relative cursor-pointer"
    whileHover={{ scale: 1.1 }}
  >
    {lit && (
      <motion.div
        animate={{ y: [0, -4, 0], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full shadow-[0_0_20px_rgba(255,200,80,0.9)]"
      />
    )}
    <div className="w-3 h-16 bg-pink-200 rounded-full border border-pink-300" />
  </motion.div>
);

const Strawberry = () => (
  <div className="w-8 h-8 bg-red-400 rounded-b-2xl rounded-t-lg shadow-inner relative">
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-4 bg-green-400 rounded-full" />
  </div>
);

const Cake: React.FC<CakeProps> = ({ onComplete }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [cut, setCut] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const extinguish = () => setCandlesLit(false);

  const sliceCake = () => {
    if (candlesLit || cut) return;
    setCut(true);
    setConfetti(true);
    setTimeout(onComplete, 4500);
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 relative flex flex-col items-center justify-center overflow-hidden">

      {/* Girly Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.6, 0.2], y: -80 }}
            transition={{ repeat: Infinity, duration: 4 + i * 0.2 }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          >
            <Sparkles size={16} />
          </motion.div>
        ))}
      </div>

      {confetti && <Confetti recycle={false} numberOfPieces={500} />}

      {/* Header */}
      <div className="mb-8 text-center z-10">
        {!cut && (
          <>
            <h2 className="font-serif-title text-4xl text-gray-800">Make a Wish</h2>
            <p className="text-gray-500 mt-2">
              Tap the candle to blow it out
            </p>
          </>
        )}
      </div>

      {/* Cake Area */}
      <div className="relative z-10">

        {/* Candle */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2">
          <Candle lit={candlesLit} onTap={extinguish} />
        </div>

        {/* Floating Text */}
        <AnimatePresence>
          {cut && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: -80 }}
              className="absolute -top-32 left-1/2 -translate-x-1/2 text-center"
            >
              <h1 className="text-4xl font-serif-title text-pink-500">
                Happy Birthday
              </h1>
              <p className="uppercase tracking-widest text-gray-500 text-sm mt-1">
                Subu qt
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Knife */}
        <AnimatePresence>
          {cut && (
            <motion.div
              initial={{ x: 80, y: -120, rotate: 45 }}
              animate={{ x: 0, y: 40, rotate: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute z-40 left-1/2"
            >
              <div className="w-2 h-40 bg-gray-300 rounded-full shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cake */}
        <motion.div
          onClick={sliceCake}
          className="relative cursor-pointer"
          whileHover={!candlesLit && !cut ? { scale: 1.05 } : {}}
        >
          <div className="relative w-56 h-48 bg-pink-100 rounded-3xl border border-white shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#fbcfe8_1px,transparent_1px)] [background-size:12px_12px]" />

            {/* Frosting */}
            <div className="absolute top-0 w-full h-8 bg-white rounded-b-3xl" />

            {/* Strawberries */}
            <div className="absolute -top-4 left-6"><Strawberry /></div>
            <div className="absolute -top-4 right-6"><Strawberry /></div>

            {/* Cut split */}
            {cut && (
              <>
                <motion.div
                  animate={{ x: -20, rotate: -4 }}
                  className="absolute inset-0 bg-pink-100"
                />
                <motion.div
                  animate={{ x: 20, rotate: 4 }}
                  className="absolute inset-0 bg-pink-100"
                />
              </>
            )}
          </div>

          {/* Plate */}
          <div className="mt-4 w-64 h-4 bg-gray-200 rounded-full shadow" />
        </motion.div>
      </div>

      {!candlesLit && !cut && (
        <button
          onClick={sliceCake}
          className="mt-8 px-6 py-3 bg-pink-400 text-white rounded-full shadow-lg"
        >
          Cut the cake
        </button>
      )}

    </div>
  );
};

export default Cake;
