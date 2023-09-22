import { useContext } from "react";
import { PokedexContext } from "../context/pokedexContext";
import { CaughtIcon } from './CaughtIcon';
function PokeCard(props) {
  let wrapperClass = "pokecard";
  if (props.caught) wrapperClass += " caught";
  const { catchPokemon } = useContext(PokedexContext);
  function onCatchPokemon({ id, name, types, imageUrl }) {
    catchPokemon({ id, name, types, imageUrl });
  }
  return <div className={wrapperClass}>
    <h2 className="p-1">#{props.id} {props.caught && <CaughtIcon />}</h2>
    <h2 className="p-1 mb-2">{props.name}</h2>
    <p>{props.types.join(",")}</p>
    <img src={props.imageUrl} alt={props.name} />
    <button className="btn" disabled={typeof props.caught === 'boolean'} onClick={() => onCatchPokemon(props)}>Catch</button>
  </div>;
}
export default PokeCard;