export function Card({pokemon}) {
    return (
        <>
        <div className="pokecard">
            <h1>{pokemon.name}</h1>
            <h2>#{pokemon.no}</h2>
            <img src={pokemon.imgUrl}/>
            <h3>{pokemon.types[0]}{pokemon.types[1] && `/${pokemon.types[1]}`} </h3>
                
        </div>
        </>
    )
}