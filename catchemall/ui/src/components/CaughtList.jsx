import { useContext } from "react";
import { PokemonContext } from "../context/pokemonContext";
import { CaughtCard } from "./CaughtCard";

export function CaughtList() {
  const { pokemonCaught } = useContext(PokemonContext);
  return <div className="caught-list">
    {pokemonCaught.map((pokemon, index) =>
      <CaughtCard pokemon={pokemon} key={`${pokemon.id}_${index}`} />)}
  </div>;
}