import { useState, useEffect } from "react";
import { getByFullEndpoint } from "services/api";
import { store } from "store/store";
import { pokemonMainList } from "store/actions";
import styles from "styles/modules/PokemonItem.module.scss";

import Link from "next/link";
import PokemonLoading from "components/PokemonLoading";
import PokemonImage from "components/PokemonImage";
import PokemonTypes from "components/PokemonTypes";

/**
 * @param {import("types/PokemonPrefetch").PokemonPrefetch} props.pokemon
 * @returns {JSX.Element}
 */
const PokemonItem = (props) => {
  const [isLoading, setLoading] = useState(!store.getState().pokemonMainList.length);
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    if (!props.pokemon.url) {
      setPokemon(props.pokemon);
      setLoading(false);
      return;
    }

    getByFullEndpoint(props.pokemon.url)
      .then((data) => updatePokemonInStateAndStore(data))
      .then(() => setLoading(false));
  }, [props.pokemon]);

  const updatePokemonInStateAndStore = (pokemon) => {
    setPokemon(pokemon);
    store.dispatch(pokemonMainList.add(pokemon));
  };

  return (
    <div className={`${styles.item} is-relative m-4`}>
      {isLoading && (
        <PokemonLoading name={props.pokemon.name} />
      )}
      {!isLoading && pokemon && (
        <div className="is-flex is-align-items-center is-flex-gap-4">
          <PokemonImage pokemon={pokemon} />
          <Link passHref href={`/pokemon/${pokemon.id}`}>
            <a><h3 className="is-capitalized">{pokemon.name}</h3></a>
          </Link>
          <span role="presentation" className="is-flex-grow-1"></span>
          <PokemonTypes pokemon={pokemon} />
        </div>
      )}
    </div>
  )
};

export default PokemonItem;
