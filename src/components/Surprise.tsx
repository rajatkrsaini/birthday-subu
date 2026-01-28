import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Heart, Star, CloudRain, Coffee, Zap, Moon,
  Gift, Sun, ThumbsUp, Anchor,
  Camera, BookOpen, Mail,
  Crown, Sparkles, Gem
} from 'lucide-react';

interface EnvelopeData {
  id: number;
  label: string;
  icon: React.ReactNode;
  content: string[];
  color: string; // card color
}

const envelopes: EnvelopeData[] = [
  {
    id: 1,
    label: "On your 21st",
    icon: <Gift className="text-gray-700" size={20} />,
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
    icon: <Anchor className="text-gray-700" size={20} />,
    color: "bg-blue-50",
    content: [
      "Hi qt,",
      "Sometimes I wish I was your irl friend but I think it's better this way cause the bond wouldn't have been the same. And Maybe for me the excitement of meeting you for the first time is greater than me wanting to be your irl friend.",
      "I know I am just an online friend to you, but you always tell me everything, the way you put your trust in me makes me want to do so many great things for you. When something funny/sad, whatever happens, please continue to share.",
    ]
  },

  // NEW: Best Girl
  {
    id: 3,
    label: "Best Girl 🏆",
    icon: <Crown className="text-gray-700" size={20} />,
    color: "bg-yellow-100",
    content: [
      "Official Announcement:",
      "You have been awarded the title of 'Best Girl'.",
      "Why? Because you are simply unmatched.",
      "It's the way you care about people. The way you listen. The way you just *are*.",
      "You have this incredible ability to make everyone around you feel comfortable and loved.",
      "You work hard, you care deeply, and you are just genuinely a good person.",
      "The world is lucky to have you, but I'm the luckiest to have you as my bestie.",
      "Keep wearing that invisible crown. 👑"
    ]
  },

  {
    id: 4,
    label: "Don't be Stressed out",
    icon: <CloudRain className="text-gray-700" size={20} />,
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
    icon: <Moon className="text-gray-700" size={20} />,
    color: "bg-indigo-50",
    content: [
      "Hello, night owl.",
      "lately you have told me you have a bad sleeping schedule or trouble sleeping",
      "i just want to say that it is completely fine to be awake for a few hours if you can get some extra sleeping in the morning",
      "Sleep doesn't come when you chase it. So stop trying to sleep. Just rest by laying down thats all that matters. If sleep comes, good. If it doesn’t, resting still helps.",
    ]
  },

  // NEW: You're Beautiful
  {
    id: 6,
    label: "You're Beautiful ✨",
    icon: <Sparkles className="text-gray-700" size={20} />,
    color: "bg-rose-100",
    content: [
      "Can we take a moment to appreciate how stunning you are?",
      "Because honestly... wow.",
      "And I'm not just saying that because it's your birthday. You have this natural radiance that lights up a room.",
      "Whether you're dressed up for a night out or just chilling in your comfy clothes, you look effortless.",
      "It's your eyes, your smile, your vibe—it all just works perfectly.",
      "You are a total work of art, inside and out. Don't ever forget that."
    ]
  },

  // NEW: Unique You
  {
    id: 7,
    label: "Unique You 🦄",
    icon: <Gem className="text-gray-700" size={20} />,
    color: "bg-purple-100",
    content: [
      "There is literally no one else like you.",
      "I love your specific quirks. I love the way you get excited about the small things.",
      "I love how you can be so mature one minute and a total goofball the next.",
      "Your perspective on the world is so uniquely 'Subu'.",
      "Never change the weird, wonderful parts of yourself to fit in. They are what make you a rare gem."
    ]
  },

  {
    id: 8,
    label: "Meeting you",
    icon: <Coffee className="text-gray-700" size={20} />,
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
    icon: <Sun className="text-gray-700" size={20} />,
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
    icon: <ThumbsUp className="text-gray-700" size={20} />,
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
    icon: <Heart className="text-gray-700" size={20} />,
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
    icon: <Camera className="text-gray-700" size={20} />,
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
    icon: <Zap className="text-gray-700" size={20} />,
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
    icon: <Star className="text-gray-700" size={20} />,
    color: "bg-yellow-100",
    content: [
      "Do you have any idea how capable you are? You have lived life for 21 years. You have learned skills, gained knowledge, solved your problems, and charmed people.",
      "You are smart. You are funny. You are interesting. You have your own unique perspective on the world.",
    ]
  },
  {
    id: 18,
    label: "Nostalgic",
    icon: <BookOpen className="text-gray-700" size={20} />,
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
    icon: <Zap className="text-gray-700" size={20} />,
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
    icon: <Mail className="text-gray-700" size={20} />,
    color: "bg-white",
    content: [
      "I don't need a reason to write to you. I just wanted to do something unique for you (not for the sake of being your friend or anything. also not because of your birthday) It's just for 'YOU'",
      "I want to remind you that you are cared. In the busyness of life, we forget to tell people that they matter and what could be the best possible day than this lol",
    ]
  }
];

// Unique pastel "paper" themes per letter (bg + decorative blobs)
function getLetterTheme(id: number) {
  const themes = {
    1: { paper: "from-rose-50 via-white to-pink-50", blobA: "bg-pink-200/35", blobB: "bg-rose-200/30" },
    2: { paper: "from-sky-50 via-white to-blue-50", blobA: "bg-sky-200/35", blobB: "bg-blue-200/30" },
    3: { paper: "from-amber-50 via-white to-yellow-50", blobA: "bg-amber-200/35", blobB: "bg-yellow-200/30" },
    4: { paper: "from-slate-50 via-white to-stone-50", blobA: "bg-slate-200/35", blobB: "bg-stone-200/30" },
    5: { paper: "from-indigo-50 via-white to-violet-50", blobA: "bg-indigo-200/35", blobB: "bg-violet-200/30" },
    6: { paper: "from-rose-50 via-white to-fuchsia-50", blobA: "bg-rose-200/35", blobB: "bg-fuchsia-200/30" },
    7: { paper: "from-purple-50 via-white to-violet-50", blobA: "bg-purple-200/35", blobB: "bg-violet-200/30" },
    8: { paper: "from-orange-50 via-white to-amber-50", blobA: "bg-orange-200/35", blobB: "bg-amber-200/30" },
    10:{ paper: "from-amber-50 via-white to-yellow-50", blobA: "bg-amber-200/35", blobB: "bg-yellow-200/30" },
    11:{ paper: "from-slate-50 via-white to-gray-50", blobA: "bg-slate-200/35", blobB: "bg-gray-200/30" },
    13:{ paper: "from-rose-50 via-white to-pink-50", blobA: "bg-rose-200/35", blobB: "bg-pink-200/30" },
    14:{ paper: "from-violet-50 via-white to-purple-50", blobA: "bg-violet-200/35", blobB: "bg-purple-200/30" },
    16:{ paper: "from-red-50 via-white to-rose-50", blobA: "bg-red-200/35", blobB: "bg-rose-200/30" },
    17:{ paper: "from-yellow-50 via-white to-amber-50", blobA: "bg-yellow-200/35", blobB: "bg-amber-200/30" },
    18:{ paper: "from-stone-50 via-white to-neutral-50", blobA: "bg-stone-200/35", blobB: "bg-neutral-200/30" },
    19:{ paper: "from-orange-50 via-white to-yellow-50", blobA: "bg-orange-200/35", blobB: "bg-yellow-200/30" },
    20:{ paper: "from-neutral-50 via-white to-rose-50", blobA: "bg-neutral-200/35", blobB: "bg-rose-200/30" },
  } as Record<number, { paper: string; blobA: string; blobB: string }>;

  return themes[id] ?? { paper: "from-neutral-50 via-white to-neutral-50", blobA: "bg-neutral-200/30", blobB: "bg-neutral-200/20" };
}

const Surprise: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedEnvelope = useMemo(
    () => envelopes.find(e => e.id === selectedId),
    [selectedId]
  );

  const letterTheme = selectedEnvelope ? getLetterTheme(selectedEnvelope.id) : null;

  return (
    <div className="min-h-dvh bg-aesthetic p-6 relative overflow-hidden">
      {/* soft ambient background */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-pink-200/25 blur-3xl" />
        <div className="absolute top-28 -right-28 w-96 h-96 rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-amber-200/15 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto pt-10 pb-20 relative">
        <div className="text-center mb-14">
          <h2 className="font-serif-title text-4xl md:text-6xl text-gray-800 tracking-tight">
            FOR THE CUTEST AND PRETTIEST HUMAN
          </h2>
          <div className="w-20 h-1 bg-pink-200 mx-auto rounded-full mt-5 mb-5"></div>
          <p className="text-gray-500 font-sans-body font-light tracking-wide text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            I wanted to write 21 things for you on your 21th B'day (I KNOW IT'S KINDA WEIRD), so here's a collection of random thoughts if you wanna read.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pb-24">
          {envelopes.map((env, index) => (
            <motion.button
              key={env.id}
              type="button"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedId(env.id)}
              className={[
                "group relative text-left",
                "cursor-pointer aspect-square rounded-3xl",
                "border border-white/60 shadow-sm hover:shadow-md",
                "transition-all duration-300",
                "overflow-hidden",
                env.color
              ].join(" ")}
            >
              {/* subtle shine */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/35 blur-2xl" />
              </div>

              <div className="relative h-full w-full flex flex-col items-center justify-center gap-3 p-4">
                <div className="bg-white/70 p-3 rounded-full text-gray-700 shadow-sm ring-1 ring-white/50 transition-transform duration-300 group-hover:scale-110">
                  {env.icon}
                </div>

                <span className="font-sans-body text-[11px] md:text-xs uppercase tracking-wider text-gray-700/80 font-medium text-center px-2">
                  {env.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedEnvelope && letterTheme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/55 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl h-[82vh] rounded-[2.25rem] shadow-2xl overflow-hidden relative flex flex-col border border-white/70 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Letter "paper" */}
              <div className={`relative flex-1 bg-gradient-to-b ${letterTheme.paper}`}>
                {/* decorative elements in the background */}
                <div className="pointer-events-none absolute inset-0">
                  <div className={`absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl ${letterTheme.blobA}`} />
                  <div className={`absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl ${letterTheme.blobB}`} />
                  <div className="absolute inset-0 opacity-[0.12]">
                    <div className="absolute top-10 left-10 w-24 h-24 rounded-3xl border border-gray-400/40 rotate-12" />
                    <div className="absolute bottom-14 right-14 w-28 h-28 rounded-3xl border border-gray-400/40 -rotate-12" />
                  </div>
                </div>

                {/* header */}
                <div className="relative flex items-center justify-between px-7 md:px-10 py-7 border-b border-white/60 bg-white/45 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/80 rounded-full shadow-sm ring-1 ring-white/60 text-gray-700">
                      {selectedEnvelope.icon}
                    </div>
                    <div>
                      <h3 className="font-serif-title text-2xl md:text-3xl text-gray-800 leading-tight">
                        {selectedEnvelope.label}
                      </h3>
                      <p className="font-sans-body text-sm text-gray-500 mt-0.5">
                        A tiny note, just for you.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedId(null)}
                    className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-white/70 transition-colors"
                    aria-label="Close"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* body */}
                <div className="relative px-7 md:px-10 py-8 overflow-y-auto h-[calc(82vh-92px)]">
                  <div className="space-y-5 text-gray-700 font-sans-body leading-relaxed text-[15px] md:text-[16px]">
                    {selectedEnvelope.content.map((paragraph, i) => (
                      <p key={i} className="whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* logo at the bottom, matches the letter */}
                  <div className="mt-12 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 ring-1 ring-white/70 shadow-sm text-gray-700">
                      <span className="scale-110">{selectedEnvelope.icon}</span>
                      <span className="font-sans-body text-xs tracking-wide text-gray-600">
                        with love
                      </span>
                    </div>
                  </div>

                  <div className="h-4" />
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
