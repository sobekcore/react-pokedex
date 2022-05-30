import PokemonPagination from "configs/pokemon-pagination";
import { UI, PokemonMainList } from "store/enums";

const uiReducerState = {
  [UI.POKEMON_DETAILS_WIDTH]: 0,
  [UI.POKEMON_LIST_HIGHLIGHT]: true,
};

const pokemonMainListReducerState = {
  [PokemonMainList.POKEMONS]: [],
  [PokemonMainList.COUNT]: 0,
  [PokemonMainList.PAGE]: PokemonPagination.INITIAL_PAGE,
};

export { uiReducerState, pokemonMainListReducerState };
