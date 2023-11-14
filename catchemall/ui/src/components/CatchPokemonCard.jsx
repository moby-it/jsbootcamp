import { useCatchPokemon } from '../hooks';
import { PokeCard } from './PokeCard';

/**
 *
 * @param {{pokemon: import('../utils/transformPokemon').DailyPokemon}} props
 * @returns
 */
export function CatchPokemonPokeCard({ pokemon }) {
    const mutation = useCatchPokemon();
    function onCatchPokemon({ id, name, types, imageUrl }) {
        mutation.mutate({ id, name, types, imageUrl });
    }
    return (
        <article className="daily-pokemon">
            <PokeCard
                caught={pokemon.caught}
                id={pokemon.pokedex_id}
                types={pokemon.types}
                name={pokemon.name}
                imageUrl={pokemon.imageUrl}
            />
            <button
                className="btn"
                disabled={typeof pokemon.caught === 'boolean'}
                onClick={() => onCatchPokemon(pokemon)}
            >
                Catch
            </button>
        </article>
    );
}
export default PokeCard;
