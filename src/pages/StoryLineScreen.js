import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const storyline = [
    "Captain's Log - Stardate 3025...",
    "The Nova Explorer's systems are failing...",
    "Cadet, we need your coding skills to restore power...",
    "Your mission: Chart new flight paths, repair vital systems, and face the dangers of deep space...",
    "Are you ready to power up the ship?"
];

export default function StorylineScreen() {
    const [currentLine, setCurrentLine] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentLine < storyline.length - 1) {
            const timer = setTimeout(() => setCurrentLine(currentLine + 1), 3000);
            return () => clearTimeout(timer);
        }
    }, [currentLine]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative">
            <motion.div className="text-center space-y-4">
                {storyline.slice(0, currentLine + 1).map((line, index) => (
                    <p key={index} className="text-lg text-neon-green">{line}</p>
                ))}

                {currentLine === storyline.length - 1 && (
                    <button className="bg-neon-green text-black px-6 py-3 mt-4 rounded-lg font-bold" onClick={() => navigate('/next')}>
                        Begin Your Mission
                    </button>
                )}
            </motion.div>
        </div>
    );
}
