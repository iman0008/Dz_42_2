import React, { useEffect, useState } from 'react';
import PokemonList from '../../components/pokemonList/PokemonList';
import pokemon from '../../components/pokemon/Pokemon';


const PokemonPage = () => {
    const [pokemonList, setPokemonList] = useState([])
    const fetchPokemons = async() => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        return await response.json();
    };
    useEffect(() => {
        fetchPokemons().then(data=> setPokemonList(data.results))
    }, []);
    return (
        <div>
            <PokemonList pokemonList={pokemonList}/>
        </div>
    );
};

export default PokemonPage;