import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Heart } from 'lucide-react';

interface IntroProps {
  onStart: () => void;
}

const Balloon = ({ color, delay, left, size = 60 }: { color: string; delay: number; left: string; size?: number }) => (
  <motion.div
    initial={{ y: "110vh", opacity: 0.8 }}
    animate={{ y: "-120vh" }}
    transition={{ duration: 20, delay: delay, repeat: Infinity, ease: "linear" }}
    className={`absolute bottom-0 ${left} z-0 pointer-events-none`}
    style={{ width: size, height: size * 1.2 }}
  >
    <div className={`w-full h-full rounded-[50%] ${color} relative opacity-80 shadow-sm backdrop-blur-sm`}>
        <div className="absolute top-[15%] left-[20%] w-[15%] h-[25%] bg-white opacity-40 rounded-[50%] transform -rotate-45" />
        <div className="absolute bottom-[-40%] left-1/2 w-[1px] h-[50%] bg-gray-300 origin-top transform -translate-x-1/2" />
    </div>
  </motion.div>
);

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center p-6 relative overflow-hidden">
      <Balloon color="bg-pink-200" delay={0} left="left-[10%]" size={90} />
      <Balloon color="bg-green-100" delay={4} left="left-[25%]" size={60} />
      <Balloon color="bg-rose-100" delay={7} left="left-[80%]" size={75} />
      <Balloon color="bg-blue-50" delay={2} left="left-[60%]" size={100} />
      <Balloon color="bg-pink-100" delay={10} left="left-[40%]" size={65} />
      <Balloon color="bg-purple-50" delay={5} left="left-[90%]" size={80} />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 relative bg-white/30 backdrop-blur-sm p-8 md:p-12 rounded-[3rem] border border-white/60 shadow-xl shadow-pink-100/20 max-w-xl w-full mx-4"
      >
        <motion.div 
            animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-6 -left-6 text-yellow-300 drop-shadow-sm"
        >
            <Star size={48} fill="#fde047" className="text-yellow-300" />
        </motion.div>
        
        <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }} 
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-4 -right-4 text-pink-300"
        >
            <Heart size={40} fill="#f9a8d4" className="text-pink-300" />
        </motion.div>

        <div className="relative mb-10">
            <h2 className="font-sans-body text-gray-500 tracking-[0.4em] text-xs md:text-sm uppercase mb-6 font-medium">
                I wanted you to open this on your special day, but I couldn't complete it. I know the moment is gone, but still wanted do for you.
            </h2>
            
            <div className="relative flex flex-col items-center">
                <h1 className="font-serif-title text-6xl md:text-8xl text-gray-800 leading-[0.9] tracking-tight relative z-10">
                    Happy
                </h1>
                <h1 className="font-serif-title italic text-6xl md:text-8xl text-pink-400 leading-[0.9] pr-4 relative z-10 drop-shadow-sm">
                    Birthday
                </h1>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-to-r from-pink-100/50 to-green-100/50 blur-2xl -z-0 rounded-full"></div>
            </div>
            
            <motion.div 
                className="mt-8 relative inline-block"
                whileHover={{ scale: 1.05 }}
            >
                <div className="absolute inset-0 bg-green-200/40 -skew-y-2 rounded-lg transform scale-110 -z-10 blur-[1px]"></div>
                <span className="font-serif-title text-5xl md:text-7xl text-gray-800 relative z-10 px-4 py-1 block">
                    Subu
                </span>
            </motion.div>
        </div>

        <p className="text-gray-600 font-sans-body text-base md:text-lg font-light mb-10 tracking-wide max-w-sm mx-auto leading-relaxed">
           May your life be filled with as much joy and happiness as you bring to everyone around you.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative bg-gray-800 text-white px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mx-auto block"
        >
          <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center justify-center gap-2 font-sans-body text-sm tracking-widest uppercase">
            Start Celebration <Sparkles size={16} className="text-yellow-200" />
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Intro;
