import { useContext } from "react";
import { PokedexContext } from "../context/pokedexContext";
import { CaughtCard } from "./CaughtCard";

export function CaughtList() {
  const { pokemonCaught } = useContext(PokedexContext);
  return <div className="caught-list">
    {pokemonCaught.map(pokemon => <CaughtCard pokemon={pokemon} key={pokemon.id} />)}
  </div>;
}