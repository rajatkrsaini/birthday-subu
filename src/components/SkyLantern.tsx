import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Star, Sparkles } from 'lucide-react';

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
  tint: string;
};

const makeStars = (count: number): StarDot[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2.2 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2.5,
    opacity: Math.random() * 0.55 + 0.12,
  }));

const makeClouds = (): Cloud[] =>
  Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    top: `${8 + Math.random() * 76}%`,
    width: 260 + Math.random() * 280,
    height: 90 + Math.random() * 90,
    delay: Math.random() * 2,
    duration: 20 + Math.random() * 18,
    blur: 22 + Math.random() * 26,
    opacity: 0.08 + Math.random() * 0.10,
    tint: i % 2 === 0 ? 'bg-indigo-200' : 'bg-slate-200',
  }));

const SkyLantern: React.FC = () => {
  const [released, setReleased] = useState(false);
  const [wish, setWish] = useState('');
  const [started, setStarted] = useState(false);

  const stars = useMemo(() => makeStars(80), []);
  const clouds = useMemo(() => makeClouds(), []);

  const canRelease = !released && !started;

  const handleRelease = () => {
    if (!canRelease) return;
    setStarted(true);
    setReleased(true);
  };

  const handleReplay = () => {
    setReleased(false);
    setStarted(false);
  };

  const headline = !released ? 'Make a Wish' : 'Goodnight, Subu.';
  const subline = !released
    ? 'Last page. Make One or More wishes.'
    : '...';

  return (
    <div className="min-h-dvh relative overflow-hidden flex items-center justify-center px-6 py-10">
      {/* SKY BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Atmosphere layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-44 left-1/2 -translate-x-1/2 w-[72rem] h-[72rem] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-60 left-1/2 -translate-x-1/2 w-[64rem] h-[64rem] rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.62)_75%)]" />
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <MotionDiv
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.opacity }}
            initial={{ opacity: s.opacity * 0.55 }}
            animate={{ opacity: [s.opacity * 0.35, s.opacity, s.opacity * 0.45] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Drifting clouds */}
      <div className="pointer-events-none absolute inset-0">
        {clouds.map((c) => (
          <MotionDiv
            key={c.id}
            className={`absolute rounded-full ${c.tint}`}
            style={{
              top: c.top,
              left: `-${c.width}px`,
              width: c.width,
              height: c.height,
              opacity: c.opacity,
              filter: `blur(${c.blur}px)`,
            }}
            animate={{ x: ['0%', '170%'] }}
            transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* LEFT: text + controls */}
        <div className="text-center lg:text-left">
          <AnimatePresence mode="wait">
            {!released ? (
              <motion.div
                key="pre"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <h2 className="font-serif-title text-4xl md:text-5xl text-white/90">{headline}</h2>
                <p className="font-sans-body text-white/65 font-light text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {subline}
                </p>

                <div className="mt-6 bg-white/6 border border-white/12 rounded-[1.6rem] p-5 backdrop-blur-sm max-w-lg mx-auto lg:mx-0">
                  <p className="text-white/55 text-xs tracking-widest uppercase font-sans-body mb-2">
                    Optional wish
                  </p>
                  <input
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    placeholder="Write a wish for the year ahead..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/85 placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-orange-300/35 font-sans-body"
                  />
                  <p className="text-white/45 text-xs mt-2 font-sans-body">
                    You can leave this blank. The lantern still carries it.
                  </p>

                  <div className="mt-5 flex items-center justify-center lg:justify-start gap-3">
                    <MotionButton
                      type="button"
                      onClick={handleRelease}
                      disabled={!canRelease}
                      whileTap={{ scale: 0.98 }}
                      className={[
                        "px-7 py-3 rounded-full font-sans-body text-xs tracking-widest uppercase",
                        "transition-all duration-200 shadow-lg",
                        canRelease
                          ? "bg-white text-slate-900 hover:bg-white/90"
                          : "bg-white/30 text-white/60 cursor-not-allowed",
                      ].join(" ")}
                    >
                      Release the lantern
                    </MotionButton>

                    <div className="flex items-center gap-2 text-white/55">
                      <Sparkles size={16} />
                      <span className="text-xs font-sans-body tracking-wide">
                        one last moment
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="post"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.45 }}
                className="space-y-4"
              >
                <h2 className="font-serif-title text-4xl md:text-5xl text-white/90">{headline}</h2>
                <p className="font-sans-body text-white/65 font-light text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {subline}
                </p>

                <div className="mt-6 bg-white/6 border border-white/12 rounded-[1.6rem] p-5 backdrop-blur-sm max-w-lg mx-auto lg:mx-0">
                  <p className="text-white/55 text-xs tracking-widest uppercase font-sans-body mb-2">
                    The wish we sent
                  </p>
                  <p className="text-white/85 font-sans-body text-sm leading-relaxed">
                    {wish.trim().length > 0
                      ? wish.trim()
                      : 'Stay happy all the time.'}
                  </p>

                  <div className="mt-5 flex items-center justify-center lg:justify-start gap-3">
                    <MotionButton
                      type="button"
                      onClick={handleReplay}
                      whileTap={{ scale: 0.98 }}
                      className="px-7 py-3 rounded-full font-sans-body text-xs tracking-widest uppercase bg-white/10 border border-white/14 text-white/80 hover:bg-white/12 transition-colors"
                    >
                      Replay
                    </MotionButton>

                    <div className="flex items-center gap-2 text-yellow-200/90">
                      <MotionDiv
                        animate={{ scale: [1, 1.25, 1], rotate: [0, 8, 0] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Star size={16} className="fill-yellow-200" />
                      </MotionDiv>
                      <span className="text-xs font-sans-body tracking-wide text-white/55">
                        sent to the sky
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: lantern visual */}
        <div className="relative w-full h-[56vh] lg:h-[64vh] flex items-end justify-center">
          {/* Glow pool */}
          <AnimatePresence>
            {!released && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute bottom-8 w-[28rem] h-[12rem] rounded-full bg-orange-400/10 blur-3xl"
              />
            )}
          </AnimatePresence>

          {/* Lantern group */}
          <MotionDiv
            className="relative select-none"
            animate={
              released
                ? { y: -920, x: 70, rotate: 10, opacity: 0, scale: 0.72 }
                : { y: [0, -10, 0], rotate: [-2, 2, -2] }
            }
            transition={
              released
                ? { duration: 10.5, ease: 'easeInOut' }
                : { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {/* Outer glow pulse */}
            <MotionDiv
              className="pointer-events-none absolute -inset-12 rounded-full"
              animate={released ? { opacity: 0 } : { opacity: [0.22, 0.42, 0.22] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background:
                  'radial-gradient(circle at center, rgba(251,146,60,0.28), rgba(251,146,60,0) 70%)',
              }}
            />

            {/* Lantern body */}
            <div className="w-48 h-60 rounded-t-[3.3rem] rounded-b-[1.2rem] relative overflow-hidden shadow-[0_0_90px_rgba(251,146,60,0.35)]">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-500 opacity-90" />

              {/* Paper grain */}
              <div
                className="absolute inset-0 opacity-[0.10]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.30) 1px, transparent 0)',
                  backgroundSize: '18px 18px',
                }}
              />

              {/* Shimmer sweep */}
              <MotionDiv
                className="absolute top-0 -left-28 w-28 h-full bg-white/28 blur-xl rotate-12"
                animate={released ? { opacity: 0 } : { x: [0, 360, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Flame + glow */}
              <MotionDiv
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full"
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background:
                    'radial-gradient(circle at 40% 35%, rgba(254,240,138,0.95), rgba(251,146,60,0.65) 55%, rgba(0,0,0,0) 70%)',
                }}
              >
                <MotionDiv
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Flame className="text-orange-600 fill-orange-600" size={24} />
                </MotionDiv>
              </MotionDiv>

              {/* Inner warmth */}
              <div className="absolute inset-0 bg-yellow-200/18 blur-2xl" />

              {/* Small emblem */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 text-orange-900/35">
                <Star size={18} className="fill-orange-900/20" />
              </div>
            </div>

            {/* Base ring */}
            <div className="w-40 h-2 bg-orange-950/25 mx-auto mt-2 rounded-full" />
          </MotionDiv>
        </div>
      </div>

      {/* Shooting star after release */}
      <AnimatePresence>
        {released && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0"
          >
            <motion.div
              initial={{ x: '-25%', y: '30%', opacity: 0 }}
              animate={{ x: '130%', y: '-10%', opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, delay: 1.6, ease: 'easeOut' }}
              className="absolute w-52 h-[2px] bg-white/60 blur-[0.5px]"
              style={{ transform: 'rotate(-18deg)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkyLantern;
