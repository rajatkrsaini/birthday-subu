import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Heart, Star, Smile, CloudRain, Coffee, Zap, Moon, 
  Gift, Frown, Sun, Umbrella, ThumbsUp, Anchor, 
  Compass, Camera, BookOpen, Mail, ShoppingBag, Tv, Utensils
} from 'lucide-react';

interface EnvelopeData {
  id: number;
  label: string;
  icon: React.ReactNode;
  content: string[];
  color: string;
}

const envelopes: EnvelopeData[] = [
  {
    id: 1,
    label: "On your 21st",
    icon: <Gift className="text-gray-600" size={20} />,
    color: "bg-pink-100",
    content: [
      "Dearest Subu,",
      "Happy 21st Birthday! Can you believe it? You are officially an adult and just one year younger to me. well age is just a number; what matters is the journey of your teenage years and the incredible potential of your adulthood.",
      "I know you sometimes say you aren't excited about birthdays, or that it's just another day. But to me, this day is kinda important as I rarely get the chance to tell you how much I appreciate you. Also, the world is better for people who love you, who are proud of you. so another reason this day is important is that it marks 21 years of the world having you in it.",
      "Thinking back on the last 4 years of our friendship, I feel so privileged to have watched you grow. I've seen you navigate challenges with a quiet strength that I admire more than I say.",
      "My wish for you this year is simple but pure as always: I hope you find peace, which you crave most. I lowkey also hope you find the courage to chase the things that put you out of your lazy zone, because that's where the magic happens.",
      "You are capable of so much more than you give yourself credit for. 21 is the year of YOU. Take up space. Be loud. Be happy. You deserve every ounce of goodness the universe has to offer.",
      "Happy Birthday 💖"
    ]
  },
  {
    id: 2,
    label: "Thank YOU",
    icon: <Anchor className="text-gray-600" size={20} />,
    color: "bg-blue-50",
    content: [
      "Hi qt,",
      "Sometimes I wish I was your irl friend but I think it's better this way cause the bond wouldn't have been the same. And Maybe for me the excitement of meeting you for the first time is greater than me wanting to be your irl friend.",
      "I know I am just an online friend to you, but you always tell me everything, the way you put your trust in me makes me want to do so many great things for you. When something funny/sad, whatever happens, please continue to share.",
    ]
  },
  {
    id: 4,
    label: "Don't be Stressed out",
    icon: <CloudRain className="text-gray-600" size={20} />,
    color: "bg-gray-100",
    content: [
      "Okay. Stop for a second.",
      "Sometimes bad stuff happens and we have a lot of pressure to perform well, be it in exams, from family, relationships, and life in general. it feels like everything is just going bad, or that you have a mountain of tasks.",
      "But lets look at your track record. You have survived 100% of your bad days. You have handled exams, family drama, and other life chaos. So don't stress yourself over the bad phase, cause it all pass every single time.",
    ]
  },
  {
    id: 5,
    label: "Can't sleep",
    icon: <Moon className="text-gray-600" size={20} />,
    color: "bg-indigo-50",
    content: [
      "Hello, night owl.",
      "lately you have told me you have a bad sleeping schedule or trouble sleeping",
      "i just want to say that it is completely fine to be awake for a few hours if you can get some extra sleeping in the morning",
      "Sleep doesn't come when you chase it. So stop trying to sleep. Just rest by laying down thats all that matters. If sleep comes, good. If it doesn’t, resting still helps.",
    ]
  },

  {
    id: 8,
    label: "Meeting you",
    icon: <Coffee className="text-gray-600" size={20} />,
    color: "bg-orange-50",
    content: [
      "If we ever meet someday, I already know this thing.",
      "It won’t be like whatever we imagine. It’ll probably be awkward, and I could be nervous at first, because meeting someone from the internet in real life is weird cause i never did it.",
      "and yeah, the responsibility is on me so you don't have to think about anything",
    ]
  },
  {
    id: 10,
    label: "Be Happy cause why not",
    icon: <Sun className="text-gray-600" size={20} />,
    color: "bg-amber-50",
    content: [
      "YAY!!!",
      "I love this for you! Whatever caused this happiness—whether it's a big achievement or just a really good cup of coffee—I want you to soak it in.",
      "We spend so much time analyzing our sadness, but we rarely analyze our happiness. Take a mental snapshot of this moment.",
      "Bottle this feeling up. Store it in your memory bank for a rainy day.",
      "I hope you're dancing around your room. Celebrate yourself today. You deserve this joy."
    ]
  },
  {
    id: 24,
    label: "Spicy Food 🌶️",
    icon: <Utensils className="text-gray-600" size={20} />,
    color: "bg-red-100",
    content: [
      "Caution: Hot!",
      "Craving that spice? That mala? That tteokbokki that makes you cry?",
      "Do it. Your stomach might hate you later, but your soul needs the fire.",
      "There is nothing quite like the endorphin rush of really spicy food. It solves 90% of life's problems.",
      "Bon appétit, you brave soul."
    ]
  },
  {
    id: 11,
    label: "Failure",
    icon: <ThumbsUp className="text-gray-600" size={20} />,
    color: "bg-slate-100",
    content: [
      "Let's redefine failure, shall we?",
      "You didn't fail. You learned a way that didn't work. You gathered data.",
      "Everyone you admire has failed spectacularly at some point. They just didn't stop there.",
      "So you messed up? Okay. Welcome to the human race. We have snacks. It’s okay to be imperfect.",
      "Don't define your self-worth by your productivity or your success rate. You are worthy because you exist.",
      "Pick up the pieces, look at them, learn from them, and build something new."
    ]
  },
  {
    id: 12,
    label: "Bored",
    icon: <Compass className="text-gray-600" size={20} />,
    color: "bg-emerald-50",
    content: [
      "Boredom is just creativity waiting to happen.",
      "Since you have nothing to do, here are some challenges for you:",
      "1. Go to Wikipedia and click 'Random Article'.",
      "2. Create a playlist for a movie that doesn't exist.",
      "3. Plan our dream vacation. Cost is no object.",
      "4. Text me a random emoji and I have to guess what it means.",
      "Being bored is a luxury. Enjoy the stillness."
    ]
  },
  {
    id: 13,
    label: "Appreciation",
    icon: <Heart className="text-gray-600" size={20} />,
    color: "bg-rose-50",
    content: [
      "I don't say this enough, but I appreciate you so much.",
      "I appreciate how you listen. You don't just hear words; you hear the feelings behind them.",
      "I appreciate your humor. You have this way of making a dull conversation sparkle.",
      "I appreciate your loyalty. In a world where people are flaky, you have been a constant.",
      "I appreciate your vulnerability. It takes courage to be open.",
      "You add value to my life just by being you. Thank you for being my friend."
    ]
  },
  {
    id: 14,
    label: "Future you",
    icon: <Camera className="text-gray-600" size={20} />,
    color: "bg-violet-50",
    content: [
      "Hello Future Subu,",
      "I hope you're reading this a year from now, or maybe five. Where are you? What are you doing?",
      "I hope you are happy. I hope you have found a job that fulfills you, or a hobby that lights you up.",
      "I hope you're still friends with me (you better be!).",
      "Remember who you were when you were 21. Remember her hopes and her fears. She worked hard to get you here.",
      "Keep growing. Keep shining. The future looks bright on you."
    ]
  },
  {
    id: 15,
    label: "Raining",
    icon: <Umbrella className="text-gray-600" size={20} />,
    color: "bg-cyan-50",
    content: [
      "I love rainy days.",
      "There's something so cozy about the world being washed clean. I hope you're safe inside with a warm drink.",
      "Listen to the sound of the rain. It's nature's lullaby. It's permission to do nothing.",
      "Put on some lo-fi music. Read a book. Wear your most oversized hoodie.",
      "Imagine I'm there with you, watching the raindrops race down the window pane."
    ]
  },
  {
    id: 16,
    label: "Angry",
    icon: <Zap className="text-gray-600" size={20} />,
    color: "bg-red-50",
    content: [
      "Vent it out!",
      "Who did it? Who annoyed you? Let me at 'em.",
      "It is okay to be angry. Anger is an emotion that tells us a boundary has been crossed. Don't suppress it. Feel it.",
      "Write it down. Scream into a pillow. Punch a mattress.",
      "But then... let it go. Don't let the anger poison you.",
      "You are too precious to carry around a heavy heart. Release the rage, protect your peace."
    ]
  },
  {
    id: 17,
    label: "Confidence",
    icon: <Star className="text-gray-600" size={20} />,
    color: "bg-yellow-100",
    content: [
      "Chin up, princess. Or your crown slips.",
      "Do you have any idea how capable you are? You have navigated life for 21 years. You have learned skills, solved problems, and charmed people.",
      "You are smart. You are funny. You are interesting. You have a unique perspective on the world.",
      "Walk into the room like you own the place. Fake it 'til you make it if you have to.",
      "I believe in you. Now you need to believe in you."
    ]
  },
  {
    id: 18,
    label: "Nostalgic",
    icon: <BookOpen className="text-gray-600" size={20} />,
    color: "bg-stone-50",
    content: [
      "Remember when we first met?",
      "It feels like ages ago, yet just like yesterday. Three years is a long time in internet years.",
      "Think about our funniest conversations. The typos. The misunderstandings.",
      "Nostalgia is sweet, but don't live in the past. We are building the 'good old days' right now.",
      "I'm glad our timelines crossed. Of all the billions of people on earth, I'm glad I found you."
    ]
  },
  {
    id: 19,
    label: "Motivation",
    icon: <Zap className="text-gray-600" size={20} />,
    color: "bg-orange-100",
    content: [
      "Get up.",
      "You have dreams. They aren't going to chase themselves. You want that success? You have to build it.",
      "Motivation is fickle. Discipline is what stays. Do the thing even if you don't feel like it. Just five minutes.",
      "Future You is begging you to put in the work today. Don't let her down.",
      "You are a force of nature. Go show the world what you're made of."
    ]
  },
  {
    id: 20,
    label: "Just because",
    icon: <Mail className="text-gray-600" size={20} />,
    color: "bg-white",
    content: [
      "I don't need a reason to write to you.",
      "I just wanted to remind you that you are loved. In the busyness of life, we forget to tell people that they matter. You matter.",
      "You matter to me. You matter to your family.",
      "Take care of yourself today. Drink water. Eat something good. Be happy.",
      "Love always,\nRajat"
    ]
  }
];

const Surprise: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedEnvelope = envelopes.find(e => e.id === selectedId);

  return (
    <div className="min-h-dvh bg-aesthetic p-6 relative">
      <div className="max-w-6xl mx-auto pt-10 pb-20">
        <div className="text-center mb-16">
            <h2 className="font-serif-title text-4xl md:text-5xl text-gray-800 mb-4">
            Open When...
            </h2>
            <div className="w-16 h-1 bg-pink-200 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-500 font-sans-body font-light tracking-wide text-lg">
            A collection of reminders, for whenever you need them.
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pb-24">
          {envelopes.map((env, index) => (
            <motion.div
              key={env.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedId(env.id)}
              className={`cursor-pointer ${env.color} aspect-square rounded-2xl shadow-sm border border-white/50 relative flex flex-col items-center justify-center gap-3 group transition-all duration-300 hover:shadow-md`}
            >
               <div className="bg-white/60 p-3 rounded-full text-gray-700 transition-transform group-hover:scale-110">
                 {env.icon}
               </div>
               <span className="font-sans-body text-xs uppercase tracking-wider text-gray-600 font-medium text-center px-2">
                 {env.label}
               </span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedEnvelope && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-xl h-[80vh] rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-8 border-b border-gray-50 bg-gray-50/50">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full shadow-sm text-gray-600">
                        {selectedEnvelope.icon}
                    </div>
                    <h3 className="font-serif-title text-2xl text-gray-800">
                        {selectedEnvelope.label}
                    </h3>
                 </div>
                 <button 
                   onClick={() => setSelectedId(null)}
                   className="text-gray-400 hover:text-gray-800 transition-colors"
                 >
                   <X size={24} />
                 </button>
              </div>

              <div className="p-8 md:p-12 overflow-y-auto bg-white flex-grow">
                <div className="space-y-6 text-gray-600 font-serif-title leading-loose text-lg italic">
                  {selectedEnvelope.content.map((paragraph, i) => (
                    <p key={i}>
                        {paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="mt-16 flex justify-center opacity-30">
                   <Heart size={20} fill="black" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Surprise;
