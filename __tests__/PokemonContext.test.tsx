import React from 'react';
import {Text} from 'react-native';
import {render, waitFor} from '@testing-library/react-native';
import {PokemonProvider, PokemonContext} from '../src/context/PokemonContext';

describe('PokemonContext', () => {
  it('ha de proveir l’estat inicial', async () => {
    const TestComponent = () => {
      return (
        <PokemonContext.Consumer>
          {({pokemons, loading, error}) => (
            <>
              <Text testID="loading">{loading ? 'true' : 'false'}</Text>
              <Text testID="error">{error || 'none'}</Text>
              <Text testID="pokemonCount">{pokemons.length.toString()}</Text>
            </>
          )}
        </PokemonContext.Consumer>
      );
    };

    const {getByTestId} = render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('false');
    });
  });
});
