import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Button, View} from 'react-native';
import {Pokemon} from '../services/pokeapi';

type PokemonCardProps = {
  pokemon: Pokemon;
  onPress: () => void;
  onDelete: (id: number) => void;
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onPress,
  onDelete,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.name}>{pokemon.name}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Delete"
          onPress={() => onDelete(pokemon.id)}
          color="#dc3545"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
  name: {
    fontSize: 18,
    color: '#3498db',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginLeft: 10,
  },
});

export default PokemonCard;
