/* eslint-disable no-unused-vars */
import { all, call, put, takeEvery } from "redux-saga/effects";

import { actions } from "./action";
import { serviceHandover } from "./api";
import catchErrorResponse from "../../helpers/catchErrorResponse";
// import { getAuthCredentials } from '../../helpers/Auth'

function setState(payload) {
  return put({
    type: "handover/set_state",
    payload,
  });
}

function load(payload) {
  return setState({ loading: payload });
}

export function* getHandover({ payload }) {
  yield setState({
    loading: true,
  });
  const { year } = payload;
  const token = ""; // getAuthCredentials()?.handoverApiToken ?? ''

  const response = yield call(serviceHandover.get, token, { year });
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

export function* datatableHandover({ payload }) {
  yield setState({
    loading: true,
  });
  const { params } = payload;
  const token = ""; // getAuthCredentials()?.handoverApiToken ?? ''

  const response = yield call(serviceHandover.get_datatable_handover, token, {
    ...params,
  });
  if (response?.status === 200) {
    yield setState({
      loading: false,
      listDataDataTable: response.data.data ?? [],
      totalHandover: response.data.recordsFiltered ?? 0,
      meta: {},
    });
  } else {
    yield load(false);
    return catchErrorResponse(response);
  }
}

export function* getHandoverById({ payload, callback }) {
  yield setState({
    loading: true,
  });
  const token = ""; // getAuthCredentials()?.handoverApiToken ?? ''

  const response = yield call(serviceHandover.get_by_id, token, payload);
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

export function* createHandover({ payload, callback }) {
  yield load(true);
  const { params } = payload;
  const token = ""; // getAuthCredentials()?.handoverApiToken ?? ''
  const response = yield call(serviceHandover.create, token, params);

  if (response?.status < 200 || response?.status >= 300)
    return catchErrorResponse(response);

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

export function* updateHandover({ payload, callback }) {
  yield load(true);
  const { params } = payload;
  const token = ""; // getAuthCredentials()?.handoverApiToken ?? ''
  const response = yield call(serviceHandover.update, token, {
    ...params,
    id: params.handoverId,
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

export function* deleteHandover({ payload, callback }) {
  yield load(true);
  const { id } = payload;
  const token = ""; // getAuthCredentials()?.handoverApiToken ?? ''
  const response = yield call(serviceHandover.delete, token, {}, id);

  if (response?.status < 200 || response?.status >= 300)
    return catchErrorResponse(response);

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

export default function* handoverSaga() {
  yield all([
    takeEvery(actions.get_handover, getHandover),
    takeEvery(actions.get_handover_by_id, getHandoverById),
    takeEvery(actions.get_datatable_handover, datatableHandover),
    takeEvery(actions.create_handover, createHandover),
    takeEvery(actions.update_handover, updateHandover),
    takeEvery(actions.delete_handover, deleteHandover),
  ]);
}
