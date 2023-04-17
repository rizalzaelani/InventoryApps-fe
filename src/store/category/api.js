import doRequest from "../../helpers/doRequest";

export const serviceCategory = {
  get: (token, params = null) => doRequest.get("Category/", params, token),
  get_by_id: (token, id) => doRequest.get(`Category/${id}`, token),
  create: (token, params = null) => doRequest.post("Category", params, token),
  update: (token, params = null) =>
    doRequest.put("Category/" + (params?.categoryId ?? ""), params, token),
  delete: (token, params = null, id= null) =>
    doRequest.delete("Category/" + (id ?? ""), params, token),
};
