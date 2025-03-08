import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Updated path
import StoryLineScreen from './pages/StoryLineScreen'; // Updated path (matching your filename)
import SpaceMap from './pages/SpaceMap'; // Updated path
import FirstChallenge from "./challenges/FirstChallenge"; // Updated path
import SecondChallenge from "./challenges/SecondChallenge"; // Added second challenge
import ThirdChallenge from "./challenges/ThirdChallenge"; // Added third challenge

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storyline" element={<StoryLineScreen />} />
        <Route path="/spacemap" element={<SpaceMap />} />
        <Route path="/challenge/1" element={<FirstChallenge />} />
        <Route path="/challenge/2" element={<SecondChallenge />} /> {/* Added second challenge route */}
        <Route path="/challenge/3" element={<ThirdChallenge />} /> {/* Added third challenge route */}
      </Routes>
    </Router>
  );
};

export default App;
