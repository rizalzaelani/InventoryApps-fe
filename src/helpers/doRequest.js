import axios from "axios";

require("dotenv").config();

axios.defaults.withCredentials = false;
const apiBaseUrl =
  (process.env.PUBLIC_URL ?? "") + process.env.REACT_APP_API_BASE_URL;

const headers = (contentType, token) => {
  const header = {
    "Content-Type": "application/json",
    Accept: "application/json, application/xml, text/plain, text/html, *.*",
    Credential: "include",
  };
  if (contentType) header["Content-Type"] = contentType;
  if (token) header.Authorization = `Bearer ${token}`;
  if (token) header["Request-Access"] = token;
  return header;
};

const doRequest = {
  post: (slug, body, token = null, contentType = "") =>
    axios
      .post(apiBaseUrl + slug, body, { headers: headers(contentType, token) })
      .catch((error) => error.response),

  update: (slug, body, token = null) =>
    axios
      .patch(apiBaseUrl + slug, body, { headers: headers("", token) })
      .catch((error) => error.response),

  put: (slug, body, token = null) =>
    axios
      .put(apiBaseUrl + slug, body, { headers: headers("", token) })
      .catch((error) => error.response),

  delete: (slug, token = null) =>
    axios
      .delete(apiBaseUrl + slug, { headers: headers("", token) })
      .catch((error) => error.response),

  get: (slug, params = null, token = null) =>
    axios
      .get(apiBaseUrl + slug, {
        headers: headers("", token),
        params,
      })
      .catch((error) => error.response),

  patch: (slug, body, token = null) =>
    axios
      .patch(apiBaseUrl + slug, body, { headers: headers("", token) })
      .catch((error) => error.response),
};

export default doRequest;
