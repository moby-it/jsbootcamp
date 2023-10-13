import { useContext } from "react";
import { PokemonContext } from "../context/pokemonContext";
import { CaughtCard } from "./CaughtCard";

export function CaughtList() {
  const { pokemonCaught } = useContext(PokemonContext);
  return <div className="caught-list">
    {pokemonCaught.map(pokemon => <CaughtCard pokemon={pokemon} key={pokemon.id} />)}
  </div>;
}