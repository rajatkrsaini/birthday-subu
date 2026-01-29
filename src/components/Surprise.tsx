import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Heart, Star, Smile, CloudRain, Coffee, Zap, Moon, 
  Gift, Frown, Sun, Umbrella, ThumbsUp, Anchor, 
  Compass, Camera, BookOpen, Mail, ShoppingBag, Tv, Utensils,
  Crown, Sparkles, Gem, Shield, Battery, Award, Thermometer, 
  Hourglass, Flame, HelpCircle, Home, Clock, Calendar, 
  DollarSign, Scissors, Lightbulb, Eye, Scale, Droplet, 
  Plane, Info, Bell, Music
} from 'lucide-react';

interface EnvelopeData {
  id: number;
  label: string;
  icon: React.ReactNode;
  content: string[];
  color: string;
}

const envelopes: EnvelopeData[] = [
  // --- Existing Letters ---
  {
    id: 1,
    label: "On your 21st",
    icon: <Gift className="text-gray-600" size={20} />,
    color: "bg-pink-100",
    content: [
      "Dearest Subu,",
      "Happy 21st Birthday! 🥂 Can you believe it? You've officially leveled up to one of the most significant milestones in life. Twenty-one isn't just a number; it's a bridge between the chaotic wonder of your teenage years and the incredible potential of your adulthood.",
      "I know you sometimes say you aren't excited about birthdays, or that it's just another day. But to me, this day is monumental because it marks 21 years of the world having you in it.",
      "Thinking back on the last three years of our friendship, I feel so privileged to have watched you grow. I've seen you navigate challenges with a quiet strength that I admire more than I say.",
      "My wish for you this year is simple but deep: I hope you find clarity. I hope you find the courage to chase the things that scare you a little bit, because that's where the magic happens.",
      "You are capable of so much more than you give yourself credit for. 21 is the year of YOU. Take up space. Be loud. Be happy. You deserve every ounce of goodness the universe has to offer.",
      "Happy Birthday, bestie. Here's to the next chapter. 💖"
    ]
  },
  {
    id: 25,
    label: "Best Girl 🏆",
    icon: <Crown className="text-gray-600" size={20} />,
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
    id: 26,
    label: "You're Beautiful ✨",
    icon: <Sparkles className="text-gray-600" size={20} />,
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
  {
    id: 27,
    label: "Unique You 🦄",
    icon: <Gem className="text-gray-600" size={20} />,
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
    id: 2,
    label: "Miss you",
    icon: <Anchor className="text-gray-600" size={20} />,
    color: "bg-blue-50",
    content: [
      "Hey you,",
      "If you're opening this, the distance must be feeling a little heavier than usual today. I get it. There are days where text messages and calls just don't cut it.",
      "I want you to close your eyes for a second and take a deep breath. Imagine I'm sitting right there next to you. Not saying anything profound, just being there.",
      "Distance is just a geography test, and frankly, we are acing it. The bond we have isn't measured in miles or kilometers; it's measured in the shared jokes and the trust we've built over years.",
      "I am always with you in spirit. When something funny happens, I'm the first person you want to tell—that means I'm there.",
      "So until the day we can finally hug for real (and I promise it will happen), hold onto this virtual one.",
      "Text me. I'm waiting."
    ]
  },
  {
    id: 21,
    label: "Craving Boba 🧋",
    icon: <Coffee className="text-gray-600" size={20} />,
    color: "bg-amber-100",
    content: [
      "Boba Emergency!",
      "Okay, listen. You work hard. You deal with people. You survive daily life. You deserve the boba.",
      "Get the brown sugar milk tea. Or the matcha. Add the tapioca pearls. Maybe even the pudding.",
      "Sugar is brain fuel (don't fact check that). Go treat yourself. Life is too short to drink water all the time.",
      "Consider this a coupon valid for one guilt-free boba run. Go! 🏃‍♀️"
    ]
  },
  {
    id: 4,
    label: "Stressed out",
    icon: <CloudRain className="text-gray-600" size={20} />,
    color: "bg-gray-100",
    content: [
      "Okay, deep breath in... hold it... and let it out.",
      "Listen to me: The world is not ending. I know it feels like everything is crashing down, or that you have a mountain of tasks. I know that chest-tightening feeling.",
      "But look at your track record. You have survived 100% of your bad days. You have handled exams, family drama, and life chaos. You are a survivor.",
      "Whatever is stressing you out right now is temporary. In a month, this will just be a blip.",
      "You need to unplug. Seriously. Close the tabs. Drink a glass of water. Do something that serves zero purpose other than making you feel calm.",
      "You are not a machine. You are a human being who needs rest."
    ]
  },
  {
    id: 5,
    label: "Can't sleep",
    icon: <Moon className="text-gray-600" size={20} />,
    color: "bg-indigo-50",
    content: [
      "Hello, night owl.",
      "If you're reading this, the world is quiet but your mind is loud. It's frustrating, isn't it?",
      "I want you to try something. Visualize a place where we are just hanging out. Maybe it's a rooftop at night, watching the city lights. The air is cool, and there's no pressure to talk.",
      "Sleep is a shy friend; it doesn't come when you chase it. So stop trying to sleep. Just rest.",
      "The worries you have right now? They are night-worries. When the sun comes up, they will shrink back down to manageable sizes.",
      "I'm sending you sleepy dust and peaceful vibes. Goodnight, qt."
    ]
  },
  {
    id: 22,
    label: "Outfit Crisis 👗",
    icon: <ShoppingBag className="text-gray-600" size={20} />,
    color: "bg-rose-50",
    content: [
      "I have nothing to wear!",
      "I can hear you screaming this at your closet. But let's be real—you could wear a potato sack and make it look aesthetic.",
      "If you hate everything you own right now, go back to basics. Jeans and a cute top. Or that one dress that makes you feel like a fairy.",
      "You define the clothes, the clothes don't define you. You look great. Stop overthinking it.",
      "Now go slay."
    ]
  },
  {
    id: 6,
    label: "Need a laugh",
    icon: <Smile className="text-gray-600" size={20} />,
    color: "bg-yellow-50",
    content: [
      "Emergency Laugh Protocol Initiated.",
      "Why did the scarecrow win an award? Because he was outstanding in his field! ...Okay, I know, that was terrible.",
      "Remember that time we were talking and autocorrect completely ruined the sentence? Or that time you started laughing in a voice note?",
      "Life is too short to be serious all the time. If you're having a bad day, go watch a video of a cat falling off a table.",
      "You have the most beautiful laugh, and the world deserves to hear it. Smile, Subu. It looks good on you."
    ]
  },
  {
    id: 7,
    label: "Lonely",
    icon: <Frown className="text-gray-600" size={20} />,
    color: "bg-teal-50",
    content: [
      "I'm sorry you're feeling this way.",
      "Loneliness is a tricky thing. You can be in a room full of people and feel lonely. Right now, I'm guessing you feel a bit disconnected.",
      "I wish I could teleport there and just sit with you. We wouldn't even have to talk.",
      "But remember that being alone does not mean you are unloved. You have people—me included—who care about you deeply.",
      "Reach out. Send me a text. Call someone. Sometimes breaking the silence is the hardest part, but it's the only way to let the light back in.",
      "You are not an island. You are loved."
    ]
  },
  {
    id: 23,
    label: "K-Drama Mood 📺",
    icon: <Tv className="text-gray-600" size={20} />,
    color: "bg-purple-50",
    content: [
      "Annyeong!",
      "Is it time to escape reality and fall in love with a fictional CEO who has childhood trauma but a heart of gold?",
      "Yes. Yes it is.",
      "Go get your snacks (ramen is mandatory). Get your blanket. Prepare your tissues.",
      "I fully support this binge-watching session. Reality can wait. Go enjoy the romance/drama/thriller.",
      "Fighting! ✊"
    ]
  },
  {
    id: 28,
    label: "Smart Cookie 🧠",
    icon: <BookOpen className="text-gray-600" size={20} />,
    color: "bg-blue-100",
    content: [
      "Beauty and brains? Unfair to the rest of us.",
      "I admire your intelligence so much. You are sharp, observant, and thoughtful.",
      "Watching you figure things out and navigate life is inspiring. You have a good head on your shoulders.",
      "Trust your instincts, you're smarter than you give yourself credit for.",
      "You're going to go so far."
    ]
  },
  {
    id: 8,
    label: "Meeting you",
    icon: <Coffee className="text-gray-600" size={20} />,
    color: "bg-orange-50",
    content: [
      "Oh my god, this day is going to be LEGENDARY.",
      "I have played this scenario in my head a thousand times. I'll probably be standing there awkwardly at the airport.",
      "The first hug? It's going to be one of those bone-crushing ones. The kind that lasts for a solid minute.",
      "Here is the plan (draft version):",
      "1. Food. Immediately.",
      "2. A walk. Just walking and talking without a screen buffering.",
      "3. Photos. We need to take a million photos.",
      "Hold on to this vision. It's coming. I promise."
    ]
  },
  {
    id: 9,
    label: "Giving up",
    icon: <X className="text-gray-600" size={20} />,
    color: "bg-red-50",
    content: [
      "Don't you dare.",
      "I mean it. I know you're tired. I know you feel like you've been fighting for so long. But you are not a quitter.",
      "Think about the version of you from 5 years ago. She would be amazed at where you are today. You owe it to her to keep going.",
      "Rest if you must. Cry if you need to. But do not stop. Progress is not a straight line.",
      "You are stronger than this obstacle. You have a fire in you that cannot be extinguished.",
      "I am in your corner, cheering the loudest. Get up. You can do this."
    ]
  },
  {
    id: 10,
    label: "Happy",
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
    label: "Spicy Food 🌶",
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
  },
  // --- New Letters ---
  {
    id: 29,
    label: "Insecure 🛡",
    icon: <Shield className="text-gray-600" size={20} />,
    color: "bg-stone-100",
    content: [
      "Hey you,",
      "I hate that you're feeling this way. I really do. It hurts me to know that you're looking in the mirror (or looking inside your mind) and not seeing the masterpiece that I see.",
      "Insecurities are liars. They are loud, obnoxious, and completely false. They zoom in on tiny imperfections that no one else sees and magnify them until they block out everything else.",
      "You are concerned about not being enough, while everyone around you is wondering how you manage to be so much. You are kind, you are smart, you are beautiful.",
      "Please be gentle with yourself today. Talk to yourself the way you would talk to me if I was feeling this way. You wouldn't insult me, right? So don't insult my best friend."
    ]
  },
  {
    id: 30,
    label: "Social Battery Low 🔋",
    icon: <Battery className="text-gray-600" size={20} />,
    color: "bg-zinc-50",
    content: [
      "System Shutdown Imminent.",
      "I can feel the introvert panic from here. You have peopled too much. You have smiled too many fake smiles. You have made too much small talk.",
      "It is officially time to ghost the world. I hereby grant you permission to not reply to texts (even mine, for a few hours), to cancel plans, and to retreat into your cave.",
      "Put your phone on Do Not Disturb. Put on your noise-canceling headphones. Watch something you've seen a thousand times.",
      "Recharge. The world will still be here when you're ready to come back. Protect your energy."
    ]
  },
  {
    id: 31,
    label: "Small Win 🏅",
    icon: <Award className="text-gray-600" size={20} />,
    color: "bg-lime-100",
    content: [
      "Hell yes!",
      "I don't care if you just climbed a mountain or just finally washed that one dish that's been sitting in the sink for three days. A win is a win.",
      "We are so conditioned to only celebrate the 'big' things—graduations, promotions, milestones. But life is made of small moments.",
      "Did you get out of bed when you wanted to rot? Did you send that scary email? Did you drink water?",
      "I am proud of you. Validating your effort is important. Do a little victory dance. You did good."
    ]
  },
  {
    id: 32,
    label: "Sick Day 🤒",
    icon: <Thermometer className="text-gray-600" size={20} />,
    color: "bg-green-50",
    content: [
      "Oh no. You poor thing.",
      "Being sick is the worst. I want you to drop everything you think you 'should' be doing. Productivity does not exist today.",
      "Your only job is to become a burrito of blankets. Hydrate aggressively. Order soup. Sleep until your back hurts from sleeping.",
      "Don't try to power through it. Your body is asking for a timeout. Listen to it.",
      "Sending you virtual healing vibes and a digital forehead check. Get well soon, Subu."
    ]
  },
  {
    id: 33,
    label: "Feeling Old 👵",
    icon: <Hourglass className="text-gray-600" size={20} />,
    color: "bg-orange-50",
    content: [
      "Stop it.",
      "You are twenty-one. You are literally a baby adult. You have barely started the tutorial level of adulthood.",
      "I know seeing people younger than us do crazy things on the internet makes us feel ancient, but you have so much time.",
      "Your life hasn't even peaked yet. You haven't met all the people you're going to love. You haven't eaten your favorite food yet.",
      "You are exactly where you need to be. Aging is a privilege. Embrace the wisdom (and the knee pain, jk)."
    ]
  },
  {
    id: 34,
    label: "Panic Mode 🔥",
    icon: <Flame className="text-gray-600" size={20} />,
    color: "bg-red-100",
    content: [
      "Freeze.",
      "I need you to look at your feet. Wiggle your toes. Feel the ground. You are here. You are safe.",
      "Your brain is going a million miles an hour and lying to you about the future. Focus on the 'right now'.",
      "Name 5 things you can see. 4 things you can touch. 3 things you can hear.",
      "This feeling is a wave. It feels like it will drown you, but it will crash and then recede. You just have to float for a minute.",
      "Breathe. I'm with you."
    ]
  },
  {
    id: 35,
    label: "Need a Hug 🫂",
    icon: <Smile className="text-gray-600" size={20} />,
    color: "bg-pink-50",
    content: [
      "Loading virtual hug...",
      "██████████ 100%",
      "Imagine I am wrapping my arms around you and squeezing really tight. The kind of hug where you can just drop all the weight you're carrying.",
      "I wish I could be there to do this for real. But until then, wrap yourself in your favorite blanket and pretend it's me.",
      "You are held. You are safe. You are loved."
    ]
  },
  {
    id: 36,
    label: "Confused ❓",
    icon: <HelpCircle className="text-gray-600" size={20} />,
    color: "bg-violet-100",
    content: [
      "It is okay not to know.",
      "Society tells us we need to have a 5-year plan, a purpose, and a clear direction. That is garbage.",
      "Most people are just winging it. Confusion is actually a sign of growth. It means you are asking questions. It means you aren't settling.",
      "Sit with the uncertainty. You don't need to solve the puzzle of your life today. Just figure out the next tiny piece.",
      "Trust your gut. It knows the way even when your brain is foggy."
    ]
  },
  {
    id: 37,
    label: "Homesick 🏠",
    icon: <Home className="text-gray-600" size={20} />,
    color: "bg-amber-50",
    content: [
      "I know that ache.",
      "That feeling where your chest feels hollow and you just want familiar walls and familiar smells. It's really hard.",
      "Homesickness isn't just about a place; it's about craving comfort and safety.",
      "Try to create a little pocket of 'home' where you are. Cook a comfort meal. Call your family. Look at old photos.",
      "And remember, I am a home for you too. You can always come to me."
    ]
  },
  {
    id: 38,
    label: "Unproductive 🐌",
    icon: <Clock className="text-gray-600" size={20} />,
    color: "bg-blue-50",
    content: [
      "You are not a machine.",
      "Your worth is not measured by how many items you checked off a to-do list today. We are human beings, not human doings.",
      "Some days are for sprinting, and some days are for sitting on the floor staring at the wall. Both are necessary.",
      "Rest is productive. You cannot pour from an empty cup. If all you did today was exist, that is enough.",
      "Be kind to the lazy version of you. She needs love too."
    ]
  },
  {
    id: 39,
    label: "Monday Blues 📅",
    icon: <Calendar className="text-gray-600" size={20} />,
    color: "bg-sky-100",
    content: [
      "Ugh. Mondays.",
      "I feel you. The weekend went by in a blink and now reality is back. It's rude, honestly.",
      "But listen, it's just a day. It has 24 hours just like Saturday did. Don't let the calendar dictate your mood.",
      "Treat yourself to a special coffee today. Wear an outfit that makes you feel powerful. Romanticize the mundane.",
      "You conquer this week, one hour at a time."
    ]
  },
  {
    id: 40,
    label: "Money Stress 💸",
    icon: <DollarSign className="text-gray-600" size={20} />,
    color: "bg-emerald-100",
    content: [
      "Breathe.",
      "Money anxiety is one of the heaviest things to carry. It feels like survival.",
      "But remember: You are resourceful. You have figured things out before, and you will figure this out too. This situation is temporary.",
      "Don't let numbers on a screen define your value as a person. You are rich in kindness, humor, and talent.",
      "Take it one step at a time. You will be okay."
    ]
  },
  {
    id: 41,
    label: "Bad Hair Day ✂️",
    icon: <Scissors className="text-gray-600" size={20} />,
    color: "bg-pink-100",
    content: [
      "Okay, so we look like a chaotic scientist today?",
      "It happens. Honestly, you could wear a trash bag and have birds nesting in your hair and you'd still be iconic.",
      "Own the mess. Call it 'texture'. Put on a beanie or do that messy bun thing.",
      "Nobody is looking at you as closely as you are looking at yourself. Smile big—it distracts from the frizz.",
      "You're cute regardless."
    ]
  },
  {
    id: 42,
    label: "Creative Block 💡",
    icon: <Lightbulb className="text-gray-600" size={20} />,
    color: "bg-yellow-50",
    content: [
      "The well is dry?",
      "It happens to the best of us. Creativity isn't a faucet; it's rain. You can't force it.",
      "Stop trying to make something 'good'. Make something terrible. Make something ugly. Draw a stick figure. Write bad poetry.",
      "Play is the antidote to a block. Go do something unrelated to your work. Dance. Walk. Bake.",
      "The spark will come back. It always does. Give your brain a recess."
    ]
  },
  {
    id: 43,
    label: "Invisible 👻",
    icon: <Eye className="text-gray-600" size={20} />,
    color: "bg-gray-100",
    content: [
      "I see you.",
      "I know it feels like the world is moving on without you, or that your voice is being drowned out. That is a lonely feeling.",
      "But you are visible to me. I see your effort. I see your kindness. I see your struggle.",
      "You matter. You impact people in ways you don't even realize—a smile to a stranger, a kind text.",
      "Don't shrink yourself. The world needs your presence."
    ]
  },
  {
    id: 44,
    label: "Comparison ⚖️",
    icon: <Scale className="text-gray-600" size={20} />,
    color: "bg-orange-50",
    content: [
      "Put the phone down.",
      "Stop scrolling. Stop looking at her highlight reel and comparing it to your behind-the-scenes footage.",
      "You don't see their bad days. You don't see their insecurities. You are comparing your reality to a curated fiction.",
      "You are on your own timeline. Your journey is unique to you. There is no one else who can be a better Subu than you.",
      "Stay in your lane. Your grass is green enough if you water it."
    ]
  },
  {
    id: 45,
    label: "Code Red 🩸",
    icon: <Droplet className="text-gray-600" size={20} />,
    color: "bg-red-200",
    content: [
      "Ugh. The worst time.",
      "I am so sorry. Nature is rude. You have full permission to be grumpy, emotional, and hungry.",
      "Chocolate is mandatory. Hot water bottles are your best friend. Comfortable pants are non-negotiable.",
      "If you cry at a commercial, that is valid. If you want to murder someone, please don't, but the feeling is valid.",
      "This too shall pass. Until then, treat yourself like a delicate flower."
    ]
  },
  {
    id: 46,
    label: "Post-Vacation ✈️",
    icon: <Plane className="text-gray-600" size={20} />,
    color: "bg-sky-50",
    content: [
      "The blues hit hard.",
      "Coming back to reality after a great time is like hitting a wall. Everything feels grey.",
      "But don't be sad it's over; be glad you have those memories. Scroll through your photos. Print a few out.",
      "And the best cure? Start planning the next adventure, even if it's just a small weekend trip or a dream.",
      "Life is just the time between vacations. You'll go somewhere amazing again."
    ]
  },
  {
    id: 47,
    label: "Sunday Scaries 😨",
    icon: <Calendar className="text-gray-600" size={20} />,
    color: "bg-indigo-50",
    content: [
      "The dread is real.",
      "That creeping anxiety about the week ahead? It's lying to you. You are going to handle this week just fine.",
      "Don't let Monday ruin your Sunday. Be present in the remaining hours of the weekend.",
      "Do a little reset routine. Clean your space, make a list, pick out your outfit. Preparation kills anxiety.",
      "Go to bed early. You got this."
    ]
  },
  {
    id: 48,
    label: "Did you know? 🦦",
    icon: <Info className="text-gray-600" size={20} />,
    color: "bg-teal-50",
    content: [
      "Here is a random distraction:",
      "Did you know that sea otters hold hands when they sleep to keep from drifting apart? That is us.",
      "Did you know that cows have best friends? You are mine.",
      "Did you know that you are made of stardust? Literally. The elements in your body were forged in stars.",
      "Just wanted to remind you that the world is weird and magical, and so are you."
    ]
  },
  {
    id: 49,
    label: "Open Now 🔔",
    icon: <Bell className="text-gray-600" size={20} />,
    color: "bg-rose-100",
    content: [
      "EMERGENCY LOVE DELIVERY!",
      "I just wanted to interrupt your day to tell you that you are incredible.",
      "Seriously. Take a second to acknowledge how cool you are.",
      "Okay, that's it. You can go back to what you were doing. But do it with a smile now.",
      "Love you!"
    ]
  },
  {
    id: 50,
    label: "Music Mood 🎵",
    icon: <Music className="text-gray-600" size={20} />,
    color: "bg-fuchsia-50",
    content: [
      "Turn it up.",
      "Music is the closest thing we have to magic. Whatever you are feeling right now, there is a song for it.",
      "If you're sad, listen to the sad stuff and let it out. If you're happy, blast the pop hits and dance.",
      "I'm sending you a mental playlist of all the songs that remind me of us.",
      "Put your headphones on and let the world fade away for 3 minutes."
    ]
  },
  {
    id: 51,
    label: "Imposter 🎭",
    icon: <Crown className="text-gray-600" size={20} />,
    color: "bg-slate-200",
    content: [
      "You belong here.",
      "That voice telling you that you're faking it, or that you're not qualified? It's wrong.",
      "Everyone—literally everyone—is figuring it out as they go. Even the people who look confident.",
      "You have earned your spot. You are talented. You work hard.",
      "Don't let your brain trick you out of your own success. Own it."
    ]
  },
  {
    id: 52,
    label: "Good Morning ☀️",
    icon: <Sun className="text-gray-600" size={20} />,
    color: "bg-yellow-50",
    content: [
      "Rise and shine!",
      "It's a brand new day. A fresh start. The slate is clean.",
      "Whatever happened yesterday doesn't matter anymore. You have a whole new 24 hours to do whatever you want.",
      "Drink some water. Stretch. Look out the window.",
      "Go make today your b*tch."
    ]
  },
  {
    id: 53,
    label: "Good Night 🌙",
    icon: <Moon className="text-gray-600" size={20} />,
    color: "bg-slate-900 text-white", // Dark mode card
    content: [
      "Sleep tight.",
      "You did enough today. Even if you don't think you did, you survived, and that is enough.",
      "Let the worries of the day slip off your shoulders. They can wait until tomorrow.",
      "I hope you have the sweetest dreams. May your pillow be the cool side.",
      "Goodnight, Subu. Rest well."
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
