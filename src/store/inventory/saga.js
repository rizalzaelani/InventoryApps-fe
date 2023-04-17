/* eslint-disable no-unused-vars */
import { all, call, put, takeEvery } from "redux-saga/effects";

import { actions } from "./action";
import { serviceInventory } from "./api";
import catchErrorResponse from "../../helpers/catchErrorResponse";
// import { getAuthCredentials } from '../../helpers/Auth'

function setState(payload) {
  return put({
    type: "inventory/set_state",
    payload,
  });
}

function load(payload) {
  return setState({ loading: payload });
}

export function* getInventory({ payload }) {
  yield setState({
    loading: true,
  });
  const { year } = payload;
  const token = ""; // getAuthCredentials()?.inventoryApiToken ?? ''

  const response = yield call(serviceInventory.get, token, { year });
  if (response?.status === 200) {
    yield setState({
      loading: false,
      listData: response.data.data ?? [],
      meta: {},
    });
  } else {
    yield load(false);
    return catchErrorResponse(response);
  }
}

export function* datatableInventory({ payload }) {
  yield setState({
    loading: true,
  });
  const { params } = payload;
  const token = ""; // getAuthCredentials()?.inventoryApiToken ?? ''

  const response = yield call(serviceInventory.get_datatable_inventory, token, {
    ...params,
  });
  if (response?.status === 200) {
    yield setState({
      loading: false,
      listDataDataTable: response.data.data ?? [],
      totalInventory: response.data.recordsFiltered ?? 0,
      meta: {},
    });
  } else {
    yield load(false);
    return catchErrorResponse(response);
  }
}

export function* getInventoryById({ payload, callback }) {
  yield setState({
    loading: true,
  });
  const token = ""; // getAuthCredentials()?.inventoryApiToken ?? ''

  const response = yield call(serviceInventory.get_by_id, token, payload);
  if (response?.status === 200) {
    // callback({
    //   status: response?.status,
    //   message: response?.message ?? response?.data?.message,
    //   data: response?.data,
    // });
    // yield load(false);
    yield setState({
      loading: false,
      rawData: response.data.data ?? {},
      meta: {},
    });
  } else {
    yield load(false);
    return catchErrorResponse(response);
  }
}

export function* createInventory({ payload, callback }) {
  yield load(true);
  const { params } = payload;
  const token = ""; // getAuthCredentials()?.inventoryApiToken ?? ''
  const response = yield call(serviceInventory.create, token, params);

  if (response?.status < 200 || response?.status >= 300)
    return catchErrorResponse(response);

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

export function* updateInventory({ payload, callback }) {
  yield load(true);
  const { params } = payload;
  const token = ""; // getAuthCredentials()?.inventoryApiToken ?? ''
  const response = yield call(serviceInventory.update, token, {
    ...params,
    id: params.inventoryId,
  });

  if (response?.status < 200 || response?.status >= 300)
    return catchErrorResponse(response);

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

export function* deleteInventory({ payload, callback }) {
  yield load(true);
  const { id } = payload;
  const token = ""; // getAuthCredentials()?.inventoryApiToken ?? ''
  const response = yield call(serviceInventory.delete, token, {}, id);

  if (response?.status < 200 || response?.status >= 300)
    return catchErrorResponse(response);

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

export function* uploadInventory({ payload, callback }) {
  yield setState({
    loading: true,
  });
  const token = ""; // getAuthCredentials()?.inventoryApiToken ?? ''
  const response = yield call(
    serviceInventory.upload_file_inventory,
    token,
    payload
  );

  if (response?.status == 200) {
    yield setState({
      loading: false,
      listDataImport: response.data.data ?? [],
      meta: {},
    });
    callback({
      status: response?.status,
      message: response?.message ?? response?.data?.message,
      listDataImport: response?.data?.data ?? [],
    });
  } else {
    yield load(false);
    return catchErrorResponse(response);
  }
}

export function* importInventory({ payload, callback }) {
  yield setState({
    loading: true,
  });
  // const { params } = payload;
  const token = ""; // getAuthCredentials()?.inventoryApiToken ?? ''
  const response = yield call(
    serviceInventory.import_inventory,
    token,
    payload
  );

  if (response?.status == 200) {
    callback({
      status: response?.status,
      message: response?.message ?? response?.data?.message,
      data: response?.data?.data ?? [],
    });
  } else {
    yield load(false);
    return catchErrorResponse(response);
  }
}

export function* reset_datatable({ payload }) {
  yield setState({
    loading: false,
    listData: [],
    totalInventory: 0,
  });
}

export default function* inventorySaga() {
  yield all([
    takeEvery(actions.get_inventory, getInventory),
    takeEvery(actions.get_inventory_by_id, getInventoryById),
    takeEvery(actions.get_datatable_inventory, datatableInventory),
    takeEvery(actions.create_inventory, createInventory),
    takeEvery(actions.update_inventory, updateInventory),
    takeEvery(actions.delete_inventory, deleteInventory),
    takeEvery(actions.upload_file_inventory, uploadInventory),
    takeEvery(actions.import_inventory, importInventory),
    takeEvery(actions.reset_datatable, reset_datatable),
  ]);
}
