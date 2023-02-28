import { FETCH_USER_LOGIN_SUCCESS } from "../action/userAction";
import { LOGOUT_SUCCESS } from "../action/userAction";
import { REGISTER_SUCCESS } from "../action/userAction";
const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    gender: "",
    roleId: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      console.log("check action user", action);
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload.DT?.refresh_token,
          email: action?.payload?.DT?.infoUser?.email,
          password: action?.payload?.DT?.infoUser?.password,
          firstName: action?.payload?.DT?.infoUser?.firstName,
          lastName: action?.payload?.DT?.infoUser?.lastName,
          address: action?.payload?.DT?.infoUser?.address,
          gender: action?.payload?.DT?.infoUser?.gender,
          roleId: action?.payload?.DT?.infoUser?.roleId,
        },
        isAuthenticated: true,
      };

    case LOGOUT_SUCCESS:
      console.log("check action user", action);
      return {
        ...state,
        account: {
          access_token: "",
          refresh_token: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          address: "",
          gender: "",
          roleId: "",
        },
        isAuthenticated: false,
      };
    case REGISTER_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};

export default userReducer;
