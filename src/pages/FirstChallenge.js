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

    const trimmedCode = userCode.trim();

    if (trimmedCode === 'print("Start Engine!")') {
      setOutput("🚀 Spaceship Launched! Welcome to the Galactic Code Academy!");
      setIsCorrect(true);
    } else {
      setOutput("❌ Error: Syntax incorrect. Check your command.");
      setIsCorrect(false);

      // Find the incorrect line
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
    setErrorLine(null); // Remove red dot when user starts typing again
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold neon-text mb-4">🚀 First Challenge: Start the Spaceship! 🛸</h1>
      <p className="text-lg mb-6">Write a Python command that prints "Start Engine!" to launch.</p>

      <div className="relative w-96">
        {errorLine !== null && (
          <div className="absolute left-2 top-3 text-red-500 font-bold">🔴</div>
        )}
        <textarea
          className={`w-full h-24 p-2 mt-4 rounded-lg shadow-lg text-black ${
            hasAttempted && !isCorrect ? "border-2 border-red-500" : ""
          }`}
          placeholder='Example: print("Start Engine!")'
          value={userCode}
          onChange={handleCodeChange}
          disabled={isCorrect}
        ></textarea>
      </div>

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

      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 10px #00bfff, 0 0 20px #1e90ff;
        }
      `}</style>
    </div>
  );
}
