import axios from 'axios';
const pokedex = [];
async function findPokemon(i) {
  const request = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);

  return request;
}


for (let i = 1; i < 152; i++) {
  await findPokemon(i).then(request => {
    const pokemon = { name: request.data.name, imageUrl: request.data.sprites.front_default, no: request.data.id, types: [request.data.types[0].type.name] }
    if (request.data.types[1]) {
      pokemon.types = [...pokemon.types, request.data.types[1].type.name];

    }
    pokedex[i - 1] = pokemon;
  })
}
export { pokedex };