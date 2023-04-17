/* eslint-disable no-unused-vars */
import { all, call, put, takeEvery } from "redux-saga/effects";

import { actions } from "./action";
import { serviceCompany } from "./api";
import catchErrorResponse from "../../helpers/catchErrorResponse";
// import { getAuthCredentials } from '../../helpers/Auth'

function setState(payload) {
  return put({
    type: "company/set_state",
    payload,
  });
}

function load(payload) {
  return setState({ loading: payload });
}

export function* getCompany({ payload }) {
  yield setState({
    loading: true,
  });
  const { year } = payload;
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''

  const response = yield call(serviceCompany.get, token, { year });
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

export function* getCompanyById({ payload }) {
  yield setState({
    loading: true,
  });
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''

  const response = yield call(serviceCompany.get_by_id, token, payload);
  if (response?.status === 200) {
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

export function* createCompany({ payload, callback }) {
  yield load(true);
  const { data } = payload;
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''
  const response = yield call(serviceCompany.create, token, data);

  if (response?.status < 200 || response?.status >= 300)
    return catchErrorResponse(response);

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

export function* updateCompany({ payload, callback }) {
  yield load(true);
  const { data } = payload;
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''
  const response = yield call(serviceCompany.update, token, {
    ...data,
    id: data.companyId,
  });

  if (response?.status < 200 || response?.status >= 300) {
    return catchErrorResponse(response);
  }

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

export function* deleteCompany({ payload, callback }) {
  yield load(true);
  const { id } = payload;
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''
  const response = yield call(serviceCompany.delete, token, {}, id);

  if (response?.status < 200 || response?.status >= 300)
    return catchErrorResponse(response);

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

export default function* companySaga() {
  yield all([
    takeEvery(actions.get_company, getCompany),
    takeEvery(actions.get_company_by_id, getCompanyById),
    takeEvery(actions.create_company, createCompany),
    takeEvery(actions.update_company, updateCompany),
    takeEvery(actions.delete_company, deleteCompany),
  ]);
}
