// src/components/Navbar.js
// Q13 : Barre de Navigation avec accès aux sections Équipes, Matchs, Favoris

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🏆 Coupe du Trône 2024</Link>
      </div>
      
      <ul className="navbar-links">
        {/* NavLink applique automatiquement la classe "active" sur la route active */}
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            ⚽ Équipes
          </NavLink>
        </li>
        <li>
          <NavLink to="/matches" className={({ isActive }) => isActive ? 'active' : ''}>
            📅 Matchs
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>
            ⭐ Favoris
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
