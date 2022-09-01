import axios from "axios"

export async function getPokemons(url) {
    const response = await axios.get(url);
    return response.data
}

export async function getPokemon(number) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`)
    return response.data
}

export function put(number, pokemon) {
    number.slice(34, -1)
    axios.put(`https://pokeapi.co/api/v2/pokemon/${number}`, pokemon)
        .then(() => { alert("se ha modificado el registro") })
        .catch(error => alert(error))
}