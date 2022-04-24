import { useState, useEffect } from "react";
import { getAllPokemons } from "services/api";
import { store } from "store/store";

import PokemonItem from "components/PokemonItem";

/**
 * @returns {JSX.Element}
 */
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
      {!isLoading && pokemons && (
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
