import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login'
import Signup from './Components/Signup'
import About from './Components/About';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
const App: React.FC = () => {
  return (
    <>
        <Router>
          <NavBar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>

    </>
    
  );
}

export default App;