import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PokemonSection from './components/pokemo';
import TriviaSection from './components/TriviaSection';
import WeatherSection from './components/clima';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/variables.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<PokemonSection />} />
            <Route path="/jokes" element={<PokemonSection />} />
            <Route path="/trivia" element={<TriviaSection />} />
            <Route path="/exchange" element={<WeatherSection />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
