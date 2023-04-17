import doRequest from "../../helpers/doRequest";

export const serviceCompany = {
  get: (token, params = null) => doRequest.get("Company/", params, token),
  get_by_id: (token, id) => doRequest.get(`Company/${id}`, token),
  create: (token, params = null) => doRequest.post("Company", params, token),
  update: (token, params = null) =>
    doRequest.put("Company/" + (params?.companyId ?? ""), params, token),
  delete: (token, params = null, id = null) =>
    doRequest.delete("Company/" + (id ?? ""), params, token),
};
