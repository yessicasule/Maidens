import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/Button";
import { motion } from 'framer-motion';

const storyline = [
    "Captain's Log - Stardate 3025...",
    "The Nova Explorer's systems are failing...",
    "Cadet, we need your coding skills to restore power...",
    "Your mission: Chart new flight paths, repair vital systems, and face the dangers of deep space...",
    "Are you ready to power up the ship?"
];

export default function StorylineScreen({ onNext }) {
    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        if (currentLine < storyline.length - 1) {
            const timer = setTimeout(() => setCurrentLine(currentLine + 1), 3000);
            return () => clearTimeout(timer);
        }
    }, [currentLine]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative">
            <div className="absolute inset-0 bg-stars animate-stars" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="text-center space-y-4 z-10"
            >
                {storyline.slice(0, currentLine + 1).map((line, index) => (
                    <p key={index} className="text-lg text-neon-green">
                        {line}
                    </p>
                ))}

                {currentLine === storyline.length - 1 && (
                    <Button className="bg-neon-green text-black w-full mt-4" onClick={onNext}>
                        Begin Your Mission
                    </Button>
                )}
            </motion.div>
        </div>
    );
}