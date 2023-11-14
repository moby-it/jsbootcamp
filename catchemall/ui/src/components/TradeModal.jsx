import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { usePokemonCaught, useSaveTrade } from '../hooks';
import { Modal } from './Modal';
import { PokeCard } from './PokeCard';
import { transform } from '../utils/transformPokemon';

export function TradeModal({ tradingPokemon, close }) {
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const pokemonCaught = usePokemonCaught();
    const saveTrade = useSaveTrade();

    useEffect(() => {
        if (saveTrade.isSuccess) {
            toast.success('Trade submitted');
            saveTrade.reset();
            close();
        }
    }, [saveTrade.isSuccess]);

    if (!pokemonCaught.isSuccess) return <p>loading...</p>;
    return (
        <Modal title={'Trading ' + tradingPokemon?.name} close={() => close()}>
            <div className="col align-center gap-1">
                <Select
                    onChange={(e) => setSelectedPokemon(e.value)}
                    options={pokemonCaught.data.map(transform).map((p) => ({ label: p.name, value: p }))}
                    styles={{ control: (styles) => ({ ...styles, width: '400px' }) }}
                    isClearable={true}
                    placeholder="Select a Pokemon to Trade"
                />
                <div className="row p-2 gap-1">
                    <PokeCard {...selectedPokemon} emptyContent="Select a pokemon to trade" />
                    <PokeCard {...tradingPokemon} />
                </div>
                {selectedPokemon && (
                    <button
                        className="btn"
                        onClick={() =>
                            saveTrade.mutate({
                                initiatorUserPokemonId: selectedPokemon.userPokemonId,
                                responderUserPokemonId: tradingPokemon.userPokemonId,
                            })
                        }
                    >
                        Submit
                    </button>
                )}
            </div>
        </Modal>
    );
}
