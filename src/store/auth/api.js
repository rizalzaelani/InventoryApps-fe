import doRequest from "../../helpers/doRequest";

export const serviceAuth = {
  auth_login: (params = null) => doRequest.post("Authentication/", params),
  auth_logout: (token, params = null) =>
    doRequest.get("Authentication/", params, token),
};
