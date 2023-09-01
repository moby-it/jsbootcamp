import { createContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchWithAuth } from "../utils/auth.helpers";
import { apiUrl } from "../utils/config";

/**
 * 
 * @param {Pokemon} lastPokemonCaught 
 * @returns 
 */
function postPokemonCaught(lastPokemonCaught) {
  return fetchWithAuth(`${apiUrl()}/pokemon/catch`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(lastPokemonCaught)
  });
}

/**
 * @typedef {Object} Pokemon
 * @property {string} id - Pokemon pokedex id
 * @property {string} name
 * @property {Array<string>} types
 * @property {string} imageUrl 
 */

/**
 * @typedef {Object} PokedexContextValue
 * @property {Array<Pokemon>} pokemonCaught - An array of caught pokemons.
 * @property {(Array<Pokemon>)=>void} setPokemonCaught
 * @property {(pokemon:Pokemon)=> Promise<void>} catchPokemon - A function to catch a pokemon.
 */

/**
 * @type {React.Context<PokedexContextValue>}
 */
export const PokedexContext = createContext(null);

function usePokedex() {
  const [pokemonCaught, setPokemonCaught] = useState([]);
  const pokemonCaughtQuery = useQuery('pokemonCaught', () => {
    return fetchWithAuth(`${apiUrl()}/pokemon/caught`).then(r => r.json());
  }, { enabled: false });

  const { mutate } = useMutation('savePokemon', (pokemon) => postPokemonCaught(pokemon).then(
    () => setPokemonCaught([...pokemonCaught, pokemon])
  ));

  async function catchPokemon(pokemon) {
    if (Math.random() > 0.5) {
      const newPokemonList = pokemonCaught.slice();
      newPokemonList.push(pokemon);
      mutate(pokemon);
      return true;
    }
    return false;
  }
  return {
    pokemonCaught,
    fetchPokemonCaught: pokemonCaughtQuery.refetch,
    catchPokemon,
    setPokemonCaught
  };
}
export function PokedexProvider({ children }) {
  const ctxValue = usePokedex();
  return <PokedexContext.Provider value={ctxValue}>
    {children}
  </PokedexContext.Provider>;
}