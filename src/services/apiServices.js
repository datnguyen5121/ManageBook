import axios from "../utils/axiosCustomize";

const postLoginUser = (userEmail, userPassword) => {
  return axios.post(`/api/handle-login`, {
    email: userEmail,
    password: userPassword,
  });
};

export { postLoginUser };
