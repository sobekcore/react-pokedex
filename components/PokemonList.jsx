import { useState, useEffect } from "react";
import { getAllPokemons } from "services/api";

import PokemonLoading from "components/PokemonLoading";
import Pokemon from "components/PokemonItem";

const PokemonList = () => {
  const [isLoading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
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
            <Pokemon key={pokemon.name} pokemon={pokemon} />
          ))}
        </ul>
      )}
    </>
  );
};

export default PokemonList;
