import { useState, useEffect } from "react";
import { getByFullEndpoint } from "services/api";

import PokemonImage from "components/PokemonImage";

const Pokemon = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    getByFullEndpoint(props.pokemon.url)
      .then((data) => setPokemon(data))
      .then(() => setLoading(false));
  }, [props.pokemon.url]);

  return (
    <div className="mx-3 my-4">
      {isLoading && (
        <span>Loading <span className="is-capitalized">{props.pokemon.name}</span>...</span>
      )}
      {!isLoading && (
        <div className="is-flex is-align-items-center is-flex-gap-4">
          <PokemonImage pokemon={pokemon} />
          <span className="is-capitalized">{pokemon.name}</span>
          <span role="presentation" className="is-flex-grow-1"></span>
          <ul className="is-flex is-flex-gap-4">
            {pokemon.types.map(({ type }) => {
              return <li key={type.name}>{type.name}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  )
};

export default Pokemon;
