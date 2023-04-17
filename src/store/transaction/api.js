import doRequest from "../../helpers/doRequest";

export const serviceTransaction = {
  get: (token, params = null) => doRequest.get("Transaction/", params, token),
  get_by_id: (token, id) => doRequest.get(`Transaction/${id}`, token),
  get_datatable_transaction: (token, params = null) =>
    doRequest.post(
      "Transaction/Datatable?categoryId=" +
        params?.categoryId +
        "&companyId=" +
        params.companyId +
        "&userId=" +
        params.userId +
        "&inventoryId=" +
        params.inventoryId,
      params,
      token
    ),
  create: (token, params = null) =>
    doRequest.post("Transaction", params, token),
  update: (token, params = null) =>
    doRequest.put(
      "Transaction/" + (params?.transactionId ?? ""),
      params,
      token
    ),
  delete: (token, params = null, id = null) =>
    doRequest.delete("Transaction/" + (id ?? ""), params, token),
};
