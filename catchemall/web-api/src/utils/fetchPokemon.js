function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function fetchDailyPokemon() {
  const numberToFetch = process.env['DAILY_POKEMON_NO'] ? parseInt(process.env['DAILY_POKEMON_NO']) : 5;
  const url = 'https://pokeapi.co/api/v2/pokemon';
  const fetchUrls = [];
  for (let i = 0; i < numberToFetch; i++) {
    fetchUrls.push(`${url}/${randomInteger(1, 151)}`);
  }
  return await Promise.all(fetchUrls.map(url => fetch(url).then(r => r.json().then(pokemon => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemon.sprites.front_default,
      types: pokemon.types.map(type => type.type.name)
    };
  }))));
}
