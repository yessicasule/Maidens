import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const challenges = [
  { id: 1, difficulty: "Naboo", x: "15%", y: "50%" },
  { id: 2, difficulty: "Mustafar", x: "30%", y: "30%" },
  { id: 3, difficulty: "Hoth", x: "50%", y: "60%" },
  { id: 4, difficulty: "Jakku", x: "70%", y: "40%" },
  { id: 5, difficulty: "Dagobah", x: "85%", y: "70%" },
  { id: 6, difficulty: "Tatooine", x: "90%", y: "20%" }
];

const SpaceMap = () => {
  const navigate = useNavigate();
  const [hasSeenStory, setHasSeenStory] = useState(false);
  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState(1);

  useEffect(() => {
    const storyCompleted = localStorage.getItem("storyCompleted");
    if (!storyCompleted) {
      navigate("/storyline");
    } else {
      setHasSeenStory(true);
    }

    const savedLevel = localStorage.getItem("highestUnlockedLevel");
    if (savedLevel) {
      setHighestUnlockedLevel(parseInt(savedLevel));
    }
  }, [navigate]);

  const handleChallengeClick = (challengeId) => {
    if (challengeId <= highestUnlockedLevel) {
      localStorage.setItem("selectedChallenge", challengeId);
      navigate(`/challenge/${challengeId}`); // Use backticks instead of /
    }
  };
  

  if (!hasSeenStory) return null;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Galaxy Background */}
      <div className="absolute w-full h-full" style={{
        background: "radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.4), transparent 70%), radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.3), transparent 50%), radial-gradient(circle at 20% 80%, rgba(148, 0, 211, 0.3), transparent 50%)"
      }} />
      
      {/* Title */}
      <h1 className="absolute top-5 left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold tracking-wider z-10">
        Han Solo's Space Missions
      </h1>

      {/* Challenges */}
      {challenges.map((challenge) => {
        const isUnlocked = challenge.id <= highestUnlockedLevel;
        return (
          <motion.div
            key={challenge.id}
            className={`absolute flex flex-col items-center cursor-pointer z-10 ${isUnlocked ? '' : 'opacity-50'}`}
            style={{ top: challenge.y, left: challenge.x }}
            whileHover={{ scale: isUnlocked ? 1.2 : 1 }}
            whileTap={{ scale: isUnlocked ? 0.9 : 1 }}
            animate={{ 
              y: [0, -5, 0], 
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } 
            }}
            onClick={() => handleChallengeClick(challenge.id)}
          >
            <FaRocket className={`text-4xl ${isUnlocked ? 'text-yellow-400' : 'text-gray-600'}`} />
            <p className="mt-2 text-sm text-center font-semibold text-white">
              Challenge {challenge.id} <br /> {challenge.difficulty}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SpaceMap;
