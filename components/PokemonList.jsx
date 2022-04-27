import { useState, useEffect } from "react";
import { getAllPokemons } from "services/api";
import { store } from "store/store";

import PokemonItem from "components/PokemonItem";
import Pagination from "components/common/Pagination";

/**
 * @returns {JSX.Element}
 */
const PokemonList = () => {
  const [isLoading, setLoading] = useState(!store.getState().pokemonMainList.length);
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const pokemonMainList = store.getState().pokemonMainList;

    if (pokemonMainList.length > 0) {
      setPokemons(pokemonMainList);
      setLoading(false);
      return;
    }

    getAllPokemons()
      .then((data) => setPokemonsAndCount(data))
      .then(() => setLoading(false));
  }, []);

  const setPokemonsAndCount = (data) => {
    setPokemons(data.results);
    setCount(data.count);
  };

  return (
    <>
      {!isLoading && pokemons && (
        <>
          <ul>
            {pokemons.map((pokemon) => (
              <PokemonItem key={pokemon.name} pokemon={pokemon} />
            ))}
          </ul>
          <Pagination count={count} />
        </>
      )}
    </>
  );
};

export default PokemonList;
