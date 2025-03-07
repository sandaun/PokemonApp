import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PokemonProvider} from './context/PokemonContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <PokemonProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PokemonProvider>
  );
};

export default App;
