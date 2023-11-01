import { useQuery } from "react-query";
import { apiUrl } from "../utils/config";
import { fetchWithAuth } from "../utils/auth.helpers";

export function usePendingTrades() {
  return useQuery('pendingTrades', () => {
    return fetchWithAuth(`${apiUrl()}/pokemon/trade`).then(r => r.json());
  });
}