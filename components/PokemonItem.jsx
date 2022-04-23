import { useState, useEffect } from "react";
import { getByFullEndpoint } from "services/api";
import { store } from "store/store";
import { pokemonMainList } from "store/actions";

import Link from "next/link";
import PokemonLoading from "components/PokemonLoading";
import PokemonImage from "components/PokemonImage";

const PokemonItem = (props) => {
  const [isLoading, setLoading] = useState(!store.getState().pokemonMainList.length);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    if (!props.pokemon.url) {
      setPokemon(props.pokemon);
      setLoading(false);
      return;
    }

    getByFullEndpoint(props.pokemon.url)
      .then((data) => { setPokemon(data); store.dispatch(pokemonMainList.add(data)); })
      .then(() => setLoading(false));
  }, [props.pokemon]);

  return (
    <div className="m-4">
      {isLoading && (
        <PokemonLoading name={props.pokemon.name} />
      )}
      {!isLoading && (
        <div className="is-flex is-align-items-center is-flex-gap-4">
          <PokemonImage pokemon={pokemon} />
          <Link passHref href={`/pokemon/${pokemon.id}`}>
            <a><h3 className="is-capitalized">{pokemon.name}</h3></a>
          </Link>
          <span role="presentation" className="is-flex-grow-1"></span>
          <ul className="is-flex is-flex-gap-4">
            {pokemon.types && pokemon.types.map(({ type }) => {
              return <li key={type.name}>{type.name}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  )
};

export default PokemonItem;
