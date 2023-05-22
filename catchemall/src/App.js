import axios from 'axios';
import './App.css';
import { useState } from 'react';

async function findPokemon(i) {
  const request = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);

  return request;
}
// const [Caught,SetCaught]=useState([]);
const pokedex = [];

for (let i = 1; i < 152; i++) {
  await findPokemon(i).then(request => {
    const pokemon = { name: request.data.name, imageUrl: request.data.sprites.front_default, no: request.data.id, types: [request.data.types[0].type.name] }
    if (request.data.types[1]) {
      pokemon.types = [...pokemon.types, request.data.types[1].type.name];

    }
    pokedex[i - 1] = pokemon;
  })
}
const fiveRandomNums = (function () {
  const toBeDisplayed = [];
  while (toBeDisplayed.length < 5) {
    let rand = Math.floor(Math.random() * pokedex.length);
    if (toBeDisplayed.indexOf(rand) === -1) {
      toBeDisplayed[toBeDisplayed.length] = rand;
    }
  }
  return toBeDisplayed;
})();
function catchPokemon(){
  const x = document.querySelector('h1');
  console.log(x.innerText);

}


function Banner() {
  return (
    <>
    <div className='d-flex justify-content-center'>
      <img className='banner' src='https://www.freepnglogos.com/uploads/pokemon-logo-transparent-png-2.png' />
      </div>
    </>
  )
}
function CardContainer() {
  return (
    <>

      <div className='pokelist'>
        <Card pokemon={pokedex[fiveRandomNums[0]]} />
        <Card pokemon={pokedex[fiveRandomNums[1]]} />
        <Card pokemon={pokedex[fiveRandomNums[2]]} />
        <Card pokemon={pokedex[fiveRandomNums[3]]} />
        <Card pokemon={pokedex[fiveRandomNums[4]]} />
      </div>
    </>
  )
}
function Card({ pokemon }) {
  return (<>

    <div className='pokecard'>
      <h1>{pokemon.name}</h1>
      <h2>{`#${pokemon.no}`}</h2>
      <h3>{pokemon.types[0]}{pokemon.types[1] && `/${pokemon.types[1]}`}</h3>
      <img src={pokemon.imageUrl} />
      <button className='btn btn-primary' onClick={catchPokemon}>catch</button>
    </div>



  </>)
}
function HorizontalLine(){
  return(
    <div className='hr d-flex justify-content-center'>
    <div className='pokeButton'></div>
    </div>
    )
}

function Footer(){
  return (
    <>
    <div className='footer'>
      <PokemonCaught/>
    </div>
    </>
  )
}
function PokemonCaught(){
  <div></div>
}
function App() {

  return (
    <>
      <Banner />
      <CardContainer />
      <HorizontalLine/>
      <Footer/>
    </>
  )
}

export default App;
