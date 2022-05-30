import { Storage } from "services/enums";
import { ui, pokemonMainList } from "store/actions";

const StoreReviveMap = {
  [Storage.ITEM_STATE_UI]: ui.revive,
  [Storage.ITEM_STATE_POKEMON_MAIN_LIST]: pokemonMainList.revive,
};

export default StoreReviveMap;
