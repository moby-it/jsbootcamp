/**
 * @typedef {Object} Pokemon
 * @property {string} id - Pokemon pokedex id
 * @property {string} name
 * @property {Array<string>} types
 * @property {string} imageUrl
 * @property {number} [userPokemonId]
 */
/**
 * @typedef {Object} DailyPokemon
 * @property {string} id
 * @property {string} pokedex_id
 * @property {string} name
 * @property {Array<string>} types
 * @property {string} imageUrl
 * @property {boolean} caught
 */

/**
 * @description takes as input an pokemon as return from the api and transforms it to what the ui needs
 * @param {{id:number,:string, pokedex_id: number,types:string[], image_url:string,caught:boolean}} p
 * @returns {Pokemon}
 */
export function transform(p) {
    return {
        userPokemonId: p.id,
        name: p.name,
        id: p.pokedex_id,
        types: p.types,
        imageUrl: p.image_url,
        caught: p.caught,
    };
}
