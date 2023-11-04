import { CaughtIcon } from './CaughtIcon';

export function CaughtCard({ pokemon }) {
    return (
        <div className="caught-card">
            <span>
                {pokemon.id} <br />
                {pokemon.name}
            </span>
            <img src={pokemon.imageUrl} height="70" alt={pokemon.name} />
            <CaughtIcon />
        </div>
    );
}
