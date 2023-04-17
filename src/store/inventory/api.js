import { getUniqueDomId } from "@fullcalendar/core";
import doRequest from "../../helpers/doRequest";
export const serviceInventory = {
  get: (token, params = null) => doRequest.get("Inventory/", params, token),
  get_by_id: (token, id) => doRequest.get(`Inventory/${id}`, token),
  get_datatable_inventory: (token, params = null) =>
    doRequest.post(
      "Inventory/Datatable?categoryId=" +
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
  create: (token, params = null) => doRequest.post("Inventory", params, token),
  update: (token, params = null) =>
    doRequest.put("Inventory/" + (params?.inventoryId ?? ""), params, token),
  delete: (token, params = null, id = null) =>
    doRequest.delete("Inventory/" + (id ?? ""), params, token),
  upload_file_inventory: (token, file) =>
    doRequest.post("Inventory/UploadFileInventory", file, token),
  import_inventory: (token, params) =>
    doRequest.post("Inventory/ImportInventory", params, token),
};
