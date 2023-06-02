import { useContext, useState } from "react";
import { PokedexContext } from "../pokedexContext";

function PokeCard({ id, name, types, imageUrl }) {
  const [clicked, setClicked] = useState(false);
  const [caught, setCaught] = useState(false);
  let wrapperClass = "pokecard";
  if (caught) wrapperClass += " caught";
  const { catchPokemon } = useContext(PokedexContext);
  function onCatchPokemon({ id, name, types, imageUrl }) {
    if (!clicked) {
      setClicked(true);
      const caught = catchPokemon({ id, name, types, imageUrl });
      setCaught(caught);
    }
  }
  return <div className={wrapperClass}>
    <h2>#{id} {caught && <img height="20" src="favicon.ico" alt="caught" />}</h2>
    <h2>{name}</h2>
    <h3>{types.join(",")}</h3>
    <img src={imageUrl} alt={name} />
    <button className="btn" disabled={clicked} onClick={() => onCatchPokemon({ id, name, types, imageUrl })}>Catch</button>
  </div>;
}
export default PokeCard;