import React, { useState } from 'react';
import { AppStage } from './types';
import Intro from './components/Intro';
import Cake from './components/Cake';
import Letter from './components/Letter';
import Surprise from './components/Surprise';
import Contract from './components/Contract';
import SkyLantern from './components/SkyLantern';

import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>('intro');

  const renderStage = () => {
    switch (stage) {
      case 'intro':
        return <Intro onStart={() => setStage('cake')} />;
      case 'cake':
        return <Cake onComplete={() => setStage('letter')} />;
      case 'letter':
        return <Letter onComplete={() => setStage('surprise')} />;
      case 'surprise':
        return <Surprise />;
      default:
        return null;
    }
  };

  return (
    <main className="w-full min-h-dvh bg-aesthetic text-gray-700 antialiased selection:bg-pink-100 overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full min-h-dvh"
        >
          {renderStage()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default App;

