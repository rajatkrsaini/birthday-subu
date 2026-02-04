import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, ArrowRight } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

interface ContractProps {
  onComplete: () => void;
}

const Contract: React.FC<ContractProps> = ({ onComplete }) => {
  const [signed, setSigned] = useState(false);

  return (
    <div className="min-h-dvh bg-gray-100 flex items-center justify-center p-4">
      <MotionDiv className="bg-[#fcfbf9] max-w-2xl w-full p-10 shadow-2xl">
        <h1 className="text-4xl font-serif-title mb-6 text-center">Visit Again Next Year</h1>

        <p className="mb-6">
          LOL.
        </p>

        <ul className="list-disc pl-6 mb-10 space-y-2">
          <li>hi</li>
          <li>ok</li>
          <li>bye</li>
        </ul>

        {!signed ? (
          <MotionButton
            onClick={() => setSigned(true)}
            whileTap={{ scale: 0.95 }}
            className="border-b-2 border-blue-600 text-blue-600 text-xl px-4"
          >
            <PenTool size={18} /> Sign Here
          </MotionButton>
        ) : (
          <MotionButton
            onClick={onComplete}
            className="bg-gray-800 text-white px-8 py-3 rounded-full flex items-center gap-2"
          >
            Continue <ArrowRight size={16} />
          </MotionButton>
        )}
      </MotionDiv>
    </div>
  );
};

export default Contract;
