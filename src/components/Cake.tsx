import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, PartyPopper, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import { useBlowDetection } from '../hooks/useBlowDetection';

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

// --- Cake Parts ---

const Candle = ({ lit, delay }: { lit: boolean; delay: number }) => (
  <div className="relative flex flex-col items-center -mt-12 mx-1 md:mx-3">
    <AnimatePresence>
      {lit && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute -top-6 w-4 h-6 z-20"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 0.92, 1], rotate: [-2, 2, -1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay }}
            className="w-full h-full bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-50 rounded-full shadow-[0_0_18px_rgba(255,180,50,0.85)] blur-[0.8px]"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-sky-400 rounded-full opacity-60 blur-sm" />
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
  <div className="w-7 h-7 md:w-9 md:h-9 bg-white rounded-full shadow-sm border border-white/70 flex items-center justify-center">
    <div className="w-1.5 h-1.5 bg-pink-100 rounded-full blur-[1px]" />
  </div>
);

// --- Main Component ---

const Cake: React.FC<CakeProps> = ({ onComplete }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isCut, setIsCut] = useState(false);

  const [started, setStarted] = useState(false);
  const [blowProgress, setBlowProgress] = useState(0);

  const { isBlowing, level, startListening, hasPermission } = useBlowDetection(candlesLit, 0.12);

  const [showConfetti, setShowConfetti] = useState(false);

  // Progress from loudness (works even if isBlowing toggles slowly)
  useEffect(() => {
    if (!candlesLit || !started) return;

    const t = setInterval(() => {
      setBlowProgress((p) => {
        const blowingNow = level > 0.08 || isBlowing;
        if (blowingNow) return Math.min(100, p + 6);
        return Math.max(0, p - 2);
      });
    }, 120);

    return () => clearInterval(t);
  }, [candlesLit, started, level, isBlowing]);

  useEffect(() => {
    if (candlesLit && blowProgress >= 100) setCandlesLit(false);
  }, [candlesLit, blowProgress]);

  const handleCut = () => {
    if (!candlesLit && !isCut) {
      setIsCut(true);
      setShowConfetti(true);
      setTimeout(() => onComplete(), 4200);
    }
  };

  const sparkles = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        top: `${18 + Math.random() * 62}%`,
        size: 14 + Math.random() * 18,
        duration: 3 + Math.random() * 3,
        delay: i * 0.45,
      })),
    []
  );

  const micLabel = !started ? 'Allow Microphone' : level > 0.08 ? 'Keep blowing' : 'Blow into your mic';

  return (
    <div className="min-h-dvh bg-aesthetic overflow-hidden relative flex flex-col items-center select-none cursor-default">
      <Bunting />
      <Table />

      {showConfetti && (
        <Confetti recycle={false} numberOfPieces={700} gravity={0.14} colors={['#f472b6', '#fb7185', '#fde047', '#ffffff']} />
      )}

      {/* Floating Sparkles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.85, 0], scale: [0.7, 1, 0.7], y: -120 }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
            className="absolute text-yellow-300"
            style={{ left: s.left, top: s.top }}
          >
            <Sparkles size={s.size} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center w-full max-w-4xl px-4 mb-20">
        {/* Header */}
        <motion.div layout className="text-center mb-10 md:mb-16 relative">
          <AnimatePresence mode="wait">
            {candlesLit ? (
              <motion.div
                key="wish"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                className="flex flex-col items-center gap-3"
              >
                <h2 className="font-serif-title text-4xl md:text-5xl text-gray-800">Make a Wish</h2>
                <p className="font-sans-body text-gray-500 uppercase tracking-[0.2em] text-sm">{micLabel}</p>

                <div className="h-2.5 w-48 bg-white/70 rounded-full overflow-hidden mt-2 border border-white shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-300 to-purple-300"
                    animate={{ width: `${Math.max(blowProgress, Math.round(level * 100))}%` }}
                    transition={{ duration: 0.12 }}
                  />
                </div>

                <p className="text-gray-400 text-xs font-sans-body tracking-wide">
                  Fill the bar to blow out the candles.
                </p>
              </motion.div>
            ) : !isCut ? (
              <motion.div
                key="cut"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                className="flex flex-col items-center gap-3"
              >
                <h2 className="font-serif-title text-4xl md:text-5xl text-gray-800">Cut the Cake</h2>
                <div className="flex items-center gap-2 text-pink-500 bg-white/70 backdrop-blur px-4 py-1.5 rounded-full border border-pink-100 shadow-sm">
                  <PartyPopper size={18} />
                  <span className="font-sans-body uppercase tracking-wider text-xs font-bold">Tap the cake</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="yay"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <h2 className="font-serif-title text-5xl md:text-6xl text-pink-500 drop-shadow-sm">Yay!</h2>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Cake */}
        <div className="relative mt-6 group cursor-pointer" onClick={handleCut}>
          <div className="pointer-events-none absolute -bottom-14 left-1/2 -translate-x-1/2 w-[26rem] h-[10rem] bg-pink-300/15 blur-3xl rounded-full" />

          {/* Birthday text above cake */}
          <AnimatePresence>
            {isCut && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: -110, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                className="absolute left-1/2 -translate-x-1/2 top-1/2 z-40 pointer-events-none"
              >
                <div className="px-6 py-3 rounded-2xl bg-white/80 backdrop-blur border border-white shadow-lg">
                  <p className="font-serif-title text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 italic">
                    Happy Birthday
                  </p>
                  <p className="font-sans-body text-xs md:text-sm text-gray-500 tracking-widest uppercase mt-1">
                    Subu qt
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cake halves */}
          <div className="relative flex items-end justify-center drop-shadow-2xl">
            {/* LEFT */}
            <motion.div
              animate={isCut ? { x: -46, rotate: -5 } : { x: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 70, damping: 16 }}
              className="flex flex-col items-end relative z-10"
            >
              <div className="w-28 h-20 bg-gradient-to-b from-white via-[#fff5f5] to-pink-50 rounded-tl-3xl border-l border-t border-white relative overflow-visible shadow-[inset_0_-10px_20px_rgba(251,207,232,0.35)]">
                <div className="absolute top-0 right-0 w-full h-5 bg-white rounded-bl-2xl shadow-[inset_0_-6px_10px_rgba(0,0,0,0.03)]" />

                <div className="absolute -top-5 right-2 flex gap-1 z-20">
                  <Candle lit={candlesLit} delay={0} />
                  <Strawberry style={{ transform: 'rotate(-10deg) scale(0.85)' }} />
                </div>
              </div>

              <div className="w-40 h-24 bg-gradient-to-b from-pink-100 via-pink-100 to-pink-200 rounded-tl-[2.2rem] rounded-bl-3xl border-l border-t border-white relative mt-[-1px] shadow-[inset_0_-16px_26px_rgba(244,114,182,0.12)]">
                <div className="absolute top-1/2 w-full h-1 bg-white/55" />
                <div className="absolute -top-4 right-7 z-20">
                  <CreamDollop />
                </div>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              animate={isCut ? { x: 46, rotate: 5 } : { x: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 70, damping: 16 }}
              className="flex flex-col items-start relative z-10"
            >
              <div className="w-28 h-20 bg-gradient-to-b from-white via-[#fff5f5] to-pink-50 rounded-tr-3xl border-r border-t border-white relative overflow-visible shadow-[inset_0_-10px_20px_rgba(251,207,232,0.35)]">
                <div className="absolute top-0 left-0 w-full h-6 bg-white rounded-br-2xl shadow-[inset_0_-6px_10px_rgba(0,0,0,0.03)]" />

                <div className="absolute -top-5 left-2 flex gap-1 z-20">
                  <Strawberry style={{ transform: 'rotate(10deg) scale(0.9)' }} />
                  <Candle lit={candlesLit} delay={0.2} />
                </div>
              </div>

              <div className="w-40 h-24 bg-gradient-to-b from-pink-100 via-pink-100 to-pink-200 rounded-tr-[2.2rem] rounded-br-3xl border-r border-t border-white relative mt-[-1px] shadow-[inset_0_-16px_26px_rgba(244,114,182,0.12)]">
                <div className="absolute top-1/2 w-full h-1 bg-white/55" />
                <div className="absolute -top-4 left-7 z-20">
                  <CreamDollop />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Plate */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-0">
            <div className="w-[22rem] h-4 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-full shadow-lg border border-gray-200" />
            <div className="w-24 h-12 bg-gradient-to-b from-gray-100 to-gray-200 border-x border-white/50 skew-x-12 opacity-90" />
            <div className="w-52 h-3 bg-gray-200 rounded-full shadow-xl" />
          </div>
        </div>

        {/* Mic controls */}
        {candlesLit && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.0 } }} className="absolute bottom-10 md:bottom-20">
            {!hasPermission ? (
              <button
                onClick={async () => {
                  await startListening();
                  setStarted(true);
                }}
                className="bg-white/80 backdrop-blur text-pink-500 px-6 py-2 rounded-full shadow-sm text-sm border border-pink-100 hover:bg-white transition-colors flex items-center gap-2"
              >
                <Mic size={14} /> Allow Microphone
              </button>
            ) : (
              <div className="flex flex-col items-center gap-2">
                {!started ? (
                  <button
                    onClick={() => setStarted(true)}
                    className="bg-white/70 backdrop-blur text-gray-600 px-6 py-2 rounded-full shadow-sm text-sm border border-white hover:bg-white transition-colors"
                  >
                    Start Listening
                  </button>
                ) : (
                  <button
                    onClick={() => setBlowProgress(100)}
                    className="text-pink-300 text-xs hover:text-pink-500 transition-colors underline decoration-dotted"
                  >
                    (Skip blowing)
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cake;
