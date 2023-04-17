import { combineReducers } from "redux";

// ** Reducers Imports
import navbar from "./auth/navbar";
import layout from "./auth/layout";
import auth from "./auth/authentication";
import todo from "@src/views/apps/todo/store";
import chat from "@src/views/apps/chat/store";
import users from "@src/views/apps/user/store";
import email from "@src/views/apps/email/store";
import kanban from "@src/views/apps/kanban/store";
import invoice from "@src/views/apps/invoice/store";
import calendar from "@src/views/apps/calendar/store";
import ecommerce from "@src/views/apps/ecommerce/store";
import dataTables from "@src/views/tables/data-tables/store";
import permissions from "@src/views/apps/roles-permissions/store";

import { reducerCompany } from "./company/reducer";
import { reducerCategory } from "./category/reducer";
import { reducerUser } from "./user/reducer";
import { reducerInventory } from "./inventory/reducer";
import { reducerTransaction } from "./transaction/reducer";
import { reducerHandover } from "./handover/reducer";
import { reducerAuth } from "./auth/reducer";

const rootReducers = combineReducers({
  auth,
  todo,
  chat,
  email,
  users,
  kanban,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions,

  reducerCompany,
  reducerCategory,
  reducerUser,
  reducerInventory,
  reducerTransaction,
  reducerHandover,
  reducerAuth,
});

export default rootReducers;
