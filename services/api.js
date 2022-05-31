import PokemonPagination from "configs/pokemon-pagination";
import { Http } from "services/enums";
import { request } from "facades/http";

/**
 * @var {URL}
 */
const API_ENDPOINT = new URL("https://pokeapi.co/api/v2/");

/**
 * @param {string} url
 * @returns {Promise}
 */
const generateEndpoint = (url) => {
  return API_ENDPOINT + url;
};

/**
 * @param {number} id
 * @returns {Promise}
 */
const getPokemonById = (id) => {
  return request(Http.GET, generateEndpoint(`pokemon/${id}`));
};

/**
 * @param {string} name
 * @returns {Promise}
 */
const getPokemonByName = (name) => {
  return request(Http.GET, generateEndpoint(`pokemon/${name}`));
};

/**
 * @param {number} page
 * @returns {Promise}
 */
const getPokemonsByPage = (page) => {
  const limit = `limit=${PokemonPagination.ITEMS_ON_PAGE}`;
  const offset = `offset=${--page * PokemonPagination.ITEMS_ON_PAGE}`;

  return request(Http.GET, generateEndpoint(`pokemon?${limit}&${offset}`));
};

/**
 * @param {string} name
 * @returns {Promise}
 */
const getPageByPokemonName = (name) => {
  // Limit is unfortunately magic number due to there no
  // being other elegant way to fetch all Pokemons in PokéAPI
  const limit = "limit=100000";

  return new Promise((resolve, reject) => {
    const getAllPokemons = request(Http.GET, generateEndpoint(`pokemon?${limit}`));

    getAllPokemons.then((data) => {
      const pokemons = data.results;
      const index = pokemons.findIndex((pokemon) => pokemon.name === name);
      resolve(Math.ceil(++index / PokemonPagination.ITEMS_ON_PAGE));
    });

    getAllPokemons.catch((error) => {
      reject(error);
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
