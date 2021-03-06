import { useState, useEffect, useRef } from "react";
import PokemonPagination from "configs/pokemon-pagination";
import { getPokemonsByPage } from "services/api";
import { store } from "store/store";
import { pokemonMainList } from "store/actions";

import PokemonItem from "components/PokemonItem";
import Pagination from "components/common/Pagination";

/**
 * @param {number} props.initialPage
 * @param {string} props.scrollToPokemon
 * @returns {JSX.Element}
 */
const PokemonList = (props) => {
  const [isLoading, setLoading] = useState(!store.getState().pokemonMainList.pokemons.length);
  const [isReloading, setReloading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(PokemonPagination.INITIAL_PAGE);
  const pokemonListElement = useRef(null);

  useEffect(() => {
    const pokemonMainListPokemons = store.getState().pokemonMainList.pokemons;
    const pokemonMainListPage = store.getState().pokemonMainList.page;
    const pokemonMainListCount = store.getState().pokemonMainList.count;

    if (props.initialPage && pokemonMainListPage !== props.initialPage) {
      fetchPokemonsAndSetState(props.initialPage);
      return;
    }

    if (pokemonMainListPokemons.length > 0) {
      setPokemons(pokemonMainListPokemons);
      setPage(pokemonMainListPage);
      setCount(pokemonMainListCount);
      return;
    }

    fetchPokemonsAndSetState(page);
  }, [props.initialPage]);

  const fetchPokemonsAndSetState = (page) => {
    setReloading(true);
    setPage(page);
    store.dispatch(pokemonMainList.page(page));

    getPokemonsByPage(page)
      .then((data) => setPokemonsAndCount(data))
      .then(() => setLoading(false))
      .then(() => setReloading(false))
      .then(() => scrollToListElement());
  };

  const setPokemonsAndCount = (data) => {
    setPokemons(data.results);
    setCount(data.count);
    store.dispatch(pokemonMainList.count(data.count));
  };

  const scrollToListElement = () => {
    if (pokemonListElement.current instanceof HTMLElement) {
      pokemonListElement.current.scrollIntoView();
    }
  };

  return (
    <>
      {!isLoading && pokemons && (
        <>
          <ul ref={pokemonListElement} className="has-background-white">
            {pokemons.map((pokemon) => {
              const scroll = props.scrollToPokemon === pokemon.name;
              return <PokemonItem key={pokemon.name} pokemon={pokemon} scrollIntoView={scroll} />;
            })}
          </ul>
          <Pagination
            count={count}
            onPageChange={fetchPokemonsAndSetState}
            initialPage={page}
            itemsOnPage={PokemonPagination.ITEMS_ON_PAGE}
            interactive={!isReloading}
          />
        </>
      )}
    </>
  );
};

export default PokemonList;
