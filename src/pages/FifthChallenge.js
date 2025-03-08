import React, { useState, useEffect } from "react";

export default function AlienTranslatorChallenge() {
  const [output, setOutput] = useState("");
  const [userCode, setUserCode] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [decodedMessage, setDecodedMessage] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [alienDecoding, setAlienDecoding] = useState(false);
  const [decodeProgress, setDecodeProgress] = useState(0);

  // Simplified alien messages with basic letter substitutions
  const alienMessages = [
    {
      message: "H3LL0 34R+H",
      expected: "HELLO EARTH",
      hint: "3=E, 4=A, 0=O, +=T"
    },
    {
      message: "FR13NDLy 4L13N",
      expected: "FRIENDLY ALIEN",
      hint: "1=I, 3=E, 4=A"
    },
    {
      message: "5P4C3 5H1P",
      expected: "SPACE SHIP",
      hint: "5=S, P=P, 4=A, C=C, 3=E, H=H, 1=I"
    }
  ];

  // Simplified solution - more straightforward for kids
  const solutionCode = `def decode_alien_message(message):
    # Make a new message to build our answer
    result = ""
    
    # Go through each character in the message
    for char in message:
        # Replace alien symbols with Earth letters
        if char == "3":
            result += "E"
        elif char == "4":
            result += "A"
        elif char == "0":
            result += "O"
        elif char == "+":
            result += "T"
        elif char == "1":
            result += "I"
        elif char == "5":
            result += "S"
        else:
            # Keep other characters the same
            result += char
    
    # Convert to uppercase
    result = result.upper()
    
    return result`;

  const validateUserCode = (code) => {
    // Simplified validation for kids
    if (!code.includes("def decode_alien_message") || !code.includes("return")) {
      return {
        valid: false,
        message: "Your function needs to start with 'def decode_alien_message' and include a 'return'."
      };
    }

    return { valid: true };
  };

  const executeUserCode = (code, message) => {
    // Simplified execution for kids - focuses on basic substitutions
    try {
      let result = message;
      
      // Check for number-to-letter substitutions
      const substitutions = {
        "3": "E", "4": "A", "0": "O", "+": "T", "1": "I", "5": "S"
      };
      
      // Apply substitutions found in their code
      Object.entries(substitutions).forEach(([key, value]) => {
        if (code.includes(`char == "${key}"`) || 
            code.includes(`"${key}"`) || 
            code.includes(`'${key}'`)) {
          result = result.replace(new RegExp(key, 'g'), value);
        }
      });
      
      // Check if they're making it uppercase
      if (code.includes(".upper()")) {
        result = result.toUpperCase();
      }
      
      return result;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  };

  const handleRunCode = () => {
    setHasAttempted(true);
    setAlienDecoding(true);
    setDecodeProgress(0);
    
    // Validate code
    const validation = validateUserCode(userCode);
    if (!validation.valid) {
      setOutput(`❌ Error: ${validation.message}`);
      setIsCorrect(false);
      setAlienDecoding(false);
      return;
    }
    
    // Animated decoding for fun
    setTimeout(() => {
      // Get the current alien message
      const currentAlienMessage = alienMessages[currentMessage].message;
      const expectedTranslation = alienMessages[currentMessage].expected;
      
      const userResult = executeUserCode(userCode, currentAlienMessage);
      setDecodedMessage(userResult);
      
      // Simplified matching - just check if key letters were translated
      let success = true;
      
      // Look for main substitutions
      if (currentMessage === 0) { // First message
        if (!userResult.includes("E") || !userResult.includes("A") || 
            !userResult.includes("O") || !userResult.includes("T")) {
          success = false;
        }
      } else if (currentMessage === 1) { // Second message
        if (!userResult.includes("I") || !userResult.includes("E") || 
            !userResult.includes("A")) {
          success = false;
        }
      } else { // Third message
        if (!userResult.includes("S") || !userResult.includes("A") || 
            !userResult.includes("E") || !userResult.includes("I")) {
          success = false;
        }
      }
      
      if (success) {
        setOutput("🎉 Amazing! Your alien translator is working!");
        setIsCorrect(true);
      } else {
        setOutput(`👽 Not quite right. Hint: ${alienMessages[currentMessage].hint}`);
        setIsCorrect(false);
      }
      
      setAlienDecoding(false);
    }, 1500);
  };

  const handleReset = () => {
    setOutput("");
    setUserCode("");
    setIsCorrect(false);
    setHasAttempted(false);
    setDecodedMessage("");
    setAlienDecoding(false);
    setShowSolution(false);
  };

  const handleNextMessage = () => {
    const nextIndex = (currentMessage + 1) % alienMessages.length;
    setCurrentMessage(nextIndex);
    setIsCorrect(false);
    setHasAttempted(false);
    setOutput("");
    setDecodedMessage("");
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  // Animation effect
  useEffect(() => {
    if (alienDecoding && decodeProgress < 100) {
      const timer = setTimeout(() => {
        setDecodeProgress(Math.min(100, decodeProgress + 10));
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [alienDecoding, decodeProgress]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">👽 Challenge 5: Alien Translator 🛸</h1>
      <p className="text-lg mb-2">Decode secret alien messages to Earth!</p>
      <p className="text-md mb-6">Aliens use special symbols that we need to translate.</p>
      
      {/* Alien message display */}
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md mb-6 text-center">
        <div className="flex items-center justify-center mb-2">
          <span className="text-xl text-green-400 mr-2">Alien Message:</span>
          <span className="text-2xl font-mono text-green-300">
            {alienMessages[currentMessage].message}
          </span>
        </div>
        
        {decodedMessage && (
          <div className="flex items-center justify-center mt-4">
            <span className="text-xl text-blue-400 mr-2">Your Translation:</span>
            <span className="text-2xl font-mono text-blue-300">
              {decodedMessage}
            </span>
          </div>
        )}
        
        {alienDecoding && (
          <div className="mt-4 w-full bg-gray-800 rounded-full h-4">
            <div 
              className="bg-green-500 h-4 rounded-full transition-all duration-100 ease-in-out"
              style={{ width: `${decodeProgress}%` }}
            ></div>
          </div>
        )}
      </div>
      
      <div className="w-full max-w-md">
        <textarea
          className={`w-full h-56 p-4 rounded-lg shadow-lg text-black font-mono text-lg ${
            hasAttempted && !isCorrect ? "border-2 border-red-500" : ""
          }`}
          placeholder={`# Create your alien translator function
def decode_alien_message(message):
    # Replace alien symbols with Earth letters
    # Example: if char == "3":
    #            result += "E"
    
    result = ""
    
    # Your code here
    
    return result`}
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          disabled={alienDecoding}
        ></textarea>
      </div>
      
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        <button
          onClick={handleRunCode}
          className="px-6 py-3 bg-blue-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-blue-700 transition"
          disabled={alienDecoding}
        >
          {alienDecoding ? "Decoding..." : "Translate! 🔍"}
        </button>
        
        {!isCorrect && (
          <button
            onClick={toggleSolution}
            className="px-6 py-3 bg-yellow-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-yellow-700 transition"
          >
            {showSolution ? "Hide Help" : "Need Help?"}
          </button>
        )}
        
        {isCorrect && (
          <button
            onClick={handleNextMessage}
            className="px-6 py-3 bg-green-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-green-700 transition"
          >
            Next Message 👾
          </button>
        )}
        
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-purple-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-purple-700 transition"
        >
          Start Over
        </button>
      </div>
      
      {output && (
        <p className={`mt-6 text-xl ${output.includes("Amazing") ? "text-green-400" : "text-yellow-400"}`}>
          {output}
        </p>
      )}
      
      {showSolution && (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg max-w-md w-full">
          <h3 className="text-xl font-bold mb-2 text-yellow-300">Helper Code:</h3>
          <div className="bg-gray-800 p-3 rounded">
            <pre className="text-white font-mono text-sm overflow-x-auto">{solutionCode}</pre>
            <button 
              onClick={() => setUserCode(solutionCode)}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Use This Code
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-6 bg-gray-800 p-4 rounded-lg max-w-md">
        <h3 className="text-xl font-bold mb-2">How To Solve:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Aliens use numbers and symbols instead of some letters</li>
          <li>Create a function that changes alien symbols to Earth letters</li>
          <li>Look for patterns: 3 = E, 4 = A, etc.</li>
          <li>Go through each character in the message and translate it</li>
        </ul>
      </div>
    </div>
  );
}