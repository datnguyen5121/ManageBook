import { ADD_BOOK_TO_CART, GET_ALL_CART } from "../action/cartAction";
import { ADD_TO_CART } from "../action/cartAction";
import { REMOVE_FROM_CART } from "../action/cartAction";

const initialState = {
  listBooks: [],
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CART:
      return {
        ...state,
        listBooks: [...action.payload],
      };
    case ADD_TO_CART:
      return {
        ...state,
        listBooks: [...action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        listBooks: [...action.payload],
      };
    case ADD_BOOK_TO_CART:
      return {
        ...state,
        listBooks: [...action.payload],
      };
    default:
      return state;
  }
};

export default cartReducer;
