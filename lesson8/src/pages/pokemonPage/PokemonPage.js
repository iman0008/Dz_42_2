import React, { useEffect, useState } from "react";
import PokemonList from "../../components/pokemonList/PokemonList";
import pokemon from "../../components/pokemon/Pokemon";
import Pagination from '../../components/pagination/Pagination';

const PokemonPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [ offset, setOffset ] = useState(0);

  const fetchPokemons = async (offset, limit) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
    return await response.json();
  };
  const [ limit, setLimit ] = useState(2);
  console.log(limit, 'limit ');
  const page = offset / Number(limit) + 1;
  const handleNext = () => {
    setOffset((prevState) => prevState + Number(limit));
  };
  const handlePrev = () => {
    setOffset((prevState) => prevState - Number(limit));
  };

  useEffect(() => {
    fetchPokemons(offset, limit).then((data) => setPokemonList(data.results));
  }, [offset, limit]);
  return (
    <div>
      <PokemonList pokemonList={pokemonList} />
      <Pagination page={page} next={handleNext} prev={handlePrev}/>

    </div>
  );
};

export default PokemonPage;
