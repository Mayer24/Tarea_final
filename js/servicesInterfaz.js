import { esNumeroPokemonValido, getPokemons } from "./servicesPokemon.js"
import { cantidadDePokemonesATraer } from "./script.js"


/**
 * Recibe numeroPokemon que es el número del pokemon principal y cantidadDePokemonesATraer,
 * limpia el slider para luego llamar a printPokemons
 */
export async function recargarSlider(numeroPokemon, cantidadDePokemonesATraer) {
    
    const elementInput = document.getElementById("pokemon-number")
    if (esNumeroPokemonValido(numeroPokemon)) {
        //Se limpia el error
        elementInput.classList.remove("invalid__input");

        //Se vacia el slider
        document.getElementById("contenedor-cards").replaceChildren();

        //Se obtiene el arreglo de pokemones
        const pokemones = await getPokemons(numeroPokemon, cantidadDePokemonesATraer);
        
        //Se imprimen
        printPokemons(pokemones);
    } else {
        console.error("Ingresa un número válido.");
        elementInput.classList.add("invalid__input");
        elementInput.value = "";
        elementInput.setAttribute("placeholder", "Solo números entre 1 y 1025");
    }
}

/**
 * Recibe un arreglo de objetos con los pokemones a mostrar,
 * los carga en el slider
 */
export const printPokemons = (pokemons) => {
    const elementCardContainer = document.getElementById("contenedor-cards");
    //fragmentToHoldCards es para guardar las cards en cada iteracion del for. Luego fuera del for se fija en elementCardContainer
    const fragmentToHoldCards = document.createDocumentFragment();
    const elementCardTemplate = document
        .getElementById("template-card")
        .content.querySelector("section");

    for (const pokemon of pokemons) {
        const id = pokemon.id;
        const name = pokemon.name;
        const tipos = pokemon.types;
        let tiposEnUnString = "";
        for (const tipo of tipos) {
            tiposEnUnString += tipo.type.name + "/";
        }
        tiposEnUnString = tiposEnUnString.substring(
            0,
            tiposEnUnString.length - 1
        );
        const imagen = pokemon.sprites.other.home.front_shiny;
        const hp = pokemon.stats[0].base_stat;
        const attack = pokemon.stats[1].base_stat;
        const defense = pokemon.stats[2].base_stat;
        const speed = pokemon.stats[5].base_stat;

        const elementCloneCard = elementCardTemplate.cloneNode(true);
        const elementFirstArticle = elementCloneCard.firstElementChild;
        const elementImg = elementFirstArticle.firstElementChild;
        elementImg.alt = `Versión Shiny del Pokémon ${name}`;
        elementImg.src = imagen;
        elementImg.nextSibling.nextSibling.textContent = name;
        elementImg.nextSibling.nextSibling.nextSibling.nextSibling.textContent =
            tiposEnUnString;

        const elementSecondArticle =
            elementFirstArticle.nextSibling.nextSibling;
        const elementH4 = elementSecondArticle.firstElementChild;
        elementH4.textContent = `HP: ${hp}`;
        elementSecondArticle.children[1].textContent = `Ataque: ${attack}`;
        elementSecondArticle.children[2].textContent = `Defensa: ${defense}`;
        elementSecondArticle.children[3].textContent = `Velocidad: ${speed}`;
        elementSecondArticle.children[4].textContent = `#${id}`;

        fragmentToHoldCards.appendChild(elementCloneCard);
    }

    //actualizamos el contenedor de cartas, cuando tienen todas las carta se reemplazan
    elementCardContainer.replaceChildren(fragmentToHoldCards);

    // reemplazamos el swiper... que se destruya y reinicie
    if (window.swiper) {
        window.swiper.destroy(true, true); // Eliminar swiper actual
    }

    // creamos acá un nuevo swiper
    window.swiper = new Swiper(".swiper", {
        direction: "horizontal",
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 1,
        initialSlide: Math.floor(cantidadDePokemonesATraer / 2) - 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            1800: { slidesPerView: 3 },
            1200: { slidesPerView: 2 },
            600: { slidesPerView: 1 },
        },
        scrollbar: { el: ".swiper-scrollbar" },
    });
};
