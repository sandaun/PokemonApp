import React, {useContext} from 'react';
import {View, StyleSheet, SafeAreaView, Alert} from 'react-native';
import {PokemonContext} from '../context/PokemonContext';
import SettingsCard from '../components/SettingsCard';
import SettingRow from '../components/SettingRow';
import Button from '../components/Button';

const SettingsScreen = () => {
  const {reloadPokemons} = useContext(PokemonContext);

  const showConfirmationAlert = (
    title: string,
    message: string,
    onConfirm: () => void,
  ) => {
    Alert.alert(title, message, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: onConfirm,
      },
    ]);
  };

  const handleReloadPokemons = () => {
    showConfirmationAlert(
      'Reload Pokemons',
      'Are you sure you want to reload the Pokemon list?',
      () => {
        reloadPokemons();
        Alert.alert('Success', 'Pokemon list has been reloaded!');
      },
    );
  };

  const handleResetSettings = () => {
    showConfirmationAlert(
      'Reset Settings',
      'Are you sure you want to reset all settings?',
      () => {
        Alert.alert(
          'Settings Reset',
          'All settings have been reset to default.',
        );
      },
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SettingsCard title="Settings">
          <SettingRow label="App Version" value="1.0.0" />
          <SettingRow label="Build Number" value="1001" />

          <View style={styles.spacer} />

          <Button title="Reload Pokemon List" onPress={handleReloadPokemons} />
          <Button
            title="Reset All Settings"
            onPress={handleResetSettings}
            variant="danger"
          />
        </SettingsCard>
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
  spacer: {
    height: 20,
  },
});

export default SettingsScreen;
