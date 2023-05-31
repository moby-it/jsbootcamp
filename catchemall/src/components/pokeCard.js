function PokeCard({ id, name, types, imageUrl }) {
  const catchPokemon = () => {
    console.log("tried to catch ", name);
    // function to catch a pokemon
  };
  return <div className="pokecard">
    <h2>#{id}</h2>
    <h2>{name}</h2>
    <h3>{types.join(",")}</h3>
    <img src={imageUrl} alt={name} />
    <button className="btn" onClick={catchPokemon}>Catch</button>
  </div>;
}
export default PokeCard;