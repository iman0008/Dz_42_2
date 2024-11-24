import React, { Component } from 'react';
import axios from 'axios';
import PokemonList from '../../components/pokemonList/PokemonList';
import Pagination from '../../components/pagination/Pagination';


class PokemonPageClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      limit: 2,
      offset:0
    }
  }

  handleNext = () => {
    this.setState((prevState) => ({offset: prevState.offset+this.state.limit}));
  };
  handlePrev = () => {
    this.setState((prevState) => ({offset: prevState.offset-this.state.limit}));
  };

  fetchPokemons = async (offset, limit) => {
    const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
    return this.setState({pokemonList: data.results})
  };

  componentDidMount() {
    this.fetchPokemons(this.state.offset, this.state.limit)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.offset !==this.state.offset) (
        this.fetchPokemons(this.state.offset, this.state.limit)
    )
    if(prevState.limit !==this.state.limit) (
        this.fetchPokemons(this.state.offset, this.state.limit)
    )
  }

  render() {
      const {pokemonList, offset, limit} = this.state
      let page = (offset/limit)+1
        return (
            <div>
              <PokemonList pokemonList={pokemonList} />
              <Pagination page={page} next={this.handleNext} prev={this.handlePrev}/>
            </div>
        );
    }
}

export default PokemonPageClass;