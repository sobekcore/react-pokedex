const API_ENDPOINT = "https://pokeapi.co/api/v2/";

const generateEndpoint = (url) => {
  return API_ENDPOINT + url;
};

const getByFullEndpoint = (fullEndpoint) => {
  return new Promise((resolve, reject) => {
    fetch(fullEndpoint)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getPokemonById = (id) => {
  return new Promise((resolve, reject) => {
    fetch(generateEndpoint(`pokemon/${id}`))
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getAllPokemons = () => {
  return new Promise((resolve, reject) => {
    fetch(generateEndpoint("pokemon"))
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export {
  API_ENDPOINT,
  getByFullEndpoint,
  getPokemonById,
  getAllPokemons
};
