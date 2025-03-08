import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Updated path
import StoryLineScreen from './pages/StoryLineScreen'; // Updated path (matching your filename)
import SpaceMap from './pages/SpaceMap'; // Updated path
import FirstChallenge from "./challenges/FirstChallenge"; // Updated path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storyline" element={<StoryLineScreen />} />
        <Route path="/spacemap" element={<SpaceMap />} />
        <Route path="/challenge/1" element={<FirstChallenge />} />
      </Routes>
    </Router>
  );
};

export default App;