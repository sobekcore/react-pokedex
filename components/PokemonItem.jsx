import { useState, useEffect, useRef } from "react";
import { getPokemonByName } from "services/api";
import { store } from "store/store";
import { pokemonMainList } from "store/actions";
import styles from "styles/modules/PokemonItem.module.scss";

import Link from "next/link";
import PokemonLoading from "components/PokemonLoading";
import PokemonImage from "components/PokemonImage";
import PokemonTypes from "components/PokemonTypes";

/**
 * @param {import("types/PokemonPrefetch").PokemonPrefetch} props.pokemon
 * @param {boolean} props.scrollIntoView
 * @returns {JSX.Element}
 */
const PokemonItem = (props) => {
  const [isLoading, setLoading] = useState(!store.getState().pokemonMainList.pokemons.length);
  const [pokemon, setPokemon] = useState();
  const pokemonItemElement = useRef(null);

  useEffect(() => {
    if (!props.pokemon.url) {
      setPokemon(props.pokemon);
      return;
    }

    setLoading(true);
    store.dispatch(pokemonMainList.clear());

    getPokemonByName(props.pokemon.name)
      .then((data) => updatePokemonInStateAndStore(data))
      .then(() => setLoading(false))
      .then(() => scrollToItemElement());
  }, [props.pokemon]);

  const updatePokemonInStateAndStore = (pokemon) => {
    setPokemon(pokemon);
    store.dispatch(pokemonMainList.add(pokemon));
  };

  const scrollToItemElement = () => {
    if (props.scrollIntoView) {
      setTimeout(() => {
        pokemonItemElement.current.scrollIntoView();
        pokemonItemElement.current.classList.add('is-highlighted');
      });
    }
  };

  return (
    <li ref={pokemonItemElement} className={`${styles.item} is-relative p-4`}>
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
    </li>
  )
};

export default PokemonItem;
