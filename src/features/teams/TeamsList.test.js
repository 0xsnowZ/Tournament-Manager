// src/features/teams/TeamsList.test.js
// Q18 : Test pour le composant TeamsList - vérifie l'affichage des équipes et la gestion des favoris

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import TeamsList from './TeamsList';
import teamsReducer from './teamsSlice';
import favoritesReducer from '../favorites/favoritesSlice';

// ─── Données de test ───────────────────────────────────────────────────────────
const mockTeams = [
  {
    id: 1,
    name: "HASSANIA UNION SPORT D'AGADIR",
    logoUrl: 'https://example.com/logo1.png',
    coach: 'Abdelhadi Sektioui',
    fifaRanking: 25,
  },
  {
    id: 2,
    name: 'Wydad Athletic Club',
    logoUrl: 'https://example.com/logo2.png',
    coach: 'Rulani Mokwena',
    fifaRanking: 18,
  },
];

// ─── Helper : créer un store de test avec données simulées ─────────────────────
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      teams: teamsReducer,
      favorites: favoritesReducer,
    },
    // On peut surcharger l'état initial pour les tests
    preloadedState: {
      teams: {
        teams: mockTeams,
        players: [],
        selectedTeam: null,
      },
      favorites: {
        favoriteIds: [],
      },
      ...preloadedState,
    },
  });
};

// ─── Helper : render avec Provider et Router ───────────────────────────────────
const renderWithStore = (component, store) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        {component}
      </MemoryRouter>
    </Provider>
  );
};

// ─── Tests ────────────────────────────────────────────────────────────────────
describe('TeamsList Component', () => {

  // Test 1 : Le composant se rend sans erreur
  test('should render without crashing', () => {
    const store = createTestStore();
    renderWithStore(<TeamsList />, store);
    expect(screen.getByText(/Équipes/i)).toBeInTheDocument();
  });

  // Test 2 : Affiche correctement toutes les équipes (Q4)
  test('should display all teams from the store', () => {
    const store = createTestStore();
    renderWithStore(<TeamsList />, store);
    
    // Vérifier que les noms des équipes sont affichés
    expect(screen.getByText("HASSANIA UNION SPORT D'AGADIR")).toBeInTheDocument();
    expect(screen.getByText('Wydad Athletic Club')).toBeInTheDocument();
  });

  // Test 3 : Affiche le coach et le classement FIFA de chaque équipe (Q4)
  test('should display coach and FIFA ranking for each team', () => {
    const store = createTestStore();
    renderWithStore(<TeamsList />, store);
    
    expect(screen.getByText(/Abdelhadi Sektioui/i)).toBeInTheDocument();
    expect(screen.getByText(/#25/i)).toBeInTheDocument();
    expect(screen.getByText(/Rulani Mokwena/i)).toBeInTheDocument();
    expect(screen.getByText(/#18/i)).toBeInTheDocument();
  });

  // Test 4 : Le bouton favori est présent pour chaque équipe (Q6)
  test('should display a favorite button for each team', () => {
    const store = createTestStore();
    renderWithStore(<TeamsList />, store);
    
    // Chaque équipe a un bouton "Ajouter aux favoris"
    const favoriteButtons = screen.getAllByText(/Ajouter aux favoris/i);
    expect(favoriteButtons).toHaveLength(mockTeams.length);
  });

  // Test 5 : Cliquer sur le bouton favori ajoute l'équipe aux favoris (Q6)
  test('should toggle favorite when favorite button is clicked', () => {
    const store = createTestStore();
    renderWithStore(<TeamsList />, store);
    
    // Avant le clic : bouton "Ajouter aux favoris"
    const favoriteBtn = screen.getAllByText(/Ajouter aux favoris/i)[0];
    expect(favoriteBtn).toBeInTheDocument();
    
    // Clic sur le bouton favori de la première équipe
    fireEvent.click(favoriteBtn);
    
    // Après le clic : le bouton doit changer en "Favori"
    expect(screen.getByText('⭐ Favori')).toBeInTheDocument();
    
    // Vérifier dans le store Redux que l'équipe 1 est dans les favoris
    const state = store.getState();
    expect(state.favorites.favoriteIds).toContain(1);
  });

  // Test 6 : Un deuxième clic retire l'équipe des favoris
  test('should remove from favorites when favorite button is clicked again', () => {
    // État initial avec l'équipe 1 déjà en favoris
    const store = createTestStore({
      favorites: { favoriteIds: [1] },
    });
    renderWithStore(<TeamsList />, store);
    
    // Le bouton affiche "⭐ Favori" pour l'équipe 1
    const favoriteBtn = screen.getByText('⭐ Favori');
    
    // Clic pour retirer des favoris
    fireEvent.click(favoriteBtn);
    
    // L'équipe est retirée des favoris dans le store
    const state = store.getState();
    expect(state.favorites.favoriteIds).not.toContain(1);
  });

  // Test 7 : Affiche le bon nombre de cartes d'équipes
  test('should render correct number of team cards', () => {
    const store = createTestStore();
    renderWithStore(<TeamsList />, store);
    
    const teamCards = screen.getAllByRole('img'); // Les logos des équipes
    expect(teamCards).toHaveLength(mockTeams.length);
  });
});
