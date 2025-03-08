import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StorylineScreen from './pages/StoryLineScreen';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storyline" element={<StorylineScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
