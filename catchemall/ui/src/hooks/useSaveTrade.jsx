import { useMutation } from "react-query";
import { fetchWithAuth } from "../utils/auth.helpers";
import { apiUrl } from "../utils/config";

export function useSaveTrade() {
  const mutation = useMutation('saveTrade', ({ initiatorUserPokemonId, responderUserPokemonId }) => fetchWithAuth(`${apiUrl()}/pokemon/trade`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify({ initiatorUserPokemonId, responderUserPokemonId })
  }));
  async function saveTrade(initiatorUserPokemonId, responderUserPokemonId) {
    await mutation.mutateAsync({initiatorUserPokemonId, responderUserPokemonId});
    if (mutation.isError) return false;
    console.log('saved trade for user pokemon id', initiatorUserPokemonId, responderUserPokemonId);
  }
  return { saveTrade };
}