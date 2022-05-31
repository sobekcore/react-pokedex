import StoreReviveMap from "configs/store-revive-map";
import StoreReviveIgnore from "configs/store-revive-ignore";
import { store } from "store/store";

/**
 * @param {array} keys
 * @returns {void}
 */
const saveStore = (keys) => {
  const state = store.getState();

  for (const [name, elements] of Object.entries(state)) {
    const stateWithoutIgnored = {};
    const stateIsEmpty = true;

    if (keys && !keys.includes(name)) {
      continue;
    }

    for (const [key, value] of Object.entries(elements)) {
      if (StoreReviveIgnore[name] && StoreReviveIgnore[name].includes(key)) {
        continue;
      }

      stateWithoutIgnored[key] = value;
      stateIsEmpty = false;
    }

    if (stateIsEmpty) {
      continue;
    }

    localStorage.setItem(name, JSON.stringify(stateWithoutIgnored));
  }
};

/**
 * @param {string} key
 * @returns {Promise}
 */
const reviveStore = (key) => {
  return new Promise((resolve, reject) => {
    const state = localStorage.getItem(key);

    if (state === null) {
      reject(`Element ${key} could not be find in localStorage`);
    }

    const data = JSON.parse(state);
    const func = StoreReviveMap[key];
    store.dispatch(func(data));

    resolve(true);
  });
};

export { saveStore, reviveStore };
