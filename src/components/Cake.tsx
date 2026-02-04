import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { PartyPopper, Sparkles, Heart } from 'lucide-react';

interface CakeProps {
  onComplete: () => void;
}

type Step = 'candles' | 'cut' | 'feed';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const PastelGlow = () => (
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-pink-200/25 blur-3xl" />
    <div className="absolute top-10 -right-56 w-[42rem] h-[42rem] rounded-full bg-purple-200/18 blur-3xl" />
    <div className="absolute -bottom-56 left-1/4 w-[46rem] h-[46rem] rounded-full bg-amber-200/16 blur-3xl" />
    <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] rounded-full bg-rose-200/12 blur-3xl" />
    <div
      className="absolute inset-0 opacity-[0.22]"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
        backgroundSize: '18px 18px',
      }}
    />
  </div>
);

const FloatingSparkles = () => {
  const items = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        top: `${Math.floor(Math.random() * 90) + 5}%`,
        left: `${Math.floor(Math.random() * 90) + 5}%`,
        delay: Math.random() * 1.2,
        duration: 3.8 + Math.random() * 2.8,
        scale: 0.8 + Math.random() * 0.8,
        opacity: 0.08 + Math.random() * 0.08,
        rotate: Math.floor(Math.random() * 30) - 15,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ top: s.top, left: s.left, opacity: s.opacity, transform: `rotate(${s.rotate}deg)` }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: [-8, 8, -8], opacity: [0, s.opacity, 0] }}
          transition={{ delay: s.delay, duration: s.duration, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles size={18} className="text-gray-700" style={{ transform: `scale(${s.scale})` }} />
        </motion.div>
      ))}
    </div>
  );
};

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
  <div className="absolute bottom-0 w-full h-[28vh] z-0">
    {/* table wood */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#fde7f3] to-[#fbd3ea] border-t-4 border-white shadow-[0_-10px_40px_rgba(0,0,0,0.06)]" />
    {/* cloth */}
    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl h-[18vh] rounded-[2.5rem] bg-white/55 backdrop-blur border border-white shadow-lg" />
    {/* cloth pattern */}
    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl h-[18vh] rounded-[2.5rem] opacity-[0.12]"
      style={{
        backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }}
    />
  </div>
);

// Cute corner doodles: a cat + a rabbit (simple SVG, no assets)
const CornerAnimals = () => (
  <div className="pointer-events-none absolute inset-0">
    {/* Cat */}
    <motion.div
      className="absolute bottom-[18vh] left-6 md:left-14 opacity-[0.26]"
      initial={{ y: 6, rotate: -2 }}
      animate={{ y: [-2, 6, -2], rotate: [-2, 2, -2] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path d="M38 44 L28 28 L46 34" fill="rgba(17,24,39,0.16)" />
        <path d="M82 44 L92 28 L74 34" fill="rgba(17,24,39,0.16)" />
        <circle cx="60" cy="68" r="28" fill="rgba(255,255,255,0.55)" stroke="rgba(17,24,39,0.18)" strokeWidth="2" />
        <circle cx="50" cy="66" r="3.5" fill="rgba(17,24,39,0.45)" />
        <circle cx="70" cy="66" r="3.5" fill="rgba(17,24,39,0.45)" />
        <path d="M58 74 Q60 76 62 74" stroke="rgba(17,24,39,0.35)" strokeWidth="2" strokeLinecap="round" />
        <path d="M44 74 H30" stroke="rgba(17,24,39,0.20)" strokeWidth="2" strokeLinecap="round" />
        <path d="M44 80 H30" stroke="rgba(17,24,39,0.16)" strokeWidth="2" strokeLinecap="round" />
        <path d="M76 74 H90" stroke="rgba(17,24,39,0.20)" strokeWidth="2" strokeLinecap="round" />
        <path d="M76 80 H90" stroke="rgba(17,24,39,0.16)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </motion.div>

    {/* Rabbit */}
    <motion.div
      className="absolute bottom-[18vh] right-4 md:right-16 opacity-[0.24]"
      initial={{ y: 8, rotate: 2 }}
      animate={{ y: [-2, 8, -2], rotate: [2, -2, 2] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        <path d="M54 28 C44 8, 66 6, 70 28" fill="rgba(255,255,255,0.55)" stroke="rgba(17,24,39,0.16)" strokeWidth="2" />
        <path d="M86 28 C76 8, 98 6, 102 28" fill="rgba(255,255,255,0.55)" stroke="rgba(17,24,39,0.16)" strokeWidth="2" />
        <ellipse cx="78" cy="72" rx="34" ry="30" fill="rgba(255,255,255,0.55)" stroke="rgba(17,24,39,0.18)" strokeWidth="2" />
        <circle cx="68" cy="70" r="3.5" fill="rgba(17,24,39,0.45)" />
        <circle cx="88" cy="70" r="3.5" fill="rgba(17,24,39,0.45)" />
        <path d="M78 78 Q80 80 82 78" stroke="rgba(17,24,39,0.32)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="78" cy="76" r="2" fill="rgba(244,114,182,0.35)" />
      </svg>
    </motion.div>
  </div>
);

const Candle = ({ lit, delay }: { lit: boolean; delay: number }) => (
  <div className="relative flex flex-col items-center">
    <AnimatePresence>
      {lit && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute -top-6 w-5 h-7 z-20"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 0.92, 1], rotate: [-2, 2, -1, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay }}
            className="w-full h-full bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-50 rounded-full shadow-[0_0_20px_rgba(255,180,50,0.85)] blur-[0.7px]"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-sky-400 rounded-full opacity-50 blur-sm" />
        </motion.div>
      )}
    </AnimatePresence>

    <div className="w-0.5 h-3 bg-gray-800 relative z-10" />
    <div className="w-3.5 h-14 rounded-md bg-gradient-to-b from-white to-pink-100 border border-pink-200 shadow-sm overflow-hidden relative z-10">
      <div className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(244,114,182,0.45) 20%, transparent 20%, transparent 50%, rgba(244,114,182,0.45) 50%, rgba(244,114,182,0.45) 70%, transparent 70%, transparent)',
          backgroundSize: '10px 10px',
        }}
      />
    </div>
  </div>
);

const Cherry = () => (
  <div className="w-4 h-4 bg-red-400 rounded-full shadow-inner relative">
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-3 border-t-2 border-green-500 rounded-[100%]" />
    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fecaca_1px,transparent_1px)] [background-size:4px_4px] rounded-full" />
  </div>
);

const CakeBody = ({
  candlesLit,
  isCut,
  onTapCandles,
  onTapCake,
  step,
}: {
  candlesLit: boolean;
  isCut: boolean;
  onTapCandles: () => void;
  onTapCake: () => void;
  step: Step;
}) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Soft glow behind cake */}
      <div className="pointer-events-none absolute -top-14 w-[26rem] h-[18rem] bg-pink-300/18 blur-3xl rounded-full" />

      {/* Candles row */}
      <motion.div
        className="relative z-20 flex items-end gap-6 mb-2 cursor-pointer"
        onClick={(e: any) => {
          e.stopPropagation();
          if (step === 'candles' && candlesLit) onTapCandles();
        }}
        whileHover={step === 'candles' ? { scale: 1.03 } : {}}
      >
        <Candle lit={candlesLit} delay={0.0} />
        <Candle lit={candlesLit} delay={0.25} />
        <Candle lit={candlesLit} delay={0.5} />
      </motion.div>

      {/* Cake */}
      <motion.div
        className="relative cursor-pointer"
        onClick={() => {
          if (step === 'cut' && !isCut) onTapCake();
        }}
        whileHover={step === 'cut' ? { scale: 1.01 } : {}}
        whileTap={step === 'cut' ? { scale: 0.995 } : {}}
      >
        {/* Top tier */}
        <div className="relative w-[18rem] md:w-[20rem] h-[5.8rem] rounded-[2.2rem] bg-gradient-to-b from-white via-[#fff5f5] to-pink-50 border border-white shadow-[inset_0_-18px_30px_rgba(251,207,232,0.45)] overflow-hidden">
          {/* frosting rim */}
          <div className="absolute top-0 left-0 right-0 h-7 bg-white/85 rounded-b-[2.2rem] shadow-[inset_0_-10px_14px_rgba(0,0,0,0.03)]" />
          {/* drips */}
          <div className="absolute top-5 left-7 w-8 h-8 bg-white/70 rounded-b-full" />
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-white/70 rounded-b-full" />
          <div className="absolute top-5 right-8 w-7 h-7 bg-white/70 rounded-b-full" />

          {/* decorations */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-[0.9]">
            <Cherry />
            <Cherry />
            <Cherry />
          </div>

          {/* subtle sparkle */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(244,114,182,0.25) 2px, transparent 0)',
              backgroundSize: '22px 22px',
            }}
          />
        </div>

        {/* Bottom tier */}
        <div className="relative mt-[-0.55rem] w-[22rem] md:w-[24rem] h-[7.4rem] rounded-[2.8rem] bg-gradient-to-b from-pink-100 via-pink-100 to-pink-200 border border-white shadow-[inset_0_-22px_34px_rgba(244,114,182,0.16)] overflow-hidden">
          {/* middle ribbon */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-white/55" />
          {/* cute scallops */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-white/65 shadow-[inset_0_-6px_10px_rgba(0,0,0,0.03)]" />
            ))}
          </div>
          {/* little hearts */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-6 opacity-[0.55]">
            <Heart size={18} className="text-pink-500" />
            <Heart size={18} className="text-pink-500" />
            <Heart size={18} className="text-pink-500" />
          </div>
        </div>

        {/* Plate */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-[26rem] md:w-[30rem] h-4 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-full shadow-lg border border-gray-200" />
          <div className="w-28 h-12 bg-gradient-to-b from-gray-100 to-gray-200 border-x border-white/50 skew-x-12 opacity-90" />
          <div className="w-56 h-3 bg-gray-200 rounded-full shadow-xl" />
        </div>

        {/* Cut split effect */}
        <AnimatePresence>
          {isCut && (
            <>
              <motion.div
                className="absolute inset-0 z-30 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* split line */}
                <div className="absolute top-[2.3rem] left-1/2 -translate-x-1/2 w-[3px] h-[11.8rem] bg-white/80 shadow-sm rounded-full" />
              </motion.div>

              {/* left drift */}
              <motion.div
                className="absolute left-0 top-0 w-1/2 h-full z-20 pointer-events-none"
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: -16, rotate: -2 }}
                transition={{ type: 'spring', stiffness: 80, damping: 14 }}
              />
              {/* right drift */}
              <motion.div
                className="absolute right-0 top-0 w-1/2 h-full z-20 pointer-events-none"
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: 16, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 80, damping: 14 }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const FeedingScene = ({ onDone }: { onDone: () => void }) => {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-white/55 backdrop-blur-md" />

      <motion.div
        className="relative w-full max-w-2xl rounded-[2.5rem] bg-white/85 backdrop-blur border border-white shadow-2xl overflow-hidden"
        initial={{ y: 14, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      >
        <div className="p-7 md:p-10">
          <div className="text-center mb-6">
            <h3 className="font-serif-title text-3xl md:text-4xl text-gray-800">One tiny bite for the birthday girl</h3>
            <p className="font-sans-body text-gray-500 mt-2">
              You made a wish. You cut the cake. Now I feed you the first piece.
            </p>
          </div>

          {/* Cartoon */}
          <div className="relative h-[220px] md:h-[240px] flex items-end justify-center gap-10">
            {/* Girl */}
            <div className="relative w-40 md:w-44">
              <motion.div
                className="absolute -top-7 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-pink-200/55 blur-xl"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              <div className="relative mx-auto w-28 h-28 rounded-full bg-white border border-gray-200 shadow-md">
                <div className="absolute top-9 left-7 w-2.5 h-2.5 rounded-full bg-gray-700/50" />
                <div className="absolute top-9 right-7 w-2.5 h-2.5 rounded-full bg-gray-700/50" />
                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-6 h-3 rounded-full bg-pink-300/35" />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-10 h-5 rounded-full border border-gray-600/25 bg-white" />
              </div>
              <div className="mx-auto mt-2 w-32 h-20 rounded-[2rem] bg-gradient-to-b from-pink-200/55 to-pink-300/35 border border-white shadow-sm" />
              <div className="mx-auto mt-2 text-center text-xs text-gray-500 font-sans-body tracking-wider uppercase">
                her
              </div>
            </div>

            {/* Boy */}
            <div className="relative w-40 md:w-44">
              <div className="relative mx-auto w-28 h-28 rounded-full bg-white border border-gray-200 shadow-md">
                <div className="absolute top-8 left-8 w-2.5 h-2.5 rounded-full bg-gray-700/50" />
                <div className="absolute top-8 right-8 w-2.5 h-2.5 rounded-full bg-gray-700/50" />
                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-10 h-4 rounded-full border border-gray-600/25 bg-white" />
              </div>
              <div className="mx-auto mt-2 w-32 h-20 rounded-[2rem] bg-gradient-to-b from-sky-200/55 to-sky-300/35 border border-white shadow-sm" />
              <div className="mx-auto mt-2 text-center text-xs text-gray-500 font-sans-body tracking-wider uppercase">
                me
              </div>

              {/* Arm + cake bite */}
              <motion.div
                className="absolute top-[92px] left-[-10px] md:left-[-18px] w-44 h-20 pointer-events-none"
                initial={{ x: 0 }}
                animate={{ x: [-6, 6, -6] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.div
                  className="absolute left-10 top-10 w-24 h-4 rounded-full bg-sky-200/70 border border-white shadow-sm"
                  style={{ transformOrigin: 'left center' }}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, -10, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute left-[110px] top-[36px] w-10 h-10 rounded-2xl bg-white border border-gray-200 shadow-md flex items-center justify-center"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  {/* cake bite */}
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-b from-pink-200 to-pink-300 border border-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-white/75" />
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-300 rounded-full" />
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Heart pop */}
            <motion.div
              className="absolute top-3 left-1/2 -translate-x-1/2 text-pink-400"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: [0, 1, 0], y: [8, -10, -18], scale: [0.9, 1.1, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={26} fill="currentColor" />
            </motion.div>
          </div>

          <div className="mt-7 flex items-center justify-center">
            <MotionButton
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onDone}
              className="px-8 py-3 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-colors font-sans-body tracking-widest uppercase text-sm"
            >
              Next <PartyPopper size={16} className="inline ml-2" />
            </MotionButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Cake: React.FC<CakeProps> = ({ onComplete }) => {
  const [step, setStep] = useState<Step>('candles');
  const [candlesLit, setCandlesLit] = useState(true);
  const [isCut, setIsCut] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const tapCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1600);
    setTimeout(() => setStep('cut'), 450);
  };

  const cutCake = () => {
    if (isCut) return;
    setIsCut(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    setTimeout(() => setStep('feed'), 900);
  };

  return (
    <div className="min-h-dvh bg-aesthetic overflow-hidden relative flex flex-col items-center justify-center px-4">
      <PastelGlow />
      <FloatingSparkles />
      <Bunting />
      <CornerAnimals />
      <Table />

      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={520}
          gravity={0.14}
          colors={['#f472b6', '#fb7185', '#fde047', '#ffffff', '#a7f3d0']}
        />
      )}

      <div className="relative z-10 w-full max-w-4xl -mt-[8vh] md:-mt-[10vh]">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <AnimatePresence mode="wait">
            {step === 'candles' && (
              <motion.div
                key="candles"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
              >
                <h2 className="font-serif-title text-4xl md:text-5xl text-gray-800">Tap the candles</h2>
                <p className="font-sans-body text-gray-500 uppercase tracking-[0.22em] text-xs md:text-sm mt-3">
                  Let’s start the birthday ritual
                </p>
              </motion.div>
            )}

            {step === 'cut' && (
              <motion.div
                key="cut"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
              >
                <h2 className="font-serif-title text-4xl md:text-5xl text-gray-800">Cut the cake</h2>
                <div className="mt-4 inline-flex items-center gap-2 text-pink-500 bg-white/70 backdrop-blur px-4 py-2 rounded-full border border-pink-100 shadow-sm">
                  <PartyPopper size={18} />
                  <span className="font-sans-body tracking-widest uppercase text-xs font-bold">Tap the cake</span>
                </div>
              </motion.div>
            )}

            {step === 'feed' && (
              <motion.div
                key="feed"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
              >
                <h2 className="font-serif-title text-4xl md:text-5xl text-gray-800">Okay, one more thing</h2>
                <p className="font-sans-body text-gray-500 mt-3">
                  The first bite is always special.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cake block */}
        <div className="relative flex items-center justify-center">
          <CakeBody
            candlesLit={candlesLit}
            isCut={isCut}
            onTapCandles={tapCandles}
            onTapCake={cutCake}
            step={step}
          />
        </div>

        {/* Little helper text */}
        {step === 'candles' && (
          <div className="text-center mt-10 text-gray-400 text-sm font-sans-body">
            Tap the candles to blow them out.
          </div>
        )}
      </div>

      <AnimatePresence>
        {step === 'feed' && (
          <FeedingScene
            onDone={() => {
              // go next page after feeding
              onComplete();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cake;
