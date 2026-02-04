import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Heart, PartyPopper, Gift, Smile, MessageCircle } from 'lucide-react';

interface IntroProps {
  onStart: () => void;
}

type Sticker = {
  id: number;
  text: string;
  top: string;
  left: string;
  rotate: number;
  opacity: number;
  size: 'sm' | 'md';
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
    initial={{ y: '110vh', opacity: 0.85 }}
    animate={{ y: '-120vh', x: [0, 10, 0, -8, 0] }}
    transition={{ duration: 20, delay, repeat: Infinity, ease: 'linear' }}
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

const CuteStickers: React.FC = () => {
  const stickers = useMemo<Sticker[]>(
    () => [
      { id: 1, text: 'birthday mode: ON', top: '12%', left: '10%', rotate: -10, opacity: 0.14, size: 'md' },
      { id: 2, text: 'pls accept hugs', top: '18%', left: '78%', rotate: 12, opacity: 0.13, size: 'sm' },
      { id: 3, text: 'certified cutie', top: '72%', left: '8%', rotate: 8, opacity: 0.12, size: 'md' },
      { id: 4, text: 'main character energy', top: '78%', left: '70%', rotate: -8, opacity: 0.12, size: 'md' },
      { id: 5, text: 'no stress today', top: '40%', left: '6%', rotate: -14, opacity: 0.11, size: 'sm' },
      { id: 6, text: 'pls smile rn', top: '44%', left: '84%', rotate: 10, opacity: 0.11, size: 'sm' },
      { id: 7, text: 'illegal to be this cute', top: '26%', left: '22%', rotate: 9, opacity: 0.10, size: 'sm' },
      { id: 8, text: 'queen behaviour', top: '62%', left: '82%', rotate: -11, opacity: 0.10, size: 'sm' },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stickers.map((s) => (
        <motion.div
          key={s.id}
          className={[
            'absolute font-sans-body uppercase tracking-[0.22em] text-gray-700 select-none',
            s.size === 'md' ? 'text-xs md:text-sm' : 'text-[10px] md:text-xs',
          ].join(' ')}
          style={{
            top: s.top,
            left: s.left,
            opacity: s.opacity,
            transform: `rotate(${s.rotate}deg)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: s.opacity }}
          transition={{ duration: 0.8, delay: 0.2 + s.id * 0.06 }}
        >
          <span className="px-3 py-2 rounded-full bg-white/25 border border-white/50 backdrop-blur-sm shadow-sm">
            {s.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 w-[30rem] h-[30rem] rounded-full bg-pink-200/25 blur-3xl" />
        <div className="absolute top-10 -right-32 w-[34rem] h-[34rem] rounded-full bg-purple-200/18 blur-3xl" />
        <div className="absolute -bottom-36 left-1/4 w-[38rem] h-[38rem] rounded-full bg-amber-200/14 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)",
            backgroundSize: '18px 18px',
          }}
        />

        <CuteStickers />

        <div className="absolute top-14 left-10 opacity-[0.14] rotate-12">
          <PartyPopper size={34} className="text-gray-700" />
        </div>
        <div className="absolute top-20 right-16 opacity-[0.12] -rotate-12">
          <Smile size={30} className="text-gray-700" />
        </div>
        <div className="absolute bottom-16 right-14 opacity-[0.12] rotate-6">
          <Gift size={30} className="text-gray-700" />
        </div>
        <div className="absolute bottom-24 left-14 opacity-[0.11] -rotate-6">
          <MessageCircle size={28} className="text-gray-700" />
        </div>
      </div>

      {/* Balloons */}
      <Balloon color="bg-pink-200" delay={0} left="left-[10%]" size={90} />
      <Balloon color="bg-green-100" delay={4} left="left-[25%]" size={60} />
      <Balloon color="bg-rose-100" delay={7} left="left-[80%]" size={75} />
      <Balloon color="bg-blue-50" delay={2} left="left-[60%]" size={100} />
      <Balloon color="bg-pink-100" delay={10} left="left-[40%]" size={65} />
      <Balloon color="bg-purple-50" delay={5} left="left-[90%]" size={80} />

      {/* Card Wrapper */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="z-10 relative w-full max-w-2xl"
      >
        {/* Glow */}
        <div className="absolute -inset-5 bg-gradient-to-r from-pink-200/25 via-amber-200/18 to-purple-200/22 blur-2xl rounded-[3.2rem]" />

        <div className="relative bg-white/45 backdrop-blur-md rounded-[3rem] border border-white/75 shadow-2xl overflow-hidden">
          {/* Inner border */}
          <div className="pointer-events-none absolute inset-3 rounded-[2.5rem] ring-1 ring-white/60" />

          {/* Header */}
          <div className="relative px-8 md:px-12 pt-10 pb-8">
            <motion.div
              className="absolute -top-6 -left-6 text-yellow-300 drop-shadow-sm"
              animate={{ rotate: 360, scale: [1, 1.15, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Star size={48} fill="#fde047" className="text-yellow-300" />
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -right-6 text-pink-300"
              animate={{ scale: [1, 1.18, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 3.2, repeat: Infinity }}
            >
              <Heart size={44} fill="#f9a8d4" className="text-pink-300" />
            </motion.div>

            <div className="space-y-4">
              <p className="font-sans-body text-gray-600 text-xs md:text-sm leading-relaxed max-w-xl mx-auto tracking-wide">
                I wanted you to open this on your special day, but I couldn't complete it on time.
                Still, I didn’t want this effort to disappear. So here it is. A small memory, saved for you.
              </p>

              <div className="relative flex flex-col items-center">
                <h1 className="font-serif-title text-6xl md:text-8xl text-gray-800 leading-[0.9] tracking-tight">
                  Happy
                </h1>
                <h1 className="font-serif-title italic text-6xl md:text-8xl text-pink-400 leading-[0.9] pr-4 drop-shadow-sm">
                  Birthday
                </h1>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-to-r from-pink-100/60 to-green-100/60 blur-2xl -z-10 rounded-full" />

                <motion.div
                  className="mt-6 h-[3px] w-40 rounded-full bg-gradient-to-r from-pink-300/70 via-amber-300/60 to-purple-300/70"
                  initial={{ width: 50, opacity: 0 }}
                  animate={{ width: 170, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.15 }}
                />
              </div>

              <motion.div whileHover={{ scale: 1.05 }} className="inline-block mt-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-200/40 -skew-y-2 rounded-xl scale-110 blur-[1px]" />
                  <span className="relative font-serif-title text-5xl md:text-7xl text-gray-800 px-5 py-2 block">
                    Subu
                  </span>
                </div>
              </motion.div>

              <div className="flex items-center justify-center mt-4">
                <div className="px-4 py-2 rounded-full bg-white/60 border border-white/70 shadow-sm text-gray-600 text-[10px] md:text-xs tracking-[0.25em] uppercase font-sans-body">
                  official cutie card
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/70" />

          {/* Body */}
          <div className="px-8 md:px-12 py-8">
            <div className="space-y-4">
              <p className="text-gray-700 font-sans-body text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto">
                May your life be filled with the same joy you give people without even trying.
                Also, you are not allowed to stress today. It’s the law.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  'drink water rn',
                  'you are loved',
                  'today: no overthinking',
                  'smile pls',
                  'birthday queen',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] md:text-xs uppercase tracking-[0.22em] px-4 py-2 rounded-full bg-white/50 border border-white/70 text-gray-600 font-sans-body"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-9">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                className="group relative bg-gray-900 text-white px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden mx-auto block"
              >
                <motion.div
                  className="absolute -inset-8 rounded-full bg-pink-200/22 blur-2xl"
                  animate={{ opacity: [0.12, 0.32, 0.12] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2 font-sans-body text-sm tracking-widest uppercase">
                  Click Here Pretty Human <Sparkles size={16} className="text-yellow-200" />
                </span>
              </motion.button>

              <p className="mt-5 text-gray-500 text-xs font-sans-body tracking-wide">
                Open the next pages slowly.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 md:px-12 pb-10">
            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs font-sans-body tracking-wide">
              <span>made with</span>
              <Heart size={14} className="text-pink-400 fill-pink-400" />
              <span>and</span>
              <Sparkles size={14} className="text-yellow-400" />
              <span>for you only</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Intro;
