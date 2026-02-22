# ⚽ Coupe du Trône Mohamed VI 2024 - Tournament Manager

A React-based web application for managing and tracking football tournament information including teams, matches, players, and favorites for the Coupe du Trône Mohamed VI 2024.

## 🎯 Features

- **Teams Management**: View all participating teams with logos, coaches, and FIFA rankings
- **Team Details**: Click on any team to see complete information and player roster
- **Player Statistics**: View player details including positions, goals, and assists
- **Match Tracking**: Browse and manage tournament matches
- **Favorites System**: Mark teams as favorites for quick access
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Dark theme with golden accents

## 🛠️ Tech Stack

- **Frontend**: React 18
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: CSS3 with responsive grid layout
- **Build Tool**: Create React App

## 📦 Installation

1. Clone the repository and navigate to the project directory:

```bash
cd efm
```

2. Install dependencies:

```bash
npm install
```

## 🚀 Getting Started

### Start Development Server

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000) in your browser. The page reloads automatically when you make changes.

### Build for Production

```bash
npm run build
```

Builds the app for production to the `build` folder with optimized performance.

### Run Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.js       # Navigation bar
├── features/           # Feature-specific Redux slices and components
│   ├── favorites/      # Favorites management
│   │   ├── Favorites.js
│   │   └── favoritesSlice.js
│   ├── matches/        # Match management
│   │   ├── MatchesList.js
│   │   └── matchesSlice.js
│   └── teams/          # Teams management
│       ├── TeamsList.js
│       ├── TeamDetails.js
│       ├── teamsSlice.js
│       └── TeamsList.test.js
├── data/               # Static JSON data
│   ├── teams.json      # Teams data
│   ├── matches.json    # Matches data
│   └── players.json    # Players data
├── store/              # Redux store configuration
│   └── index.js
├── App.js              # Main app component
├── index.js            # Entry point
└── index.css           # Global styles
```

## 📋 Core Features Explained

### Teams List 

- Displays all tournament teams with their logos, names, coaches, and FIFA rankings
- Teams are clickable to view detailed information
- Add/remove teams from favorites with the star button

### Team Details 

- Shows complete team information including coach and FIFA ranking
- Lists all players in the team with their positions, goals, and assists
- Navigation back to the teams list

### Favorites Management 

- Add teams to your favorites list
- View all favorited teams in a dedicated section
- Remove teams from favorites anytime

### Match Tracking 
- Browse tournament matches
- View match details and statistics

### Navigation 

- Sticky navigation bar with quick links to all sections
- Responsive design for all screen sizes

## 🎨 Styling

The app features a modern dark theme with:

- Purple and dark blue gradients
- Golden accents (#c8a415) for highlights
- Smooth transitions and hover effects
- Mobile-responsive grid layout

## 🧪 Testing

Test files are included for major components:

- `TeamsList.test.js` - Teams list component tests
- `favoritesSlice.test.js` - Redux favorites slice tests

## 📝 Data Files

### teams.json

Contains team information: id, name, logoUrl, coach, fifaRanking

### players.json

Contains player information: id, name, position, goals, assists, team_id

### matches.json

Contains match information: id, team1_id, team2_id, score1, score2, date

## 🚀 Deployment

To deploy this app:

1. Build the production version:

```bash
npm run build
```

2. Deploy the `build` folder to your hosting service (Netlify, Vercel, GitHub Pages, etc.)

## 📄 License

This project is available for use and modification.
