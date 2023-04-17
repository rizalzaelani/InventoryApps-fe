/* eslint-disable no-unused-vars */
import { all, call, put, takeEvery } from "redux-saga/effects";

import { actions } from "./action";
import { serviceCategory } from "./api";
import catchErrorResponse from "../../helpers/catchErrorResponse";
// import { getAuthCredentials } from '../../helpers/Auth'

function setState(payload) {
  return put({
    type: "category/set_state",
    payload,
  });
}

function load(payload) {
  return setState({ loading: payload });
}

export function* getCategory({ payload }) {
  yield setState({
    loading: true,
  });
  const { params } = payload;
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''

  const response = yield call(serviceCategory.get, token, params);
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

export function* getCategoryById({ payload }) {
  yield setState({
    loading: true,
  });
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''

  const response = yield call(serviceCategory.get_by_id, token, payload);
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

export function* createCategory({ payload, callback }) {
  yield load(true);
  const { data } = payload;
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''
  const response = yield call(serviceCategory.create, token, data);

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

export function* updateCategory({ payload, callback }) {
  yield load(true);
  const { data } = payload;
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''
  const response = yield call(serviceCategory.update, token, {
    ...data,
    id: data.categoryId,
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

export function* deleteCategory({ payload, callback }) {
  yield load(true);
  const { id } = payload;
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''
  const response = yield call(serviceCategory.delete, token, {}, id);

  if (response?.status < 200 || response?.status >= 300)
    return catchErrorResponse(response);

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

export default function* categorySaga() {
  yield all([
    takeEvery(actions.get_category, getCategory),
    takeEvery(actions.get_category_by_id, getCategoryById),
    takeEvery(actions.create_category, createCategory),
    takeEvery(actions.update_category, updateCategory),
    takeEvery(actions.delete_category, deleteCategory),
  ]);
}
