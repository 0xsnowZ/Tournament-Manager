// src/features/teams/TeamsList.js
// Q4 : Afficher toutes les équipes avec logo, nom, coach, classement FIFA
// Q5 : Chaque équipe cliquable pour accéder à sa page de détails
// Q6 : Bouton pour marquer/démarquer une équipe comme favorite

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllTeams, selectTeam } from './teamsSlice';
import { toggleFavorite, selectFavoriteIds } from '../favorites/favoritesSlice';

function TeamsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Récupérer toutes les équipes depuis le store Redux
  const teams = useSelector(selectAllTeams);
  
  // Récupérer les IDs des favoris pour afficher l'état de chaque équipe
  const favoriteIds = useSelector(selectFavoriteIds);

  // Q5 : Naviguer vers la page de détails de l'équipe cliquée
  const handleTeamClick = (teamId) => {
    dispatch(selectTeam(teamId));
    navigate(`/teams/${teamId}`);
  };

  // Q6 : Toggle favori - empêcher la propagation pour ne pas naviguer
  const handleToggleFavorite = (e, teamId) => {
    e.stopPropagation(); // Éviter de déclencher le clic sur la carte
    dispatch(toggleFavorite(teamId));
  };

  return (
    <div className="teams-container">
      <h1>🏆 Équipes - Coupe du Trône Mohamed VI 2024</h1>
      
      <div className="teams-grid">
        {teams.map((team) => {
          const isFavorite = favoriteIds.includes(team.id);
          
          return (
            // Q5 : Carte cliquable pour aller aux détails
            <div
              key={team.id}
              className="team-card"
              onClick={() => handleTeamClick(team.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Q4 : Logo de l'équipe */}
              <img
                src={team.logoUrl}
                alt={`Logo ${team.name}`}
                className="team-logo"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=Logo'; }}
              />
              
              {/* Q4 : Nom de l'équipe */}
              <h2 className="team-name">{team.name}</h2>
              
              {/* Q4 : Coach et classement FIFA */}
              <p className="team-coach">👨‍💼 Coach : {team.coach}</p>
              <p className="team-ranking">🌍 Classement FIFA : #{team.fifaRanking}</p>
              
              {/* Q6 : Bouton marquer/démarquer comme favori */}
              <button
                className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
                onClick={(e) => handleToggleFavorite(e, team.id)}
              >
                {isFavorite ? '⭐ Favori' : '☆ Ajouter aux favoris'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamsList;
