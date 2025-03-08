import React, { useState, useEffect } from "react";

export default function AsteroidLoopChallenge() {
  const [output, setOutput] = useState("");
  const [userCode, setUserCode] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [shipPosition, setShipPosition] = useState(0); // Just tracking horizontal position (0-4)
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shipPath, setShipPath] = useState([]);
  const [showSolution, setShowSolution] = useState(false);

  // Sample solutions
  const forLoopSolution = `# Solution using a for loop
for i in range(3):
    move_right()`;
  
  const whileLoopSolution = `# Solution using a while loop
count = 0
while count < 3:
    move_right()
    count = count + 1`;

  // Simple asteroid pattern - just need to move right 3 times
  const asteroidPattern = [1, 1, 1, 0, 0];

  const validateCode = (code) => {
    // Check for loop syntax - simplify validation for educational purposes
    const trimmedCode = code.trim().toLowerCase();
    
    // Basic check for loop structure and move_right
    if (!trimmedCode.includes("move_right()")) {
      return { valid: false, message: "Your code should use the move_right() command" };
    }
    
    // Check for loop constructs - very basic check
    if (!trimmedCode.includes("for") && !trimmedCode.includes("while")) {
      return { valid: false, message: "Your code should use a loop (for or while)" };
    }
    
    return { valid: true };
  };

  const simulateShipMovement = (code) => {
    // Much simpler simulation that doesn't try to actually parse Python
    // Instead, we'll check for key patterns and simulate accordingly
    
    let positions = [0]; // Start at position 0
    let currentPos = 0;
    let success = false;
    
    // Determine how many moves to make based on the code pattern
    let moves = 0;
    
    // For educational purposes, if we see a loop and move_right, we'll move 3 times
    // This is a big simplification but works for teaching loop concepts
    if (code.includes("move_right()") && (code.includes("for") || code.includes("while"))) {
      moves = 3; // Default for any valid loop
      
      // Try to extract a more specific number if possible
      const rangeMatch = code.match(/range\s*\(\s*(\d+)\s*\)/);
      if (rangeMatch) {
        moves = parseInt(rangeMatch[1]);
      }
    }
    
    // Simulate the moves
    for (let i = 0; i < moves; i++) {
      currentPos = Math.min(4, currentPos + 1);
      positions.push(currentPos);
    }
    
    // Success if we made it to position 3 or beyond
    success = currentPos >= 3;
    
    return { path: positions, success };
  };

  const handleRunCode = () => {
    setHasAttempted(true);
    setIsAnimating(false);
    setAnimationStep(0);
    
    // Validate code syntax
    const validation = validateCode(userCode);
    if (!validation.valid) {
      setOutput(`❌ Error: ${validation.message}`);
      setIsCorrect(false);
      return;
    }
    
    // Simulate ship movement
    const simulation = simulateShipMovement(userCode);
    setShipPath(simulation.path);
    
    if (simulation.success) {
      setOutput("🚀 Success! Your ship navigated past the asteroids using loops!");
      setIsCorrect(true);
    } else {
      setOutput("💥 Your ship didn't make it past the asteroid field. Try adjusting your loop!");
      setIsCorrect(false);
    }
    
    // Start animation
    setIsAnimating(true);
  };

  const applySolution = (solutionType) => {
    setUserCode(solutionType === 'for' ? forLoopSolution : whileLoopSolution);
  };

  // Animation effect
  useEffect(() => {
    if (isAnimating && animationStep < shipPath.length) {
      const timer = setTimeout(() => {
        setShipPosition(shipPath[animationStep]);
        setAnimationStep(animationStep + 1);
      }, 700); // Animation speed
      
      return () => clearTimeout(timer);
    }
  }, [isAnimating, animationStep, shipPath]);

  const handleReset = () => {
    setOutput("");
    setUserCode("");
    setIsCorrect(false);
    setHasAttempted(false);
    setShipPosition(0);
    setShipPath([]);
    setAnimationStep(0);
    setIsAnimating(false);
    setShowSolution(false);
  };

  const handleNextChallenge = () => {
    alert("🔜 Moving to the next challenge... (Implement navigation here!)");
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">🚀 Challenge 3: Asteroid Loops! 🪨</h1>
      <p className="text-lg mb-2">Use a loop to navigate your spaceship past the asteroids!</p>
      <p className="text-md mb-6">The ship needs to move right at least 3 times to reach safety.</p>
      
      {/* Simplified visualization - horizontal track */}
      <div className="flex justify-center space-x-2 mb-6 p-4 bg-gray-900 rounded-lg w-full max-w-md">
        {asteroidPattern.map((hasAsteroid, index) => (
          <div 
            key={index} 
            className={`w-12 h-16 flex items-center justify-center rounded-md
              ${hasAsteroid ? 'bg-red-900' : 'bg-green-900'}
              ${shipPosition === index ? 'border-4 border-yellow-400' : ''}
            `}
          >
            {hasAsteroid ? '🪨' : '✅'}
            {shipPosition === index && '🚀'}
          </div>
        ))}
      </div>
      
      <div className="relative w-full max-w-md">
        <textarea
          className={`w-full h-48 p-4 rounded-lg shadow-lg text-black font-mono text-lg ${
            hasAttempted && !isCorrect ? "border-2 border-red-500" : ""
          }`}
          placeholder={`# Use a loop to move the ship to safety
# Example:
for i in range(3):
    move_right()

# Or:
count = 0
while count < 3:
    move_right()
    count = count + 1`}
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          disabled={isCorrect && isAnimating}
        ></textarea>
      </div>
      
      <div className="flex gap-4">
        {!isCorrect ? (
          <>
            <button
              onClick={handleRunCode}
              className="mt-4 px-6 py-3 bg-blue-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-blue-700 transition"
              disabled={isAnimating}
            >
              Run Code 🚀
            </button>
            <button
              onClick={toggleSolution}
              className="mt-4 px-6 py-3 bg-yellow-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-yellow-700 transition"
            >
              {showSolution ? "Hide Solution" : "Show Solution"}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-3 bg-purple-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-purple-700 transition"
            >
              Retry
            </button>
            <button
              onClick={handleNextChallenge}
              className="mt-4 px-6 py-3 bg-green-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-green-700 transition"
            >
              Next Challenge ➡
            </button>
          </>
        )}
      </div>
      
      {output && (
        <p className={`mt-6 text-xl ${output.includes("Error") || output.includes("didn't make it") ? "text-red-500" : "text-green-400"}`}>
          {output}
        </p>
      )}
      
      {showSolution && (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg max-w-md w-full">
          <h3 className="text-xl font-bold mb-2 text-yellow-300">Solutions:</h3>
          <div className="bg-gray-800 p-3 rounded mb-3">
            <pre className="text-white font-mono">{forLoopSolution}</pre>
            <button 
              onClick={() => applySolution('for')}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Use This Solution
            </button>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <pre className="text-white font-mono">{whileLoopSolution}</pre>
            <button 
              onClick={() => applySolution('while')}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Use This Solution
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-6 bg-gray-800 p-4 rounded-lg max-w-md">
        <h3 className="text-xl font-bold mb-2">Instructions:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use a loop to repeat the <code>move_right()</code> command</li>
          <li>You can use either a <code>for</code> loop or a <code>while</code> loop</li>
          <li>You need to move right at least 3 times to clear the asteroid field</li>
          <li>Loops help you repeat commands without writing them multiple times</li>
        </ul>
      </div>
    </div>
  );
}