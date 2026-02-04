import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Heart, Gift, PartyPopper } from 'lucide-react';

interface IntroProps {
  onStart: () => void;
}

type Spark = {
  id: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
  scale: number;
  opacity: number;
  rotate: number;
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
    initial={{ y: '110vh', opacity: 0.8 }}
    animate={{ y: '-120vh', x: [0, 10, 0, -8, 0] }}
    transition={{ duration: 20, delay, repeat: Infinity, ease: 'linear' }}
    className={`absolute bottom-0 ${left} z-0 pointer-events-none`}
    style={{ width: size, height: size * 1.2 }}
  >
    <motion.div
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`w-full h-full rounded-[50%] ${color} relative opacity-80 shadow-sm backdrop-blur-sm`}
    >
      <div className="absolute top-[15%] left-[20%] w-[15%] h-[25%] bg-white opacity-40 rounded-[50%] -rotate-45" />
      <div className="absolute bottom-[-40%] left-1/2 w-[1px] h-[50%] bg-gray-300 -translate-x-1/2" />
    </motion.div>
  </motion.div>
);

const FloatingSparkles: React.FC = () => {
  const items = useMemo<Spark[]>(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        top: `${Math.floor(Math.random() * 90) + 5}%`,
        left: `${Math.floor(Math.random() * 90) + 5}%`,
        delay: Math.random() * 1.4,
        duration: 3.8 + Math.random() * 2.8,
        scale: 0.7 + Math.random() * 0.9,
        opacity: 0.06 + Math.random() * 0.10,
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
          style={{ top: s.top, left: s.left, opacity: s.opacity, transform: `rotate(${s.rotate}deg)` }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: [-10, 10, -10], opacity: [0, s.opacity, 0] }}
          transition={{ delay: s.delay, duration: s.duration, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles size={18} className="text-gray-700" style={{ transform: `scale(${s.scale})` }} />
        </motion.div>
      ))}
    </div>
  );
};

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center p-6 relative overflow-hidden">
      {/* Background aesthetic */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 w-[30rem] h-[30rem] rounded-full bg-pink-200/25 blur-3xl" />
        <div className="absolute top-10 -right-32 w-[34rem] h-[34rem] rounded-full bg-purple-200/18 blur-3xl" />
        <div className="absolute -bottom-36 left-1/4 w-[38rem] h-[38rem] rounded-full bg-amber-200/14 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />

        <FloatingSparkles />

        <div className="absolute top-14 left-10 opacity-[0.14] rotate-12">
          <PartyPopper size={34} className="text-gray-700" />
        </div>
        <div className="absolute bottom-16 right-14 opacity-[0.12] -rotate-12">
          <Gift size={30} className="text-gray-700" />
        </div>
      </div>

      {/* Balloons */}
      <Balloon color="bg-pink-200" delay={0} left="left-[10%]" size={90} />
      <Balloon color="bg-green-100" delay={4} left="left-[25%]" size={60} />
      <Balloon color="bg-rose-100" delay={7} left="left-[80%]" size={75} />
      <Balloon color="bg-blue-50" delay={2} left="left-[60%]" size={100} />
      <Balloon color="bg-pink-100" delay={10} left="left-[40%]" size={65} />
      <Balloon color="bg-purple-50" delay={5} left="left-[90%]" size={80} />

      {/* Card */}
      <motion.div
        initial={{ y: 22, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="z-10 relative max-w-xl w-full mx-4"
      >
        {/* Outer glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-200/25 via-amber-200/18 to-purple-200/22 blur-2xl rounded-[3.2rem]" />

        <div className="relative bg-white/35 backdrop-blur-sm p-8 md:p-12 rounded-[3rem] border border-white/70 shadow-xl shadow-pink-100/20 overflow-hidden">
          {/* Inner border */}
          <div className="pointer-events-none absolute inset-3 rounded-[2.4rem] ring-1 ring-white/60" />

          {/* Decorative corners */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.18, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-6 -left-6 text-yellow-300 drop-shadow-sm"
          >
            <Star size={48} fill="#fde047" className="text-yellow-300" />
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.18, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-4 -right-4 text-pink-300"
          >
            <Heart size={40} fill="#f9a8d4" className="text-pink-300" />
          </motion.div>

          {/* Top text */}
          <div className="relative mb-10">
            <h2 className="font-sans-body text-gray-600 tracking-[0.25em] text-[11px] md:text-xs uppercase mb-6 font-medium leading-relaxed">
              I wanted you to open this on your special day, but I couldn't complete it. I know the moment is gone, so it will never feel the same.
            </h2>

            {/* Title */}
            <div className="relative flex flex-col items-center">
              <h1 className="font-serif-title text-6xl md:text-8xl text-gray-800 leading-[0.9] tracking-tight relative z-10">
                Happy
              </h1>
              <h1 className="font-serif-title italic text-6xl md:text-8xl text-pink-400 leading-[0.9] pr-4 relative z-10 drop-shadow-sm">
                Birthday
              </h1>

              {/* Under glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-to-r from-pink-100/55 to-green-100/55 blur-2xl -z-0 rounded-full" />

              {/* Animated underline */}
              <motion.div
                className="mt-6 h-[3px] w-40 rounded-full bg-gradient-to-r from-pink-300/70 via-amber-300/60 to-purple-300/70"
                initial={{ width: 40, opacity: 0 }}
                animate={{ width: 160, opacity: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
              />
            </div>

            {/* Name */}
            <motion.div className="mt-8 relative inline-block" whileHover={{ scale: 1.05 }}>
              <div className="absolute inset-0 bg-green-200/40 -skew-y-2 rounded-lg scale-110 -z-10 blur-[1px]" />
              <span className="font-serif-title text-5xl md:text-7xl text-gray-800 relative z-10 px-4 py-1 block">
                Subu
              </span>
            </motion.div>

            {/* Tiny stamp */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-4 flex items-center justify-center"
            >
              <div className="px-4 py-2 rounded-full bg-white/55 border border-white/70 shadow-sm text-gray-600 text-xs tracking-widest uppercase font-sans-body">
                A small digital memory
              </div>
            </motion.div>
          </div>

          {/* Body text */}
          <p className="text-gray-700 font-sans-body text-base md:text-lg font-light mb-10 tracking-wide max-w-sm mx-auto leading-relaxed">
            May your life be filled with as much joy and happiness as you bring to everyone around you.
          </p>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group relative bg-gray-800 text-white px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mx-auto block"
          >
            {/* Button pulse halo */}
            <motion.div
              className="absolute -inset-6 rounded-full bg-pink-200/20 blur-2xl"
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2 font-sans-body text-sm tracking-widest uppercase">
              Click Here Pretty Human <Sparkles size={16} className="text-yellow-200" />
            </span>
          </motion.button>

          {/* Bottom hint */}
          <p className="mt-6 text-gray-500 text-xs font-sans-body tracking-wide">
            Take your time. Open the pages slowly.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Intro;
