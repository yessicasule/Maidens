import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const storyline = [
    "🚀 Stardate 3025: A Distress Signal Detected...",
    "🛸 'This is Han Solo... Nova Explorer's systems are failing...'",
    "⚡ 'A cosmic storm has crippled our core engines... We are adrift in the abyss.'",
    "💾 'Cadet, we need your coding expertise to restore power before it's too late...'",
    "🌌 'You must chart new flight paths, repair vital systems, and defeat cosmic anomalies.'",
    "🔧 'Each challenge requires specific coding skills. The fate of our crew depends on you.'",
    "💫 'Are you ready to embark on this mission? The stars await your command...'"
];

const StoryLine = () => {
    const navigate = useNavigate();
    const [currentLine, setCurrentLine] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [isComplete, setIsComplete] = useState(false);

    // Typing effect
    useEffect(() => {
        if (currentLine >= storyline.length) {
            setIsComplete(true);
            return;
        }

        const text = storyline[currentLine];
        let charIndex = 0;
        setIsTyping(true);
        
        const typingInterval = setInterval(() => {
            if (charIndex <= text.length) {
                setTypedText(text.substring(0, charIndex));
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
                
                // Auto-progress after a delay if not the last line
                if (currentLine < storyline.length - 1) {
                    const timer = setTimeout(() => {
                        setCurrentLine(currentLine + 1);
                    }, 2000);
                    return () => clearTimeout(timer);
                }
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, [currentLine]);

    const handleNext = () => {
        if (isTyping) {
            // Skip typing animation and show full text
            setTypedText(storyline[currentLine]);
            setIsTyping(false);
        } else if (currentLine < storyline.length - 1) {
            // Go to next line
            setCurrentLine(currentLine + 1);
        } else {
            // Complete the storyline
            completeStoryline();
        }
    };

    const completeStoryline = () => {
        // Mark storyline as completed
        localStorage.setItem("storyCompleted", "true");
        // Navigate to space map
        navigate("/spacemap");
    };

    const skipStory = () => {
        localStorage.setItem("storyCompleted", "true");
        navigate("/spacemap");
    };

    return (
        <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center p-8">
            {/* Space background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-full bg-black" style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(30, 30, 70, 0.8), rgba(5, 5, 20, 1) 70%)"
                }} />
                
                {/* Stars */}
                {[...Array(100)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                        animate={{ 
                            opacity: [0.2, 0.8, 0.2], 
                            scale: [1, 1.2, 1] 
                        }}
                        transition={{ 
                            duration: Math.random() * 3 + 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                    />
                ))}
            </div>

            {/* Content container */}
            <div className="relative z-10 max-w-2xl w-full bg-gray-900 bg-opacity-70 rounded-lg p-8 border border-blue-500 shadow-lg shadow-blue-500/30">
                <h1 className="text-3xl text-center text-blue-400 mb-8 font-bold tracking-wider">
                    HAN SOLO'S MISSION
                </h1>
                
                <motion.div 
                    className="text-lg text-white mb-8 min-h-[200px] flex items-center justify-center"
                    key={currentLine}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-center text-xl">{typedText}</p>
                </motion.div>
                
                <div className="flex justify-center gap-4">
                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                        onClick={handleNext}
                    >
                        {isComplete ? "Begin Mission" : isTyping ? "Skip" : "Next"}
                    </button>
                    
                    {!isComplete && (
                        <button 
                            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                            onClick={skipStory}
                        >
                            Skip Story
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryLine;