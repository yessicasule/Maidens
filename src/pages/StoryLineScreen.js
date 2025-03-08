import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const storyline = [
    "🚀 Stardate 3025: A Distress Signal Detected...",
    "🛸 'This is Han Solo... Nova Explorer's systems are failing...'",
    "⚡ 'A cosmic storm has crippled our core engines... We are adrift in the abyss.'",
    "💾 'Cadet, we need your coding expertise to restore power before it's too late...'",
    "🌌 'You must chart new flight paths, repair vital systems, and uncover the secrets of deep space...'",
    "🔥 'Danger lurks in the shadows... rogue AI... hostile alien transmissions...'",
    "🌠 'You are the last hope of the Galactic Code Academy... Will you answer the call?'",
    "🛠️ 'Prepare for launch in 3... 2... 1...'",
    "💡 Are you ready to power up the ship?"
];

export default function StorylineScreen() {
    const [currentLine, setCurrentLine] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentLine < storyline.length - 1) {
            const timer = setTimeout(() => setCurrentLine(currentLine + 1), 4000);
            return () => clearTimeout(timer);
        }
    }, [currentLine]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Stars */}
            <div className="absolute inset-0 bg-stars opacity-40"></div>

            {/* Scrolling Text Animation */}
            <motion.div 
                initial={{ y: 100, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 2 }} 
                className="text-center space-y-6 text-neon-green font-mono text-lg w-3/4"
            >
                {storyline.slice(0, currentLine + 1).map((line, index) => (
                    <motion.p 
                        key={index}
                        initial={{ y: 100, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ duration: 1.5, delay: index * 0.5 }}
                        className="tracking-wide"
                    >
                        {line}
                    </motion.p>
                ))}

                {currentLine === storyline.length - 1 && (
                    <motion.button
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="bg-neon-green text-black px-6 py-3 mt-6 rounded-lg font-bold text-xl hover:bg-white transition-all"
                        onClick={() => navigate("/next")}
                    >
                        Begin Your Mission 🚀
                    </motion.button>
                )}
            </motion.div>
        </div>
    );
}
