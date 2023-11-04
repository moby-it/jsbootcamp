import { transform } from '../utils/transformPokemon';
import { usePokemonCaught } from '../hooks';
import { CaughtCard } from './CaughtCard';

export function CaughtList() {
    const query = usePokemonCaught();
    return (
        <div className="caught-list">
            {!query.isSuccess
                ? []
                : query.data
                      .map(transform)
                      .map((pokemon, index) => (
                          <CaughtCard pokemon={pokemon} key={`${pokemon.id}_${index}_${pokemon.caught}`} />
                      ))}
        </div>
    );
}
