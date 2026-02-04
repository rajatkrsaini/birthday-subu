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

const FloatingCuteLayer: React.FC = () => {
  const items = useMemo<FloatItem[]>(
    () =>
      Array.from({ length: 22 }).map((_, i) => {
        const isText = Math.random() > 0.45;

        const texts = [
          'bsdk energy',
          'main character',
          'qt alert',
          'best girl',
          'smol chaos',
          'no stress pls',
          'cute overload',
          'queen vibes',
          'ily (lowkey)',
          'approved',
          'extra cute',
          'hbd legend',
          'slay',
          'soft heart',
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
          opacity: 0.10 + Math.random() * 0.12,
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
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: [-10, 10, -10], opacity: [0, it.opacity, 0] }}
          transition={{ delay: it.delay, duration: it.duration, repeat: Infinity, ease: 'easeInOut' }}
        >
          {it.kind === 'text' ? (
            <div className="px-3 py-1.5 rounded-full bg-white/50 border border-white/70 text-[11px] tracking-wider uppercase text-gray-700 font-sans-body">
              {it.text}
            </div>
          ) : (
            <div className="p-2 rounded-full bg-white/45 border border-white/65">
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
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-white to-pink-50" />
        <div className="absolute -top-28 -left-28 w-[30rem] h-[30rem] rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute top-10 -right-36 w-[36rem] h-[36rem] rounded-full bg-purple-200/22 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 w-[38rem] h-[38rem] rounded-full bg-amber-200/16 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />

        <FloatingCuteLayer />
      </div>

      {/* Balloons */}
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

        <div className="relative rounded-[3rem] overflow-hidden border border-white/70 bg-white/45 backdrop-blur-md shadow-2xl">
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
                  A tiny birthday website. A lot of feelings.
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
              Still, I made it because you deserve something that stays.
              No pressure to feel anything. Just read it slowly, whenever it feels right.
            </h2>

            {/* Title */}
            <div className="mt-8 text-center">
              <div className="relative inline-block">
                <motion.div
                  className="absolute -inset-6 rounded-full bg-gradient-to-r from-pink-200/35 via-amber-200/25 to-purple-200/30 blur-2xl"
                  animate={{ opacity: [0.35, 0.55, 0.35] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                />

                <h1 className="relative font-serif-title text-6xl md:text-7xl text-gray-800 leading-[0.95] tracking-tight">
                  Happy Birthday
                </h1>

                <motion.div
                  className="relative mx-auto mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-pink-300/80 via-amber-300/70 to-purple-300/80"
                  initial={{ width: 40, opacity: 0 }}
                  animate={{ width: 160, opacity: 1 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Name - big standout */}
            <div className="mt-9 flex items-center justify-center">
              <motion.div whileHover={{ scale: 1.04 }} className="relative">
                <motion.div
                  className="absolute -inset-4 rounded-[1.8rem] bg-gradient-to-r from-pink-200/45 to-green-200/35 blur-xl"
                  animate={{ opacity: [0.35, 0.55, 0.35] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative px-6 py-3 rounded-[1.6rem] bg-white/70 border border-white/80 shadow-md">
                  <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-yellow-100/70 border border-white/70 flex items-center justify-center shadow-sm">
                    <Crown size={18} className="text-gray-700" />
                  </div>

                  <span className="font-serif-title text-6xl md:text-8xl text-gray-800 tracking-tight">
                    Subu
                  </span>

                  <div className="mt-2 flex items-center justify-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-pink-100/70 border border-white/80 text-[11px] tracking-wider uppercase text-gray-700 font-sans-body">
                      cutest human verified
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-100/70 border border-white/80 text-[11px] tracking-wider uppercase text-gray-700 font-sans-body">
                      bestie contract pending
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Extra text blocks */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/55 border border-white/80 p-5 text-left shadow-sm">
                <p className="text-[11px] tracking-[0.32em] uppercase text-gray-500 font-sans-body">
                  tiny note
                </p>
                <p className="mt-2 text-gray-700 font-sans-body text-sm leading-relaxed">
                  If you smile even once while scrolling, my job is done. If you laugh, I will act cool about it.
                </p>
              </div>

              <div className="rounded-2xl bg-white/55 border border-white/80 p-5 text-left shadow-sm">
                <p className="text-[11px] tracking-[0.32em] uppercase text-gray-500 font-sans-body">
                  serious note
                </p>
                <p className="mt-2 text-gray-700 font-sans-body text-sm leading-relaxed">
                  You bring calm to people without even trying. I hope this year gives you that same calm back.
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
                  className="absolute -inset-8 rounded-full bg-pink-200/20 blur-2xl"
                  animate={{ opacity: [0.12, 0.32, 0.12] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2 font-sans-body text-sm tracking-widest uppercase">
                  Open the pages <Sparkles size={16} className="text-yellow-200" />
                </span>
              </motion.button>
            </div>

            <p className="mt-6 text-gray-500 text-xs font-sans-body tracking-wide text-center">
              Warning: may cause random smiling and soft feelings.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Intro;
