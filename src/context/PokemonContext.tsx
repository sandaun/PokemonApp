import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {
  Pokemon,
  fetchPokemons as fetchPokemonsFromAPI,
} from '../services/pokeapi';

type PokemonContextType = {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  fetchPokemons: () => void;
  reloadPokemons: () => void;
  addPokemon: (pokemon: Pokemon) => void;
  updatePokemon: (pokemon: Pokemon) => void;
  deletePokemon: (id: number) => void;
  getPokemonCount: () => number;
};

export const PokemonContext = createContext<PokemonContextType>({
  pokemons: [],
  loading: false,
  error: null,
  fetchPokemons: () => {},
  reloadPokemons: () => {},
  addPokemon: () => {},
  updatePokemon: () => {},
  deletePokemon: () => {},
  getPokemonCount: () => 0,
});

type PokemonProviderProps = {
  children: ReactNode;
};

export const PokemonProvider: React.FC<PokemonProviderProps> = ({children}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemons = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonsFromAPI();
      setPokemons(data);
    } catch (err) {
      setError('Error obtenint els pokemons');
    } finally {
      setLoading(false);
    }
  };

  const reloadPokemons = async () => {
    setLoading(true);
    setError(null);
    setPokemons([]);
    try {
      const data = await fetchPokemonsFromAPI();
      setPokemons(data);
    } catch (err) {
      setError('Error reloading pokemons');
    } finally {
      setLoading(false);
    }
  };

  const addPokemon = (pokemon: Pokemon) => {
    setPokemons(prev => [...prev, pokemon]);
  };

  const updatePokemon = (updatedPokemon: Pokemon) => {
    setPokemons(prev =>
      prev.map(p =>
        p.id === updatedPokemon.id ? {...p, ...updatedPokemon} : p,
      ),
    );
  };

  const deletePokemon = (id: number) => {
    setPokemons(prev => prev.filter(p => p.id !== id));
  };

  const getPokemonCount = () => {
    return pokemons.length;
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        loading,
        error,
        fetchPokemons,
        reloadPokemons,
        addPokemon,
        updatePokemon,
        deletePokemon,
        getPokemonCount,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};
