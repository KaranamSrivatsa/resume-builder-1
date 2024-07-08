import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login'
import Signup from './Components/Signup'
import About from './Components/About';
const App: React.FC = () => {
  return (
    <>
        <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Login/>}/>
      </Routes>
    </Router>

    </>
    
  );
}

export default App;