import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Tool from './components/Tool';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/tool" component={Tool} />
        <Route path="/about" component={AboutUs} />
      </Routes>
    </Router>
  );
}

export default App;
