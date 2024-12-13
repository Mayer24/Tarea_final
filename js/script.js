fetch ("https://pokeapi.co/api/v2/pokemon")
.then (rest => rest.json ())
.then (Response => {
    console.log (Response)
    
})