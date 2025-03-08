import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AsteroidButton = ({ children, className, onClick }) => (
    <motion.button
        onClick={onClick}
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

export default function Home() {
    const navigate = useNavigate();
    const [stars, setStars] = useState([]);

    useEffect(() => {
        setStars(Array.from({ length: 150 }).map((_, i) => (
            <motion.div
                key={i}
                className="absolute rounded-full bg-white shadow-glow"
                style={{
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, repeatType: "reverse" }}
            />
        )));
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-blue-950 to-black opacity-90"></div>

            {/* Stars */}
            {stars}

            <div className="absolute inset-0 flex items-center justify-center">
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
                        <AsteroidButton className="neon-shadow" onClick={() => navigate('/storyline')}>
                            Get Started
                        </AsteroidButton>
                    </motion.div>
                </div>
            </div>

            <style jsx global>{`
                .neon-shadow {
                    box-shadow: 0 0 20px 8px rgba(139, 92, 246, 0.6), 0 0 40px 15px rgba(139, 92, 246, 0.3);
                }
                .shadow-glow {
                    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
                }
                .heading-glow {
                    filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.7));
                }
            `}</style>
        </div>
    );
}
