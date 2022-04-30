import { combineReducers } from "redux";
import { Store } from "services/enums";

import { pokemonMainListReducerState } from "store/states";

const pokemonMainListReducer = (state = pokemonMainListReducerState, action) => {
  switch (action.type) {
    case Store.POKEMON_MAIN_LIST_ADD:
      const index = state.pokemons.findIndex((element) => element.id === action.pokemon.id);
      const pokemonAlreadyExists = index !== -1;

      if (!pokemonAlreadyExists) {
        const copy = [...state.pokemons, action.pokemon];
        const sorted = copy.sort((current, next) => current.id - next.id);
        return { ...state, pokemons: sorted };
      }

      return state;

    case Store.POKEMON_MAIN_LIST_CLEAR:
      return { ...state, pokemons: [] };

    case Store.POKEMON_MAIN_LIST_PAGE:
      return { ...state, page: action.page };

    case Store.POKEMON_MAIN_LIST_COUNT:
      return { ...state, count: action.count };

    default:
      return state;
  }
};

const reducer = combineReducers({
  pokemonMainList: pokemonMainListReducer,
});

export { reducer };
