import React, { useState, useContext, useEffect } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from "reactstrap";
import "./PokeList.css"

export function ModalPokemon(props) {


    return (
        <Modal isOpen={props.show}>
            <ModalHeader className="center poke-title">
                <div className="center-inline">
                <h2 className="">N°: {props.pokemon.id} : {props.pokemon.name} </h2>
                </div>
            </ModalHeader>
            <ModalBody className="">
                <div className="center">
                <img className="poke-img" src={props.pokemon.sprites.front_default} />
                </div>
                <div className="center">
                    {props.pokemon.types && props.pokemon.types.map(type => (
                        <div className="center-inline types">
                            <h3 className="">{type.type.name}
                            </h3>
                        </div>))}
                </div>
                <hr></hr>
                <div className="center">
                <p>Stats:</p>
                <div className="container row">
                    <div className="col-6">
                        <p>HP: {props.pokemon.stats[0].base_stat}</p>

                        <p>ATK: {props.pokemon.stats[1].base_stat}</p>

                        <p>DEF: {props.pokemon.stats[2].base_stat}</p>
                    </div>
                    <div className="col-6">
                        <p>SPD: {props.pokemon.stats[5].base_stat}</p>

                        <p>SP.ATK: {props.pokemon.stats[3].base_stat}</p>

                        <p>SP.DEF: {props.pokemon.stats[4].base_stat}</p>

                    </div>
                </div>
               
                <p>Weight: {props.pokemon.weight}</p>
                </div>
            </ModalBody>
            <ModalFooter>

                <Button color="primary" onClick={props.close}>Volver</Button>
            </ModalFooter>
        </Modal>
    )
}