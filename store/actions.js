import { Action } from "store/enums";

const ui = {
  revive: (state) => {
    return {
      type: Action.UI_REVIVE_REDUCER,
      state: state,
    };
  },
  pokemonDetailsWidth: (width) => {
    return {
      type: Action.UI_POKEMON_DETAILS_WIDTH,
      width: width,
    };
  },
  pokemonListHighlight: (highlight) => {
    return {
      type: Action.UI_POKEMON_LIST_HIGHLIGHT,
      highlight: highlight,
    };
  },
};

const pokemonMainList = {
  revive: (state) => {
    return {
      type: Action.POKEMON_MAIN_LIST_REVIVE_REDUCER,
      state: state,
    };
  },
  add: (pokemon) => {
    return {
      type: Action.POKEMON_MAIN_LIST_ADD,
      pokemon: pokemon,
    };
  },
  clear: () => {
    return {
      type: Action.POKEMON_MAIN_LIST_CLEAR,
    }
  },
  page: (page) => {
    return {
      type: Action.POKEMON_MAIN_LIST_PAGE,
      page: page,
    };
  },
  count: (count) => {
    return {
      type: Action.POKEMON_MAIN_LIST_COUNT,
      count: count,
    };
  },
};

export { ui, pokemonMainList };
