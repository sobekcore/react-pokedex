import { useState, useEffect } from "react";
import { getPokemonById } from "services/api";
import styles from "styles/modules/PokemonPage.module.scss";

import PokemonLoading from "components/PokemonLoading";
import PokemonList from "components/PokemonList";
import PokemonDetails from "components/Pokemon";

/**
 * @param {import("types/Pokemon").Pokemon} props.pokemon
 * @returns {JSX.Element}
 */
const PokemonPage = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    setPokemon(props.pokemon);
    setLoading(false);
  }, [props.pokemon]);

  return (
    <main className="is-flex is-full-width">
      <aside className={`${styles.list} is-sticky-top is-full-height is-overflow-y-scroll is-width-100`}>
        <PokemonList />
      </aside>
      <section className="is-relative is-width-100">
        {isLoading && (
          <PokemonLoading name={props.pokemon.name} />
        )}
        {!isLoading && pokemon && (
          <PokemonDetails pokemon={pokemon} />
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
