import PokemonPagination from "configs/pokemon-pagination";

const pokemonMainListReducerState = {
  pokemons: [],
  count: 0,
  page: PokemonPagination.INITIAL_PAGE,
};

export { pokemonMainListReducerState };
