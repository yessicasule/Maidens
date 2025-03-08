import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AsteroidButton = ({ children, className }) => (
    <motion.button
        className={`relative px-8 py-4 rounded-full text-xl font-bold text-white shadow-xl overflow-hidden ${className}`}
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1.05, rotate: [0, -1, 1, -1, 0], transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.95 }}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 via-blue-600 to-violet-600 opacity-90"></div>
        <div className="absolute w-4 h-4 rounded-full bg-cyan-300 opacity-80 top-2 left-4 blur-sm"></div>
        <div className="absolute w-3 h-3 rounded-full bg-pink-300 opacity-80 bottom-3 right-6 blur-sm"></div>
        <div className="absolute w-2 h-2 rounded-full bg-purple-300 opacity-80 top-6 right-8 blur-sm"></div>
        <span className="relative z-10 text-white font-extrabold drop-shadow-md flex items-center justify-center gap-2 text-shadow">
            <span>💫</span> {children} <span>🚀</span>
        </span>
    </motion.button>
);

const Star = ({ delay = 0 }) => {
    const size = Math.random() * 3 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const color = [
        'bg-cyan-300', 'bg-blue-300', 'bg-purple-300',
        'bg-pink-300', 'bg-indigo-300'
    ][Math.floor(Math.random() * 5)];

    return (
        <motion.div
            className={`absolute rounded-full ${color} shadow-glow`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                boxShadow: `0 0 8px 2px rgba(${color === 'bg-cyan-300' ? '6, 182, 212' :
                    color === 'bg-blue-300' ? '59, 130, 246' :
                        color === 'bg-purple-300' ? '168, 85, 247' :
                            color === 'bg-pink-300' ? '236, 72, 153' : '99, 102, 241'}, 0.7)`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1], scale: [1, 1.2, 1] }}
            transition={{ duration, delay, repeat: Infinity, repeatType: "reverse" }}
        />
    );
};

const NeonGlow = ({ top, left, color, size, delay }) => (
    <motion.div
        className="absolute rounded-full blur-xl"
        style={{
            width: size,
            height: size,
            top,
            left,
            background: color,
            opacity: 0.3
        }}
        initial={{ opacity: 0.2, scale: 0.8 }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 4, delay, repeat: Infinity }}
    />
);

const SpaceCharacter = ({ emoji, delay = 0 }) => {
    const startPosition = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight };
    const endPosition = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight };

    return (
        <motion.div
            className="absolute text-2xl"
            style={{
                fontSize: `${Math.random() * 20 + 20}px`,
                filter: "drop-shadow(0 0 5px rgba(255,255,255,0.7))"
            }}
            initial={startPosition}
            animate={{ x: endPosition.x, y: endPosition.y, rotate: [0, 180, 360], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: Math.random() * 30 + 20, delay, repeat: Infinity, repeatType: "reverse" }}
        >
            {emoji}
        </motion.div>
    );
};

export default function Home() {
    const [stars, setStars] = useState([]);
    const spaceEmojis = ['🚀', '🛸', '👽', '🪐', '💫', '✨', '☄️', '🌠', '🌌', '👨‍🚀', '👩‍🚀', '🤖', '👾', '🌟'];
    const neonGlows = [
        { top: '20%', left: '10%', color: 'radial-gradient(circle, rgba(167,139,250,1) 0%, rgba(79,70,229,0) 70%)', size: '300px', delay: 0 },
        { top: '50%', left: '80%', color: 'radial-gradient(circle, rgba(56,189,248,1) 0%, rgba(2,132,199,0) 70%)', size: '400px', delay: 1 },
        { top: '70%', left: '30%', color: 'radial-gradient(circle, rgba(244,114,182,1) 0%, rgba(219,39,119,0) 70%)', size: '350px', delay: 2 },
        { top: '10%', left: '70%', color: 'radial-gradient(circle, rgba(34,211,238,1) 0%, rgba(8,145,178,0) 70%)', size: '250px', delay: 1.5 },
    ];

    useEffect(() => {
        setStars(Array.from({ length: 150 }).map((_, i) => <Star key={i} delay={i * 0.01} />));
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-blue-950 to-black opacity-90"></div>

            {/* Neon glows */}
            {neonGlows.map((glow, index) => (
                <NeonGlow key={index} {...glow} />
            ))}

            {/* Stars */}
            {stars}

            {/* Space emojis */}
            {spaceEmojis.map((emoji, index) => (
                <SpaceCharacter key={index} emoji={emoji} delay={index * 0.5} />
            ))}

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-40"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                    <motion.h1
                        className="text-6xl md:text-7xl font-black mb-8 text-center flex items-center gap-3 heading-glow"
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
                        style={{
                            backgroundImage: 'linear-gradient(to right, #22d3ee, #818cf8, #c084fc, #f472b6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
                        }}
                    >
                        <span>🌌</span> Galactic Code Academy <span>🪐</span>
                    </motion.h1>

                    <motion.div
                        className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full mb-8"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 200, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    />

                    <motion.p
                        className="text-xl text-center max-w-2xl mb-12 leading-relaxed font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        style={{
                            backgroundImage: 'linear-gradient(to right, #a5f3fc, #bfdbfe, #ddd6fe, #fbcfe8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Embark on an interstellar journey 🛸 where coding unlocks the mysteries of the universe ✨. Solve challenges 🧩, explore planets 🪐, meet alien friends 👽, and become a master cadet 👨‍🚀 in the Galactic Code Academy!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        <AsteroidButton className="neon-shadow">Get Started</AsteroidButton>
                    </motion.div>
                </div>
            </div>

            {/* CSS for additional effects */}
            <style jsx global>{`
        .neon-shadow {
          box-shadow: 0 0 20px 8px rgba(139, 92, 246, 0.6), 0 0 40px 15px rgba(139, 92, 246, 0.3);
        }
        .shadow-glow {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
        }
        .text-shadow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
        .heading-glow {
          filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.7));
        }
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%);
        }
      `}</style>
        </div>
    );
}