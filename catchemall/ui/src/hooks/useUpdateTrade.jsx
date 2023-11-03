import { useMutation } from "react-query";
import { fetchWithAuth } from "../utils/auth.helpers";
import { apiUrl } from "../utils/config";

export function useUpdateTrade() {
  const mutation = useMutation('updateTrade', ({ tradeId, accepted }) => fetchWithAuth(`${apiUrl()}/pokemon/trade`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'PUT',
    body: JSON.stringify({ tradeId, accepted })
  }).then(async r => {
    const response = await r.text();
    if (r.ok) return response;
    throw response;
  }));
  return mutation;
}