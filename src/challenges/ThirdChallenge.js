import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router

export default function AsteroidLoopChallenge() {
  const navigate = useNavigate();
  const [output, setOutput] = useState("");
  const [userCode, setUserCode] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSolution, setShowSolution] = useState(false);

  const forLoopSolution = `# Solution using a for loop
for i in range(3):
    move_right()`;
  
  const whileLoopSolution = `# Solution using a while loop
count = 0
while count < 3:
    move_right()
    count = count + 1`;

  const handleRunCode = () => {
    setHasAttempted(true);
    setErrorMessage("");

    const forLoopRegex = /for\s+\w+\s+in\s+range\(\d+\):\s*(\n|.)*?move_right\(\)/s;
    const whileLoopRegex = /while\s+\w+\s*<\s*\d+:\s*(\n|.)*?move_right\(\)/s;
    
    if (forLoopRegex.test(userCode) || whileLoopRegex.test(userCode)) {
      setOutput("✅ Great job! Your spaceship has navigated through the asteroids successfully!");
      setIsCorrect(true);
      localStorage.setItem("highestUnlockedLevel", "4");
    } else {
      setOutput("❌ Error: Your code must use a loop and contain 'move_right()' inside it at least 3 times.");
      setIsCorrect(false);
    }
  };

  const handlePreviousChallenge = () => {
    navigate("/challenge/2"); // Ensure this matches the correct route for Challenge 2
  };

  const handleNextChallenge = () => {
    if (isCorrect) {
      navigate("/challenge/4"); // Ensure this matches the correct route for Challenge 4
    }
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">🚀 Challenge 3: Asteroid Loops! 🪨</h1>
      <p className="text-lg mb-2">Use a loop to navigate your spaceship past the asteroids!</p>
      <p className="text-md mb-6">The ship needs to move right at least 3 times to reach safety.</p>
      
      <textarea
        className={`w-64 h-24 p-2 rounded-lg shadow-lg text-black ${hasAttempted && !isCorrect ? "border-2 border-red-500" : ""}`}
        placeholder='Example: for i in range(3):\n    move_right()'
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        disabled={isCorrect}
      ></textarea>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePreviousChallenge}
          className="px-6 py-3 bg-gray-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-gray-700 transition"
        >
          ⬅ Previous Challenge
        </button>
        {!isCorrect ? (
          <>
            <button
              onClick={handleRunCode}
              className="px-6 py-3 bg-blue-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-blue-700 transition"
            >
              Run Code 🚀
            </button>
            <button
              onClick={toggleSolution}
              className="px-6 py-3 bg-yellow-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-yellow-700 transition"
            >
              {showSolution ? "Hide Solution" : "Show Solution"}
            </button>
          </>
        ) : (
          <button
            onClick={handleNextChallenge}
            className="px-6 py-3 bg-green-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-green-700 transition"
          >
            Next Challenge ➡
          </button>
        )}
      </div>
      {output && (
        <p className={`mt-6 text-xl ${output.includes("Error") ? "text-red-500" : "text-green-400"}`}>
          {output}
        </p>
      )}
      {showSolution && (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg max-w-md w-full">
          <h3 className="text-xl font-bold mb-2 text-yellow-300">Solutions:</h3>
          <div className="bg-gray-800 p-3 rounded mb-3">
            <pre className="text-white font-mono">{forLoopSolution}</pre>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <pre className="text-white font-mono">{whileLoopSolution}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
