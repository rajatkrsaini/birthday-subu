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
      "!!!",
      "I’m glad you’re happy this year.",
      "We spend so much time analyzing our sadness, but we rarely analyze our happiness. Enjoy the happiness because your brain loves remembering bad days and forgetting good ones.",
      "Don’t let anyone steal your happiness."
    ]
  },
  {
    id: 11,
    label: "Sometimes we mess up",
    icon: <ThumbsUp className="text-gray-600" size={20} />,
    color: "bg-slate-100",
    content: [
      "Okay, you messed up. Welcome to being human",
      "Being failed or messing up at something is not a personality trait. It’s just an event. Something happened, you didn’t get the result you wanted, and now your brain is trying to make it mean you’re not capable. That’s nonsense.",
      "Everyone you admire has failed spectacularly at some point. They just didn't stop there.",
      "It’s okay to be imperfect, but you stay perfect in your eyes.",
    ]
  },
  {
    id: 13,
    label: "Appreciation",
    icon: <Heart className="text-gray-600" size={20} />,
    color: "bg-rose-50",
    content: [
      "I don't say this enough, but I appreciate you so much.",
      "I appreciate how you share and listen. its not just about words but the feelings behind them.",
      "I like your humor sm. The way you tease and your sarcasm has a way of making a dull conversation sparkle.",
      "keep saying bsdk bc cause the day i do not hear it i feel like i haven't talked with subu today.",
      "Thank you for being my friend."
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
      "I hope you are happy. I hope you are doing what you love, or a hobby that lights you up.",
      "I hope you're still friends with me (you better be bsdk!).",
      "Keep growing. Keep shining. My wishes are always with you"
    ]
  },
  {
    id: 16,
    label: "Angry?",
    icon: <Zap className="text-gray-600" size={20} />,
    color: "bg-red-50",
    content: [
      "Vent out to me!",
      "Who did it? Who annoyed you? Let me at 'em.",
      "You are too precious to carry around a heavy heart. Protect your peace."
    ]
  },
  {
    id: 17,
    label: "Stay Confident",
    icon: <Star className="text-gray-600" size={20} />,
    color: "bg-yellow-100",
    content: [
      "Do you have any idea how capable you are? You have lived life for 21 years. You have learned skills, gained knowledge, solved your problems, and charmed people.",
      "You are smart. You are funny. You are interesting. You have your own unique perspective on the world.",
    ]
  },
  {
    id: 18,
    label: "Nostalgic",
    icon: <BookOpen className="text-gray-600" size={20} />,
    color: "bg-stone-50",
    content: [
      "I dont know why we first talked?",
      "Its been years ago, yet just like yesterday.",
      "You and I have shared a lot of random, funny, and unexpectedly deep conversations including misunderstandings.",
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
      "Once you begin, your brain calms down because it stops imagining the whole disaster and starts dealing with reality."
    ]
  },
  {
    id: 20,
    label: "Just because",
    icon: <Mail className="text-gray-600" size={20} />,
    color: "bg-white",
    content: [
      "I don't need a reason to write to you. I just wanted to do something unique for you (not for the sake of being your friend or anything. also not because of your birthday) It's just for 'YOU'",
      "I want to remind you that you are cared. In the busyness of life, we forget to tell people that they matter and what could be the best possible day than this lol",
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
