//Funciones externas, getrandom para que te cargue cualquier carta al comienzo, fetch de la urls, y se genera un arreglo de urls
import { getRandomPokemonNumber, fetchURLs, generateArrayOfUrls } from "./services.js"

const randomPokemonNumber = getRandomPokemonNumber();

//Aqui puse un randomPokeNumber... pero tambien puedo poner yo el numero exacto, y la cantidad son los 25 pokemones que me va a cargar)
const callPokemons = async () => {
    //en los () se esta pasando el return, el arreglo de strings... la variable entonces representa todos los links de cada pokemon
    const urls = generateArrayOfUrls(randomPokemonNumber, 25);
    const pokemones = await fetchURLs(urls); //tiene un arreglo con los objetos de los pokemones
    return pokemones //llama a los pokemones (a toda su informacion... "el pokemon")
}


//DESCOMENTAR... por si sirve funcion PRINT POKEMONS
 const printPokemons = (pokemons) => {
     // pokemons es un arreglo de pokemones con sus caracteristicas. La variables es para pintar pokemones
    //captura el template
     //first child... no queremos el template, se requiere lo que está dentro de... el section swiper slide
     const elementCardContainer = document.getElementById("contenedor-cards");
     //crea un fragmento del html
     const fragmentToHoldCards = document.createDocumentFragment();
     const elementCardTemplate = document.getElementById("template-card").content.querySelector("section");

     // para generar tarjetas de Pokémon
     for (const pokemon of pokemons) {
         const id = pokemon.id;
         const name = pokemon.name;
         // console.log(`insertando el pokemon ${name}`)
         const tipos = pokemon.types;
         //para cada elemento de elementos haz lo del bloque
         // elementos en un texto (string)
         let tiposEnUnString = "";
         for (const tipo of tipos) {
             tiposEnUnString += tipo.type.name + "/";
         }
         tiposEnUnString = tiposEnUnString.substring(0, tiposEnUnString.length - 1);
         //link de la imagen dentro de un objeto que es X y que esta dentro de otro objeto que esta en X....
         const imagen = pokemon.sprites.other.home.front_shiny;
         //numeros dentro de un objeto y varios de estos estan dentro de un arreglo... pokemon.stats es un arreglo de objetos y todos estos objetos tienen la propiedad base_stat
         const hp = pokemon.stats[0].base_stat;
         const attack = pokemon.stats[1].base_stat;
         const defense = pokemon.stats[2].base_stat;
         const speed = pokemon.stats[5].base_stat;

         const elementCloneCard = elementCardTemplate.cloneNode(true);
         //se inyectan los valores del pokemon en la tarjeta clonada... cloneCardTemplate
         const elementFirstArticle = elementCloneCard.firstElementChild;
         const elementImg = elementFirstArticle.firstElementChild;
         elementImg.alt = `Versión Shiny del Pokémon ${name}`;
         elementImg.src = imagen;
         elementImg.nextSibling.nextSibling.textContent = name;
         elementImg.nextSibling.nextSibling.nextSibling.nextSibling.textContent = tiposEnUnString;

         const elementSecondArticle = elementFirstArticle.nextSibling.nextSibling;
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
         //este comienza desde el 0, en ese caso la mitad es 12 (porque en verdad es 13... la mitad de 25 cartas)
         initialSlide: 11,
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

//detectamos pokemon en la busqueda
async function buscaPokemon(numeroPokemon, elementInput) {

    if (esValido(numeroPokemon)) {
        elementInput.classList.remove("invalid__input");
        const urlApi = `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`;
        console.log(`URL de la API: ${urlApi}`);
        const urls = generateArrayOfUrls(numeroPokemon, 25);
        const pokemones = await fetchURLs(urls); //tiene un arreglo con los objetos de los pokemones
        const elementCardContainer = document.getElementById("contenedor-cards");
        elementCardContainer.replaceChildren();
        printPokemons(pokemones)
    } else {
        console.log('Ingresa un número válido.');
        elementInput.classList.add("invalid__input");
        elementInput.value = "";
        elementInput.setAttribute("placeholder", "Solo números entre 1 y 1025")
    }
}

function esValido(numeroPokemon) {
    return numeroPokemon > 0 && numeroPokemon < 1026
}
// se podria simplificar la función anterior "const esValido = (numeroPokemon) => numeroPokemon > 0 && numeroPokemon < 1026;"


const elementInput = document.getElementById('pokemon-number');
//busca pokemon se esta ejecutando recien en esta parte
document.addEventListener('DOMContentLoaded', () => {
    //funcion llamado a los pokemones me devuelve una promesa (por el .then... cuando se resuelva ejecuta lo que esta dentro () ...la funcion en este caso)
    callPokemons().then(response => printPokemons(response))

    const busquedaPokemon = document.getElementById('header__button');
    busquedaPokemon.addEventListener('click', function (event) {
        event.preventDefault(); // para que no se recargue la pagina mientras buscamos/tipeamos!
        const numeroPokemon = Number(elementInput.value);
        buscaPokemon(numeroPokemon, elementInput);
    });
});

// BOTON RANDOM
const randomButton = document.getElementById("random__button");


const handleRandomButtonClick = async () => {
    // Obtener un número aleatorio de Pokémon
    const randomPokemonNumber = getRandomPokemonNumber();

    // Llama a la API para obtener los Pokémon con ese número aleatorio
    const urls = generateArrayOfUrls(randomPokemonNumber, 25); // Cambia esto según tus necesidades
    const pokemones = await fetchURLs(urls);

    // Imprime los pokemones obtenidos
    printPokemons(pokemones);
    //evaluar usar codigo de más arriba
};

// Asocia el evento click del botón a la función handleRandomButtonClick
randomButton.addEventListener("click", handleRandomButtonClick);
