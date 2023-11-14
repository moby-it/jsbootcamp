import { RefreshCircular } from 'iconoir-react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CaughtCard } from '../components/CaughtCard';
import { PendingTrades } from '../components/PendingTrades';
import { TradeModal } from '../components/TradeModal';
import { transform } from '../utils/transformPokemon';
import { UserContext } from '../context/userContext';
import { usePokemonCaughtForUser } from '../hooks/usePokemonCaughtForUser';
import { useUsers } from '../hooks';

/**
 * @argument {import("../context/pokemonContext").Pokemon[]} pokemonCaught
 * @returns {{quantity:number, pokemon: import("../context/pokemonContext").Pokemon}[]}
 */
function groupPokemonById(pokemonCaught) {
    const pokemonWithQuantity = new Map();

    pokemonCaught.forEach((pc) => {
        if (!pokemonWithQuantity.has(pc.id)) {
            pokemonWithQuantity.set(pc.id, { ...pc, quantity: 1 });
        } else {
            const existingPokemon = pokemonWithQuantity.get(pc.id);
            pokemonWithQuantity.set(pc.id, { ...existingPokemon, quantity: existingPokemon.quantity + 1 });
        }
    });
    return Array.from(pokemonWithQuantity.values());
}

export function User() {
    let { id } = useParams();
    const [tradingPokemon, setTradingPokemon] = useState(null);
    const query = usePokemonCaughtForUser(id);
    const { currentUser } = useContext(UserContext);
    const usersQuery = useUsers();
    const users = usersQuery.data;
    const isCurrentUser = Number(id) === currentUser.id;

    useEffect(() => {
        if (isCurrentUser) {
            window.addEventListener('app:trade:accepted', tradeAccepted);
        }
        return () => {
            window.removeEventListener('app:trade:accepted', tradeAccepted);
        };
    }, [isCurrentUser]);

    if (!id) return <h1>Where are you going?</h1>;
    if (usersQuery.isLoading) return <h1>Loading...</h1>;

    function tradeAccepted() {
        query.refetch();
    }

    const user = users.find((u) => u.id === +id);
    
    if (query.isSuccess) {
        return (
            <article className="user-data">
                <article className="user">
                    <h2>Username: {user.username}</h2>
                    <h3>Pokemon Caught</h3>
                    {!query.data.length && <span>No pokemon caught</span>}
                    <div className="col gap-1 user-caught-container p-1">
                        {groupPokemonById(query.data.map(transform)).map((p) => (
                            <div className="row user-caught-pokemon" key={p.id}>
                                <span>{p.quantity}x</span>
                                <CaughtCard pokemon={p} />
                                <span title="Trade" onClick={() => setTradingPokemon(p)}>
                                    {!isCurrentUser && <RefreshCircular className="cursor-pointer" />}
                                </span>
                            </div>
                        ))}
                    </div>
                </article>
                {isCurrentUser && (
                    <article className="pending-trades">
                        <PendingTrades />
                    </article>
                )}

                {!!tradingPokemon && (
                    <TradeModal tradingPokemon={tradingPokemon} close={() => setTradingPokemon(null)} />
                )}
            </article>
        );
    }
}
