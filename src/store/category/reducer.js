import { actions } from "./action"

const initialState = {
  listData: [],
  loading: false,
}

export const reducerCategory = (state = initialState, action) => {
  switch (action.type) {
    case actions.set_state:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
