/* eslint-disable no-unused-vars */
import { all, call, put, takeEvery } from "redux-saga/effects";

import { actions } from "./action";
import { serviceUser } from "./api";
import catchErrorResponse from "../../helpers/catchErrorResponse";
// import { getAuthCredentials } from '../../helpers/Auth'

function setState(payload) {
  return put({
    type: "user/set_state",
    payload,
  });
}

function load(payload) {
  return setState({ loading: payload });
}

export function* getUser({ payload }) {
  yield setState({
    loading: true,
  });
  const { year } = payload;
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''

  const response = yield call(serviceUser.get, token, { year });
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

export function* datatableUser({ payload }) {
  yield setState({
    loading: true,
  });
  const { params } = payload;
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''

  const response = yield call(serviceUser.get_datatable_user, token, {
    ...params,
  });
  if (response?.status === 200) {
    yield setState({
      loading: false,
      listDataDataTable: response.data.data ?? [],
      totalUser: response.data.recordsFiltered ?? 0,
      meta: {},
    });
  } else {
    yield load(false);
    return catchErrorResponse(response);
  }
}

export function* getUserById({ payload, callback }) {
  yield setState({
    loading: true,
  });
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''

  const response = yield call(serviceUser.get_by_id, token, payload);
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

export function* createUser({ payload, callback }) {
  yield load(true);
  const { params } = payload;
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''
  const response = yield call(serviceUser.create, token, params);

  if (response?.status < 200 || response?.status >= 300)
    return catchErrorResponse(response);

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

export function* updateUser({ payload, callback }) {
  yield load(true);
  const { params } = payload;
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''
  const response = yield call(serviceUser.update, token, {
    ...params,
    id: params.userId,
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

export function* deleteUser({ payload, callback }) {
  yield load(true);
  const { id } = payload;
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''
  const response = yield call(serviceUser.delete, token, {}, id);

  if (response?.status < 200 || response?.status >= 300)
    return catchErrorResponse(response);

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

// export function* resetUserDetail({payload}){
//   yield setState({
//     loading: false,
//     rawData: response.data.data ?? {},
//     meta: {},
//   })
// }

export default function* userSaga() {
  yield all([
    takeEvery(actions.get_user, getUser),
    takeEvery(actions.get_user_by_id, getUserById),
    takeEvery(actions.get_datatable_user, datatableUser),
    takeEvery(actions.create_user, createUser),
    takeEvery(actions.update_user, updateUser),
    takeEvery(actions.delete_user, deleteUser),
  ]);
}
