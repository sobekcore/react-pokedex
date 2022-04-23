import { Store } from "services/enums";

const pokemonMainList = {
  add: (pokemon) => {
    return {
      type: Store.POKEMON_MAIN_LIST_ADD,
      pokemon: pokemon,
    };
  },
};

export { pokemonMainList };
