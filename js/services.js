const urlBase = "https://pokeapi.co/api/v2/pokemon/";

//este deberia ser upperlimit (lo más alto que puede estar)
const getLowerLimit = (middle, radius) => {
    const result = middle - radius;
    if (result < 1) {
        return 1
    }
    return result;
}

//este deberia ser lowerlimit (lo mas bajo que encuenttro)
const getUpperLimit = (middle, radius) => {
    const result = middle + radius;
    if (result > 1025) {
        return 1025
    }
    return result;
}


//Esta funcion recibe un arreglo de promesas generadas de hacer fetch (que vienen de fetch), las promesas se obtuvieron en fetchurls
const resolveArrayOfFetchPromises = async (promises) => {
    //Promise.all resuelve todas las promesas y retorna su contenido (objetos)
    const responses = await Promise.all(promises);
    if (!responses.every(response => response.ok)) {
        throw new Error(
            `Fallo en resolveArrayOfFetchPromises()`
        );
    }
    //me esta devolviendo un arreglo de nuevas promesas (por cada respuesta desde json)
    const promisesOfJson = responses.map(response => response.json())
    //se esta ejecutando a cada una de los resultados de las promesas la funcion json (el metodo, y asi devuelve las ultimas promesas que se necesitan)
    //se esta esprando que se resuelvan esas  (al ejectur json te devuelve promesas, no la info, y el promise all te devuelve todas esas respuestas, con la info necesaria)
    const data = await Promise.all(promisesOfJson); //aqui se resuelve los arreglos de nuevas promesas
    //aqui la funcion resolvearrrayoffetchpromise esta devolviendo la info (objetos finales, la info dentro de pokemones)
    return data;
}

// Esta funcion intenta hacer fetch a cada uno de los links que contiene el arreglo urls y devuelve/retorna la info de cada link en un arreglo de objetos (esta funciona recibe un arreglo de strings (links) y retorna un arreglo de objetos que es el resultado de consultar a todos los links... capturando la info (los objetos) de cada link)
//Le paso un arreglo de links y me pasa un arreglo de objetos (se hace fetch a cada link y devuelve un objeto)
export const fetchURLs = async (urls) => {
    try {
        //variable promesa se le asigna un arreglo nuevo que es conseguido desde el fetch (url), no son los objeto finales, son las promesas de cada uno de esos objetos (es un arreglo de promesas)
        const promises = urls.map(url => fetch(url));
        //la const data está esperando el resolve array
        const data = await resolveArrayOfFetchPromises(promises) //data es el arreglo con la informacion de los pokemones (objetos dentro c/u de los pokemones)
        return data
    }
    catch (error) {
        console.error(`fetchUrls(): ${error}`)
    }
}

//Genera un numero random entero entre 1 y 1025
export const getRandomPokemonNumber = () => {
    let result = Math.random(); // retorna un numero al azar mayor o igual a 0 y menor que 1
    result = result * 1025; // aqui se genera un número random mayor o igual a 0 y menor que 1025
    result = Math.floor(result) + 1; //forzamos a que sea entero, y se corre el rango +1 para que sea de 1 a 1025, en vez de 0 a 1024
    return result;
}

//Captura el numero que ingreso el usuario
export const getPokemonNumberInput = () => {
    const value = Number(document.getElementById("pokemon-number").value);
    return value;
}

// Esta función genera un arreglo de strings que son URLS. Cada URL es la urlBase y se le añade un número que va entre middle-qty -> middle+qty
export const generateArrayOfUrls = (middle, qty) => {
    const first = getLowerLimit(middle, Math.floor(qty / 2));
    const last = getUpperLimit(middle, Math.floor(qty / 2));
    const result = [];
    for (let pokemonNumber = first; pokemonNumber <= last; pokemonNumber++) {
        result.push(`${urlBase}${pokemonNumber}`)
    }
    return result;
}


