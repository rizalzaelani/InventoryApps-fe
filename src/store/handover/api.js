import doRequest from "../../helpers/doRequest";

export const serviceHandover = {
  get: (token, params = null) => doRequest.get("Handover/", params, token),
  get_by_id: (token, id) => doRequest.get(`Handover/${id}`, token),
  get_datatable_handover: (token, params = null) =>
    doRequest.post(
      "Handover/Datatable?categoryId=" +
        params?.categoryId +
        "&companyId=" +
        params.companyId +
        "&inventoryId=" +
        params.inventoryId +
        "&userId=" +
        params.userId,
      params,
      token
    ),
  create: (token, params = null) => doRequest.post("Handover", params, token),
  update: (token, params = null) =>
    doRequest.put("Handover/" + (params?.handoverId ?? ""), params, token),
  delete: (token, params = null, id = null) =>
    doRequest.delete("Handover/" + (id ?? ""), params, token),
};
