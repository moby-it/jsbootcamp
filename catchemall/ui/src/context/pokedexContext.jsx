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
 * @typedef {Object} DailyPokemon
 * @property {string} id - Pokemon pokedex id
 * @property {string} name
 * @property {Array<string>} types
 * @property {string} imageUrl
 * @property {boolean} caught
 */

/**
 * @typedef {Object} PokedexContextValue
 * @property {Array<Pokemon>} pokemonCaught
 * @property {Array<DailyPokemon>} dailyPokemon
 * @property {(Array<Pokemon>) =>void} setPokemonCaught
 * @property {(Array<DailyPokemon>) =>void} setDailyPokemon
 * @property {(pokemon:Pokemon) => Promise<void>} catchPokemon
 * @property {import("react-query").UseQueryResult} dailyPokemonQuery
 * 
 */

/**
 * @type {React.Context<PokedexContextValue>}
 */
export const PokedexContext = createContext(null);

function usePokedex() {
  const [pokemonCaught, setPokemonCaught] = useState([]);
  const [dailyPokemon, setDailyPokemon] = useState([]);

  const pokemonCaughtQuery = useQuery('pokemonCaught', () => {
    return fetchWithAuth(`${apiUrl()}/pokemon/caught`).then(r => r.json());
  });

  const dailyPokemonQuery = useQuery('dailyPokemon', () => {
    return fetchWithAuth(`${apiUrl()}/pokemon/daily`).then(r => r.json());
  });

  const { mutateAsync, isError } = useMutation('savePokemon', (pokemon) => postPokemonCaught(pokemon).then(
    () => setPokemonCaught([...pokemonCaught, pokemon])
  ));

  /**
   * 
   * @param {Pokemon} pokemon 
   * @returns {boolean}
   */
  async function catchPokemon(pokemon) {
    if (Math.random() > 0.5) {
      const newPokemonList = pokemonCaught.slice();
      newPokemonList.push(pokemon);
      await mutateAsync(pokemon);
      if (isError) return false;
      return true;
    }
    return false;
  }

  return {
    pokemonCaught,
    dailyPokemon,
    fetchPokemonCaught: pokemonCaughtQuery.refetch,
    catchPokemon,
    setPokemonCaught,
    setDailyPokemon,
    dailyPokemonQuery
  };
}
export function PokedexProvider({ children }) {
  const ctxValue = usePokedex();
  return <PokedexContext.Provider value={ctxValue}>
    {children}
  </PokedexContext.Provider>;
}