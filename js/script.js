//Aquí comienza el flujo de ejecución

//Se importan las funciones a utilizar
import { getRandomPokemonNumber, getPokemons } from "./servicesPokemon.js"
import { printPokemons, recargarSlider } from "./servicesInterfaz.js"

//Cantidad de pokemones que se cargan
export const cantidadDePokemonesATraer = 5;

//Número del pokemon inicial (random) 
const randomPokemonNumberInicial = getRandomPokemonNumber();
document.addEventListener("DOMContentLoaded", () => {
    //Carga inicial del slider
    getPokemons(randomPokemonNumberInicial, cantidadDePokemonesATraer).then(
        (response) => printPokemons(response)
    );

    //Funcionalidad de buscar por el input
    const elementInput = document.getElementById("pokemon-number");
    const busquedaPokemon = document.getElementById("header__button")

    // Asocia el evento click del botón a la función anonima
    busquedaPokemon.addEventListener("click", function (event) {
        event.preventDefault(); // para que no se recargue la pagina mientras buscamos/tipeamos!
        const numeroPokemon = Number(elementInput.value);
        recargarSlider(numeroPokemon, cantidadDePokemonesATraer);
    });

    //Funcionalidad de obtener pokemon al azar
    const randomButton = document.getElementById("random__button");
        // Asocia el evento click del botón a la función anonima
        randomButton.addEventListener("click", (event) => {
        // Obtener un número aleatorio de Pokémon
        const randomPokemonNumber = getRandomPokemonNumber();
        recargarSlider(randomPokemonNumber, cantidadDePokemonesATraer);
    });
});