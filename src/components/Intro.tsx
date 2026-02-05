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

            {/* Title: Aesthetic & Minimal Update */}
            <div className="mt-8 text-center">
              <div className="relative inline-block">
                
                {/* Decorative floating elements */}
                <motion.div 
                   className="absolute -top-5 -left-6 text-pink-300 opacity-80"
                   animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
                   transition={{ duration: 4, repeat: Infinity }}
                >
                   <Sparkles size={20} fill="#fbcfe8" />
                </motion.div>

                <motion.div 
                   className="absolute -bottom-2 -right-6 text-purple-300 opacity-80"
                   animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 0] }}
                   transition={{ duration: 3, repeat: Infinity }}
                >
                   <Smile size={22} />
                </motion.div>

                {/* Main Text: Minimal Gradient */}
                <h1 className="relative font-serif-title text-5xl md:text-7xl leading-[1.0] tracking-tight">
                  <span className="block text-[0.25em] tracking-[0.4em] uppercase text-gray-400 font-sans-body mb-2">It's your day</span>
                  <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
                    Happy Birthday
                  </span>
                </h1>

                {/* Minimal Underline */}
                <div className="relative mx-auto mt-3 w-24 h-1 rounded-full bg-gradient-to-r from-pink-200/80 to-purple-200/80">
                  <motion.div
                    className="absolute top-0 left-0 h-full w-full rounded-full bg-white/40"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    style={{ overflow: 'hidden' }}
                  />
                </div>
              </div>
            </div>

            {/* Name: Visually Lovely & Pretty Update */}
            <div className="mt-10 flex items-center justify-center">
              <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                {/* Soft glow backing */}
                <motion.div
                  className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-pink-100 via-purple-50 to-rose-100 blur-2xl opacity-70"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative px-12 py-7 rounded-[2.5rem] bg-white/60 border border-white/80 shadow-xl shadow-pink-100/40 backdrop-blur-sm flex flex-col items-center">
                  
                  {/* Floating Crown - Cute */}
                  <motion.div 
                    className="absolute -top-5"
                    animate={{ y: [0, -3, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                     <div className="p-2.5 bg-yellow-50 rounded-full border border-white shadow-sm">
                        <Crown size={22} className="text-yellow-500" fill="#fde047" />
                     </div>
                  </motion.div>

                  {/* SUBU - Lovely Gradient Text */}
                  <div className="relative">
                     <h2 className="font-serif-title text-7xl md:text-8xl tracking-tighter leading-none">
                       {/* Soft shadow layer */}
                       <span className="absolute top-1 left-1 text-pink-200 blur-[1px] select-none">Subu</span>
                       {/* Main beautiful text */}
                       <span className="relative z-10 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
                         Subu
                       </span>
                     </h2>
                     
                     {/* Tiny heart decorations attached to name */}
                     <motion.div 
                       className="absolute top-2 -right-5 text-rose-300" 
                       animate={{ scale: [1, 1.25, 1] }} 
                       transition={{ duration: 2, repeat: Infinity }}
                     >
                        <Heart size={16} fill="currentColor" />
                     </motion.div>
                  </div>

                  {/* Cutest Human - EXACTLY AS REQUESTED */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-100/80 to-purple-100/70 border border-white/90 text-[11px] tracking-wider uppercase text-gray-800 font-sans-body shadow-sm">
                      cutest human
                    </div>
                  </div>

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
