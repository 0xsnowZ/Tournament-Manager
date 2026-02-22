// src/features/teams/teamsSlice.js
// Q14 : teamsSlice gère l'état des équipes avec chargement depuis teams.json et players.json

import { createSlice } from '@reduxjs/toolkit';
import teamsData from '../../data/teams.json';
import playersData from '../../data/players.json';

const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    teams: teamsData,       // Chargement direct depuis teams.json
    players: playersData,   // Association des joueurs depuis players.json
    selectedTeam: null,
  },
  reducers: {
    // Action pour sélectionner une équipe (utilisée dans TeamDetails)
    selectTeam: (state, action) => {
      state.selectedTeam = state.teams.find(t => t.id === action.payload) || null;
    },
    // Action pour désélectionner
    clearSelectedTeam: (state) => {
      state.selectedTeam = null;
    },
  },
});

export const { selectTeam, clearSelectedTeam } = teamsSlice.actions;

// Sélecteurs
export const selectAllTeams = (state) => state.teams.teams;
export const selectAllPlayers = (state) => state.teams.players;
export const selectCurrentTeam = (state) => state.teams.selectedTeam;
export const selectPlayersByTeam = (teamId) => (state) =>
  state.teams.players.filter(p => p.team_id === teamId);

export default teamsSlice.reducer;
