import doRequest from "../../helpers/doRequest";

export const serviceUser = {
  get: (token, params = null) => doRequest.get("User/", params, token),
  get_by_id: (token, id) => doRequest.get(`User/${id}`, token),
  get_datatable_user: (token, params = null) =>
    doRequest.post(
      "User/Datatable?role=" + params?.role + "&companyId=" + params.companyId,
      params,
      token
    ),
  create: (token, params = null) => doRequest.post("User", params, token),
  update: (token, params = null) =>
    doRequest.put("User/" + (params?.userId ?? ""), params, token),
  delete: (token, params = null, id = null) =>
    doRequest.delete("User/" + (id ?? ""), params, token),
};
