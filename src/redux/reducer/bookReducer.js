import { SEARCH } from "../action/bookAction";
const initialState = {
  valueText: "",
};
const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, valueText: action?.payload };

    default:
      return state;
  }
};

export default bookReducer;
