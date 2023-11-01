import { CheckCircle, DeleteCircle } from 'iconoir-react';
import { useEffect } from 'react';
import { usePendingTrades, useUpdateTrade } from "../hooks";

export function PendingTrades() {
  const pendingTradesQuery = usePendingTrades();
  const updateTrade = useUpdateTrade();
  useEffect(() => {
    if (updateTrade.isSuccess) {
      updateTrade.reset();
      pendingTradesQuery.refetch();
      window.dispatchEvent(new Event('app:trade:accepted'));
    }
  }, [updateTrade.isSuccess]);

  if (pendingTradesQuery.isLoading || !pendingTradesQuery.isSuccess) return <p>loading...</p>;

  return <section className="pending-trades">
    <h2>Pending Trades</h2>
    {pendingTradesQuery.data.map(pt => <article key={pt.id} className="pending-trade">
      <section className="pokemon-to-trade" aria-label="pokemon-to-trade">
        <p className="my-pokemon" data-owned={pt.initiated} title={pt.initiated ? 'owned' : 'to receive'}>
          {pt.initiator_pokemon_name}
          <img src={pt.initiator_pokemon_image_url} height="50" alt={pt.initiator_pokemon_name} />
        </p>
        <p className="responder-pokemon" data-owned={!pt.initiated} title={!pt.initiated ? 'owned' : 'to receive'}>
          {pt.responder_pokemon_name}
          <img src={pt.responder_pokemon_image_url} height="50" alt={pt.responder_pokemon_name} />
        </p>
      </section>
      <div role="group" aria-label='Accept or Reject Trade'>
        <CheckCircle role="button" aria-label='accept' onClick={() => {
          updateTrade.mutate({ tradeId: pt.id, accepted: true });
        }} />
        <DeleteCircle role='button' aria-label='reject' onClick={() => {
          updateTrade.mutate({ tradeId: pt.id, accepted: false });
        }} />
      </div>
    </article>)}
  </section>;
}