import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {PokemonContext} from '../context/PokemonContext';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {fetchPokemonDetails, PokemonDetails} from '../services/pokeapi';
import {DataListStackParamList} from '../navigation/AppNavigator';
import EditPokemonModal from '../components/EditPokemonModal';

type DetailScreenRouteProp = RouteProp<DataListStackParamList, 'Detail'>;

interface DetailRowProps {
  name: string;
  value: string | number;
  containerStyle?: ViewStyle;
  nameStyle?: TextStyle;
  valueStyle?: TextStyle;
}

const DetailRow = ({
  name,
  value,
  containerStyle,
  nameStyle,
  valueStyle,
}: DetailRowProps) => {
  return (
    <View style={[styles.detailRow, containerStyle]}>
      <Text style={[styles.detailName, nameStyle]}>{name}:</Text>
      <Text style={[styles.detailValue, valueStyle]}>{value}</Text>
    </View>
  );
};

const DetailScreen = () => {
  const {pokemons, updatePokemon} = useContext(PokemonContext);
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation();
  const {pokemonId} = route.params;
  const pokemon = pokemons.find(p => p.id === pokemonId);

  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    if (pokemon && pokemon.url && !pokemon.height) {
      setLoading(true);
      fetchPokemonDetails(pokemon.url)
        .then(data => {
          setDetails(data);
          updatePokemon({...pokemon, ...data});
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    } else if (pokemon) {
      setDetails(pokemon as PokemonDetails);
    }
  }, [pokemon, updatePokemon]);

  const handleEditPokemon = (updatedDetails: Partial<PokemonDetails>) => {
    if (!details || !pokemon) {
      return;
    }

    const newDetails: PokemonDetails = {
      ...details,
      ...updatedDetails,
    };

    setDetails(newDetails);
    updatePokemon({...pokemon, ...newDetails});
    setIsEditModalVisible(false);
  };

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Pokemon not found 😢</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#3498db"
          testID="loading-indicator"
        />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error} ❌</Text>
      ) : details ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{pokemon.name}</Text>
          {details.sprites && details.sprites.front_default && (
            <Image
              source={{uri: details.sprites.front_default}}
              style={styles.pokemonImage}
              resizeMode="contain"
              testID="pokemon-image"
            />
          )}
          <DetailRow name="ID" value={details.id} />
          <DetailRow name="Height" value={`${details.height} dm`} />
          <DetailRow name="Weight" value={`${details.weight} hg`} />
          <DetailRow
            name="Types"
            value={details.types.map(t => t.type.name).join(', ')}
          />
          <DetailRow
            name="Abilities"
            value={details.abilities.map(a => a.ability.name).join(', ')}
          />

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditModalVisible(true)}
            testID="edit-button">
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>

          <EditPokemonModal
            visible={isEditModalVisible}
            onClose={() => setIsEditModalVisible(false)}
            onSave={handleEditPokemon}
            pokemonDetails={details}
            testID="edit-pokemon-modal"
          />
        </View>
      ) : (
        <Text style={styles.noDetailsText}>No details available to show.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  pokemonImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 15,
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  detailValue: {
    fontSize: 18,
    color: '#495057',
    flexShrink: 1,
    textAlign: 'right',
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    marginBottom: 20,
  },
  noDetailsText: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default DetailScreen;
