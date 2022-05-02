import { useState, useEffect } from "react";
import { getPokemonById, getPageByPokemonName } from "services/api";
import { store } from "store/store";
import styles from "styles/modules/PokemonPage.module.scss";

import PokemonLoading from "components/PokemonLoading";
import PokemonList from "components/PokemonList";
import Pokemon from "components/Pokemon";

/**
 * @param {import("types/Pokemon").Pokemon} props.pokemon
 * @returns {JSX.Element}
 */
const PokemonPage = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});
  const [page, setPage] = useState(null);

  useEffect(() => {
    setPokemon(props.pokemon);
    setPageBasedOnConditions(props.pokemon.name);
    setLoading(false);
  }, [props.pokemon]);

  const setPageBasedOnConditions = (name) => {
    const pokemonMainListPokemons = store.getState().pokemonMainList.pokemons;
    const pokemonMainListPage = store.getState().pokemonMainList.page;

    if (pokemonMainListPokemons.length > 0) {
      setPage(pokemonMainListPage);
      return;
    }

    getPageByPokemonName(name)
      .then((page) => setPage(page));
  }

  return (
    <main className="is-flex is-full-width">
      <aside className={`${styles.list} is-sticky-top is-full-height is-overflow-y-scroll is-width-100`}>
        {page && (
          <PokemonList initialPage={page} scrollToPokemon={props.pokemon.name} />
        )}
      </aside>
      <section className="is-relative is-width-100">
        {isLoading && (
          <PokemonLoading name={props.pokemon.name} />
        )}
        {!isLoading && pokemon && (
          <Pokemon pokemon={pokemon} />
        )}
      </section>
    </main>
  )
};

PokemonPage.getInitialProps = async ({ query }) => {
  const pokemon = await getPokemonById(query.id);
  return { pokemon: pokemon };
};

export default PokemonPage;
