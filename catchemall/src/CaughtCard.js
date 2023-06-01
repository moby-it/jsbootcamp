export function CaughtCard({ pokemon }) {
    return (
        <>
            <div className="pokecardCaught">
                <h1>{pokemon.no}</h1>
                <h2>#{pokemon.name}</h2>
                <img src={pokemon.imgUrl} />
            </div>
        </>
    )
}