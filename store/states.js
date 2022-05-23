import PokemonPagination from "configs/pokemon-pagination";

const uiReducerState = {
  pokemonDetailsWidth: 0,
  pokemonListHighlight: true,
};

const pokemonMainListReducerState = {
  pokemons: [],
  count: 0,
  page: PokemonPagination.INITIAL_PAGE,
};

export { uiReducerState, pokemonMainListReducerState };
