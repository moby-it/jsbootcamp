import { useContext } from "react";
import { PokemonContext } from "../context/pokemonContext";
import { PokeCard } from "./PokeCard";

export function CaughtPokemonPokeCard(props) {
  const { catchPokemon } = useContext(PokemonContext);
  function onCatchPokemon({ id, name, types, imageUrl }) {
    catchPokemon({ id, name, types, imageUrl });
  }
  return <div className="daily-pokemon">
    <PokeCard {...props} />
    <button className="btn" disabled={typeof props.caught === 'boolean'} onClick={() => onCatchPokemon(props)}>Catch</button>
  </div>;
}
export default PokeCard;