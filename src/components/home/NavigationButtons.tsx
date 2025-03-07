import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../navigation/AppNavigator';
import Button from '../Button';

type TabNavigationProp = BottomTabNavigationProp<RootTabParamList>;

const NavigationButtons = () => {
  const navigation = useNavigation<TabNavigationProp>();

  return (
    <>
      <Button
        label="Check Pokemons"
        onPress={() => navigation.navigate('DataList')}
        style={styles.button}
        textStyle={styles.buttonText}
      />
      <Button
        label="Settings"
        onPress={() => navigation.navigate('Settings')}
        style={styles.button}
        textStyle={styles.buttonText}
      />
      <Button
        label="Geolocation"
        onPress={() => navigation.navigate('Geolocation')}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NavigationButtons;
