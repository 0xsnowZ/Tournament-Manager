// src/features/matches/MatchesList.js
// Q9 : Afficher tous les matchs avec date, heure, lieu, équipes, score final
// Q10 : Barre de recherche pour rechercher des matchs par nom d'équipe

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllMatches, selectSearchQuery, setSearchQuery } from './matchesSlice';
import { selectAllTeams } from '../teams/teamsSlice';

function MatchesList() {
  const dispatch = useDispatch();
  const matches = useSelector(selectAllMatches);
  const teams = useSelector(selectAllTeams);
  const searchQuery = useSelector(selectSearchQuery);

  // Fonction utilitaire pour obtenir le nom d'une équipe par son ID
  const getTeamName = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : 'Équipe inconnue';
  };

  // Q10 : Filtrer les matchs selon la barre de recherche (par nom d'équipe)
  const filteredMatches = matches.filter((match) => {
    const teamAName = getTeamName(match.teamA_id).toLowerCase();
    const teamBName = getTeamName(match.teamB_id).toLowerCase();
    const query = searchQuery.toLowerCase();
    return teamAName.includes(query) || teamBName.includes(query);
  });

  return (
    <div className="matches-container">
      <h1>📅 Liste des Matchs</h1>
      
      {/* Q10 : Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Rechercher par nom d'équipe..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="search-input"
        />
      </div>
      
      {/* Q9 : Affichage des matchs */}
      {filteredMatches.length === 0 ? (
        <p className="no-results">Aucun match trouvé pour "{searchQuery}"</p>
      ) : (
        <div className="matches-list">
          {filteredMatches.map((match) => (
            <div key={match.id} className="match-card">
              {/* Date, heure et lieu */}
              <div className="match-info">
                <span className="match-date">📆 {match.date}</span>
                <span className="match-time">🕐 {match.time}</span>
                <span className="match-venue">📍 {match.venue}</span>
              </div>
              
              {/* Équipes en compétition et score final */}
              <div className="match-score">
                <span className="team-a">{getTeamName(match.teamA_id)}</span>
                <span className="score">
                  {match.scoreA} - {match.scoreB}
                </span>
                <span className="team-b">{getTeamName(match.teamB_id)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MatchesList;
