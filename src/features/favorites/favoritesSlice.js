// src/features/favorites/favoritesSlice.js
// Q16 : favoritesSlice gère la liste des équipes favorites avec ajout et suppression

import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteIds: [],  // Liste des IDs des équipes favorites
  },
  reducers: {
    // Action toggleFavorite : ajoute ou retire une équipe des favoris (Q17 tests cette action)
    toggleFavorite: (state, action) => {
      const teamId = action.payload;
      const index = state.favoriteIds.indexOf(teamId);
      if (index === -1) {
        // L'équipe n'est pas dans les favoris → on l'ajoute
        state.favoriteIds.push(teamId);
      } else {
        // L'équipe est déjà dans les favoris → on la retire
        state.favoriteIds.splice(index, 1);
      }
    },
    // Action pour retirer directement un favori (Q12)
    removeFavorite: (state, action) => {
      state.favoriteIds = state.favoriteIds.filter(id => id !== action.payload);
    },
  },
});

export const { toggleFavorite, removeFavorite } = favoritesSlice.actions;

// Sélecteurs
export const selectFavoriteIds = (state) => state.favorites.favoriteIds;
export const selectIsFavorite = (teamId) => (state) =>
  state.favorites.favoriteIds.includes(teamId);

export default favoritesSlice.reducer;
