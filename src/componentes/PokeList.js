import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "./PokeList.css";
import { ModalPokemon } from "./ModalPokemon.js";
import pikachu from "../imagenes/pikachu.png"
export function PokeList() {

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
        getPokemons("https://pokeapi.co/api/v2/pokemon/");
    }, [])

    function getPokemon(number) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`)
            .then(response => {
                setPokemon(response.data)
            })
            .catch(error => alert(error))
        console.log(pokemon)
    }

    function getPokemons(url) {
        axios.get(url)
            .then(response => {
                setPokemonList(response.data.results)
                setNext(response.data.next)
                setPrevious(response.data.previous)
            })
            .catch(error => alert(error))
    }

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
    function put(number) {
        number.slice(34, -1)
        axios.put(`https://pokeapi.co/api/v2/pokemon/${number}`)
            .then(response => { alert("se ha modificado el registro") })
            .catch(error => alert(error))
    }

    function showConfirm(id) {
        let result = window.confirm("Seguro que desea eliminar el item?")
        if (result) {
            deletePokemon(id)
        }
    }

    function deletePokemon(id) {
        setPokemonList(pokemonList.filter(pokemon => pokemon.url.slice(34, -1) !== id))
    }

    function goToPrevious(previous) {
        getPokemons(previous)
    }

    function goToNext(next) {
        getPokemons(next)
    }

    function showPokemon(number) {
        getPokemon(number)
        setOpenModal(true)
    }

    return (
        <div className="container-fluid row pokemon-list">
            <div className="col-5">
                <form onSubmit={(event) => put(event)}>
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
                            <button type="submit" className="btn btn-primary ">Modify stats</button>
                        </div>
                    </div>
                </form>
                <img src={pikachu} className="pikachu"></img>
            </div>
            <div className="col-7 list">
                <h1 className="center">Pokemons</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemonList.length > 0 && (
                            pokemonList.map(item => (
                                <tr key={item.name}>
                                    <td>{item.url.slice(34, -1)}</td>
                                    <td>{item.name}</td>

                                    <td>
                                        <button className="btn btn-primary button-table" onClick={() => showPokemon(item.url.slice(34, -1))}>Info</button>
                                        <button className="btn btn-success button-table" onClick={() => getPokemon(item.url.slice(34, -1))}>Edit</button>
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