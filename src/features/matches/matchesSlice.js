// src/features/matches/matchesSlice.js
// Q15 : matchesSlice gère l'état des matchs avec chargement depuis matches.json

import { createSlice } from '@reduxjs/toolkit';
import matchesData from '../../data/matches.json';

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    matches: matchesData,   // Chargement direct depuis matches.json
    searchQuery: '',
  },
  reducers: {
    // Action pour la barre de recherche (Q10)
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = matchesSlice.actions;

// Sélecteurs
export const selectAllMatches = (state) => state.matches.matches;
export const selectSearchQuery = (state) => state.matches.searchQuery;

export default matchesSlice.reducer;
