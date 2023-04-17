/* eslint-disable no-unused-vars */
import { all, call, put, takeEvery } from "redux-saga/effects";

import { actions } from "./action";
import { serviceTransaction } from "./api";
import catchErrorResponse from "../../helpers/catchErrorResponse";
// import { getAuthCredentials } from '../../helpers/Auth'

function setState(payload) {
  return put({
    type: "transaction/set_state",
    payload,
  });
}

function load(payload) {
  return setState({ loading: payload });
}

export function* getTransaction({ payload }) {
  yield setState({
    loading: true,
  });
  const { year } = payload;
  const token = ""; // getAuthCredentials()?.transactionApiToken ?? ''

  const response = yield call(serviceTransaction.get, token, { year });
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

export function* datatableTransaction({ payload }) {
  yield setState({
    loading: true,
  });
  const { params } = payload;
  const token = ""; // getAuthCredentials()?.transactionApiToken ?? ''

  const response = yield call(
    serviceTransaction.get_datatable_transaction,
    token,
    {
      ...params,
    }
  );
  if (response?.status === 200) {
    yield setState({
      loading: false,
      listDataDataTable: response.data.data ?? [],
      totalTransaction: response.data.recordsFiltered ?? 0,
      meta: {},
    });
  } else {
    yield load(false);
    return catchErrorResponse(response);
  }
}

export function* getTransactionById({ payload, callback }) {
  yield setState({
    loading: true,
  });
  const token = ""; // getAuthCredentials()?.transactionApiToken ?? ''

  const response = yield call(serviceTransaction.get_by_id, token, payload);
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

export function* createTransaction({ payload, callback }) {
  yield load(true);
  const { params } = payload;
  const token = ""; // getAuthCredentials()?.transactionApiToken ?? ''
  const response = yield call(serviceTransaction.create, token, params);

  if (response?.status < 200 || response?.status >= 300)
    return catchErrorResponse(response);

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

export function* updateTransaction({ payload, callback }) {
  yield load(true);
  const { params } = payload;
  const token = ""; // getAuthCredentials()?.transactionApiToken ?? ''
  const response = yield call(serviceTransaction.update, token, {
    ...params,
    id: params.transactionId,
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

export function* deleteTransaction({ payload, callback }) {
  yield load(true);
  const { id } = payload;
  const token = ""; // getAuthCredentials()?.transactionApiToken ?? ''
  const response = yield call(serviceTransaction.delete, token, {}, id);

  if (response?.status < 200 || response?.status >= 300)
    return catchErrorResponse(response);

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

export default function* transactionSaga() {
  yield all([
    takeEvery(actions.get_transaction, getTransaction),
    takeEvery(actions.get_transaction_by_id, getTransactionById),
    takeEvery(actions.get_datatable_transaction, datatableTransaction),
    takeEvery(actions.create_transaction, createTransaction),
    takeEvery(actions.update_transaction, updateTransaction),
    takeEvery(actions.delete_transaction, deleteTransaction),
  ]);
}
