import { useCatchPokemon } from "../hooks";
import { PokeCard } from "./PokeCard";

export function CaughtPokemonPokeCard(props) {
  const mutation = useCatchPokemon();
  function onCatchPokemon({ id, name, types, imageUrl }) {
    mutation.mutate({ id, name, types, imageUrl });
  }
  return <article className="daily-pokemon">
    <PokeCard {...props} />
    <button className="btn" disabled={typeof props.caught === 'boolean'} onClick={() => onCatchPokemon(props)}>Catch</button>
  </article>;
}
export default PokeCard;