import { useQuery } from 'react-query';
import { apiUrl } from '../utils/config';
import { fetchWithAuth } from '../utils/auth.helpers';

export function usePendingTrades() {
    return useQuery('pendingTrades', () => {
        return fetchWithAuth(`${apiUrl()}/pokemon/trade`).then(async (r) => {
            if (!r.ok) throw await r.text();
            return r.json();
        });
    });
}
