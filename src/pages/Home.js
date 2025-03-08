import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'

const SpaceButton = ({ children, className }) => (
    <motion.button
        className={`relative px-8 py-4 text-xl font-bold rounded-lg overflow-hidden ${className}`}
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.95 }}
        style={{
            color: '#67e8f9',
            textShadow: '0 0 10px #22d3ee, 0 0 15px #0ea5e9, 0 0 20px #38bdf8',
            boxShadow: '0 0 15px 2px rgba(34, 211, 238, 0.4), 0 0 30px 5px rgba(6, 182, 212, 0.3)',
            border: '2px solid rgba(103, 232, 249, 0.6)',
            background: 'rgba(8, 47, 73, 0.5)',
        }}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/30 to-indigo-900/20"></div>
        <div className="absolute w-full h-full opacity-10 bg-noise"></div>
        <span className="relative z-10 font-extrabold flex items-center justify-center gap-2">
            <span>☄️</span> {children}
        </span>
    </motion.button>
);

// Replace the AsteroidButton with SpaceButton in the Home component
export default function Home() {
    const [stars, setStars] = useState([]);
    const spaceEmojis = ['🚀', '🛸', '👽', '🪐', '💫', '✨', '☄️', '🌠', '🌌', '👨‍🚀', '👩‍🚀', '🤖', '👾', '🌟'];
    const neonGlows = [
        { top: '20%', left: '10%', color: 'radial-gradient(circle, rgba(167,139,250,1) 0%, rgba(79,70,229,0) 70%)', size: '300px', delay: 0 },
        { top: '50%', left: '80%', color: 'radial-gradient(circle, rgba(56,189,248,1) 0%, rgba(2,132,199,0) 70%)', size: '400px', delay: 1 },
        { top: '70%', left: '30%', color: 'radial-gradient(circle, rgba(244,114,182,1) 0%, rgba(219,39,119,0) 70%)', size: '350px', delay: 2 },
        { top: '10%', left: '70%', color: 'radial-gradient(circle, rgba(34,211,238,1) 0%, rgba(8,145,178,0) 70%)', size: '250px', delay: 1.5 },
    ];

    // Component definitions for Star, NeonGlow, and SpaceCharacter remain the same
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
                            color: '#67e8f9',
                            textShadow: '0 0 10px #22d3ee, 0 0 20px #0ea5e9, 0 0 30px #38bdf8, 0 0 40px #0284c7',
                            WebkitTextFillColor: '#67e8f9'
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
                        <SpaceButton className="button-pulse">Get Started</SpaceButton>
                    </motion.div>
                </div>
            </div>

            {/* CSS for additional effects */}
            <style jsx global>{`
        .button-pulse {
          animation: buttonPulse 4s infinite alternate;
        }
        
        @keyframes buttonPulse {
          0% {
            box-shadow: 0 0 15px 2px rgba(34, 211, 238, 0.4), 0 0 30px 5px rgba(6, 182, 212, 0.3);
          }
          100% {
            box-shadow: 0 0 20px 5px rgba(34, 211, 238, 0.6), 0 0 40px 10px rgba(6, 182, 212, 0.4);
          }
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
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
        </div>
    );
}