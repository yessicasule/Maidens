import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router

export default function AsteroidLoopChallenge() {
  const navigate = useNavigate();
  const [output, setOutput] = useState("");
  const [userCode, setUserCode] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [shipPosition, setShipPosition] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shipPath, setShipPath] = useState([]);
  const [showSolution, setShowSolution] = useState(false);

  const forLoopSolution = `# Solution using a for loop
for i in range(3):
    move_right()`;
  
  const whileLoopSolution = `# Solution using a while loop
count = 0
while count < 3:
    move_right()
    count = count + 1`;

  const asteroidPattern = [1, 1, 1, 0, 0];

  const handlePreviousChallenge = () => {
    navigate("/challenge-2"); // Update route as per your setup
  };

  const handleNextChallenge = () => {
    navigate("/challenge-4"); // Update route as per your setup
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">🚀 Challenge 3: Asteroid Loops! 🪨</h1>
      <p className="text-lg mb-2">Use a loop to navigate your spaceship past the asteroids!</p>
      <p className="text-md mb-6">The ship needs to move right at least 3 times to reach safety.</p>

      <div className="flex gap-4">
        <button
          onClick={handlePreviousChallenge}
          className="mt-4 px-6 py-3 bg-gray-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-gray-700 transition"
        >
          ⬅ Previous Challenge
        </button>
        <button
          onClick={handleNextChallenge}
          className="mt-4 px-6 py-3 bg-green-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-green-700 transition"
        >
          Next Challenge ➡
        </button>
      </div>
    </div>
  );
}
