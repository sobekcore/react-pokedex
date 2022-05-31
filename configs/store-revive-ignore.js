import { Storage } from "services/enums";
import { UI } from "store/enums";

const StoreReviveIgnore = {
  [Storage.ITEM_STATE_UI]: [
    UI.POKEMON_LIST_HIGHLIGHT,
  ],
};

export default StoreReviveIgnore;
