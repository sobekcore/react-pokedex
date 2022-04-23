import { combineReducers } from "redux";
import { Store } from "services/enums";

const pokemonMainListReducer = (state = [], action) => {
  switch (action.type) {
    case Store.POKEMON_MAIN_LIST_ADD:
      const index = state.findIndex((element) => element.id === action.pokemon.id);
      const pokemonAlreadyExists = index !== -1;

      if (!pokemonAlreadyExists) {
        const copy = [...state, action.pokemon];
        return copy.sort((current, next) => current.id - next.id);
      }

      return state;
    default:
      return state;
  }
};

const reducer = combineReducers({
  pokemonMainList: pokemonMainListReducer,
});

export { reducer };
