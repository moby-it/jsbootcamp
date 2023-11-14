import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { usePokemonCaughtForUser } from '../hooks';

export function usePokemonCaught() {
    const { currentUser } = useContext(UserContext);
    const query = usePokemonCaughtForUser(currentUser.id);
    return query;
}
