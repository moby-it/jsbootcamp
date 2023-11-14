import { CatchPokemonPokeCard } from '../components/CatchPokemonCard';
import { CaughtList } from '../components/CaughtList';
import { useDailyPokemon } from '../hooks';
import { useEffect } from 'react';

export function DailyPokemon() {
    const dailyPokemonQuery = useDailyPokemon();

    // at 12AM daily pokemon rotates for every user so we need to refetch
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const isMidnight = Math.abs(midnight.getTime() - now.getTime()) < 1000;
            if (isMidnight) dailyPokemonQuery.refetch();
            return () => clearInterval(interval);
        }, 1000);
    }, [dailyPokemonQuery]);

    return (
        <>
            <div className="pokecard-list">
                {!dailyPokemonQuery.isSuccess
                    ? []
                    : dailyPokemonQuery.data
                          .map(transform)
                          .map((pokemon) => <CatchPokemonPokeCard key={`${pokemon.id}`} pokemon={pokemon} />)}
            </div>
            <CaughtList />
        </>
    );
}
/**
 *
 * @param {unknown} p
 * @returns {import('../utils/transformPokemon').DailyPokemon}
 */
function transform(p) {
    return {
        id: p.id,
        caught: p.caught,
        imageUrl: p.image_url,
        name: p.name,
        pokedex_id: p.pokedex_id,
        types: p.types,
    };
}
