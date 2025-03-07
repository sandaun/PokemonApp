// Define constants for randomization
const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

const POKEMON_NAMES = [
  'bulbasaur',
  'charmander',
  'squirtle',
  'pikachu',
  'eevee',
  'mewtwo',
  'gengar',
  'dragonite',
  'snorlax',
  'gyarados',
  'alakazam',
  'machamp',
  'lapras',
  'vaporeon',
  'jolteon',
  'flareon',
  'espeon',
  'umbreon',
  'leafeon',
  'glaceon',
];

// Helper functions to generate random values
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getNewPokemonDetails = () => {
  // Generate random Pokemon ID (1-898, the range of valid Pokemon in National Pokedex)
  const pokemonId = getRandomInt(1, 898);
  const name = getRandomElement(POKEMON_NAMES);

  // Generate 1-2 random types
  const typeCount = Math.random() > 0.7 ? 2 : 1;
  const types = [];
  const usedTypes = new Set<string>();

  for (let i = 0; i < typeCount; i++) {
    let type = getRandomElement(POKEMON_TYPES);
    // Avoid duplicate types
    while (usedTypes.has(type)) {
      type = getRandomElement(POKEMON_TYPES);
    }
    usedTypes.add(type);
    types.push({type: {name: type}});
  }

  // Generate random stats
  const stats = [
    {stat: {name: 'hp'}, base_stat: getRandomInt(20, 150)},
    {stat: {name: 'attack'}, base_stat: getRandomInt(30, 160)},
    {stat: {name: 'defense'}, base_stat: getRandomInt(30, 160)},
    {stat: {name: 'special-attack'}, base_stat: getRandomInt(30, 170)},
    {stat: {name: 'special-defense'}, base_stat: getRandomInt(30, 170)},
    {stat: {name: 'speed'}, base_stat: getRandomInt(20, 180)},
  ];

  // Generate random height (in decimeters) and weight (in hectograms)
  const height = getRandomInt(3, 25);
  const weight = getRandomInt(40, 1000);

  // Generate random abilities (1-2)
  const abilityCount = Math.random() > 0.5 ? 2 : 1;
  const abilities = [];

  for (let i = 0; i < abilityCount; i++) {
    abilities.push({
      ability: {
        name: `ability-${getRandomInt(1, 100)}`,
        url: `https://pokeapi.co/api/v2/ability/${getRandomInt(1, 100)}/`,
      },
      is_hidden: i > 0, // First ability is not hidden, second is hidden
    });
  }

  return {
    id: Date.now(), // Keep using timestamp for unique ID in app
    name,
    url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`,
    // Use official artwork with the random pokemonId
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
    height,
    weight,
    types,
    stats,
    species: {
      name,
      url: `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`,
    },
    abilities,
  };
};
