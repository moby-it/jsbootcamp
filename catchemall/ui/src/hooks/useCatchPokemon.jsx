import { useMutation } from 'react-query';
import { fetchWithAuth } from '../utils/auth.helpers';
import { apiUrl } from '../utils/config';
import { useDailyPokemon } from './useDailyPokemon';
import { usePokemonCaught } from './usePokemonCaught';

function postPokemonCaught(lastPokemonCaught) {
    return fetchWithAuth(`${apiUrl()}/pokemon/catch/${lastPokemonCaught.id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(lastPokemonCaught),
    }).then((r) => r.json());
}

export function useCatchPokemon() {
    const pokemonCaught = usePokemonCaught();
    const dailyPokemon = useDailyPokemon();
    return useMutation('savePokemon', (pokemon) => postPokemonCaught(pokemon), {
        onSuccess: ({ caught }) => {
            if (caught) {
                pokemonCaught.refetch();
            }
            dailyPokemon.refetch();
        },
    });
}
