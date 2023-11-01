/**
 * @description takes as input an pokemon as return from the api and transforms it to what the ui needs
 * @param {{id:number,:string, pokedex_id: number,types:string[], image_url:string,caught:boolean}} p 
 * @returns {import("./pokemonContext").Pokemon}
 */
export function transform(p) {
  return {
    userPokemonId: p.id,
    name: p.name, id: p.pokedex_id, types: p.types, imageUrl: p.image_url, caught: p.caught
  };
}