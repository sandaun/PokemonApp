import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import {PokemonDetails} from '../services/pokeapi';
import FormInput from './FormInput';
import Button from './Button';

type EditPokemonModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (updatedDetails: Partial<PokemonDetails>) => void;
  pokemonDetails: PokemonDetails | null;
  testID?: string;
};

const EditPokemonModal: React.FC<EditPokemonModalProps> = ({
  visible,
  onClose,
  onSave,
  pokemonDetails,
  testID,
}) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [types, setTypes] = useState('');
  const [abilities, setAbilities] = useState('');

  useEffect(() => {
    if (visible && pokemonDetails) {
      setHeight(pokemonDetails.height?.toString() || '');
      setWeight(pokemonDetails.weight?.toString() || '');
      setTypes(pokemonDetails.types?.map(t => t.type.name).join(', ') || '');
      setAbilities(
        pokemonDetails.abilities?.map(a => a.ability.name).join(', ') || '',
      );
    }
  }, [pokemonDetails, visible]);

  const handleSave = () => {
    if (!pokemonDetails) {
      return;
    }

    const updatedDetails: Partial<PokemonDetails> = {};

    const heightNum = parseInt(height, 10);
    if (!isNaN(heightNum)) {
      updatedDetails.height = heightNum;
    } else if (pokemonDetails.height) {
      updatedDetails.height = pokemonDetails.height;
    }

    const weightNum = parseInt(weight, 10);
    if (!isNaN(weightNum)) {
      updatedDetails.weight = weightNum;
    } else if (pokemonDetails.weight) {
      updatedDetails.weight = pokemonDetails.weight;
    }

    if (types.trim()) {
      const typesList = types
        .split(',')
        .map(type => type.trim())
        .filter(Boolean);
      updatedDetails.types = typesList.map((typeName, index) => ({
        type: {name: typeName, url: ''},
        slot: index + 1,
      }));
    } else {
      updatedDetails.types = pokemonDetails.types;
    }

    if (abilities.trim()) {
      const abilitiesList = abilities
        .split(',')
        .map(ability => ability.trim())
        .filter(Boolean);
      updatedDetails.abilities = abilitiesList.map((abilityName, index) => ({
        ability: {name: abilityName, url: ''},
        is_hidden: index > 0,
        slot: index + 1,
      }));
    } else {
      updatedDetails.abilities = pokemonDetails.abilities;
    }

    updatedDetails.id = pokemonDetails.id;
    updatedDetails.name = pokemonDetails.name;

    if (pokemonDetails.sprites) {
      updatedDetails.sprites = pokemonDetails.sprites;
    }

    onSave(updatedDetails);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      testID={testID}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centeredView}
        testID={`${testID}-container`}>
        <View style={styles.modalView} testID={`${testID}-view`}>
          <Text style={styles.modalTitle}>Edit Pokemon</Text>

          {pokemonDetails && (
            <Text style={styles.pokemonName}>{pokemonDetails.name}</Text>
          )}

          <View style={styles.formContainer}>
            <FormInput
              label="Height (dm):"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              placeholder="Height in decimeters"
              testID={`${testID}-height-input`}
            />

            <FormInput
              label="Weight (hg):"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="Weight in hectograms"
              testID={`${testID}-weight-input`}
            />

            <FormInput
              label="Types (comma separated):"
              value={types}
              onChangeText={setTypes}
              placeholder="Ex: fire, flying"
              testID={`${testID}-types-input`}
            />

            <FormInput
              label="Abilities (comma separated):"
              value={abilities}
              onChangeText={setAbilities}
              placeholder="Ex: flame, solar-power"
              testID={`${testID}-abilities-input`}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={onClose}
              style={styles.cancelButton}
              variant="secondary"
              testID={`${testID}-cancel-button`}
            />
            <Button
              title="Save"
              onPress={handleSave}
              style={styles.saveButton}
              variant="primary"
              testID={`${testID}-save-button`}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    maxHeight: windowHeight * 0.7,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#343a40',
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#3498db',
  },
  formContainer: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: 5,
  },
  saveButton: {
    flex: 1,
    marginLeft: 5,
  },
});

export default EditPokemonModal;
