import React, { useState } from "react";

export default function GalacticCodeAcademy() {
  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const solutionCode = `fuel_level = 75

if fuel_level > 50:
    print("Hyperdrive ready!")
else:
    print("Warning: Fuel low!")`;

  const handleCodeChange = (e) => {
    setUserCode(e.target.value);
  };

  const handleRunCode = () => {
    setHasAttempted(true);
    
    try {
      // Check if the code has the correct if-else structure
      if (userCode.includes("if fuel_level > 50:") && 
          userCode.includes("print(\"Hyperdrive ready!\")") &&
          userCode.includes("else:") &&
          userCode.includes("print(\"Warning: Fuel low!\")")) {
        setOutput("✅ Great job! Han Solo successfully checks the fuel levels!");
        setIsCorrect(true);
      } else {
        setOutput("❌ Not quite! Your conditional statement needs work.");
      }
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`);
    }
  };

  const startChallenge = () => {
    setShowIntro(false);
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setUserCode(solutionCode);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-blue-400">🚀 Galactic Code Academy</h1>

      {showIntro ? (
        <div className="bg-gray-900 p-8 rounded-lg max-w-2xl text-center mb-8 border border-blue-500">
          <h2 className="text-3xl mb-4">The Millennium Falcon's Hyperdrive</h2>
          <p className="text-xl mb-6">
            Deep in space, Han Solo needs your help! The Millennium Falcon is ready for its jump to lightspeed, 
            but Han needs to check if there's enough fuel for the hyperdrive.
          </p>
          <p className="text-yellow-300 mb-6">
            "Listen kid, I need to check these fuel levels before we make the jump. 
            If we don't have enough, we'll be sitting ducks for the Imperial fleet!" - Han Solo
          </p>
          <button 
            onClick={startChallenge} 
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700"
          >
            Start Coding
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <div className="bg-gray-900 p-6 rounded-lg border border-blue-500 mb-6">
            <h2 className="text-2xl font-bold text-blue-400 mb-2">Level 2: Conditional Statements</h2>
            <p className="text-lg mb-4">
              Han Solo needs to check the fuel level before jumping to hyperspace. Write a Python conditional statement that:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Prints "Hyperdrive ready!" if fuel_level is greater than 50</li>
              <li>Prints "Warning: Fuel low!" otherwise</li>
            </ul>
          </div>
          
          <textarea
            className={`w-full h-40 p-3 rounded-lg font-mono text-black ${
              hasAttempted && !isCorrect ? "border-2 border-red-500" : ""
            }`}
            placeholder="# Complete the conditional statement
fuel_level = 75

if fuel_level > 50:
    # Your code here
else:
    # Your code here"
            value={userCode}
            onChange={handleCodeChange}
            disabled={isCorrect}
          ></textarea>

          <div className="flex justify-between mt-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </button>
              
              <button
                onClick={handleShowSolution}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                Show Solution
              </button>
            </div>
            
            <button
              onClick={handleRunCode}
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
              disabled={isCorrect}
            >
              Run Code 🚀
            </button>
          </div>

          {showHint && (
            <div className="mt-4 bg-gray-800 p-4 rounded-lg">
              <p className="text-yellow-300">
                Hint: Remember to use proper indentation after your if and else statements. 
                Each line inside the if or else block should be indented with 4 spaces.
              </p>
            </div>
          )}

          {showSolution && (
            <div className="mt-4 bg-gray-800 p-4 rounded-lg">
              <p className="text-green-300 mb-2">Solution:</p>
              <pre className="bg-gray-900 p-3 rounded text-white">
                {solutionCode}
              </pre>
              <p className="text-yellow-300 mt-2">
                "Sometimes even the best pilots need a little help with navigation!" - Han Solo
              </p>
            </div>
          )}

          {output && (
            <div className={`mt-6 p-4 rounded-lg ${output.includes("❌") ? "bg-red-900" : "bg-green-900"}`}>
              <p className="text-xl">
                {output}
              </p>
            </div>
          )}

          {isCorrect && (
            <div className="mt-6 bg-blue-900 p-4 rounded-lg">
              <p className="text-xl text-blue-200">
                "Excellent work, pilot! Your code has helped me prepare for hyperdrive. The Millennium Falcon is ready to jump to lightspeed!" - Han Solo
              </p>
            </div>
          )}
        </div>
      )}

      {/* Star field background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 2}s infinite`
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}