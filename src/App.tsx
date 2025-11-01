import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import Gallery from './pages/Gallery';
import Tips from './pages/Tips';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Gastronomia from './pages/Gastronomia';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/gastronomia" element={<Gastronomia />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;