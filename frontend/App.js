import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './NavBar';
import ImageUpload from './ImagesUpload';
import About from './About';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ImageUpload />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
