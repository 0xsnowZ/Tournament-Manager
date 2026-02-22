// src/store/index.js
// Q2 : Configuration du Store Redux avec les 3 slices intégrés

import { configureStore } from '@reduxjs/toolkit';
import teamsReducer from '../features/teams/teamsSlice';
import matchesReducer from '../features/matches/matchesSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

const store = configureStore({
  reducer: {
    teams: teamsReducer,        // Slice des équipes et joueurs
    matches: matchesReducer,    // Slice des matchs
    favorites: favoritesReducer, // Slice des favoris
  },
});

export default store;
