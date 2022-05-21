import { Store } from "services/enums";

const ui = {
  pokemonDetailsWidth: (width) => {
    return {
      type: Store.UI_POKEMON_DETAILS_WIDTH,
      width: width,
    };
  },
};

const pokemonMainList = {
  add: (pokemon) => {
    return {
      type: Store.POKEMON_MAIN_LIST_ADD,
      pokemon: pokemon,
    };
  },
  clear: () => {
    return {
      type: Store.POKEMON_MAIN_LIST_CLEAR,
    }
  },
  page: (page) => {
    return {
      type: Store.POKEMON_MAIN_LIST_PAGE,
      page: page,
    };
  },
  count: (count) => {
    return {
      type: Store.POKEMON_MAIN_LIST_COUNT,
      count: count,
    };
  },
};

export { ui, pokemonMainList };
