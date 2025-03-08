import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import StorylineScreen from './pages/StoryLineScreen';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

const AppRoutes = () => {
  const location = useLocation(); // Get the current route
  
  return (
    <>
      {/* {loading && <Loader />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storyline" element={<StorylineScreen />} />
      </Routes>
      {/* {!isAdminRoute && <Footer />} 
      Conditionally render Footer */}
    </>
  );
};

export default App;