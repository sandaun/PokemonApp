import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import DetailScreen from '../src/pages/DetailScreen';
import {PokemonContext} from '../src/context/PokemonContext';
import {fetchPokemonDetails} from '../src/services/pokeapi';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {pokemonId: 1},
  }),
}));

jest.mock('../src/services/pokeapi', () => ({
  fetchPokemonDetails: jest.fn(),
}));

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
};

const mockPokemonDetails = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: [{type: {name: 'grass'}}, {type: {name: 'poison'}}],
  abilities: [{ability: {name: 'overgrow'}}, {ability: {name: 'chlorophyll'}}],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
};

describe('DetailScreen', () => {
  const mockUpdatePokemon = jest.fn();

  const createMockContextValue = (overrides = {}) => ({
    pokemons: [mockPokemon],
    updatePokemon: mockUpdatePokemon,
    loading: false,
    error: null,
    fetchPokemons: jest.fn(),
    reloadPokemons: jest.fn(),
    addPokemon: jest.fn(),
    deletePokemon: jest.fn(),
    getPokemonCount: jest.fn().mockReturnValue(1),
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading indicator initially when fetching details', () => {
    (fetchPokemonDetails as jest.Mock).mockImplementation(
      () => new Promise(() => {}),
    );

    render(
      <PokemonContext.Provider value={createMockContextValue()}>
        <DetailScreen />
      </PokemonContext.Provider>,
    );

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays error message when fetch fails', async () => {
    (fetchPokemonDetails as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch'),
    );

    render(
      <PokemonContext.Provider value={createMockContextValue()}>
        <DetailScreen />
      </PokemonContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch/i)).toBeTruthy();
    });
  });

  it('displays pokemon details when fetch succeeds', async () => {
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(mockPokemonDetails);

    render(
      <PokemonContext.Provider value={createMockContextValue()}>
        <DetailScreen />
      </PokemonContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeTruthy();
      expect(screen.getByText('7 dm')).toBeTruthy();
      expect(screen.getByText('69 hg')).toBeTruthy();
      expect(screen.getByText('grass, poison')).toBeTruthy();
    });

    expect(mockUpdatePokemon).toHaveBeenCalledWith({
      ...mockPokemon,
      ...mockPokemonDetails,
    });
  });

  it('displays "Pokemon not found" when pokemon does not exist', () => {
    render(
      <PokemonContext.Provider value={createMockContextValue({pokemons: []})}>
        <DetailScreen />
      </PokemonContext.Provider>,
    );

    expect(screen.getByText(/Pokemon not found/i)).toBeTruthy();
  });

  it('opens edit modal when edit button is pressed', async () => {
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(mockPokemonDetails);

    render(
      <PokemonContext.Provider
        value={createMockContextValue({
          pokemons: [{...mockPokemon, ...mockPokemonDetails}],
        })}>
        <DetailScreen />
      </PokemonContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeTruthy();
    });

    fireEvent.press(screen.getByText('Edit'));

    await waitFor(() => {
      expect(screen.getByTestId('edit-pokemon-modal')).toBeTruthy();
    });
  });
});
