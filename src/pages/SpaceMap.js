import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const challenges = [
  { id: 1, difficulty: "Naboo", x: "15%", y: "50%" },
  { id: 2, difficulty: "Mustafar", x: "30%", y: "30%" },
  { id: 3, difficulty: "Hoth", x: "50%", y: "60%" },
  { id: 4, difficulty: "Jakku", x: "70%", y: "40%" },
  { id: 5, difficulty: "Dabogah", x: "85%", y: "70%" },
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
      navigate(`/challenge/${challengeId}`);
    }
  };

  if (!hasSeenStory) return null;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute w-full h-full bg-gradient-radial from-purple-800 to-transparent" />
      
      {/* Floating Stars */}
      {[...Array(50)].map((_, i) => (
        <motion.div 
          key={`star-${i}`} 
          className="absolute bg-white rounded-full"
          style={{
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: Math.random() * 5 + 3, ease: "easeInOut", repeat: Infinity }}
        />
      ))}

      {/* SVG Path Connections */}
      <svg className="absolute inset-0 w-full h-full z-5">
        {challenges.slice(0, -1).map((_, index) => {
          const isUnlocked = index + 2 <= highestUnlockedLevel;
          return (
            <motion.path
              key={`path-${index}`}
              d={`M ${challenges[index].x} ${challenges[index].y} 
                 Q ${(parseFloat(challenges[index].x) + parseFloat(challenges[index+1].x)) / 2}% 
                   ${(parseFloat(challenges[index].y) + parseFloat(challenges[index+1].y)) / 2 - 5}% 
                   ${challenges[index+1].x} ${challenges[index+1].y}`}
              fill="none"
              stroke={isUnlocked ? "#ffffff" : "#444444"}
              strokeWidth="2"
              strokeDasharray={isUnlocked ? "0" : "5,5"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: index * 0.3 }}
              style={{ vectorEffect: "non-scaling-stroke" }}
            />
          );
        })}
      </svg>
      
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
            animate={{ y: [0, -5, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
            onClick={() => handleChallengeClick(challenge.id)}
          >
            <FaRocket className={`text-4xl ${isUnlocked ? 'text-yellow-400' : 'text-gray-600'}`} />
            <motion.div 
              className={`absolute w-12 h-12 rounded-full -z-10 ${isUnlocked ? 'bg-blue-500' : 'bg-gray-700'}`}
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: isUnlocked ? "blur(8px)" : "blur(5px)" }}
            />
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
