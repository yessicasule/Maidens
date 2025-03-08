import React, { useState } from "react";

export default function SpaceshipNamingPreview() {
  const [output, setOutput] = useState("");
  const [userCode, setUserCode] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [errorLine, setErrorLine] = useState(null);

  const handleRunCode = () => {
    setHasAttempted(true);
    setErrorLine(null);
    
    // Check if code contains a spaceship variable assignment
    const spaceshipRegex = /^\s*spaceship\s*=\s*["'](.+)["']\s*$/;
    const match = userCode.trim().match(spaceshipRegex);
    
    if (match && match[1].length > 0) {
      setOutput(`✅ Great job! Your spaceship has been named "${match[1]}". Ready for the next mission!`);
      setIsCorrect(true);
    } else {
      setOutput("❌ Error: You need to assign a name to the 'spaceship' variable. Try using: spaceship = \"YourShipName\"");
      setIsCorrect(false);
      
      // Find the incorrect line
      const lines = userCode.split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (!spaceshipRegex.test(lines[i].trim()) && lines[i].trim() !== "") {
          setErrorLine(i + 1);
          break;
        }
      }
    }
  };

  const handleNextChallenge = () => {
    // In preview, just reset
    setOutput("");
    setUserCode("");
    setIsCorrect(false);
    setHasAttempted(false);
    setErrorLine(null);
  };

  const handleCodeChange = (e) => {
    setUserCode(e.target.value);
    setErrorLine(null); // Remove red dot when user starts typing again
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-blue-400 mb-4">🚀 Mission: Name Your Spaceship!</h1>
      <p className="text-lg mb-6">
        Create a variable called <strong>spaceship</strong> and assign it a name of your choice.
      </p>
      <div className="relative w-96">
        {errorLine !== null && (
          <div className="absolute left-2 top-3 text-red-500 font-bold">🔴</div>
        )}
        <textarea
          className={`w-full h-24 p-2 mt-4 rounded-lg shadow-lg text-black ${
            hasAttempted && !isCorrect ? "border-2 border-red-500" : ""
          }`}
          placeholder='Example: captain = "Alex"  # This is a different variable'
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
          Next Mission ➡
        </button>
      )}
      {output && (
        <p className={`mt-6 text-xl ${output.includes("Error") ? "text-red-500" : "text-green-400"}`}>
          {output}
        </p>
      )}
    </div>
  );
}