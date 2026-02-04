import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Flame, Sparkles } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

type StarDot = {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

type Cloud = {
  id: number;
  top: string;
  width: number;
  height: number;
  delay: number;
  duration: number;
  blur: number;
  opacity: number;
};

const makeStars = (count: number): StarDot[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2.2 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2.5,
    opacity: Math.random() * 0.5 + 0.15,
  }));

const makeClouds = (): Cloud[] =>
  Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    top: `${10 + Math.random() * 70}%`,
    width: 260 + Math.random() * 240,
    height: 90 + Math.random() * 80,
    delay: Math.random() * 2,
    duration: 18 + Math.random() * 14,
    blur: 24 + Math.random() * 22,
    opacity: 0.10 + Math.random() * 0.08,
  }));

const SkyLantern: React.FC = () => {
  const [released, setReleased] = useState(false);
  const [wish, setWish] = useState('');

  const stars = useMemo(() => makeStars(70), []);
  const clouds = useMemo(() => makeClouds(), []);

  const handleRelease = () => {
    if (!released) setReleased(true);
  };

  const headline = !released ? 'Make a Wish' : 'Goodnight, Subu.';
  const subline = !released
    ? "You read the letters. You blew the candles. Now send one quiet wish into the sky."
    : "If life gets loud, come back here. This page will still be waiting for you.";

  return (
    <div className="min-h-dvh relative overflow-hidden flex flex-col items-center justify-center text-center px-6 py-10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Vignette + glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[70rem] h-[70rem] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-52 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_70%)]" />
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <MotionDiv
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
            }}
            initial={{ opacity: s.opacity * 0.6 }}
            animate={{ opacity: [s.opacity * 0.4, s.opacity, s.opacity * 0.5] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Soft clouds drifting */}
      <div className="pointer-events-none absolute inset-0">
        {clouds.map((c) => (
          <MotionDiv
            key={c.id}
            className="absolute rounded-full bg-white"
            style={{
              top: c.top,
              left: `-${c.width}px`,
              width: c.width,
              height: c.height,
              filter: `blur(${c.blur}px)`,
              opacity: c.opacity,
            }}
            animate={{ x: ['0%', '160%'] }}
            transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        {/* Lantern Area */}
        <div className="relative w-full h-[54vh] flex items-end justify-center">
          {/* Lantern glow pool */}
          <AnimatePresence>
            {!released && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute bottom-2 w-[22rem] h-[10rem] rounded-full bg-orange-400/10 blur-3xl"
              />
            )}
          </AnimatePresence>

          <MotionDiv
            onClick={handleRelease}
            className="relative cursor-pointer select-none"
            animate={
              released
                ? { y: -880, x: 60, rotate: 8, opacity: 0, scale: 0.7 }
                : { y: [0, -10, 0], rotate: [-2, 2, -2] }
            }
            transition={
              released
                ? { duration: 10.5, ease: 'easeInOut' }
                : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {/* Outer glow */}
            <MotionDiv
              className="pointer-events-none absolute -inset-10 rounded-full"
              animate={released ? { opacity: 0 } : { opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background:
                  'radial-gradient(circle at center, rgba(251,146,60,0.28), rgba(251,146,60,0) 70%)',
              }}
            />

            {/* Lantern body */}
            <div className="w-44 h-56 rounded-t-[3.2rem] rounded-b-[1.2rem] relative overflow-hidden shadow-[0_0_80px_rgba(251,146,60,0.35)]">
              {/* Body gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-500 opacity-90" />

              {/* Soft paper texture lines */}
              <div
                className="absolute inset-0 opacity-[0.10]"
                style={{
                  backgroundImage:
                    'linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0) 30%, rgba(255,255,255,0.25))',
                }}
              />

              {/* Shimmer sweep */}
              <MotionDiv
                className="absolute top-0 -left-24 w-24 h-full bg-white/30 blur-xl rotate-12"
                animate={released ? { opacity: 0 } : { x: [0, 320, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Tap hint */}
              <AnimatePresence>
                {!released && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute top-10 left-1/2 -translate-x-1/2 text-orange-900/60 text-[11px] tracking-[0.35em] uppercase font-sans-body font-semibold"
                  >
                    Tap to release
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Flame */}
              <MotionDiv
                className="absolute bottom-7 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full"
                animate={released ? { opacity: 0.9 } : { opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background:
                    'radial-gradient(circle at 40% 35%, rgba(254,240,138,0.95), rgba(251,146,60,0.65) 55%, rgba(0,0,0,0) 70%)',
                  filter: 'blur(0.2px)',
                }}
              >
                <MotionDiv
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Flame className="text-orange-600 fill-orange-600" size={22} />
                </MotionDiv>
              </MotionDiv>

              {/* Inner glow */}
              <div className="absolute inset-0 bg-yellow-200/20 blur-2xl" />
            </div>

            {/* Base ring */}
            <div className="w-36 h-2 bg-orange-950/25 mx-auto mt-2 rounded-full" />

            {/* Tiny sparkles around lantern */}
            <AnimatePresence>
              {!released && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute -right-8 top-6 text-yellow-200/90"
                >
                  <MotionDiv
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles size={18} />
                  </MotionDiv>
                </motion.div>
              )}
            </AnimatePresence>
          </MotionDiv>
        </div>

        {/* Text */}
        <div className="mt-6 w-full">
          <AnimatePresence mode="wait">
            {!released ? (
              <motion.div
                key="before"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <h2 className="font-serif-title text-3xl md:text-4xl text-white/90">{headline}</h2>
                <p className="font-sans-body text-white/65 font-light text-sm md:text-base leading-relaxed max-w-md mx-auto">
                  {subline}
                </p>

                <div className="mt-4 w-full max-w-md mx-auto">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-white/70 text-xs tracking-wider uppercase mb-2 font-sans-body">
                      Optional
                    </p>
                    <input
                      value={wish}
                      onChange={(e) => setWish(e.target.value)}
                      placeholder="Write your wish here..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/85 placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-orange-300/40 font-sans-body"
                    />
                    <p className="text-white/45 text-xs mt-2 font-sans-body">
                      Tap the lantern when you are ready.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="after"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.45 }}
                className="space-y-4"
              >
                <h2 className="font-serif-title text-3xl md:text-4xl text-white/90">{headline}</h2>

                <p className="font-sans-body text-white/65 font-light text-sm md:text-base leading-relaxed max-w-md mx-auto">
                  {subline}
                </p>

                <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-5 max-w-md mx-auto backdrop-blur-sm">
                  <p className="text-white/60 text-xs tracking-wider uppercase font-sans-body mb-2">
                    Your wish
                  </p>

                  <p className="text-white/85 font-sans-body text-sm leading-relaxed">
                    {wish.trim().length > 0
                      ? wish.trim()
                      : "I hope you feel loved, calm, and proud of yourself this year."}
                  </p>

                  <div className="flex items-center justify-center mt-4 text-yellow-200/90">
                    <MotionDiv
                      animate={{ scale: [1, 1.25, 1], rotate: [0, 8, 0] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Star size={18} className="fill-yellow-200" />
                    </MotionDiv>
                  </div>
                </div>

                <p className="text-white/40 text-xs font-sans-body">
                  Tap anywhere to watch the sky for a second.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Subtle shooting star after release */}
      <AnimatePresence>
        {released && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0"
          >
            <motion.div
              initial={{ x: '-20%', y: '20%', opacity: 0 }}
              animate={{ x: '130%', y: '-10%', opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, delay: 1.6, ease: 'easeOut' }}
              className="absolute w-40 h-[2px] bg-white/60 blur-[0.5px]"
              style={{ transform: 'rotate(-20deg)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click-to-replay hint */}
      <AnimatePresence>
        {released && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <MotionButton
              type="button"
              onClick={() => setReleased(false)}
              className="px-6 py-3 rounded-full bg-white/8 border border-white/12 text-white/70 text-xs tracking-widest uppercase backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              Replay
            </MotionButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkyLantern;
