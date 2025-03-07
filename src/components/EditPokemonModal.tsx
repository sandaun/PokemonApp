import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import {PokemonDetails} from '../services/pokeapi';

type EditPokemonModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (updatedDetails: Partial<PokemonDetails>) => void;
  pokemonDetails: PokemonDetails | null;
};

const EditPokemonModal: React.FC<EditPokemonModalProps> = ({
  visible,
  onClose,
  onSave,
  pokemonDetails,
}) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [types, setTypes] = useState('');
  const [abilities, setAbilities] = useState('');

  // Actualitzem els valors del formulari quan el modal es fa visible o els detalls canvien
  useEffect(() => {
    if (pokemonDetails) {
      setHeight(pokemonDetails.height?.toString() || '');
      setWeight(pokemonDetails.weight?.toString() || '');
      setTypes(pokemonDetails.types?.map(t => t.type.name).join(', ') || '');
      setAbilities(
        pokemonDetails.abilities?.map(a => a.ability.name).join(', ') || '',
      );
    }
  }, [pokemonDetails, visible]);

  const handleSave = () => {
    const updatedDetails: Partial<PokemonDetails> = {};

    // Sempre enviem les dades, encara que no hagin canviat, per assegurar l'actualització
    updatedDetails.height = parseInt(height, 10) || pokemonDetails?.height || 0;
    updatedDetails.weight = parseInt(weight, 10) || pokemonDetails?.weight || 0;

    // Processem els tipus sempre
    const typesList = types
      .split(',')
      .map(type => type.trim())
      .filter(Boolean);
    updatedDetails.types = typesList.map((typeName, index) => ({
      type: {name: typeName, url: ''},
      slot: index + 1,
    }));

    // Processem les habilitats sempre
    const abilitiesList = abilities
      .split(',')
      .map(ability => ability.trim())
      .filter(Boolean);
    updatedDetails.abilities = abilitiesList.map((abilityName, index) => ({
      ability: {name: abilityName, url: ''},
      is_hidden: index > 0,
      slot: index + 1,
    }));

    // Assegurem que enviem tots els detalls necessaris
    onSave({
      ...updatedDetails,
      id: pokemonDetails?.id || 0,
      name: pokemonDetails?.name || '',
    });

    onClose();
  };

  // Funció per reiniciar el formulari quan es tanca el modal sense guardar
  const handleClose = () => {
    if (pokemonDetails) {
      // Restaurem els valors originals
      setHeight(pokemonDetails.height?.toString() || '');
      setWeight(pokemonDetails.weight?.toString() || '');
      setTypes(pokemonDetails.types?.map(t => t.type.name).join(', ') || '');
      setAbilities(
        pokemonDetails.abilities?.map(a => a.ability.name).join(', ') || '',
      );
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Editar Pokemon</Text>

          {pokemonDetails && (
            <Text style={styles.pokemonName}>{pokemonDetails.name}</Text>
          )}

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Alçada (dm):</Text>
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                placeholder="Alçada en decímetres"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Pes (hg):</Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder="Pes en hectograms"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tipus (separats per comes):</Text>
              <TextInput
                style={styles.input}
                value={types}
                onChangeText={setTypes}
                placeholder="Ex: foc, volador"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Habilitats (separades per comes):
              </Text>
              <TextInput
                style={styles.input}
                value={abilities}
                onChangeText={setAbilities}
                placeholder="Ex: flama, poder-solar"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleClose}>
              <Text style={styles.buttonText}>Cancel·lar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}>
              <Text style={[styles.buttonText, styles.saveButtonText]}>
                Desar
              </Text>
            </TouchableOpacity>
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
  inputGroup: {
    marginBottom: 15,
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#343a40',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    backgroundColor: '#f8f9fa',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#495057',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#3498db',
  },
  saveButtonText: {
    color: 'white',
  },
});

export default EditPokemonModal;
