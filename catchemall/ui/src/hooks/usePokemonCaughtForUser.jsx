import { useQuery } from 'react-query';
import { fetchWithAuth } from '../utils/auth.helpers';
import { apiUrl } from '../utils/config';

export function usePokemonCaughtForUser(userId) {
    if (!userId) throw new Error('cannot fetch pokemon for nullish user id');
    const query = useQuery(
        ['pokemonCaughtForUser', userId],
        () => fetchWithAuth(`${apiUrl()}/pokemon/caught/${userId}`).then((r) => r.json()),
        { staleTime: 5_000 }
    );
    return query;
}
