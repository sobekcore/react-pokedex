import PokemonPagination from "configs/pokemon-pagination";

/**
 * @var {URL}
 */
const API_ENDPOINT = new URL("https://pokeapi.co/api/v2/");

/**
 * @param {string} url
 * @returns
 */
const generateEndpoint = (url) => {
  return API_ENDPOINT + url;
};

/**
 * @param {number} id
 * @returns
 */
const getPokemonById = (id) => {
  return new Promise((resolve, reject) => {
    fetch(generateEndpoint(`pokemon/${id}`))
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

/**
 * @param {string} name
 * @returns
 */
const getPokemonByName = (name) => {
  return new Promise((resolve, reject) => {
    fetch(generateEndpoint(`pokemon/${name}`))
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

/**
 * @param {number} page
 * @returns
 */
const getPokemonsByPage = (page) => {
  const limit = `limit=${PokemonPagination.ITEMS_ON_PAGE}`;
  const offset = `offset=${--page * PokemonPagination.ITEMS_ON_PAGE}`;

  return new Promise((resolve, reject) => {
    fetch(generateEndpoint(`pokemon?${limit}&${offset}`))
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

/**
 * @param {string} name
 * @returns
 */
const getPageByPokemonName = (name) => {
  // Limit is unfortunately magic number due to there no
  // being other elegant way to fetch all Pokemons in PokéAPI
  const limit = "limit=100000";

  return new Promise((resolve, reject) => {
    const getAllPokemons = new Promise((resolve) => {
      fetch(generateEndpoint(`pokemon?${limit}`))
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });

    getAllPokemons.then((data) => {
      const pokemons = data.results;
      const index = pokemons.findIndex((pokemon) => pokemon.name === name);
      resolve(Math.ceil(++index / PokemonPagination.ITEMS_ON_PAGE));
    });
  });
};

export {
  API_ENDPOINT,
  getPokemonById,
  getPokemonByName,
  getPokemonsByPage,
  getPageByPokemonName
};
