import { createContext, useEffect, useState } from "react";

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

/**
 * @type {string | null | Pokemon[]}
 */
let caughtPokemon = localStorage.getItem('pokedex');
if (caughtPokemon) {
  try {
    caughtPokemon = JSON.parse(caughtPokemon);
  } catch (e) {
    console.error("failed to parse pokedex json on local storage", e);
    caughtPokemon = [];
  }
  if (!Array.isArray(caughtPokemon)) {
    console.error('pokedex on local storage is not an array. Defaulting to empty array');
    caughtPokemon = [];
  }
} else {
  caughtPokemon = [];
}
function usePokedex() {
  const [pokemonCaught, setPokemonCaught] = useState(caughtPokemon);
  useEffect(() => {
    const lastPokemonCaught = pokemonCaught[pokemonCaught.length - 1];
    fetch("http://localhost:4000/catch", {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify(lastPokemonCaught)
    }).then(r => console.log(r));
  }, [pokemonCaught]);
  function catchPokemon(pokemon) {
    if (Math.random() > 0.5) {
      const newPokemonList = pokemonCaught.slice();
      newPokemonList.push(pokemon);
      setPokemonCaught(newPokemonList);
      localStorage.setItem('pokedex', JSON.stringify(newPokemonList));
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