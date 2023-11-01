import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from 'react-select';
import { PokemonContext } from "../context/pokemonContext";
import { useSaveTrade } from "../hooks";
import { Modal } from "./Modal";
import { PokeCard } from "./PokeCard";

export function TradeModal({ tradingPokemon, close }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { pokemonCaught } = useContext(PokemonContext);
  const saveTrade = useSaveTrade();

  useEffect(() => {
    if (saveTrade.isSuccess) {
      toast.success('Trade submitted');
      saveTrade.reset();
      close();
    }
  }, [saveTrade.isSuccess]);

  return <Modal title={"Trading " + tradingPokemon?.name}
    close={() => close()}>
    <div className="col align-center gap-1">
      <Select
        onChange={(e) => setSelectedPokemon(e.value)}
        options={pokemonCaught.map(p => ({ label: p.name, value: p }))}
        styles={{ control: (styles) => ({ ...styles, width: '400px' }) }}
        isClearable={true}
        placeholder="Select a Pokemon to Trade"
      />
      <div className="row p-2 gap-1">
        <PokeCard  {...selectedPokemon} emptyContent="Select a pokemon to trade" />
        <PokeCard {...tradingPokemon} />
      </div>
      {selectedPokemon && <button className="btn" onClick={() =>
        saveTrade.mutate({
          initiatorUserPokemonId: selectedPokemon.userPokemonId,
          responderUserPokemonId: tradingPokemon.userPokemonId
        })
      }>Submit</button>}
    </div>
  </Modal >;
}