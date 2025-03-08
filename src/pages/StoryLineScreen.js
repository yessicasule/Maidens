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
            const timer = setTimeout(() => setCurrentLine(currentLine + 1), 2000);
            return () => clearTimeout(timer);
        }
    }, [currentLine]);

    const galaxyColors = {
        primary: "#8A2BE2",
        secondary: "#4B0082",
        accent: "#00FFFF",
        text: "#E6E6FA",
        glow: "#9400D3",
        yellow: "#FFD700"
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');
                .space-font { font-family: 'Orbitron', sans-serif; letter-spacing: 1px; text-align: center; }
                .glow-text { text-shadow: 0 0 5px #00FFFF, 0 0 10px #00FFFF; }
            `}</style>

            <div className="absolute inset-0" style={{
                background: `radial-gradient(circle at 50% 50%, ${galaxyColors.primary}, transparent 60%),
                            radial-gradient(circle at 80% 20%, ${galaxyColors.accent}, transparent 40%),
                            radial-gradient(circle at 20% 80%, ${galaxyColors.glow}, transparent 50%)`
            }}></div>

            <div className="absolute inset-0 overflow-hidden">
                {[...Array(40)].map((_, i) => (
                    <motion.div key={i} className="absolute rounded-full bg-white"
                        style={{
                            width: Math.random() * 3 + "px",
                            height: Math.random() * 3 + "px",
                            left: Math.random() * 100 + "%",
                            top: Math.random() * 100 + "%"
                        }}
                        animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
                        transition={{ duration: Math.random() * 5 + 3, ease: "easeInOut", repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="w-full max-w-3xl text-center space-font">
                {storyline.slice(0, currentLine + 1).map((line, index) => (
                    <motion.p key={index} initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: index * 0.2 }}
                        className="tracking-wide space-font mx-auto px-4"
                        style={{
                            color: index === currentLine ? galaxyColors.yellow : galaxyColors.text,
                            textShadow: `0 0 8px ${index === currentLine ? galaxyColors.yellow : galaxyColors.glow}`
                        }}>
                        {line}
                    </motion.p>
                ))}
            </div>

            {currentLine === storyline.length - 1 && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex flex-col items-center mt-12 space-y-6 space-font">

                    <motion.p className="text-2xl glow-text space-font"
                        animate={{ textShadow: ["0 0 5px #00FFFF", "0 0 15px #00FFFF", "0 0 5px #00FFFF"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ color: galaxyColors.yellow, fontWeight: "bold" }}>
                        THE FATE OF THE GALAXY AWAITS
                    </motion.p>

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
                        <motion.button whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${galaxyColors.yellow}` }}
                            whileTap={{ scale: 0.98 }} className="px-10 py-4 rounded-lg font-bold text-xl space-font"
                            onClick={() => navigate("/spacemap")}
                            style={{
                                background: "linear-gradient(135deg, #444, #111)", color: galaxyColors.yellow,
                                border: `2px solid ${galaxyColors.yellow}`, textAlign: "center"
                            }}>
                            YES!! 🚀
                        </motion.button>

                        <motion.button whileHover={{ scale: 0.95, opacity: 0.7, y: 10, filter: "blur(1px)" }}
                            className="px-10 py-4 rounded-lg font-bold text-xl opacity-80 space-font"
                            style={{
                                background: "rgba(50, 50, 50, 0.5)", border: "2px solid #444", color: "#AAA",
                                pointerEvents: "none", cursor: "not-allowed"
                            }}>
                            No (You have to say yes!!) 🙅‍♂️
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
