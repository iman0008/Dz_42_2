import React, { useEffect, useState } from 'react';
import ModalPokemon from '../modalPokemon/Modal';


const Pokemon = ({pokemon}) => {
    const [pokemonDetails, setPokemonDetails] = useState({})
    const [ show, setShow ] = useState(false);

    const [loading, setLoading] = useState(true)
    console.log(pokemonDetails,'pokemonDetails');

    const fetchPokemon = async() => {
        try {
            const response = await fetch(pokemon.url);
            return await response.json();
        } catch(e) {
            console.log(e);
        } finally {
            setLoading(false)
        }

    };
    useEffect(() => {
        fetchPokemon().then(data=> setPokemonDetails(data))
    }, []);

    const handleShow = () => {
        setShow(!show);
    };
    return (
        <div>
            {
                loading ? <div>loading...</div> : <div>
                    {pokemon.name}
                    <img src={pokemonDetails.sprites.other.dream_world.front_default} alt=""/>
                    <button onClick={handleShow}>Подробнее</button>
                </div>
            }
            {
                show &&   <ModalPokemon handleShow={handleShow}>
                    {pokemon.name}
                <div>Abilities: {pokemonDetails.abilities.map(value=> value.ability.name).join(', ')}</div>
                <div>Some moves: {pokemonDetails.moves.slice(0,5).map(value=> value.move.name).join(', ')}</div>
                </ModalPokemon>
            }

        </div>
    );
};

export default Pokemon;