import React, {useContext} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {PokemonContext} from '../context/PokemonContext';
import WelcomeCard from '../components/home/WelcomeCard';

const HomeScreen = () => {
  const {getPokemonCount} = useContext(PokemonContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <WelcomeCard pokemonCount={getPokemonCount()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default HomeScreen;
