import { useContext } from "react";
import { PokemonContext } from "../context/pokemonContext";
import { useMutation } from "react-query";
import { fetchWithAuth } from "../utils/auth.helpers";
import { apiUrl } from "../utils/config";

function postPokemonCaught(lastPokemonCaught) {
  return fetchWithAuth(`${apiUrl()}/pokemon/catch/${lastPokemonCaught.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(lastPokemonCaught)
  }).then(r => r.json());
}


export function useCatchPokemon() {
  const { setDailyPokemon, setPokemonCaught, dailyPokemon, pokemonCaught } = useContext(PokemonContext);
  return useMutation('savePokemon', (pokemon) => postPokemonCaught(pokemon).then(
    ({ caught }) => {
      if (caught) {
        setPokemonCaught([...pokemonCaught, pokemon]);
      }
      setDailyPokemon(dailyPokemon.map(dp => dp.id === pokemon.id ? { ...dp, caught } : dp));
    }
  ));
}