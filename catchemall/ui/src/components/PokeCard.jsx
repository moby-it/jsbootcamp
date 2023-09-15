import { useContext, useState } from "react";
import { PokedexContext } from "../context/pokedexContext";
import { CaughtIcon } from './CaughtIcon';
function PokeCard({ id, name, types, imageUrl }) {
  const [clicked, setClicked] = useState(false);
  const [caught, setCaught] = useState(false);
  let wrapperClass = "pokecard";
  if (caught) wrapperClass += " caught";
  const { catchPokemon } = useContext(PokedexContext);
  async function onCatchPokemon({ id, name, types, imageUrl }) {
    if (!clicked) {
      setClicked(true);
      const caught = await catchPokemon({ id, name, types, imageUrl });
      setCaught(caught);
    }
  }
  return <div className={wrapperClass}>
    <h2 className="p-1">#{id} {caught && <CaughtIcon />}</h2>
    <h2 className="p-1 mb-2">{name}</h2>
    <p>{types.join(",")}</p>
    <img src={imageUrl} alt={name} />
    <button className="btn" disabled={clicked} onClick={() => onCatchPokemon({ id, name, types, imageUrl })}>Catch</button>
  </div>;
}
export default PokeCard;