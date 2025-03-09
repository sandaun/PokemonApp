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

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getNewPokemonDetails = () => {
  const pokemonId = getRandomInt(1, 898);
  const name = getRandomElement(POKEMON_NAMES);

  const typeCount = Math.random() > 0.7 ? 2 : 1;
  const types = [];
  const usedTypes = new Set<string>();

  for (let i = 0; i < typeCount; i++) {
    let type = getRandomElement(POKEMON_TYPES);
    while (usedTypes.has(type)) {
      type = getRandomElement(POKEMON_TYPES);
    }
    usedTypes.add(type);
    types.push({type: {name: type}});
  }

  const stats = [
    {stat: {name: 'hp'}, base_stat: getRandomInt(20, 150)},
    {stat: {name: 'attack'}, base_stat: getRandomInt(30, 160)},
    {stat: {name: 'defense'}, base_stat: getRandomInt(30, 160)},
    {stat: {name: 'special-attack'}, base_stat: getRandomInt(30, 170)},
    {stat: {name: 'special-defense'}, base_stat: getRandomInt(30, 170)},
    {stat: {name: 'speed'}, base_stat: getRandomInt(20, 180)},
  ];

  const height = getRandomInt(3, 25);
  const weight = getRandomInt(40, 1000);

  const abilityCount = Math.random() > 0.5 ? 2 : 1;
  const abilities = [];

  for (let i = 0; i < abilityCount; i++) {
    abilities.push({
      ability: {
        name: `ability-${getRandomInt(1, 100)}`,
        url: `https://pokeapi.co/api/v2/ability/${getRandomInt(1, 100)}/`,
      },
      is_hidden: i > 0,
    });
  }

  return {
    id: Date.now(),
    name,
    url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`,
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
