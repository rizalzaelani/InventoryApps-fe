import { actions } from "./action";

const initialState = {
  listDataDataTable: [],
  listData: [],
  userDetail: {},
  loading: false,
};

export const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case actions.set_state:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
