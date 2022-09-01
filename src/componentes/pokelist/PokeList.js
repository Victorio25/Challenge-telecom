import React, { useEffect, useState } from "react"
import "./PokeList.css";
import { ModalPokemon } from "./ModalPokemon.js";
import pikachu from "../../imagenes/pikachu.png"
import wobbuffet from "../../imagenes/wobbuffet.png"
import { getPokemon, getPokemons, put } from "./Api.js"

export function PokeList() {

    let api_url = "https://pokeapi.co/api/v2/pokemon/";
    const [openModal, setOpenModal] = useState(false)
    const [pokemonList, setPokemonList] = useState([])
    const [previous, setPrevious] = useState("")
    const [next, setNext] = useState("")
    const [pokemon, setPokemon] = useState({
        id: "",
        name: "",
        sprites: { front_default: "" },
        stats: [{ base_stat: "" },
        { base_stat: "" },
        { base_stat: "" },
        { base_stat: "" },
        { base_stat: "" },
        { base_stat: "" },],
        types: [],
        weight: "",
    })

    useEffect(() => {
        const fetchDat = async () => {
            const response = await getPokemons(api_url)
            setPokemonList(response.results)
            setPrevious(response.previous)
            setNext(response.next)
        }
        fetchDat()
    }, [])

    // function getPokemon(number) {
    //     axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`)
    //         .then(response => {
    //             setPokemon(response.data)
    //         })
    //         .catch(error => alert(error))
    //     console.log(pokemon)
    // }

    // function getPokemons(url) {
    //     axios.get(url)
    //         .then(response => {
    //             setPokemonList(response.data.results)
    //             setNext(response.data.next)
    //             setPrevious(response.data.previous)
    //         })
    //         .catch(error => alert(error))
    // }

    function handleOnChange(value, field) {
        setPokemon({
            ...pokemon,
            [field]: value
        })
    }

    function handleOnChangeStat(value, index) {
        const aux = pokemon.stats.map((stat, i) => {
            if (i == index) {
                stat.base_stat = parseInt(value)
            }
            return stat
        })

        setPokemon((prevValue) => {
            return {
                ...prevValue,
                ["stats"]: aux
            };
        });

        console.log(pokemon.stats)
    }
    // function put(number) {
    //     number.slice(34, -1)
    //     axios.put(`https://pokeapi.co/api/v2/pokemon/${number}`)
    //         .then(response => { alert("se ha modificado el registro") })
    //         .catch(error => alert(error))
    // }

    function showConfirm(id) {
        let result = window.confirm("Seguro que desea eliminar el item?")
        if (result) {
            deletePokemon(id)
        }
    }

    function deletePokemon(id) {
        setPokemonList(pokemonList.filter(pokemon => pokemon.url.slice(34, -1) !== id))
    }

    async function goToPrevious(previous) {
        let pokemons = await getPokemons(previous)
        setPokemonList(pokemons.results)
        setPrevious(pokemons.previous)
        setNext(pokemons.next)

    }

    async function goToNext(next) {
        let pokemons = await getPokemons(next)
        setPokemonList(pokemons.results)
        setPrevious(pokemons.previous)
        setNext(pokemons.next)
    }

    async function showPokemon(number) {
        let pokemon = await getPokemon(number)
        setPokemon(pokemon)
        setOpenModal(true)
    }

    return (
        <div className="container-fluid row pokemon-list">
            <div className="col-5 bold container-left ">
                <form onSubmit={(event) => put(event, pokemon)}>
                    <div className="form-group">
                        <label> Name:</label>
                        <input type="text" className="form-control input" value={pokemon.name} onChange={(event) => handleOnChange(event.target.value, "name")}></input>
                        <label> Stats: </label>
                        <div className="container row">
                            <div className="col-6">
                                <label>HP</label>
                                <input type="number" className="form-control input" value={pokemon.stats[0].base_stat} onChange={(event) => handleOnChangeStat(event.target.value, 0)}></input>
                                <label>ATK</label>
                                <input type="number" className="form-control input" value={pokemon.stats[1].base_stat} onChange={(event) => handleOnChangeStat(event.target.value, 1)}></input>
                                <label>DEF</label>
                                <input type="number" className="form-control input" value={pokemon.stats[2].base_stat} onChange={(event) => handleOnChangeStat(event.target.value, 2)}></input>

                            </div>
                            <div className="col-6">
                                <label>SPD</label>
                                <input type="number" className="form-control input" value={pokemon.stats[5].base_stat} onChange={(event) => handleOnChangeStat(event.target.value, 5)}></input>
                                <label>SP.ATK</label>
                                <input type="number" className="form-control input" value={pokemon.stats[3].base_stat} onChange={(event) => handleOnChangeStat(event.target.value, 3)}></input>
                                <label>SP.DEF</label>
                                <input type="number" className="form-control input" value={pokemon.stats[4].base_stat} onChange={(event) => handleOnChangeStat(event.target.value, 4)}></input>
                            </div>
                        </div>
                        <div className="container button-form">
                            <button type="submit" className="btn btn-primary">Modify stats</button>
                        </div>
                    </div>
                </form>
                <hr className="hr-form"></hr>
                <img src={pikachu} className="pikachu"></img>
                <img src={wobbuffet} className="wobbuffet"></img>
            </div>
            <div className="col-7 list">
                <h1 className="center">Pokemons</h1>
                <table className="table">
                    <thead>
                        <tr className="row">
                            <th className="col-3">Number</th>
                            <th className="col-6">Name</th>
                            <th className="col-3">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemonList.length > 0 && (
                            pokemonList.map(item => (
                                <tr className="row" key={item.name}>
                                    <td className="col-3">{item.url.slice(34, -1)}</td>
                                    <td className="col-6">{item.name}</td>

                                    <td className="col-3">
                                        <button className="btn btn-primary button-table" onClick={() => showPokemon(item.url.slice(34, -1))}>Info</button>
                                        <button className="btn btn-success button-table" onClick={async () => {
                                            let pokemon = await getPokemon(item.url.slice(34, -1))
                                            setPokemon(pokemon)
                                        }}>Edit</button>
                                        <button className="btn btn-danger button-table" onClick={() => showConfirm(item.url.slice(34, -1))}>Delete</button>
                                    </td>
                                </tr>))
                        )}
                        {pokemonList.length === 0 && (
                            <tr>
                                <td colSpan="100%">
                                    <h2>No Data</h2>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="container center">
                    <button type="button" className="btn btn-primary prevAndNext bold" onClick={() => goToPrevious(previous)} disabled={previous ? false : true}>Previous</button>
                    <button type="button" className="btn btn-primary prevAndNext bold" onClick={() => goToNext(next)} disabled={next ? false : true}>Next</button>
                    <ModalPokemon pokemon={pokemon} show={openModal} close={() => setOpenModal(false)}></ModalPokemon>
                </div>
            </div>
        </div>
    )
}