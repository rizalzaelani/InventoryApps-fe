import { actions } from "./action";

const initialState = {
  dataUser: [],
  loading: false,
};

export const reducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case actions.set_state:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
