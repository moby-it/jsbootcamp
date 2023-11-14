import { useMutation } from 'react-query';
import { fetchWithAuth } from '../utils/auth.helpers';
import { apiUrl } from '../utils/config';

export function useSaveTrade() {
    const mutation = useMutation('saveTrade', ({ initiatorUserPokemonId, responderUserPokemonId }) =>
        fetchWithAuth(`${apiUrl()}/pokemon/trade`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ initiatorUserPokemonId, responderUserPokemonId }),
        }),
    );
    return mutation;
}
