import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AlienTranslatorChallenge() {
  const navigate = useNavigate();
  const [output, setOutput] = useState("");
  const [userCode, setUserCode] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [decodedMessage, setDecodedMessage] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [alienDecoding, setAlienDecoding] = useState(false);
  
  const alienMessages = [
    { message: "H3LL0 34R+H", expected: "HELLO EARTH", hint: "3=E, 4=A, 0=O, +=T" },
    { message: "FR13NDLy 4L13N", expected: "FRIENDLY ALIEN", hint: "1=I, 3=E, 4=A" },
    { message: "5P4C3 5H1P", expected: "SPACE SHIP", hint: "5=S, 4=A, 3=E, 1=I" }
  ];
  
  const solutionCode = `def decode_alien_message(message):
    result = ""
    for char in message:
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
            result += char
    return result.upper()`;
  
  const handleRunCode = () => {
    setHasAttempted(true);
    setAlienDecoding(true);
    setTimeout(() => {
      setDecodedMessage(alienMessages[currentMessage].expected);
      setIsCorrect(true);
      setOutput("🎉 Amazing! Your alien translator is working!");
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

  const handlePreviousChallenge = () => {
    navigate("/challenge-4");
  };

  const handleNextChallenge = () => {
    navigate("/challenge-6");
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">👽 Challenge 5: Alien Translator 🛸</h1>
      <p className="text-lg mb-6">Decode secret alien messages to Earth!</p>
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md mb-6 text-center">
        <p className="text-xl text-green-400">Alien Message:</p>
        <p className="text-2xl font-mono text-green-300">{alienMessages[currentMessage].message}</p>
      </div>
      {decodedMessage && <p className="text-2xl text-blue-300">Your Translation: {decodedMessage}</p>}
      <button onClick={handleRunCode} className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full">
        {alienDecoding ? "Decoding..." : "Translate! 🔍"}
      </button>
      <button onClick={() => setShowSolution(!showSolution)} className="mt-4 px-6 py-3 bg-yellow-600 text-white rounded-full">
        {showSolution ? "Hide Solution" : "Show Solution"}
      </button>
      {showSolution && (
        <pre className="bg-gray-700 p-4 rounded mt-4 text-white overflow-x-auto">{solutionCode}</pre>
      )}
      <div className="flex gap-4 mt-6">
        <button onClick={handlePreviousChallenge} className="px-6 py-3 bg-gray-600 text-white rounded-full">
          ⬅ Previous Challenge
        </button>
        <button onClick={handleNextChallenge} className="px-6 py-3 bg-green-600 text-white rounded-full">
          Next Challenge ➡
        </button>
      </div>
    </div>
  );
}
