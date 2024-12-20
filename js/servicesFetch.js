/**
 * Recibe un arreglo de strings que son urls (links o endpoints)
 * Retorna un arreglo de objetos con los resultados de hacerles fetch y json a cada url 
 */
export const fetchURLs = async (urls) => {
    try {
        const promises = urls.map(url => fetch(url));
        const data = await resolveArrayOfFetchPromises(promises)
        return data
    }
    catch (error) {
        console.error(`fetchUrls(): ${error}`)
    }
}

/**
 * Recibe un arreglo de promesas generadas de fetch
 * Retorna el resultado de resolver las promesas y realizarle json()
 */
const resolveArrayOfFetchPromises = async (promises) => {
    const responses = await Promise.all(promises);
    if (!responses.every(response => response.ok)) {
        throw new Error(
            `Fallo en resolveArrayOfFetchPromises().`
        );
    }
    const promisesOfJson = responses.map(response => response.json())
    const data = await Promise.all(promisesOfJson);
    return data;
}

