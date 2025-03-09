import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import DataListScreen from '../src/pages/DataListScreen';
import {PokemonContext} from '../src/context/PokemonContext';
import {getNewPokemonDetails} from '../src/data/mockPokemonData';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('../src/data/mockPokemonData', () => ({
  getNewPokemonDetails: jest.fn(),
}));

const mockPokemons = [
  {
    id: 1,
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
  {
    id: 25,
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  },
  {
    id: 7,
    name: 'squirtle',
    url: 'https://pokeapi.co/api/v2/pokemon/7/',
  },
];

describe('DataListScreen', () => {
  const mockAddPokemon = jest.fn();
  const mockDeletePokemon = jest.fn();

  const createMockContextValue = (overrides = {}) => ({
    pokemons: mockPokemons,
    loading: false,
    error: null,
    fetchPokemons: jest.fn(),
    reloadPokemons: jest.fn(),
    addPokemon: mockAddPokemon,
    deletePokemon: mockDeletePokemon,
    updatePokemon: jest.fn(),
    getPokemonCount: jest.fn().mockReturnValue(3),
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading indicator when loading state is true', () => {
    render(
      <PokemonContext.Provider value={createMockContextValue({loading: true})}>
        <DataListScreen />
      </PokemonContext.Provider>,
    );

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('displays error message when there is an error', () => {
    render(
      <PokemonContext.Provider
        value={createMockContextValue({error: 'Failed to load pokemons'})}>
        <DataListScreen />
      </PokemonContext.Provider>,
    );

    expect(screen.getByText('Failed to load pokemons')).toBeTruthy();
  });

  it('renders the list of pokemons correctly', () => {
    render(
      <PokemonContext.Provider value={createMockContextValue()}>
        <DataListScreen />
      </PokemonContext.Provider>,
    );

    expect(screen.getByText('bulbasaur')).toBeTruthy();
    expect(screen.getByText('pikachu')).toBeTruthy();
    expect(screen.getByText('squirtle')).toBeTruthy();
  });

  it('filters pokemons based on search input', () => {
    render(
      <PokemonContext.Provider value={createMockContextValue()}>
        <DataListScreen />
      </PokemonContext.Provider>,
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'pika');

    expect(screen.getByText('pikachu')).toBeTruthy();
    expect(screen.queryByText('bulbasaur')).toBeNull();
    expect(screen.queryByText('squirtle')).toBeNull();
  });

  it('adds a new pokemon when "Add Pokemon" button is pressed', () => {
    const newPokemon = {
      id: 4,
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
    };

    (getNewPokemonDetails as jest.Mock).mockReturnValue(newPokemon);

    render(
      <PokemonContext.Provider value={createMockContextValue()}>
        <DataListScreen />
      </PokemonContext.Provider>,
    );

    const addButton = screen.getByText('Add Pokemon');
    fireEvent.press(addButton);

    expect(getNewPokemonDetails).toHaveBeenCalled();
    expect(mockAddPokemon).toHaveBeenCalledWith(newPokemon);
  });

  it('deletes a pokemon when delete is triggered', async () => {
    render(
      <PokemonContext.Provider value={createMockContextValue()}>
        <DataListScreen />
      </PokemonContext.Provider>,
    );

    // Find all delete buttons (might be an icon or text)
    const deleteButtons = screen.getAllByTestId('delete-button');
    // Press the first delete button
    fireEvent.press(deleteButtons[0]);

    expect(mockDeletePokemon).toHaveBeenCalledWith(mockPokemons[0].id);
  });

  it('navigates to detail screen when a pokemon card is pressed', () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(require('@react-navigation/native'), 'useNavigation')
      .mockReturnValue({
        navigate: mockNavigate,
      });

    render(
      <PokemonContext.Provider value={createMockContextValue()}>
        <DataListScreen />
      </PokemonContext.Provider>,
    );

    // Find all pokemon cards
    const pokemonCards = screen.getAllByTestId('pokemon-card');
    // Press the first pokemon card
    fireEvent.press(pokemonCards[0]);

    expect(mockNavigate).toHaveBeenCalledWith('Detail', {
      pokemonId: mockPokemons[0].id,
    });
  });
});
