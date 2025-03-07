import React, {useContext, useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, TextInput, StyleSheet} from 'react-native';
import {PokemonContext} from '../context/PokemonContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pokemon} from '../services/pokeapi';
import PokemonCard from '../components/PokemonCard';
import {getNewPokemonDetails} from '../data/mockPokemonData';
import Button from '../components/Button';
import {DataListStackParamList} from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<DataListStackParamList>;

const DataListScreen = () => {
  const {pokemons, loading, error, addPokemon, deletePokemon} =
    useContext(PokemonContext);
  const [searchText, setSearchText] = useState('');
  const [sortedPokemons, setSortedPokemons] = useState<Pokemon[]>(pokemons);
  const navigation = useNavigation<NavigationProp>();

  const filterAndSort = useCallback(() => {
    let filtered = pokemons.filter(p =>
      p.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    setSortedPokemons(filtered);
  }, [searchText, pokemons]);

  const handleDelete = (id: number) => {
    deletePokemon(id);
  };

  useEffect(() => {
    filterAndSort();
  }, [searchText, pokemons, filterAndSort]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={sortedPokemons}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <PokemonCard
              pokemon={item}
              onDelete={handleDelete}
              onPress={() =>
                navigation.navigate('Detail', {pokemonId: item.id})
              }
            />
          )}
        />
      )}
      <Button
        title="Add Pokemon"
        variant="primary"
        onPress={() => {
          const newPokemon = getNewPokemonDetails();
          addPokemon(newPokemon);
        }}
        style={styles.addButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  loadingText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginVertical: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    textAlign: 'center',
    marginVertical: 20,
  },
  addButton: {
    marginTop: 15,
  },
});

export default DataListScreen;
