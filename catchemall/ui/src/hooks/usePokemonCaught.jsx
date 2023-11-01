import { useQuery } from "react-query";
import { apiUrl } from "../utils/config";
import { fetchWithAuth } from "../utils/auth.helpers";

export function usePokemonCaught() {
  const query = useQuery('pokemonCaught', () => {
    return fetchWithAuth(`${apiUrl()}/pokemon/caught`).then(r => r.json());
  });
  return query;
}