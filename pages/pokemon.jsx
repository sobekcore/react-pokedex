import { useState, useEffect } from "react";
import { getAllPokemons } from "services/api";

import Pokemon from "components/Pokemon";

const PokemonPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getAllPokemons()
      .then((data) => setPokemons(data.results))
      .then(() => setLoading(false));
  }, []);

  return (
    <main>
      {isLoading && (
        <span>Loading Pokemons...</span>
      )}
      {!isLoading && (
        <ul>
          {pokemons.map((pokemon) => (
            <Pokemon key={pokemon.name} pokemon={pokemon} />
          ))}
        </ul>
      )}
    </main>
  );
};

export default PokemonPage;
