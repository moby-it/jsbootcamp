import { useContext, useState } from "react";
import Select from 'react-select';
import { PokemonContext } from "../context/pokemonContext";
import { Modal } from "./Modal";
import { PokeCard } from "./PokeCard";
import { useSaveTrade } from "../hooks/useSaveTrade";
export function TradeModal({ tradingPokemon, close }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { pokemonCaught } = useContext(PokemonContext);
  const { saveTrade } = useSaveTrade();
  
  return <Modal show={!!tradingPokemon}
    title={"Trading " + tradingPokemon?.name}
    close={() => {
      setSelectedPokemon(null);
      close();
    }}>
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
      {selectedPokemon && <button className="btn" onClick={() => saveTrade(selectedPokemon.userPokemonId, tradingPokemon.userPokemonId)
      }>Submit</button>}
    </div>
  </Modal >;
}