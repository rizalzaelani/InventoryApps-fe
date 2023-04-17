/* eslint-disable no-unused-vars */
import { all, call, put, takeEvery } from "redux-saga/effects";

import { actions } from "./action";
import { serviceAuth } from "./api";
import catchErrorResponse from "../../helpers/catchErrorResponse";
// import { getAuthCredentials } from '../../helpers/Auth'

function setState(payload) {
  return put({
    type: "auth/set_state",
    payload,
  });
}

function load(payload) {
  return setState({ loading: payload });
}

export function* login({ payload, callback }) {
  yield load(true);
  const response = yield call(serviceAuth.auth_login, payload);
  if (response?.status < 200 || response?.status >= 300) {
    catchErrorResponse(response);
    callback({
      status: response?.status,
      message: response?.message ?? response?.data?.message,
      data: [],
    });
    return yield load(false);
  }

  let ablt = [
    {
      action: "manage",
      subject: "all",
    },
  ];
  let usrData1 = {
    userData: { ...response.data.data.userData, ability: ablt },
    token: response.data.data.token,
  };
  yield setState({
    loading: false,
    dataUser: usrData1 ?? [],
    meta: {},
  });

  let usrData = response?.data?.data?.userData;
  let usrToken = response?.data?.data?.token;
  let usr = {
    userId: usrData?.userId,
    fullname: usrData?.fullname,
    username: usrData?.username,
    role: usrData?.role,
    email: usrData?.email,
    accessToken: usrToken,
    ability: ablt,
  };
  localStorage.setItem("userData", JSON.stringify(usr));
  localStorage.setItem("accessToken", usrToken);
  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: { ...response?.data, data: usrData1 },
  });
}

export function* logout({ callback }) {
  yield setState({
    loading: true,
  });
  const token = ""; // getAuthCredentials()?.userApiToken ?? ''

  const response = yield call(serviceAuth.auth_logout, token);
  if (response?.status < 200 || response?.status >= 300)
    catchErrorResponse(response);

  callback({
    status: response?.status,
    message: response?.message ?? response?.data?.message,
    data: response?.data,
  });
  yield load(false);
}

export default function* authSaga() {
  yield all([
    takeEvery(actions.auth_login, login),
    takeEvery(actions.auth_logout, logout),
  ]);
}
