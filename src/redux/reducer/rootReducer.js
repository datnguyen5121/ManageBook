import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import bookReducer from "./bookReducer";
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  book: bookReducer,
});

export default rootReducer;
