import {fetchPokemons} from '../src/services/pokeapi';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        results: [
          {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'},
          {name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/'},
        ],
      }),
  }),
) as jest.Mock;

describe('fetchPokemons', () => {
  it('ha de retornar una llista de pokemons amb els seus ids', async () => {
    const pokemons = await fetchPokemons();
    expect(pokemons.length).toBe(2);
    expect(pokemons[0]).toHaveProperty('id', 1);
    expect(pokemons[0]).toHaveProperty('name', 'bulbasaur');
  });

  it('ha de llençar un error si la resposta no és ok', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      }),
    );
    await expect(fetchPokemons()).rejects.toThrow('Failed to fetch pokemons');
  });
});
