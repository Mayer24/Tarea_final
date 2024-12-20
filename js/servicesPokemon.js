import { fetchURLs } from "./servicesFetch.js"


const urlBase = "https://pokeapi.co/api/v2/pokemon/";

/**
 * Recibe randomPokemonNumber que es el número del pokemon principal y cantidadDePokemonesATraer
 * Retorna un arreglo de objetos -en este caso de pokemones-
 */
export const getPokemons = async (randomPokemonNumber, cantidadDePokemonesATraer) => {
    const urls = generateArrayOfUrls(randomPokemonNumber, cantidadDePokemonesATraer); //Arreglo de strings con urls
    const pokemones = await fetchURLs(urls); //Arreglo de objetos pokemones
    return pokemones 
}


export function esNumeroPokemonValido(numeroPokemon) {
    return numeroPokemon > 0 && numeroPokemon < 1026
}

/**
 * Retorna un número al azar entre 1 y 1025
 */
export const getRandomPokemonNumber = () => {
    let result = Math.random();
    result = result * 1025;
    result = Math.floor(result) + 1;
    return result;
}

/**
 * Recibe middle: que es el id del pokemon central y 
 * Recibe qty: que es la cantidad de pokemones a traer
 * Retorna o genera un arreglo de strings que son URLS. Cada URL es la urlBase y se le añade un número que va entre middle-qty/2 -> middle+qty/2
 */
export const generateArrayOfUrls = (middle, qty) => {
    const first = getLowerLimit(middle, Math.floor(qty / 2));
    const last = getUpperLimit(middle, Math.floor(qty / 2));
    const result = [];
    for (let pokemonNumber = first; pokemonNumber <= last; pokemonNumber++) {
        result.push(`${urlBase}${pokemonNumber}`)
    }
    return result;
}

//Devuelve middle - radius excepto si es menor que 1, en ese caso devuelve 1
const getLowerLimit = (middle, radius) => {
    const result = middle - radius;
    if (result < 1) return 1
    return result;
}

//Devuelve middle + radius excepto si es mayor que 1025, en ese caso devuelve 1025
const getUpperLimit = (middle, radius) => {
    const result = middle + radius;
    if (result > 1025) return 1025
    return result;
}
