
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Heart, Star, CloudRain, Coffee, Zap, Moon,
  Gift, Sun, ThumbsUp, Anchor,
  Camera, BookOpen, Mail,
  Crown, Sparkles, Gem,
  PenLine, Feather, Paperclip, Bookmark,
  Cake, PartyPopper, Lock, Key
} from 'lucide-react';

interface EnvelopeData {
  id: number;
  label: string;
  icon: React.ReactNode;
  content: string[];
  color: string;
  locked?: boolean; // New property for the password feature
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
      "You are capable of so much more than you believe yourself. Maybe 21 is the year of YOU. Chase dreams. Be happy. You deserve every ounce of goodness the universe has to offer.",
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
  {
    id: 3,
    label: "Best Girl",
    icon: <Crown className="text-gray-700" size={20} />,
    color: "bg-yellow-100",
    content: [
      "You are literally the 'Best Girl' ever.",
      "The way you care about people and even animals. The way you are kind to everyone.",
      "You work hard everyday, you care deeply, and you are just genuinely a good person.",
      "The world is lucky to have you, but I'm the luckiest to have you as my bestie.",
      "Keep wearing that invisible crown cause you are a queen 👑"
    ]
  },
  {
    id: 4,
    label: "Never Stress out",
    icon: <CloudRain className="text-gray-700" size={20} />,
    color: "bg-gray-100",
    content: [
      "Okay. Stop.",
      "Sometimes bad stuff happens and we have a lot of pressure to perform well, be it in exams, from family, relationships, and life in general. it feels like everything is just going bad, or that you have a mountain of tasks.",
      "But lets look at your track record. You have survived 100% of your bad days. You have handled exams, family drama, and other life chaos. So don't stress yourself over the bad phase, cause it all pass every single time.",
    ]
  },
  {
    id: 6,
    label: "So Pretty",
    icon: <Sparkles className="text-gray-700" size={20} />,
    color: "bg-rose-100",
    content: [
      "Can I take a moment to appreciate how stunning you are?",
      "Because honestly... HOW CAN SOMEONE BE SO PERFECT ALWAYS WITHOUT EVEN TRYING.",
      "And I'm not just saying that because it's your birthday.",
      "Aside from that, you are have a pretty soul too.",
      "You are beautiful both inside and out."
    ]
  },
  {
    id: 7,
    label: "Unique You",
    icon: <Gem className="text-gray-700" size={20} />,
    color: "bg-purple-100",
    content: [
      "There is literally no one else like you.",
      "I love your specific quirks and behaviour. I love the way you even when you are lazy about things.",
      "Never change the weird, wonderful parts of yourself."
    ]
  },
  {
    id: 8,
    label: "To meet you",
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
      "We spend so much time analyzing our sadness, but we rarely analyze our happiness. Enjoy the happiness because your brain loves remembering bad days and forgetting good ones.",
      "Don’t let anyone steal your happiness."
    ]
  },
  {
    id: 11,
    label: "You can Mess up",
    icon: <ThumbsUp className="text-gray-700" size={20} />,
    color: "bg-slate-100",
    content: [
      "if you ever mess up somewhere thats fine. Welcome to being human",
      "Being failed or messing up at something is not a personality trait. It’s just an event. Something happened, you didn’t get the result you wanted, and now your brain is trying to make it mean you’re not capable. That’s nonsense.",
      "Everyone you admire has failed spectacularly at some point. They just didn't stop there.",
      "It’s okay to be imperfect for others, but you stay perfect in your eyes.",
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
      "I hope you're still friends with me (you better be!).",
      "Keep growing. Keep shining. My wishes and blessings are always with you"
    ]
  },
  {
    id: 16,
    label: "Don't stay Upset",
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
    label: "Lucky Me",
    icon: <BookOpen className="text-gray-700" size={20} />,
    color: "bg-stone-50",
    content: [
      "I dont know why we first talked?",
      "Its been years ago, yet it feels just like yesterday.",
      "You and I have shared a lot of random, funny, and unexpectedly deep conversations including misunderstandings.",
      "I'm glad our timelines crossed. Of all the billions of people on earth, I'm glad I found you as my best friend."
    ]
  },
  {
    id: 19,
    label: "Chase dreams",
    icon: <Zap className="text-gray-700" size={20} />,
    color: "bg-orange-100",
    content: [
      "Get up.",
      "You have dreams, so achieve them.",
      "Do the thing even if you don't feel like it. Just five minutes.",
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
  },
  // The New Password Protected Envelope
{
    id: 21,
    label: "LOL",
    icon: <Lock className="text-gray-700" size={20} />,
    color: "bg-rose-100",
    locked: true,
    content: [
      "sorry for the cringe password.",
      "I want this digital memory to stay forever in time for you. Someday, if we drift apart (which I don't want, obviously) or if life just gets too loud, I want you to come back here, open this letter, and remember that someone in this big world cared about you this much. I just care for you in quiet way (purely and sincerely), not anything like to impress you.",
      "You know, people often say online friends aren't 'real' friends. But they are wrong. Because who else knows your problems that you can never tell others? Who else listens to your rants about random inconveniences? I sometimes feel I know you better than people who see you every day. And that’s why I wanted to make this effort. Not because I had to, but because I wanted to spoil you with happy memories.",
      "!!!",
      "If you are reading this on any of your next birthdays from now: Hello! I hope we are still best friends. I hope I still get to call you 'bsdk' and tease you. But if life has taken us on different paths, just know that at this moment in time, on your 21st birthday, you were my favorite person to talk to.",
      ".",
    ]
  }
];

function getLetterTheme(id: number) {
  const themes = {
    1: { paper: "from-rose-50 via-white to-pink-50", blobA: "bg-pink-200/35", blobB: "bg-rose-200/30", ribbon: "bg-pink-200/45", wax: "bg-rose-300/35" },
    2: { paper: "from-sky-50 via-white to-blue-50", blobA: "bg-sky-200/35", blobB: "bg-blue-200/30", ribbon: "bg-sky-200/40", wax: "bg-blue-300/30" },
    3: { paper: "from-amber-50 via-white to-yellow-50", blobA: "bg-amber-200/35", blobB: "bg-yellow-200/30", ribbon: "bg-amber-200/40", wax: "bg-amber-300/30" },
    4: { paper: "from-slate-50 via-white to-stone-50", blobA: "bg-slate-200/35", blobB: "bg-stone-200/30", ribbon: "bg-slate-200/35", wax: "bg-slate-300/25" },
    5: { paper: "from-indigo-50 via-white to-violet-50", blobA: "bg-indigo-200/35", blobB: "bg-violet-200/30", ribbon: "bg-indigo-200/40", wax: "bg-violet-300/25" },
    6: { paper: "from-rose-50 via-white to-fuchsia-50", blobA: "bg-rose-200/35", blobB: "bg-fuchsia-200/30", ribbon: "bg-rose-200/45", wax: "bg-fuchsia-300/25" },
    7: { paper: "from-purple-50 via-white to-violet-50", blobA: "bg-purple-200/35", blobB: "bg-violet-200/30", ribbon: "bg-purple-200/40", wax: "bg-purple-300/25" },
    8: { paper: "from-orange-50 via-white to-amber-50", blobA: "bg-orange-200/35", blobB: "bg-amber-200/30", ribbon: "bg-orange-200/40", wax: "bg-amber-300/25" },
    10:{ paper: "from-amber-50 via-white to-yellow-50", blobA: "bg-amber-200/35", blobB: "bg-yellow-200/30", ribbon: "bg-amber-200/40", wax: "bg-yellow-300/25" },
    11:{ paper: "from-slate-50 via-white to-gray-50", blobA: "bg-slate-200/35", blobB: "bg-gray-200/30", ribbon: "bg-slate-200/35", wax: "bg-gray-300/20" },
    13:{ paper: "from-rose-50 via-white to-pink-50", blobA: "bg-rose-200/35", blobB: "bg-pink-200/30", ribbon: "bg-rose-200/45", wax: "bg-rose-300/30" },
    14:{ paper: "from-violet-50 via-white to-purple-50", blobA: "bg-violet-200/35", blobB: "bg-purple-200/30", ribbon: "bg-violet-200/40", wax: "bg-purple-300/25" },
    16:{ paper: "from-red-50 via-white to-rose-50", blobA: "bg-red-200/35", blobB: "bg-rose-200/30", ribbon: "bg-red-200/35", wax: "bg-rose-300/25" },
    17:{ paper: "from-yellow-50 via-white to-amber-50", blobA: "bg-yellow-200/35", blobB: "bg-amber-200/30", ribbon: "bg-yellow-200/40", wax: "bg-amber-300/25" },
    18:{ paper: "from-stone-50 via-white to-neutral-50", blobA: "bg-stone-200/35", blobB: "bg-neutral-200/30", ribbon: "bg-stone-200/35", wax: "bg-stone-300/20" },
    19:{ paper: "from-orange-50 via-white to-yellow-50", blobA: "bg-orange-200/35", blobB: "bg-yellow-200/30", ribbon: "bg-orange-200/40", wax: "bg-yellow-300/25" },
    20:{ paper: "from-neutral-50 via-white to-rose-50", blobA: "bg-neutral-200/35", blobB: "bg-rose-200/30", ribbon: "bg-rose-200/35", wax: "bg-rose-300/20" },
    21:{ paper: "from-pink-50 via-white to-rose-50", blobA: "bg-pink-200/35", blobB: "bg-rose-200/30", ribbon: "bg-pink-200/45", wax: "bg-rose-400/30" },
  } as Record<number, { paper: string; blobA: string; blobB: string; ribbon: string; wax: string }>;

  return themes[id] ?? { paper: "from-neutral-50 via-white to-neutral-50", blobA: "bg-neutral-200/30", blobB: "bg-neutral-200/20", ribbon: "bg-neutral-200/30", wax: "bg-neutral-300/20" };
}

const FloatingSparkles: React.FC = () => {
  const items = useMemo(() => (
    Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      top: `${Math.floor(Math.random() * 90) + 5}%`,
      left: `${Math.floor(Math.random() * 90) + 5}%`,
      delay: Math.random() * 1.2,
      duration: 3.5 + Math.random() * 2.5,
      scale: 0.85 + Math.random() * 0.7,
      opacity: 0.08 + Math.random() * 0.08,
      rotate: Math.floor(Math.random() * 30) - 15,
    }))
  ), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ top: s.top, left: s.left, opacity: s.opacity, transform: `rotate(${s.rotate}deg)` }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: [-8, 8, -8], opacity: [0, s.opacity, 0] }}
          transition={{ delay: s.delay, duration: s.duration, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={18} className="text-gray-700" style={{ transform: `scale(${s.scale})` }} />
        </motion.div>
      ))}
    </div>
  );
};

const Surprise: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  // Password Modal State
  const [pendingEnvelope, setPendingEnvelope] = useState<number | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorShake, setErrorShake] = useState(0);

  const selectedEnvelope = useMemo(
    () => envelopes.find(e => e.id === selectedId),
    [selectedId]
  );

  const letterTheme = selectedEnvelope ? getLetterTheme(selectedEnvelope.id) : null;

  const handleEnvelopeClick = (env: EnvelopeData) => {
    if (env.locked) {
      setPendingEnvelope(env.id);
      setPasswordInput("");
      setErrorShake(0);
    } else {
      setSelectedId(env.id);
    }
  };

  const handleUnlock = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (passwordInput.toLowerCase().trim() === "qtchan") {
      setSelectedId(pendingEnvelope);
      setPendingEnvelope(null);
    } else {
      setErrorShake(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-dvh bg-aesthetic p-6 relative overflow-hidden">
      {/* Overall page aesthetic */}
      <div className="pointer-events-none absolute inset-0">
        {/* dreamy pastel clouds */}
        <div className="absolute -top-28 -left-28 w-[30rem] h-[30rem] rounded-full bg-pink-200/22 blur-3xl" />
        <div className="absolute top-10 -right-32 w-[36rem] h-[36rem] rounded-full bg-purple-200/16 blur-3xl" />
        <div className="absolute -bottom-36 left-1/4 w-[38rem] h-[38rem] rounded-full bg-amber-200/14 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] rounded-full bg-rose-200/12 blur-3xl" />

        {/* subtle paper grain */}
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* floating sparkles */}
        <FloatingSparkles />

        {/* birthday + cute doodles */}
        <div className="absolute top-16 left-10 opacity-[0.16] rotate-12">
          <PartyPopper size={38} className="text-gray-700" />
        </div>
        <div className="absolute top-44 right-14 opacity-[0.14] -rotate-12">
          <Cake size={34} className="text-gray-700" />
        </div>
        <div className="absolute bottom-20 left-16 opacity-[0.12] rotate-6">
          <Heart size={34} className="text-gray-700" />
        </div>
        <div className="absolute bottom-24 right-20 opacity-[0.12] -rotate-6">
          <Gift size={34} className="text-gray-700" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-10 pb-20 relative">
        <div className="text-center mb-14">
          <h2 className="font-serif-title text-4xl md:text-6xl text-gray-800 tracking-tight">
            FOR THE CUTEST GIRL
          </h2>
          <div className="w-20 h-1 bg-pink-200 mx-auto rounded-full mt-5 mb-5"></div>
          <p className="text-gray-500 font-sans-body font-light tracking-wide text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            I wanted to write 21 things for you on your 21th b'day (I KNOW I'M WEIRD), so here's a collection of random notes if you wanna read.
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
              whileHover={{ y: -6, scale: 1.012 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleEnvelopeClick(env)}
              className={[
                "group relative text-left",
                "cursor-pointer aspect-square rounded-3xl",
                "border border-white/80 shadow-sm hover:shadow-md",
                "transition-all duration-300",
                "overflow-hidden",
                env.color
              ].join(" ")}
            >
              {/* glossy shine */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/40 blur-2xl" />
              </div>

              {/* pretty-girl doodle: bow + heart confetti */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-4 left-4 w-11 h-7 opacity-45">
                  <svg viewBox="0 0 120 70" className="w-full h-full">
                    <path
                      d="M35 35c-15 0-30-10-30-20S20 0 35 10c10 7 17 17 25 25-8 8-15 18-25 25C20 70 5 60 5 50s15-15 30-15zm50 0c15 0 30-10 30-20S100 0 85 10c-10 7-17 17-25 25 8 8 15 18 25 25 15 10 30 0 30-10S100 35 85 35z"
                      fill="rgba(255,255,255,0.72)"
                    />
                    <circle cx="60" cy="35" r="10" fill="rgba(255,255,255,0.78)" />
                  </svg>
                </div>

                <div className="absolute top-5 right-5 opacity-22">
                  <Sparkles size={18} className="text-gray-700" />
                </div>
                <div className="absolute bottom-6 left-6 opacity-16">
                  <Heart size={16} className="text-gray-700" />
                </div>
                <div className="absolute bottom-5 right-6 opacity-14">
                  <Star size={14} className="text-gray-700" />
                </div>
              </div>

              <div className="relative h-full w-full flex flex-col items-center justify-center gap-3 p-4">
                <div className="relative bg-white/78 p-3 rounded-full text-gray-700 shadow-sm ring-1 ring-white/70 transition-transform duration-300 group-hover:scale-110">
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

      {/* Password Modal */}
      <AnimatePresence>
        {pendingEnvelope !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setPendingEnvelope(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                x: errorShake % 2 === 0 ? 0 : [0, -10, 10, -10, 10, 0] 
              }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-sm bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 border border-pink-100 relative text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                 onClick={() => setPendingEnvelope(null)}
                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-6 flex justify-center">
                 <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center shadow-inner text-pink-400">
                    <Key size={30} />
                 </div>
              </div>

              <h3 className="text-2xl font-serif-title text-gray-800 mb-2">Shhh! Top Secret</h3>
              <p className="text-gray-500 text-sm mb-6 font-sans-body">
                This one is locked for a reason. Do you know the code word?
              </p>

              <form onSubmit={handleUnlock} className="space-y-4">
                <input 
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full px-5 py-3 rounded-xl bg-pink-50/50 border border-pink-100 text-center text-gray-700 placeholder:text-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all font-sans-body"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-300 to-rose-300 text-white font-medium shadow-md shadow-pink-200/50 hover:shadow-lg hover:shadow-pink-200/60 active:scale-95 transition-all duration-200"
                >
                  Unlock
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Existing Letter Modal */}
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
              className="w-full max-w-2xl h-[82vh] rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col border border-white/80 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* pink ribbon border */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 rounded-[2.5rem] ring-2 ring-pink-200/55" />
                <div className="absolute inset-[10px] rounded-[2.1rem] ring-1 ring-white/70" />
              </div>

              {/* Letter paper */}
              <div className={`relative flex-1 bg-gradient-to-b ${letterTheme.paper}`}>
                {/* background decor */}
                <div className="pointer-events-none absolute inset-0">
                  {/* blobs */}
                  <div className={`absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl ${letterTheme.blobA}`} />
                  <div className={`absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl ${letterTheme.blobB}`} />

                  {/* floating sparkles inside letter */}
                  <div className="absolute inset-0 opacity-[0.75]">
                    <FloatingSparkles />
                  </div>

                  {/* ribbon strip across the top */}
                  <div className={`absolute top-0 left-0 right-0 h-10 ${letterTheme.ribbon} opacity-55`} />

                  {/* cute birthday corners */}
                  <div className="absolute top-14 left-10 opacity-[0.16] rotate-[-10deg]">
                    <PartyPopper size={28} className="text-gray-700" />
                  </div>
                  <div className="absolute top-14 right-10 opacity-[0.14] rotate-[10deg]">
                    <Cake size={26} className="text-gray-700" />
                  </div>

                  {/* girly stationery doodles */}
                  <div className="absolute bottom-24 left-10 opacity-[0.14] -rotate-12">
                    <PenLine size={26} className="text-gray-700" />
                  </div>
                  <div className="absolute top-36 right-12 opacity-[0.12] rotate-12">
                    <Feather size={28} className="text-gray-700" />
                  </div>
                  <div className="absolute bottom-40 right-12 opacity-[0.10] -rotate-6">
                    <Paperclip size={26} className="text-gray-700" />
                  </div>

                  {/* subtle frames */}
                  <div className="absolute inset-0 opacity-[0.09]">
                    <div className="absolute top-28 left-16 w-24 h-24 rounded-3xl border border-gray-500/40 rotate-12" />
                    <div className="absolute bottom-28 right-16 w-28 h-28 rounded-3xl border border-gray-500/40 -rotate-12" />
                  </div>
                </div>

                {/* header */}
                <div className="relative flex items-center justify-between px-7 md:px-10 py-7 border-b border-white/60 bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/85 rounded-full shadow-sm ring-1 ring-white/70 text-gray-700">
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
                    className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-white/75 transition-colors"
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

                  {/* footer seal: wax + icon-only */}
                  <div className="mt-12 flex items-center justify-center">
                    <div className="relative">
                      {/* wax seal base */}
                      <div className={`absolute inset-0 rounded-full blur-xl ${letterTheme.wax}`} />
                      <div className={`absolute -top-2 -left-2 w-20 h-20 rounded-full ${letterTheme.wax} opacity-55`} />

                      {/* stamp ring */}
                      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white/70 ring-1 ring-white/80 shadow-md text-gray-700">
                        <div className="scale-110">
                          {selectedEnvelope.icon}
                        </div>
                      </div>

                      {/* ribbon tails */}
                      <div className={`absolute -bottom-5 left-1/2 -translate-x-1/2 w-14 h-6 ${letterTheme.ribbon} opacity-45 rounded-b-2xl`} />

                      {/* tiny accents */}
                      <div className="absolute -right-10 top-2 opacity-[0.14]">
                        <Sparkles size={18} className="text-gray-700" />
                      </div>
                      <div className="absolute -left-10 top-2 opacity-[0.14]">
                        <Heart size={18} className="text-gray-700" />
                      </div>
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
