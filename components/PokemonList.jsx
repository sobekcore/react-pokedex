import { useState, useEffect } from "react";
import { ITEMS_ON_PAGE, getPokemonsByPage } from "services/api";
import PokemonPagination from "configs/pokemon-pagination";
import { store } from "store/store";
import { pokemonMainList } from "store/actions";

import PokemonItem from "components/PokemonItem";
import Pagination from "components/common/Pagination";

/**
 * @param {Number} props.initialPage
 * @returns {JSX.Element}
 */
const PokemonList = (props) => {
  const [isLoading, setLoading] = useState(!store.getState().pokemonMainList.pokemons.length);
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(PokemonPagination.INITIAL_PAGE);

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
    setPage(page);
    store.dispatch(pokemonMainList.page(page));

    getPokemonsByPage(page)
      .then((data) => setPokemonsAndCount(data))
      .then(() => setLoading(false));
  };

  const setPokemonsAndCount = (data) => {
    setPokemons(data.results);
    setCount(data.count);
    store.dispatch(pokemonMainList.count(data.count));
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
          <Pagination
            count={count}
            onPageChange={fetchPokemonsAndSetState}
            initialPage={page}
            itemsOnPage={ITEMS_ON_PAGE}
          />
        </>
      )}
    </>
  );
};

export default PokemonList;
