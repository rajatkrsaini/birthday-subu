import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Flame } from 'lucide-react';

const MotionDiv = motion.div as any;

const SkyLantern: React.FC = () => {
  const [released, setReleased] = useState(false);

  return (
    <div className="min-h-dvh bg-slate-900 flex flex-col items-center justify-center text-white">
      <MotionDiv
        animate={released ? { y: -800, opacity: 0 } : { y: [0, -10, 0] }}
        transition={released ? { duration: 10 } : { duration: 4, repeat: Infinity }}
        onClick={() => setReleased(true)}
        className="cursor-pointer"
      >
        <div className="w-40 h-52 bg-orange-300 rounded-t-[3rem] flex items-center justify-center">
          <Flame />
        </div>
      </MotionDiv>

      <div className="mt-10 text-center">
        {!released ? (
          <p>Tap to release your wish</p>
        ) : (
          <>
            <p>Goodnight Subu</p>
            <Star className="mx-auto mt-4" />
          </>
        )}
      </div>
    </div>
  );
};

export default SkyLantern;
