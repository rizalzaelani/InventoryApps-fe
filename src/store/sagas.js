import { all } from "redux-saga/effects";
import categorySaga from "./category/saga";
import companySaga from "./company/saga";
import userSaga from "./user/saga";
import inventorySaga from "./inventory/saga";
import transactionSaga from "./transaction/saga";
import handoverSaga from "./handover/saga";
import authSaga from "./auth/saga";

export default function* rootSaga() {
  yield all([
    categorySaga(),
    companySaga(),
    userSaga(),
    inventorySaga(),
    transactionSaga(),
    handoverSaga(),
    authSaga(),
  ]);
}
