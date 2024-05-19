import { Suspense, use, useState } from "react";
import "./App.css";

const getPokemonData = async (pokemon: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  return response.json();
};

const Pokemon = () => {
  const [promise, setPromise] = useState(() => getPokemonData("pikachu"));

  const fetchPokemon = () => {
    const randomPokemonId = Math.floor(Math.random() * 151) + 1;
    setPromise(getPokemonData(`${randomPokemonId}`));
  };

  const pokemonData = use(promise);

  return (
    <>
      <img
        src={pokemonData.sprites.other["official-artwork"].front_default}
        alt={pokemonData.species.name}
      />
      <p>{pokemonData.species.name}</p>
      <button onClick={fetchPokemon}>fetch</button>
    </>
  );
};

function App() {
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <Pokemon />
      </Suspense>
    </>
  );
}

export default App;
