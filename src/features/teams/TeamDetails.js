// src/features/teams/TeamDetails.js
// Q7 : Afficher les informations complètes de l'équipe sélectionnée
// Q8 : Lister les joueurs de l'équipe avec leurs positions, buts et passes décisives

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectAllTeams, selectAllPlayers } from './teamsSlice';

function TeamDetails() {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const navigate = useNavigate();
  
  const teams = useSelector(selectAllTeams);
  const allPlayers = useSelector(selectAllPlayers);
  
  // Q7 : Trouver l'équipe sélectionnée par son ID
  const team = teams.find(t => t.id === parseInt(id));
  
  // Q8 : Filtrer les joueurs de cette équipe
  const teamPlayers = allPlayers.filter(p => p.team_id === parseInt(id));

  // Équipe non trouvée
  if (!team) {
    return (
      <div className="not-found">
        <p>Équipe non trouvée.</p>
        <button onClick={() => navigate('/')}>← Retour</button>
      </div>
    );
  }

  return (
    <div className="team-details-container">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Retour aux équipes
      </button>
      
      {/* Q7 : Informations complètes de l'équipe */}
      <div className="team-details-header">
        <img
          src={team.logoUrl}
          alt={`Logo ${team.name}`}
          className="team-details-logo"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/120?text=Logo'; }}
        />
        <div className="team-details-info">
          <h1>{team.name}</h1>
          <p>👨‍💼 Entraîneur : <strong>{team.coach}</strong></p>
          <p>🌍 Classement FIFA : <strong>#{team.fifaRanking}</strong></p>
          <p>🆔 ID Équipe : <strong>{team.id}</strong></p>
        </div>
      </div>
      
      {/* Q8 : Liste des joueurs avec positions, buts et passes */}
      <div className="players-section">
        <h2>👥 Joueurs de l'équipe ({teamPlayers.length})</h2>
        
        {teamPlayers.length === 0 ? (
          <p>Aucun joueur disponible pour cette équipe.</p>
        ) : (
          <table className="players-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Position</th>
                <th>⚽ Buts</th>
                <th>🎯 Passes décisives</th>
              </tr>
            </thead>
            <tbody>
              {teamPlayers.map((player) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td>
                    <span className={`position-badge ${player.position.toLowerCase()}`}>
                      {player.position}
                    </span>
                  </td>
                  <td>{player.goals}</td>
                  <td>{player.assists}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TeamDetails;
