import React from "react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

const challenges = [
  { id: 1, difficulty: "Easy", x: "10%", y: "40%" },
  { id: 2, difficulty: "Normal", x: "30%", y: "20%" },
  { id: 3, difficulty: "Medium", x: "50%", y: "50%" },
  { id: 4, difficulty: "Hard", x: "70%", y: "30%" },
  { id: 5, difficulty: "Very Hard", x: "85%", y: "60%" },
  { id: 6, difficulty: "Extreme", x: "95%", y: "10%" }
];

const SpaceMap = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Space Effect */}
      <div className="absolute w-full h-full bg-gradient-to-b from-gray-900 to-black" />

      {/* Title */}
      <h1 className="absolute top-5 left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold tracking-wider">
        Han Solo's Space Missions
      </h1>

      {/* Challenges */}
      {challenges.map((challenge) => (
        <motion.div
          key={challenge.id}
          className="absolute flex flex-col items-center text-white"
          style={{ top: challenge.y, left: challenge.x }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaRocket className="text-yellow-400 text-3xl" />
          <p className="mt-2 text-sm">Challenge {challenge.id} - {challenge.difficulty}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default SpaceMap;