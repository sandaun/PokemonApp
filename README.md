# Digital Hub React Native

A React Native mobile application for exploring Pokémon data with features including geolocation tracking, settings management, and detailed Pokémon information.

## Features

- **Home**: Overview dashboard showing total Pokémon count and navigation options
- **Pokémon List**: Browse, search, and filter Pokémon
- **Pokémon Details**: View and edit detailed information about each Pokémon
- **Geolocation**: Track and display your current location on a map
- **Settings**: Configure app settings and reload data

## Technologies Used

- React Native
- TypeScript
- React Navigation
- React Native Maps
- Context API for state management
- PokéAPI for Pokémon data

## Project Structure

```
src/
  ├── App.tsx                  # Root application component
  ├── components/              # Reusable UI components
  │   ├── Button.tsx           # Custom button component
  │   ├── EditPokemonModal.tsx # Modal for editing Pokemon details
  │   ├── FormInput.tsx        # Form input component
  │   ├── PokemonCard.tsx      # Card for displaying Pokemon in list
  │   ├── SettingRow.tsx       # Row component for settings screen
  │   ├── SettingsCard.tsx     # Card component for settings screen
  │   └── home/                # Home-specific components
  ├── context/                 # React Context providers
  │   └── PokemonContext.tsx   # Pokemon data context and provider
  ├── data/                    # Mock and static data
  │   └── mockPokemonData.ts   # Functions for generating mock Pokemon data
  ├── navigation/              # Navigation configuration
  │   └── AppNavigator.tsx     # Main navigation setup
  ├── pages/                   # Application screens
  │   ├── DataListScreen.tsx   # Pokemon list screen
  │   ├── DetailScreen.tsx     # Pokemon detail screen
  │   ├── GeolocationScreen.tsx# Map and location screen
  │   ├── HomeScreen.tsx       # Landing/home screen
  │   └── SettingsScreen.tsx   # App settings screen
  └── services/                # API and data fetching
      └── pokeapi.ts           # PokéAPI integration
```

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm or yarn
- React Native development environment: [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- iOS development: Xcode (for macOS users)
- Android development: Android Studio

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/DigitalHubReactNative.git
   cd DigitalHubReactNative
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Install iOS dependencies (macOS only):
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

### Running the Application

#### iOS

```bash
# Start Metro bundler
npm start
# In a separate terminal
npm run ios
```

#### Android

```bash
# Start Metro bundler
npm start
# In a separate terminal
npm run android
```

## Testing

This project includes unit and component tests using Jest and React Testing Library.

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Key Features Implementation

### Pokemon Data Management

- Fetches Pokemon data from PokéAPI
- Implements CRUD operations (Create, Read, Update, Delete)
- Supports searching and filtering of Pokemon

### Geolocation

- Requests device location permissions
- Displays current location on a map
- Updates location on user request

### Navigation

- Tab-based navigation between main screens
- Stack navigation for Pokemon details

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
