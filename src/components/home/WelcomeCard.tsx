import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigationButtons from './NavigationButtons';

type WelcomeCardProps = {
  pokemonCount: number;
};

const WelcomeCard = ({pokemonCount}: WelcomeCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Welcome to Pokemon App!</Text>
      <Text style={styles.summary}>Total Pokemons: {pokemonCount}</Text>
      <NavigationButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  summary: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666',
  },
});

export default WelcomeCard;
