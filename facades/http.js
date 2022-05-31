import { ContentType } from "services/enums";

/**
 * @param {string} method
 * @param {string} endpoint
 * @param {object} params
 * @returns {Promise}
 */
const request = (method, endpoint, params) => {
  const options = {
    method: method,
  };

  if (params) {
    options.headers = { "Content-Type": ContentType.JSON };
    options.body = JSON.stringify(params);
  }

  return new Promise((resolve, reject) => {
    fetch(endpoint, options)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export { request };
