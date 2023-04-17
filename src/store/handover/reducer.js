import { actions } from "./action";

const initialState = {
  listData: [],
  listDataDataTable: [],
  loading: false,
};

export const reducerHandover = (state = initialState, action) => {
  switch (action.type) {
    case actions.set_state:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
