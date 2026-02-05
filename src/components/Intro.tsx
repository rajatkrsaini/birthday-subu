import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Heart, PartyPopper, Gift, Smile, Coffee, Moon, Crown, cat, rabbit } from 'lucide-react';

// Custom cute SVG icons
const PandaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <path fill="#fff" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0 0 114.6 0 256s114.6 256 256 256z"/>
    <path fill="#000" d="M152.7 275.4c-35.8-35.8-35.8-93.9 0-129.7s93.9-35.8 129.7 0c35.8 35.8 35.8 93.9 0 129.7-35.8 35.8-93.9 35.8-129.7 0zm140.6 42.8c-15.6-15.6-40.9-15.6-56.6 0-15.6 15.6-15.6 40.9 0 56.6 15.6 15.6 40.9 15.6 56.6 0 15.6-15.6 15.6-40.9 0-56.6zm-155.9 0c-15.6-15.6-40.9-15.6-56.6 0-15.6 15.6-15.6 40.9 0 56.6 15.6 15.6 40.9 15.6 56.6 0 15.6-15.6 15.6-40.9 0-56.6z"/>
    <path fill="#f9a8d4" d="M168 360c0 22.1-17.9 40-40 40s-40-17.9-40-40 17.9-40 40-40 40 17.9 40 40zm256 0c0 22.1-17.9 40-40 40s-40-17.9-40-40 17.9-40 40-40 40 17.9 40 40z"/>
    <path fill="#000" d="M364.4 233.9c-17.9-17.9-47-17.9-64.9 0-17.9 17.9-17.9 47 0 64.9 17.9 17.9 47 17.9 64.9 0 17.9-17.9 17.9-47 0-64.9zm-151.9 0c-17.9-17.9-47-17.9-64.9 0-17.9 17.9-17.9 47 0 64.9 17.9 17.9 47 17.9 64.9 0 17.9-17.9 17.9-47 0-64.9z"/>
  </svg>
);

const CatOutlineIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 3.87-3.56 6-4.26-1.17 1.63-2.2 3.47-3 5.26 2.11 1.32 3.58 3.66 3.58 6.16C20.58 17.47 16.72 22 12 22S3.42 17.47 3.42 12.42c0-2.5 1.47-4.84 3.58-6.16C6.2 4.53 5.17 2.69 4 1.06c2.13.7 4.22 2.26 6 4.26.65-.17 1.33-.26 2-.26z" />
    <path d="M12 13h.01" />
    <path d="M15 11h.01" />
    <path d="M9 11h.01" />
  </svg>
);

const RabbitOutlineIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2C10 2 8 4 8 7v2c0 3 4 3 4 6 0 1.66 1.34 3 3 3h0c1.66 0 3-1.34 3-3v-4c0-3.31-2.69-6-6-6z" />
    <path d="M16 2c2 0 4 2 4 5v2c0 3-4 3-4 6 0 1.66-1.34 3-3 3h0c-1.66 0-3-1.34-3-3v-4c0-3.31 2.69-6 6-6z" />
    <path d="M4 13c-1 0-2 1-2 2v0c0 1 1 2 2 2s2-1 2-2v0c0-1-1-2-2-2z" />
    <path d="M20 13c1 0 2 1 2 2v0c0 1-1 2-2 2s-2-1-2-2v0c0-1 1-2 2-2z" />
    <path d="M12 18v4" />
  </svg>
);

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

            {/* Title: Aesthetic, Minimal, Decorative with Happy Vibe Elements */}
            <div className="mt-10 text-center">
              <div className="relative inline-block">
                {/* Decorative elements for "Happy Birthday" */}
                <motion.div
                  className="absolute -top-6 -left-8 opacity-[0.25] text-pink-300"
                  animate={{ y: [0, -4, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sparkles size={18} />
                </motion.div>
                <motion.div
                  className="absolute -top-5 right-4 opacity-[0.2] text-yellow-300"
                  animate={{ y: [0, -3, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Star size={16} fill="#fde047" />
                </motion.div>
                <motion.div
                  className="absolute bottom-4 -left-4 opacity-[0.15] text-purple-300"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Heart size={14} />
                </motion.div>

                <h1 className="font-serif-title text-5xl md:text-6xl leading-tight tracking-normal text-gray-800 relative z-10">
                  <span className="relative">
                    Happy Birthday
                    <motion.div
                      className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-pink-200/60 via-yellow-200/50 to-purple-200/60 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                    />
                  </span>
                </h1>
              </div>
            </div>

            {/* Name: Lovely, Pretty, with Cute Animals */}
            <div className="mt-12 flex items-center justify-center">
              <motion.div whileHover={{ scale: 1.02 }} className="relative">
                {/* Subtle glow */}
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-pink-100/40 via-amber-100/20 to-purple-100/30 blur-xl opacity-60" />

                <div className="relative px-10 py-6 rounded-[1.8rem] bg-white/60 border border-white/80 shadow-md backdrop-blur-sm flex flex-col items-center">
                  {/* Crown */}
                  <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-amber-50/80 border border-white/90 flex items-center justify-center shadow-sm">
                    <Crown size={16} className="text-gray-600" />
                  </div>

                  {/* Cute Animal Animations */}
                  <motion.div
                    className="absolute -top-10 left-0 pointer-events-none"
                    animate={{ y: [0, 3, 0], rotate: [0, 2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <PandaIcon width="40" height="40" className="opacity-90" />
                  </motion.div>
                  <motion.div
                    className="absolute top-1/2 -left-8 -translate-y-1/2 pointer-events-none text-gray-400 opacity-50"
                    animate={{ x: [0, -3, 0], rotate: [0, -3, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <CatOutlineIcon width="24" height="24" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-0 -right-6 pointer-events-none text-gray-400 opacity-50"
                    animate={{ x: [0, 3, 0], rotate: [0, 3, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <RabbitOutlineIcon width="24" height="24" />
                  </motion.div>


                  <span className="font-serif-title text-7xl md:text-8xl tracking-wide text-gray-800 relative z-10" style={{ fontFamily: '"Dancing Script", cursive' }}>
                    Subu
                  </span>

                  {/* Cutest Human Badge - EXACTLY SAME */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-100/80 to-purple-100/70 border border-white/90 text-[11px] tracking-wider uppercase text-gray-800 font-sans-body shadow-sm">
                      cutest human
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Wish block */}
            <div className="mt-10 flex justify-center">
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
            <div className="mt-10 flex items-center justify-center">
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
