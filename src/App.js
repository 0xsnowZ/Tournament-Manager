// src/App.js
// Q3 : Configuration du Routage avec React Router - définition des routes principales

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TeamsList from './features/teams/TeamsList';
import TeamDetails from './features/teams/TeamDetails';
import MatchesList from './features/matches/MatchesList';
import Favorites from './features/favorites/Favorites';

function App() {
  return (
    <Router>
      {/* Navbar accessible sur toutes les pages */}
      <Navbar />
      
      <main className="main-content">
        <Routes>
          {/* Route principale → liste des équipes */}
          <Route path="/" element={<TeamsList />} />
          
          {/* Route détails d'une équipe avec son ID */}
          <Route path="/teams/:id" element={<TeamDetails />} />
          
          {/* Route liste des matchs */}
          <Route path="/matches" element={<MatchesList />} />
          
          {/* Route favoris */}
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
