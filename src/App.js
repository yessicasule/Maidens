import './App.css';
import Home from './pages/Home';
import StorylineScreen from './pages/StoryLineScreen';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";



function App() {



  return (
    <>
      <BrowserRouter>
        <RoutesWeb />
      </BrowserRouter>
    </>
  );
}

const RoutesWeb = () => {
  const location = useLocation(); // Get the current route

  return (
    <>
      {/* {loading && <Loader />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storyline" element = {<StorylineScreen/>}></>
      </Routes>
      {/* {!isAdminRoute && <Footer />}       Conditionally render Footer */}
    </>
  );
};

export default App;
