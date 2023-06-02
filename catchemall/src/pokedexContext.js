import { createContext, useState } from "react";

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
  const [pokemonCaught, setPokemonCaught] = useState([]);

  function catchPokemon(pokemon) {
    if (Math.random() > 0.5) {
      setPokemonCaught([...pokemonCaught, pokemon]);
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