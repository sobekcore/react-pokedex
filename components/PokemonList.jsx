import { useState, useEffect } from "react";
import { getAllPokemons } from "services/api";
import { store } from "store/store";

import PokemonLoading from "components/PokemonLoading";
import PokemonItem from "components/PokemonItem";

const PokemonList = () => {
  const [isLoading, setLoading] = useState(!store.getState().pokemonMainList.length);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const pokemonMainList = store.getState().pokemonMainList;

    if (pokemonMainList.length > 0) {
      setPokemons(pokemonMainList);
      setLoading(false);
      return;
    }

    getAllPokemons()
      .then((data) => setPokemons(data.results))
      .then(() => setLoading(false));
  }, []);

  return (
    <>
      {isLoading && (
        <PokemonLoading />
      )}
      {!isLoading && (
        <ul>
          {pokemons.map((pokemon) => (
            <PokemonItem key={pokemon.name} pokemon={pokemon} />
          ))}
        </ul>
      )}
    </>
  );
};

export default PokemonList;
