export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};
export const doRegister = (data) => {
  return {
    type: REGISTER_SUCCESS,
  };
};
export const doLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
