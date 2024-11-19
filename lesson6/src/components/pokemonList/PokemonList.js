import React from 'react';
import Pokemon from '../pokemon/Pokemon';


const PokemonList = ({pokemonList}) => {
    return (
        <div>
            {
                pokemonList.map(pokemon=><Pokemon pokemon={pokemon}/> )
            }
        </div>
    );
};

export default PokemonList;