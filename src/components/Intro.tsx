import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Heart, PartyPopper, Gift, Smile, Coffee, Moon, Crown } from 'lucide-react';

interface IntroProps {
  onStart: () => void;
}

type FloatItem = {
  id: number;
  top: string;
  left: string;
  rotate: number;
  scale: number;
  opacity: number;
  delay: number;
  duration: number;
  kind: 'text' | 'icon';
  text?: string;
  icon?: React.ReactNode;
};

const Balloon = ({
  color,
  delay,
  left,
  size = 60,
}: {
  color: string;
  delay: number;
  left: string;
  size?: number;
}) => (
  <motion.div
    initial={{ y: '110vh', opacity: 0.75 }}
    animate={{ y: '-120vh', x: [0, 10, 0, -8, 0] }}
    transition={{ duration: 22, delay, repeat: Infinity, ease: 'linear' }}
    className={`absolute bottom-0 ${left} z-0 pointer-events-none`}
    style={{ width: size, height: size * 1.2 }}
  >
    <motion.div
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      className={`w-full h-full rounded-[50%] ${color} relative opacity-80 shadow-sm`}
    >
      <div className="absolute top-[15%] left-[20%] w-[15%] h-[25%] bg-white opacity-40 rounded-[50%] -rotate-45" />
      <div className="absolute bottom-[-40%] left-1/2 w-[1px] h-[50%] bg-gray-300 -translate-x-1/2" />
    </motion.div>
  </motion.div>
);

const FloatingCuteLayer: React.FC<{ className?: string }> = ({ className }) => {
  const items = useMemo<FloatItem[]>(
    () =>
      Array.from({ length: 22 }).map((_, i) => {
        const isText = Math.random() > 0.45;

        const texts = [
          'bsdk',
          'silly chan',
          'qt',
          'hehe',
          'lazy ass',
          'cutie',
          'aunty',
          'queen',
          'smile',
          'why so cute',
          'slay',
          'okay wow',
        ];

        const icons = [
          <Sparkles key="s" size={18} className="text-gray-700" />,
          <Heart key="h" size={18} className="text-gray-700" />,
          <Star key="st" size={18} className="text-gray-700" />,
          <PartyPopper key="p" size={18} className="text-gray-700" />,
          <Gift key="g" size={18} className="text-gray-700" />,
          <Smile key="sm" size={18} className="text-gray-700" />,
          <Coffee key="c" size={18} className="text-gray-700" />,
          <Moon key="m" size={18} className="text-gray-700" />,
          <Crown key="cr" size={18} className="text-gray-700" />,
        ];

        return {
          id: i,
          top: `${Math.floor(Math.random() * 92) + 4}%`,
          left: `${Math.floor(Math.random() * 92) + 4}%`,
          rotate: Math.floor(Math.random() * 30) - 15,
          scale: 0.75 + Math.random() * 0.9,
          opacity: 0.18 + Math.random() * 0.10,
          delay: Math.random() * 1.8,
          duration: 3.6 + Math.random() * 3.2,
          kind: isText ? 'text' : 'icon',
          text: isText ? texts[Math.floor(Math.random() * texts.length)] : undefined,
          icon: !isText ? icons[Math.floor(Math.random() * icons.length)] : undefined,
        };
      }),
    []
  );

  return (
    <div className={['pointer-events-none absolute inset-0 overflow-hidden', className ?? ''].join(' ')}>
      {items.map((it) => (
        <motion.div
          key={it.id}
          className="absolute"
          style={{
            top: it.top,
            left: it.left,
            opacity: it.opacity,
            transform: `rotate(${it.rotate}deg) scale(${it.scale})`,
          }}
          initial={{ y: 10, opacity: it.opacity * 0.75 }}
          animate={{
            y: [-10, 10, -10],
            opacity: [it.opacity * 0.65, it.opacity, it.opacity * 0.7],
          }}
          transition={{ delay: it.delay, duration: it.duration, repeat: Infinity, ease: 'easeInOut' }}
        >
          {it.kind === 'text' ? (
            <div className="px-3 py-1.5 rounded-full bg-white/65 border border-white/80 text-[11px] tracking-wider uppercase text-gray-700 font-sans-body">
              {it.text}
            </div>
          ) : (
            <div className="p-2 rounded-full bg-white/60 border border-white/75">
              {it.icon}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="min-h-dvh relative overflow-hidden flex items-center justify-center px-5 py-10">
      {/* Simple pink background (outside card) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-100 via-rose-50 to-pink-100" />
        <div className="absolute -top-28 -left-28 w-[30rem] h-[30rem] rounded-full bg-pink-200/25 blur-3xl" />
        <div className="absolute top-10 -right-36 w-[36rem] h-[36rem] rounded-full bg-purple-200/18 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 w-[38rem] h-[38rem] rounded-full bg-amber-200/14 blur-3xl" />
      </div>

      {/* Balloons stay outside */}
      <Balloon color="bg-pink-200" delay={0} left="left-[8%]" size={92} />
      <Balloon color="bg-green-100" delay={4} left="left-[22%]" size={60} />
      <Balloon color="bg-rose-100" delay={7} left="left-[78%]" size={74} />
      <Balloon color="bg-blue-50" delay={2} left="left-[58%]" size={104} />
      <Balloon color="bg-pink-100" delay={10} left="left-[40%]" size={66} />
      <Balloon color="bg-purple-50" delay={5} left="left-[90%]" size={82} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Outer glow */}
        <div className="absolute -inset-5 rounded-[3.4rem] bg-gradient-to-r from-pink-200/25 via-amber-200/18 to-purple-200/20 blur-2xl" />

        <div className="relative rounded-[3rem] overflow-hidden border border-white/70 bg-white/55 backdrop-blur-md shadow-2xl">
          {/* Floating elements INSIDE card */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-rose-50/60 to-white/75" />
            <div className="absolute -top-32 -left-28 w-[26rem] h-[26rem] rounded-full bg-pink-200/18 blur-3xl" />
            <div className="absolute -bottom-36 right-[-6rem] w-[30rem] h-[30rem] rounded-full bg-lime-200/12 blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)",
                backgroundSize: "18px 18px",
              }}
            />

            <FloatingCuteLayer className="opacity-[0.95]" />

            {/* extra soft pastel confetti dots (very light) */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-16 left-10 w-2 h-2 rounded-full bg-pink-200/40" />
              <div className="absolute top-24 right-16 w-2.5 h-2.5 rounded-full bg-amber-200/35" />
              <div className="absolute bottom-28 left-16 w-2.5 h-2.5 rounded-full bg-purple-200/35" />
              <div className="absolute bottom-20 right-24 w-2 h-2 rounded-full bg-rose-200/40" />
            </div>
          </div>

          {/* Top ribbon */}
          <div className="relative px-8 md:px-12 pt-10 pb-7">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100/55 via-white/40 to-green-100/45" />

            <div className="relative flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="text-yellow-300"
              >
                <Star size={22} className="text-yellow-300" fill="#fde047" />
              </motion.div>

              <div className="px-4 py-2 rounded-full bg-white/65 border border-white/70 shadow-sm">
                <p className="text-[11px] md:text-xs tracking-[0.35em] uppercase text-gray-600 font-sans-body">
                  For my HG
                </p>
              </div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                className="text-pink-300"
              >
                <Heart size={20} className="text-pink-300" fill="#f9a8d4" />
              </motion.div>
            </div>
          </div>

          {/* Body */}
          <div className="relative px-8 md:px-12 pb-10 pt-2">
            {/* Corner doodles */}
            <div className="pointer-events-none absolute top-6 left-7 opacity-[0.18] rotate-12">
              <PartyPopper size={26} className="text-gray-700" />
            </div>
            <div className="pointer-events-none absolute top-6 right-7 opacity-[0.15] -rotate-12">
              <Gift size={24} className="text-gray-700" />
            </div>

            <h2 className="text-gray-600 font-sans-body text-[12px] md:text-sm leading-relaxed tracking-wide max-w-xl mx-auto">
              I wanted you to open this on your special day, but I couldn't complete it.
              I know the moment is gone and you will never feel the same.
            </h2>

            {/* Title: prettier, pastel accents, more decorative */}
            <div className="mt-8 text-center">
              <div className="relative inline-block">
                {/* pastel halo */}
                <motion.div
                  className="absolute -inset-10 rounded-full bg-gradient-to-r from-pink-200/18 via-amber-200/10 to-purple-200/14 blur-3xl"
                  animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.02, 1] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* tiny pastel sparkles */}
                <motion.div
                  className="absolute -top-7 -left-9 opacity-[0.20]"
                  animate={{ rotate: [0, 8, 0], y: [0, -3, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sparkles size={18} className="text-gray-700" />
                </motion.div>

                <motion.div
                  className="absolute -top-6 -right-10 opacity-[0.18]"
                  animate={{ rotate: [0, -8, 0], y: [0, -3, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Star size={18} className="text-gray-700" />
                </motion.div>

                {/* decorative swirls */}
                <div className="pointer-events-none absolute -left-14 top-6 opacity-[0.14]">
                  <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
                    <path
                      d="M4 26c10-14 22-20 36-14 9 4 14 12 20 18"
                      stroke="rgba(244,114,182,0.35)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 30c7-10 16-14 26-10 6 2 10 7 14 11"
                      stroke="rgba(167,139,250,0.25)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="pointer-events-none absolute -right-14 top-7 opacity-[0.14] rotate-180">
                  <svg width="64" height="40" viewBox="0 0 64 40" fill="none">
                    <path
                      d="M4 26c10-14 22-20 36-14 9 4 14 12 20 18"
                      stroke="rgba(244,114,182,0.35)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 30c7-10 16-14 26-10 6 2 10 7 14 11"
                      stroke="rgba(167,139,250,0.25)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* text: outlined + soft blush shadow */}
                <h1 className="relative font-serif-title text-6xl md:text-7xl leading-[0.95] tracking-tight">
                  <span
                    className="absolute inset-0 select-none"
                    style={{
                      WebkitTextStroke: '1.2px rgba(244,114,182,0.28)',
                      color: 'transparent',
                      filter: 'blur(0.15px)',
                    }}
                    aria-hidden="true"
                  >
                    Happy Birthday
                  </span>

                  <span
                    className="relative"
                    style={{
                      color: '#111827',
                      textShadow:
                        '0 10px 26px rgba(244,114,182,0.10), 0 18px 40px rgba(167,139,250,0.06)',
                    }}
                  >
                    Happy Birthday
                  </span>
                </h1>

                {/* underline: pastel ribbon + dot */}
                <div className="relative mx-auto mt-4 w-[12.5rem] h-[10px]">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(244,114,182,0.45), rgba(251,191,36,0.22), rgba(167,139,250,0.35))',
                    }}
                    initial={{ opacity: 0, scaleX: 0.65 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/80 border border-white/90 shadow-sm"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </div>

            {/* Name: softer, more girly, pastel frame */}
            <div className="mt-9 flex items-center justify-center">
              <motion.div whileHover={{ scale: 1.03 }} className="relative">
                <motion.div
                  className="absolute -inset-7 rounded-[2.4rem] bg-gradient-to-r from-pink-200/30 via-amber-200/12 to-purple-200/22 blur-2xl"
                  animate={{ opacity: [0.32, 0.52, 0.32], scale: [1, 1.02, 1] }}
                  transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative px-7 py-5 rounded-[2rem] bg-white/78 border border-white/90 shadow-lg">
                  {/* crown badge: pastel */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-amber-100/70 border border-white/80 flex items-center justify-center shadow-md">
                    <Crown size={18} className="text-gray-700" />
                  </div>

                  <div className="relative inline-block">
                    {/* super soft shimmer */}
                    <motion.div
                      className="pointer-events-none absolute -inset-8 opacity-[0.22]"
                      animate={{ x: ['-30%', '30%', '-30%'] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(244,114,182,0.14) 35%, rgba(167,139,250,0.12) 55%, transparent 100%)',
                        filter: 'blur(12px)',
                      }}
                    />

                    {/* outlined name + gentle pastel tint */}
<span className="relative font-serif-title text-5xl md:text-7xl tracking-[0.02em]">
<span
  className="relative bg-clip-text text-transparent"
  style={{
    backgroundImage:
      'linear-gradient(135deg, #f472b6 0%, #fb7185 35%, #c084fc 70%)',
    textShadow: '0 6px 18px rgba(244,114,182,0.18)',
  }}
>
  Subu
</span>
                    </span>

                    {/* pastel underline with mini icon */}
<div className="mt-3 mx-auto h-[3px] w-20 rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 opacity-70" />
                    <div className="h-[2px] w-12 rounded-full bg-pink-300/55" />
                      <Sparkles size={14} className="text-gray-700 opacity-55" />
                      <div className="h-[2px] w-12 rounded-full bg-purple-300/45" />
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-100/80 to-purple-100/70 border border-white/90 text-[11px] tracking-wider uppercase text-gray-800 font-sans-body shadow-sm">
                      cutest human
                    </div>
                  </div>

                  {/* tiny hearts in corners (pastel, subtle) */}
                  <motion.div
                    className="pointer-events-none absolute -left-3 -bottom-3 opacity-[0.14]"
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Heart size={18} className="text-gray-700" />
                  </motion.div>

                  <motion.div
                    className="pointer-events-none absolute -right-4 -bottom-4 opacity-[0.12]"
                    animate={{ scale: [1, 1.10, 1], rotate: [0, 6, 0] }}
                    transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Star size={18} className="text-gray-700" />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Wish block */}
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-md rounded-2xl bg-white/60 border border-white/85 p-5 text-center shadow-sm">
                <p className="text-[11px] tracking-[0.32em] uppercase text-gray-500 font-sans-body">
                  ..
                </p>

                <p
                  className="mt-2 text-gray-700 font-sans-body text-sm leading-relaxed mx-auto max-w-sm"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  If you smile even once while scrolling, pls tell me.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-9 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                className="group relative px-10 py-4 rounded-full bg-gray-900 text-white shadow-xl shadow-pink-100/20 overflow-hidden"
              >
                <motion.div
                  className="absolute -inset-8 rounded-full bg-pink-200/18 blur-2xl"
                  animate={{ opacity: [0.12, 0.28, 0.12] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2 font-sans-body text-sm tracking-widest uppercase">
                  Click Here Pretty Human <Sparkles size={16} className="text-yellow-200" />
                </span>
              </motion.button>
            </div>

            <p className="mt-6 text-gray-500 text-xs font-sans-body tracking-wide text-center">
              ...
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Intro;
