import './App.css';
import MainPage from './pages/MainPage';
import React from 'react';
import TodoPage from './pages/TodoPage';
import UserPage from './pages/userPage/UserPage';
import PokemonPage from './pages/pokemonPage/PokemonPage';
import FormPage from './pages/formPage/FormPage';
import Dz6 from './pages/dz6/Dz6';
import Fetch from './pages/fetch/Fetch';


function App() {
    return (
        <div className="App">
            {/*<MainPage/>*/}
            {/*<TodoPage/>*/}
            {/*<UserPage/>*/}
            {/*<PokemonPage/>*/}
            {/*<FormPage/>*/}
            <Dz6/>
            <Fetch/>
        </div>

    );
}


export default App;
