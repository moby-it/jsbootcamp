import { useQuery } from 'react-query';
import { apiUrl } from '../utils/config';
import { fetchWithAuth } from '../utils/auth.helpers';

export function useDailyPokemon() {
    const query = useQuery(
        'dailyPokemon',
        () => {
            return fetchWithAuth(`${apiUrl()}/pokemon/daily`).then((r) => r.json());
        },
        { staleTime: 30_0000 },
    );
    return query;
}
