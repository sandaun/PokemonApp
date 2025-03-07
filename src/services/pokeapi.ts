export type Pokemon = {
  id: number;
  name: string;
  url: string;
};

export type PokemonDetails = {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: {ability: {name: string}}[];
  types: {type: {name: string}}[];
  sprites: {front_default: string};
};

export const fetchPokemons = async (): Promise<Pokemon[]> => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  if (!response.ok) {
    throw new Error('Failed to fetch pokemons');
  }
  const json = await response.json();
  const pokemons: Pokemon[] = json.results.map(
    (poke: {name: string; url: string}, index: number) => {
      const idMatch = poke.url.match(/\/pokemon\/(\d+)\//);
      const id = idMatch ? parseInt(idMatch[1], 10) : index + 1;
      return {id, name: poke.name, url: poke.url};
    },
  );
  return pokemons;
};

export const fetchPokemonDetails = async (
  url: string,
): Promise<PokemonDetails> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon details');
  }
  const data = await response.json();
  return data;
};
