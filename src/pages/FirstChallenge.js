import React, { useState } from "react";

export default function FirstChallenge() {
  const [output, setOutput] = useState("");
  const [userCode, setUserCode] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [errorLine, setErrorLine] = useState(null);

  const handleRunCode = () => {
    setHasAttempted(true);
    setErrorLine(null);

    if (userCode.trim() === 'print("Start Engine!")') {
      setOutput("🚀 Spaceship Launched! Welcome to the Galactic Code Academy!");
      setIsCorrect(true);

      // Unlock next level in local storage
      localStorage.setItem("highestUnlockedLevel", "2");
    } else {
      setOutput("❌ Error: Syntax incorrect. Check your command.");
      setIsCorrect(false);
      const lines = userCode.split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() !== 'print("Start Engine!")') {
          setErrorLine(i + 1);
          break;
        }
      }
    }
  };

  const handleNextChallenge = () => {
    alert("🔜 Moving to the next challenge... (Implement navigation here!)");
  };

  const handleCodeChange = (e) => {
    setUserCode(e.target.value);
    setErrorLine(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold neon-text mb-4">🚀 Galactic Code Academy</h1>

      {/* Level Selection */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 text-lg rounded ${
            currentLevel === 1 ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400"
          }`}
          onClick={() => setCurrentLevel(1)}
        >
          Level 1
        </button>
        <button
          className={`px-4 py-2 text-lg rounded ${
            unlockedLevels.includes(2) ? "bg-green-500 text-white" : "bg-gray-700 text-gray-400 opacity-50"
          }`}
          onClick={() => unlockedLevels.includes(2) && setCurrentLevel(2)}
          disabled={!unlockedLevels.includes(2)}
        >
          Level 2
        </button>
      </div>

      {currentLevel === 1 ? (
        <>
          <p className="text-lg mb-6">Write a Python command to launch the spaceship.</p>
          <textarea
            className={`w-full h-24 p-2 rounded-lg text-black ${
              hasAttempted && !isCorrect ? "border-2 border-red-500" : ""
            }`}
            placeholder='Example: print("Start Engine!")'
            value={userCode}
            onChange={handleCodeChange}
            disabled={isCorrect}
          ></textarea>

          {!isCorrect ? (
            <button
              onClick={handleRunCode}
              className="mt-4 px-6 py-3 bg-blue-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-blue-700 transition"
            >
              Run Code 🚀
            </button>
          ) : (
            <button
              onClick={handleNextChallenge}
              className="mt-4 px-6 py-3 bg-green-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-green-700 transition"
            >
              Next Challenge ➡
            </button>
          )}

          {output && (
            <p className={`mt-6 text-xl ${output.includes("Error") ? "text-red-500" : "text-green-400"}`}>
              {output}
            </p>
          )}
        </>
      ) : (
        <SecondChallenge />
      )}

      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 10px #00bfff, 0 0 20px #1e90ff;
        }
      `}</style>
    </div>
  );
}
