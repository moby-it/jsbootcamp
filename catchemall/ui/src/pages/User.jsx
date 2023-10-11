import { RefreshCircular } from 'iconoir-react';
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import { CaughtCard } from '../components/CaughtCard';
import { Modal } from "../components/Modal";
import { transform } from "../context/pokedexContext";
import { UserContext } from '../context/userContext';
import { fetchWithAuth } from "../utils/auth.helpers";
import { apiUrl } from "../utils/config";

/**
 * @argument {import("../context/pokedexContext").Pokemon[]} pokemonCaught
 * @returns {{quantity:number, pokemon: import("../context/pokedexContext").Pokemon}[]}
 */
function groupPokemonById(pokemonCaught) {
  const pokemonWithQuantity = new Map();

  pokemonCaught.forEach(pc => {
    if (!pokemonWithQuantity.has(pc.id)) {
      pokemonWithQuantity.set(pc.id, { ...pc, quantity: 1 });
    } else {
      const existingPokemon = pokemonWithQuantity.get(pc.id);
      pokemonWithQuantity.set(pc.id, { ...existingPokemon, quantity: existingPokemon.quantity + 1 });
    }
  });
  return Array.from(pokemonWithQuantity.values());
}

export function User() {
  let { id } = useParams();
  const [tradingPokemon, setTradingPokemon] = useState('');
  const { users, currentUser } = useContext(UserContext);
  const isCurrentUser = id === currentUser.id;
  const { data, isLoading, isSuccess } = useQuery(['pokemonCaughtForUser'],
    () => fetchWithAuth(`${apiUrl()}/pokemon/caught/${id}`).then(r => r.json()), { enabled: !!id });
  const user = users.find(u => u.id === +id);
  if (!id) return <h1>Where are you going?</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (isSuccess) {
    return <>
      <h2>Username: {user.username}</h2>
      {!data.length && <span>No pokemon caught</span>}
      <div className="col gap-1 user-caught-container p-1">
        {groupPokemonById(data.map(transform)).map(p =>
          <div className="row user-caught-pokemon" key={p.id}>
            <span>{p.quantity}x</span>
            <CaughtCard pokemon={p} />
            <span title="Trade" onClick={() => setTradingPokemon(p.name)}>
              {!isCurrentUser && <RefreshCircular className="cursor-pointer" />}
            </span>
          </div>
        )}
      </div>
      <Modal show={tradingPokemon} title={"Trading " + tradingPokemon} close={() => setTradingPokemon(null)}>
        <h1>I am the modal</h1>
      </Modal>
    </>;
  }
}