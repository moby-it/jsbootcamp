import { useQuery } from 'react-query';
import { fetchWithAuth } from '../utils/auth.helpers';
import { apiUrl } from '../utils/config';

export function useUsers() {
    return useQuery('fetchUsers', () => fetchWithAuth(`${apiUrl()}/users`).then((r) => r.json()), {
        staleTime: 10_000,
    });
}
