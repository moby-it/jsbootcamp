import { useContext, useState } from "react";
import { PokedexContext } from "../pokedexContext";

function PokeCard({ id, name, types, imageUrl }) {
  const [clicked, setClicked] = useState(false);
  const { catchPokemon } = useContext(PokedexContext);
  function onCatchPokemon({ id, name, types, imageUrl }) {
    if (!clicked) {
      setClicked(true);
      catchPokemon({ id, name, types, imageUrl });
    }
  }
  return <div className="pokecard">
    <h2>#{id}</h2>
    <h2>{name}</h2>
    <h3>{types.join(",")}</h3>
    <img src={imageUrl} alt={name} />
    <button className="btn" onClick={() => onCatchPokemon({ id, name, types, imageUrl })}>Catch</button>
  </div>;
}
export default PokeCard;