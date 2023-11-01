import { useQuery } from "react-query";
import { apiUrl } from "../utils/config";
import { fetchWithAuth } from "../utils/auth.helpers";

export function useDailyPokemon() {
  const query = useQuery('dailyPokemon', () => {
    return fetchWithAuth(`${apiUrl()}/pokemon/daily`).then(r => r.json());
  }, { enabled: true, staleTime: 20000 });
  return query;
}