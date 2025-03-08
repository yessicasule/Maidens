import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

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
  const location = useLocation();
  const [hasSeenStory, setHasSeenStory] = useState(false);
  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState(1);
  
  useEffect(() => {
    // Check if user has completed the storyline
    const storyCompleted = localStorage.getItem("storyCompleted");
    
    if (!storyCompleted) {
      // Redirect to storyline if not completed
      navigate("/storyline");
    } else {
      setHasSeenStory(true);
    }
    
    // Get the highest unlocked level from localStorage (default to 1)
    const savedLevel = localStorage.getItem("highestUnlockedLevel");
    if (savedLevel) {
      setHighestUnlockedLevel(parseInt(savedLevel));
    }
  }, [navigate]);

  const handleChallengeClick = (challengeId) => {
    // Only allow clicking if the challenge is unlocked
    if (challengeId <= highestUnlockedLevel) {
      // Save the selected challenge
      localStorage.setItem("selectedChallenge", challengeId);
      navigate(`/challenge/${challengeId}`);
    }
  };

  // Calculate positions for SVG paths
  const calculatePathPoints = () => {
    // Create array of [x, y] coordinates for each challenge
    return challenges.map(challenge => {
      // Convert percentage strings to actual values
      const x = parseFloat(challenge.x) / 100 * window.innerWidth;
      const y = parseFloat(challenge.y) / 100 * window.innerHeight;
      return [x, y];
    });
  };

  if (!hasSeenStory) {
    return null; // Don't render anything while checking or redirecting
  }

  const points = calculatePathPoints();

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Galaxy Background */}
      <div className="absolute w-full h-full" style={{
        background: "radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.4), transparent 70%), radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.3), transparent 50%), radial-gradient(circle at 20% 80%, rgba(148, 0, 211, 0.3), transparent 50%)"
      }} />
      
      {/* Floating Stars Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div 
            key={i} 
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
      </div>
      
      {/* SVG for paths */}
      <svg className="absolute inset-0 w-full h-full z-5">
        {/* Connection Paths */}
        {challenges.slice(0, -1).map((_, index) => {
          const isUnlocked = index + 2 <= highestUnlockedLevel;
          return (
            <motion.path
              key={`path-${index}`}
              d={`M ${parseFloat(challenges[index].x)} ${parseFloat(challenges[index].y)} 
                  Q ${(parseFloat(challenges[index].x) + parseFloat(challenges[index+1].x))/2} 
                    ${(parseFloat(challenges[index].y) + parseFloat(challenges[index+1].y))/2 - 20}
                    ${parseFloat(challenges[index+1].x)} ${parseFloat(challenges[index+1].y)}`}
              fill="none"
              stroke={isUnlocked ? "#4F80FF" : "#444444"}
              strokeWidth="2"
              strokeDasharray={isUnlocked ? "0" : "5,5"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: index * 0.3 }}
              style={{ 
                vectorEffect: "non-scaling-stroke",
                filter: isUnlocked ? "drop-shadow(0 0 8px rgba(79, 128, 255, 0.8))" : "none"
              }}
            />
          );
        })}
        
        {/* Animated flowing particles along the paths */}
        {challenges.slice(0, -1).map((_, index) => {
          const isUnlocked = index + 2 <= highestUnlockedLevel;
          if (!isUnlocked) return null;
          
          return (
            <motion.circle
              key={`particle-${index}`}
              r="4"
              fill="#80FFFF"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                offsetDistance: ["0%", "100%"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatDelay: 1
              }}
              style={{ 
                offsetPath: `path("M ${parseFloat(challenges[index].x)} ${parseFloat(challenges[index].y)} 
                  Q ${(parseFloat(challenges[index].x) + parseFloat(challenges[index+1].x))/2} 
                    ${(parseFloat(challenges[index].y) + parseFloat(challenges[index+1].y))/2 - 20}
                    ${parseFloat(challenges[index+1].x)} ${parseFloat(challenges[index+1].y)}")`,
                filter: "drop-shadow(0 0 5px #80FFFF)"
              }}
            />
          );
        })}
      </svg>
      
      {/* Back Button */}
      <button
        className="absolute top-5 left-5 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 z-10"
        onClick={() => navigate("/storyline")}
      >
        Back to Story
      </button>
      
      {/* Title */}
      <h1 className="absolute top-5 left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold tracking-wider z-10">
        Han Solo's Space Missions
      </h1>
      
      {/* Legend */}
      <div className="absolute bottom-5 right-5 bg-gray-900 bg-opacity-70 p-3 rounded-lg z-10 text-white">
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 rounded-full bg-blue-400 mr-2"></div>
          <span>Unlocked Path</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-gray-600 mr-2"></div>
          <span>Locked Path</span>
        </div>
      </div>
      
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
            <motion.div 
              className={`absolute w-12 h-12 rounded-full -z-10 ${isUnlocked ? 'bg-blue-500' : 'bg-gray-700'}`}
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0.2, 0.4, 0.2] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{
                filter: isUnlocked ? "blur(8px)" : "blur(5px)"
              }}
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