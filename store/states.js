import { UI, PokemonMainList } from "store/enums";

const uiReducerState = {
  [UI.POKEMON_DETAILS_WIDTH]: 0,
  [UI.POKEMON_LIST_HIGHLIGHT]: true,
};

const pokemonMainListReducerState = {
  [PokemonMainList.POKEMONS]: [],
  [PokemonMainList.COUNT]: 0,
  [PokemonMainList.PAGE]: 1,
};

export { uiReducerState, pokemonMainListReducerState };
