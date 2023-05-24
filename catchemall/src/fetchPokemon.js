
const url = 'https://pokeapi.co/api/v2/pokemon';

const existingIds = [];

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomKantoPokemonId() {
  const newPokemonId = randomInteger(1, 151);
  // recursive function exit condition
  if (!existingIds.includes(newPokemonId)) {
    existingIds.push(newPokemonId);
    return newPokemonId;
  }
  return getRandomKantoPokemonId();
}
export async function fetchPokemon(numberToFetch = 5) {
  const fetchUrls = [];
  for (let i = 0; i < numberToFetch; i++) {
    fetchUrls.push(`${url}/${getRandomKantoPokemonId()}`);
  }
  return await Promise.all(fetchUrls.map(url => fetch(url).then(r => r.json().then(pokemon => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      types: pokemon.types.map(type => type.type.name)
    };
  }))));
}
