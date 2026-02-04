import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';

interface CakeProps {
  onComplete: () => void;
}

/* -------------------- Cute doodles -------------------- */

const CatDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    <path
      d="M38 46L30 28L48 38H72L90 28L82 46"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.95"
    />
    <path
      d="M36 48C28 58 28 82 44 92C54 98 66 98 76 92C92 82 92 58 84 48"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      opacity="0.95"
    />
    <path d="M48 66H48.2" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
    <path d="M72 66H72.2" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
    <path d="M54 78C60 84 66 84 72 78" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    <path d="M18 70L34 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
    <path d="M18 80L34 76" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
    <path d="M102 70L86 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
    <path d="M102 80L86 76" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
  </svg>
);

const RabbitDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none">
    <path
      d="M46 22C36 14 28 20 30 34C32 46 44 52 52 44"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      opacity="0.95"
    />
    <path
      d="M74 22C84 14 92 20 90 34C88 46 76 52 68 44"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      opacity="0.95"
    />
    <path
      d="M34 60C34 44 46 38 60 38C74 38 86 44 86 60C86 82 74 96 60 96C46 96 34 82 34 60Z"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      opacity="0.95"
    />
    <path d="M50 64H50.2" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
    <path d="M70 64H70.2" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
    <path d="M58 74C60 76 62 76 64 74" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    <path d="M60 74V80" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
  </svg>
);

const PawPrint = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="currentColor">
    <circle cx="35" cy="40" r="10" opacity="0.9" />
    <circle cx="60" cy="30" r="10" opacity="0.9" />
    <circle cx="85" cy="40" r="10" opacity="0.9" />
    <circle cx="48" cy="58" r="10" opacity="0.9" />
    <path
      d="M60 64c-18 0-30 10-30 24 0 10 10 18 30 18s30-8 30-18c0-14-12-24-30-24z"
      opacity="0.95"
    />
  </svg>
);

const FloatingBits = () => {
  const items = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        top: `${8 + Math.random() * 84}%`,
        size: 14 + Math.random() * 18,
        delay: Math.random() * 1.4,
        duration: 3.5 + Math.random() * 3.2,
        opacity: 0.06 + Math.random() * 0.08,
        rotate: Math.floor(Math.random() * 40) - 20,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: s.left, top: s.top, opacity: s.opacity, transform: `rotate(${s.rotate}deg)` }}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: [-10, 10, -10], opacity: [0, s.opacity, 0] }}
          transition={{ delay: s.delay, duration: s.duration, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles size={s.size} className="text-gray-700" />
        </motion.div>
      ))}
    </div>
  );
};

const FloatingHearts = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: `${8 + Math.random() * 84}%`,
        top: `${15 + Math.random() * 70}%`,
        delay: Math.random() * 1.6,
        duration: 5 + Math.random() * 4,
        size: 10 + Math.random() * 10,
        opacity: 0.05 + Math.random() * 0.06,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{ left: h.left, top: h.top, opacity: h.opacity }}
          initial={{ y: 10, scale: 0.9 }}
          animate={{ y: [-8, 8, -8], scale: [0.9, 1.08, 0.9] }}
          transition={{ delay: h.delay, duration: h.duration, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="rounded-full"
            style={{
              width: h.size,
              height: h.size,
              background:
                'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55), rgba(244,114,182,0.30))',
              filter: 'blur(0.2px)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

/* -------------------- Cake parts -------------------- */

const Candle = ({
  lit,
  delay,
  onTap,
}: {
  lit: boolean;
  delay: number;
  onTap: () => void;
}) => (
  <motion.button
    type="button"
    onClick={onTap}
    className="relative flex flex-col items-center mx-2 select-none"
    whileHover={{ y: -2, scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    aria-label="Tap candle"
  >
    <AnimatePresence>
      {lit && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.55, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute -top-7 z-20"
        >
          <motion.div
            animate={{ y: [0, -2, 0], rotate: [-2, 2, -1, 0], scale: [1, 1.14, 0.95, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, delay, ease: 'easeInOut' }}
            className="w-5 h-7 rounded-full bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-50 shadow-[0_0_22px_rgba(253,186,116,0.95)] blur-[0.35px]"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-3 bg-sky-400/70 rounded-full blur-sm" />
        </motion.div>
      )}
    </AnimatePresence>

    <div className="w-1 h-3 bg-gray-700/80 rounded-full" />

    <div className="relative w-4 h-14 rounded-lg bg-gradient-to-b from-white to-pink-50 border border-pink-200 shadow-sm overflow-hidden">
      <div className="absolute inset-0 opacity-45 bg-[repeating-linear-gradient(135deg,rgba(244,114,182,0.26)_0,rgba(244,114,182,0.26)_6px,transparent_6px,transparent_12px)]" />
    </div>

    {lit && <div className="pointer-events-none absolute -top-10 w-16 h-16 bg-amber-300/18 blur-2xl rounded-full" />}
  </motion.button>
);

const Strawberry = () => (
  <div className="relative w-9 h-9 bg-red-500 rounded-b-3xl rounded-t-xl shadow-[inset_0_-10px_14px_rgba(0,0,0,0.12)]">
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-0.5">
      <div className="w-3 h-4 bg-green-500 rounded-full rotate-45 border border-green-700/20" />
      <div className="w-3 h-4 bg-green-500 rounded-full -rotate-45 -ml-1 border border-green-700/20" />
    </div>
    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fecaca_1px,transparent_1px)] [background-size:5px_5px] rounded-b-3xl" />
    <div className="absolute top-2 left-2 w-3 h-3 bg-white/35 rounded-full blur-[0.5px]" />
  </div>
);

const CreamDot = () => (
  <div className="w-7 h-7 bg-white rounded-full shadow-sm border border-white/80 flex items-center justify-center">
    <div className="w-2 h-2 bg-pink-100 rounded-full blur-[1px]" />
  </div>
);

/* -------------------- Main -------------------- */

const Cake: React.FC<CakeProps> = ({ onComplete }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isCut, setIsCut] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const extinguish = () => {
    if (!candlesLit || isCut) return;
    setCandlesLit(false);
  };

  const handleCut = () => {
    if (candlesLit || isCut) return;
    setIsCut(true);
    setShowConfetti(true);
    setTimeout(() => onComplete(), 4200);
  };

  return (
    <div className="min-h-dvh bg-aesthetic overflow-hidden relative flex flex-col items-center select-none">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-28 w-[34rem] h-[34rem] rounded-full bg-pink-200/28 blur-3xl" />
        <div className="absolute top-10 -right-28 w-[34rem] h-[34rem] rounded-full bg-purple-200/20 blur-3xl" />
        <div className="absolute -bottom-36 left-1/4 w-[40rem] h-[40rem] rounded-full bg-amber-200/14 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
            backgroundSize: '18px 18px',
          }}
        />

        <FloatingBits />
        <FloatingHearts />

        {/* Corner doodles */}
        <div className="absolute top-14 left-6 opacity-[0.14] rotate-12 text-gray-700">
          <CatDoodle className="w-24 h-24" />
        </div>
        <div className="absolute top-28 right-10 opacity-[0.12] -rotate-12 text-gray-700">
          <RabbitDoodle className="w-24 h-24" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-[0.10] -rotate-6 text-gray-700">
          <RabbitDoodle className="w-20 h-20" />
        </div>
        <div className="absolute bottom-24 right-10 opacity-[0.11] rotate-8 text-gray-700">
          <CatDoodle className="w-20 h-20" />
        </div>

        {/* paw prints scattered */}
        <div className="absolute top-52 left-1/2 -translate-x-1/2 opacity-[0.06] text-gray-700 rotate-12">
          <PawPrint className="w-20 h-20" />
        </div>
        <div className="absolute bottom-44 left-20 opacity-[0.05] text-gray-700 -rotate-12">
          <PawPrint className="w-16 h-16" />
        </div>
        <div className="absolute bottom-36 right-24 opacity-[0.05] text-gray-700 rotate-6">
          <PawPrint className="w-16 h-16" />
        </div>
      </div>

      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={700}
          gravity={0.14}
          colors={['#f472b6', '#fb7185', '#fde047', '#ffffff']}
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-4 pt-10 md:pt-14 pb-24">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <AnimatePresence mode="wait">
            {candlesLit ? (
              <motion.div
                key="wish"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                className="space-y-2"
              >
                <h2 className="font-serif-title text-4xl md:text-5xl text-gray-800">Make a Wish</h2>
                <p className="font-sans-body text-gray-500 tracking-wide text-sm md:text-base">
                  Tap the candles to blow them out. Or use the button.
                </p>
              </motion.div>
            ) : !isCut ? (
              <motion.div
                key="cut"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                className="space-y-2"
              >
                <h2 className="font-serif-title text-4xl md:text-5xl text-gray-800">Cut the Cake</h2>
                <div className="inline-flex items-center gap-2 text-pink-500 bg-white/70 backdrop-blur px-4 py-2 rounded-full border border-pink-100 shadow-sm">
                  <PartyPopper size={18} />
                  <span className="font-sans-body tracking-wider text-xs md:text-sm font-bold">Tap the cake</span>
                </div>
              </motion.div>
            ) : (
              <motion.div key="yay" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}>
                <h2 className="font-serif-title text-5xl md:text-6xl text-pink-500 drop-shadow-sm">Yay!</h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scene */}
        <div className="relative mx-auto max-w-2xl">
          {/* Table */}
          <div className="relative mt-8 rounded-[2.5rem] bg-white/55 backdrop-blur border border-white shadow-[0_18px_80px_rgba(0,0,0,0.10)] overflow-hidden">
            {/* table top area */}
            <div className="relative h-[28rem] md:h-[30rem] flex items-center justify-center">
              <div className="absolute inset-0">
                <div className="absolute -top-24 left-10 w-64 h-64 bg-pink-200/18 blur-3xl rounded-full" />
                <div className="absolute -bottom-28 right-10 w-72 h-72 bg-purple-200/12 blur-3xl rounded-full" />
                <div
                  className="absolute inset-0 opacity-[0.18]"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, rgba(244,114,182,0.18) 1px, transparent 0)',
                    backgroundSize: '16px 16px',
                  }}
                />
              </div>

              {/* Cute small cake group */}
              <div className="relative">
                {/* Candle row above cake */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex items-end justify-center z-30">
                  <Candle lit={candlesLit} delay={0.0} onTap={extinguish} />
                  <Candle lit={candlesLit} delay={0.2} onTap={extinguish} />
                  <Candle lit={candlesLit} delay={0.4} onTap={extinguish} />
                </div>

                {/* Knife animation */}
                <AnimatePresence>
                  {isCut && (
                    <motion.div
                      initial={{ opacity: 0, x: 70, y: -120, rotate: 45 }}
                      animate={{ opacity: [1, 1, 0], x: [70, 0, 0], y: [-120, 0, 40], rotate: [45, 0, -8] }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                    >
                      <div className="w-2 h-44 bg-gradient-to-b from-gray-300 to-white border border-gray-400 rounded-b-full shadow-xl relative">
                        <div className="absolute top-0 w-5 h-12 bg-rose-900 -left-1.5 rounded-sm shadow-md" />
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-6 h-2 bg-gray-200 rounded-full opacity-80" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Cake button */}
                <motion.button
                  type="button"
                  onClick={handleCut}
                  whileHover={!candlesLit && !isCut ? { y: -2, scale: 1.01 } : {}}
                  whileTap={!candlesLit && !isCut ? { scale: 0.99 } : {}}
                  className={candlesLit ? 'cursor-not-allowed' : 'cursor-pointer'}
                  aria-label="Cake"
                >
                  {/* Top frosting cap (small, cute like reference) */}
                  <div className="relative mx-auto w-72 md:w-80 h-24 rounded-[2.2rem] bg-gradient-to-b from-white via-[#fff7fb] to-pink-50 border border-white shadow-[0_16px_50px_rgba(0,0,0,0.10)] overflow-hidden">
                    {/* strawberry row */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2">
                      <Strawberry />
                      <Strawberry />
                      <Strawberry />
                      <Strawberry />
                    </div>

                    {/* drips */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-white/85" />
                    <div className="absolute top-6 left-10 w-6 h-10 bg-white/75 rounded-b-3xl" />
                    <div className="absolute top-6 left-[45%] w-7 h-12 bg-white/72 rounded-b-3xl" />
                    <div className="absolute top-6 right-14 w-5 h-9 bg-white/72 rounded-b-3xl" />

                    {/* sprinkles */}
                    <div className="absolute inset-0 opacity-25 bg-[radial-gradient(rgba(244,114,182,0.30)_1px,transparent_1px)] [background-size:10px_10px]" />

                    {/* cut split effect for top tier */}
                    <div className="absolute inset-0 pointer-events-none">
                      <AnimatePresence>
                        {isCut && (
                          <>
                            <motion.div
                              initial={{ x: 0 }}
                              animate={{ x: -24, rotate: -2 }}
                              transition={{ type: 'spring', stiffness: 70, damping: 16 }}
                              className="absolute inset-0"
                            >
                              <div className="absolute right-0 top-0 h-full w-3 bg-pink-200/45" />
                            </motion.div>
                            <motion.div
                              initial={{ x: 0 }}
                              animate={{ x: 24, rotate: 2 }}
                              transition={{ type: 'spring', stiffness: 70, damping: 16 }}
                              className="absolute inset-0"
                            >
                              <div className="absolute left-0 top-0 h-full w-3 bg-pink-200/45" />
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Bottom layer */}
                  <div className="relative mx-auto -mt-6 w-80 md:w-[22rem] h-28 rounded-[2.6rem] bg-gradient-to-b from-pink-100 via-pink-100 to-pink-200 border border-white shadow-[0_24px_70px_rgba(0,0,0,0.12)] overflow-hidden">
                    {/* cute wavy cream line like reference */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[82%] h-2 bg-white/65 rounded-full" />
                    <div className="absolute top-[3.05rem] left-1/2 -translate-x-1/2 w-[72%] h-1 bg-white/45 rounded-full" />

                    {/* dots */}
                    <div className="absolute inset-0 opacity-18 bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:14px_14px]" />

                    {/* name plaque */}
                    <div className="absolute bottom-7 left-1/2 -translate-x-1/2">
                      <div className="px-6 py-2 rounded-full bg-white/80 border border-white shadow-sm">
                        <span className="font-serif-title text-lg text-pink-600 tracking-wide">Subu</span>
                      </div>
                    </div>

                    {/* tiny creams */}
                    <div className="absolute -top-4 left-12">
                      <CreamDot />
                    </div>
                    <div className="absolute -top-4 right-12">
                      <CreamDot />
                    </div>

                    {/* cut split effect for bottom tier */}
                    <div className="absolute inset-0 pointer-events-none">
                      <AnimatePresence>
                        {isCut && (
                          <>
                            <motion.div
                              initial={{ x: 0 }}
                              animate={{ x: -30, rotate: -2 }}
                              transition={{ type: 'spring', stiffness: 70, damping: 16 }}
                              className="absolute inset-0"
                            >
                              <div className="absolute right-0 top-0 h-full w-3 bg-[#f9a8d4]/55" />
                            </motion.div>
                            <motion.div
                              initial={{ x: 0 }}
                              animate={{ x: 30, rotate: 2 }}
                              transition={{ type: 'spring', stiffness: 70, damping: 16 }}
                              className="absolute inset-0"
                            >
                              <div className="absolute left-0 top-0 h-full w-3 bg-[#f9a8d4]/55" />
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Plate + stand */}
                  <div className="pointer-events-none relative mt-4 flex flex-col items-center">
                    <div className="w-[26rem] md:w-[30rem] h-4 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-full shadow-lg border border-gray-200" />
                    <div className="w-24 h-12 bg-gradient-to-b from-gray-100 to-gray-200 border-x border-white/50 skew-x-12 opacity-90" />
                    <div className="w-56 md:w-72 h-3 bg-gray-200 rounded-full shadow-xl" />
                  </div>
                </motion.button>

                {/* Text is NOT hidden anymore */}
                <AnimatePresence>
                  {isCut && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: -150, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                      className="absolute left-1/2 -translate-x-1/2 top-1/2 z-40 pointer-events-none"
                    >
                      <div className="px-6 py-3 rounded-2xl bg-white/88 backdrop-blur border border-white shadow-lg text-center">
                        <p className="font-serif-title text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 italic">
                          Happy Birthday
                        </p>
                        <p className="font-sans-body text-xs md:text-sm text-gray-500 tracking-widest uppercase mt-1">
                          Subu
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* table base */}
            <div className="h-24 bg-[#fdf2f8] border-t border-white/80 shadow-[0_-16px_60px_rgba(0,0,0,0.06)] relative">
              <div className="absolute inset-0 opacity-22 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {candlesLit ? (
              <button
                onClick={extinguish}
                className="bg-white/85 backdrop-blur text-pink-500 px-6 py-3 rounded-full shadow-sm text-sm border border-pink-100 hover:bg-white transition-colors"
              >
                Tap to blow out candles
              </button>
            ) : (
              <button
                onClick={handleCut}
                className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors text-sm tracking-widest uppercase"
              >
                Cut the Cake
              </button>
            )}
          </div>

          {candlesLit && (
            <p className="mt-3 text-center text-gray-400 text-sm font-sans-body">
              Little tip: tap any candle. It counts.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cake;
