import { CaughtIcon } from './CaughtIcon';

/**
 *
 * @param {import('../utils/transformPokemon').DailyPokemon & {emptyContent:string}} props
 * @returns
 */
export function PokeCard(props) {
    let wrapperClass = 'pokecard';
    if (props.caught) wrapperClass += ' caught';
    if (!props.name)
        return (
            <div className={wrapperClass}>
                <p style={{ margin: 'auto' }}>{props.emptyContent}</p>
            </div>
        );
    return (
        <div className={wrapperClass}>
            <h2 className="p-1">
                #{props.id} {props.caught && <CaughtIcon />}
            </h2>
            <h2 className="p-1 mb-2">{props.name}</h2>
            <p>{props.types.join(',')}</p>
            <img src={props.imageUrl} alt={props.name} />
        </div>
    );
}
