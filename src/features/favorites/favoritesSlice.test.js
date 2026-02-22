// src/features/favorites/favoritesSlice.test.js
// Q17 : Test Unitaire pour l'action toggleFavorite dans teamsSlice (favoritesSlice)

import favoritesReducer, { toggleFavorite, removeFavorite } from './favoritesSlice';

describe('favoritesSlice - toggleFavorite', () => {
  // État initial pour chaque test
  const initialState = {
    favoriteIds: [],
  };

  // Test 1 : L'état initial est vide
  test('should return the initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual({
      favoriteIds: [],
    });
  });

  // Test 2 : toggleFavorite AJOUTE une équipe aux favoris si elle n'existe pas
  test('should ADD a team to favorites when toggleFavorite is called and team is not in favorites', () => {
    const teamId = 1;
    
    // Action
    const newState = favoritesReducer(initialState, toggleFavorite(teamId));
    
    // Vérification : l'équipe est maintenant dans les favoris
    expect(newState.favoriteIds).toContain(teamId);
    expect(newState.favoriteIds).toHaveLength(1);
  });

  // Test 3 : toggleFavorite RETIRE une équipe des favoris si elle existe déjà
  test('should REMOVE a team from favorites when toggleFavorite is called and team is already in favorites', () => {
    const stateWithFavorite = { favoriteIds: [1, 2] };
    const teamId = 1;
    
    // Action : toggle sur une équipe déjà favorite
    const newState = favoritesReducer(stateWithFavorite, toggleFavorite(teamId));
    
    // Vérification : l'équipe est retirée des favoris
    expect(newState.favoriteIds).not.toContain(teamId);
    expect(newState.favoriteIds).toHaveLength(1);
    expect(newState.favoriteIds).toContain(2); // L'autre équipe reste
  });

  // Test 4 : toggleFavorite peut gérer plusieurs équipes
  test('should handle multiple teams in favorites', () => {
    let state = initialState;
    
    // Ajouter équipe 1
    state = favoritesReducer(state, toggleFavorite(1));
    expect(state.favoriteIds).toEqual([1]);
    
    // Ajouter équipe 2
    state = favoritesReducer(state, toggleFavorite(2));
    expect(state.favoriteIds).toEqual([1, 2]);
    
    // Retirer équipe 1
    state = favoritesReducer(state, toggleFavorite(1));
    expect(state.favoriteIds).toEqual([2]);
  });

  // Test 5 : removeFavorite retire directement une équipe
  test('should remove a team directly with removeFavorite', () => {
    const stateWithFavorites = { favoriteIds: [1, 2, 3] };
    
    const newState = favoritesReducer(stateWithFavorites, removeFavorite(2));
    
    expect(newState.favoriteIds).not.toContain(2);
    expect(newState.favoriteIds).toEqual([1, 3]);
  });
});
