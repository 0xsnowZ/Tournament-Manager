// src/features/favorites/Favorites.js
// Q11 : Afficher la liste des équipes marquées comme favorites
// Q12 : Permettre de retirer une équipe de la liste des favoris

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectFavoriteIds, removeFavorite } from './favoritesSlice';
import { selectAllTeams, selectTeam } from '../teams/teamsSlice';

function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const favoriteIds = useSelector(selectFavoriteIds);
  const allTeams = useSelector(selectAllTeams);
  
  // Q11 : Filtrer uniquement les équipes favorites
  const favoriteTeams = allTeams.filter(team => favoriteIds.includes(team.id));

  // Naviguer vers les détails de l'équipe
  const handleTeamClick = (teamId) => {
    dispatch(selectTeam(teamId));
    navigate(`/teams/${teamId}`);
  };

  // Q12 : Retirer une équipe des favoris
  const handleRemoveFavorite = (e, teamId) => {
    e.stopPropagation();
    dispatch(removeFavorite(teamId));
  };

  return (
    <div className="favorites-container">
      <h1>⭐ Mes Équipes Favorites</h1>
      
      {/* Q11 : Aucun favori */}
      {favoriteTeams.length === 0 ? (
        <div className="empty-favorites">
          <p>Vous n'avez pas encore d'équipes favorites.</p>
          <button onClick={() => navigate('/')}>
            ← Parcourir les équipes
          </button>
        </div>
      ) : (
        <div className="teams-grid">
          {favoriteTeams.map((team) => (
            <div
              key={team.id}
              className="team-card favorite-card"
              onClick={() => handleTeamClick(team.id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={team.logoUrl}
                alt={`Logo ${team.name}`}
                className="team-logo"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=Logo'; }}
              />
              <h2 className="team-name">{team.name}</h2>
              <p className="team-coach">👨‍💼 {team.coach}</p>
              <p className="team-ranking">🌍 FIFA #{team.fifaRanking}</p>
              
              {/* Q12 : Bouton pour retirer des favoris */}
              <button
                className="remove-favorite-btn"
                onClick={(e) => handleRemoveFavorite(e, team.id)}
              >
                🗑️ Retirer des favoris
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
