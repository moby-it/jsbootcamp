import { createContext, useState } from "react";

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
 * @typedef {Object} PokemonContextValue
 * @property {Array<Pokemon>} pokemonCaught
 * @property {Array<DailyPokemon>} dailyPokemon
 * @property {(Array<Pokemon>) =>void} setPokemonCaught
 * @property {(Array<DailyPokemon>) =>void} setDailyPokemon
 */

/**
 * @type {React.Context<PokemonContextValue>}
 */
export const PokemonContext = createContext(null);

function usePokedex() {
  const [pokemonCaught, setPokemonCaught] = useState([]);
  const [dailyPokemon, setDailyPokemon] = useState([]);

  return {
    pokemonCaught,
    dailyPokemon,
    setPokemonCaught,
    setDailyPokemon,
  };
}

/**
 * @description takes as input an pokemon as return from the api and transforms it to what the ui needs
 * @param {{id:number,:string, pokedex_id: number,types:string[], image_url:string,caught:boolean}} p 
 * @returns {import("./pokemonContext").Pokemon}
 */
export function transform(p) {
  return {
    userPokemonId: p.id,
    name: p.name, id: p.pokedex_id, types: p.types, imageUrl: p.image_url, caught: p.caught
  };
}
export function PokemonProvider({ children }) {
  const ctxValue = usePokedex();
  return <PokemonContext.Provider value={ctxValue}>
    {children}
  </PokemonContext.Provider>;
}