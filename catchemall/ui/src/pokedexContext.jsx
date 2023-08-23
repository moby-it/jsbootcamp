import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { apiUrl } from "./config";

/**
 * 
 * @param {Pokemon} lastPokemonCaught 
 * @returns 
 */
function postPokemonCaught(lastPokemonCaught) {
  return fetch(`${apiUrl()}/pokemon/catch`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(lastPokemonCaught)
  }).then(r => console.log(r));
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
 * @property {(pokemon:Pokemon)=> void} catchPokemon - A function to catch a pokemon.
 */


/**
 * @type {React.Context<PokedexContextValue>}
 */
export const PokedexContext = createContext(null);


function usePokedex() {
  const { data } = useQuery('pokemonCaught', () => {
    return fetch(`${apiUrl()}/pokemon/caught`).then(r => r.json());
  });
  useEffect(() => {
    if (data) {
      setPokemonCaught(data);
    }
  }, [data]);
  const [pokemonCaught, setPokemonCaught] = useState([]);
  const { mutate } = useMutation('savePokemon', (pokemon) => postPokemonCaught(pokemon));
  useEffect(() => {
    const lastPokemonCaught = pokemonCaught[pokemonCaught.length - 1];
    if (lastPokemonCaught) {
      mutate(lastPokemonCaught);
    }
  }, [pokemonCaught, mutate]);

  function catchPokemon(pokemon) {
    if (Math.random() > 0.5) {
      const newPokemonList = pokemonCaught.slice();
      newPokemonList.push(pokemon);
      setPokemonCaught(newPokemonList);
      return true;
    }
    return false;
  }
  return {
    pokemonCaught,
    catchPokemon
  };
}
export function PokedexProvider({ children }) {
  const { pokemonCaught, catchPokemon } = usePokedex();
  return <PokedexContext.Provider value={{ pokemonCaught, catchPokemon }}>
    {children}
  </PokedexContext.Provider>;
}