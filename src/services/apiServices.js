import axios from "../utils/axiosCustomize";
const postLoginUser = (userEmail, userPassword) => {
  return axios.post(`/api/handle-login`, {
    email: userEmail,
    password: userPassword,
  });
};

//Book
// app.get(
//   "/api/get-all-book",
//   JWTaction.checkUserJWT,
//   JWTaction.checkUserPermission,
//   bookController.getAllBook,
// );
// app.post("/api/create-new-book", JWTaction.checkUserJWT, bookController.createNewBook);
// app.get("/api/get-book-by-id", bookController.getBookById);
// app.delete("/api/delete-book-by-id", bookController.deleteBookById);
// app.delete("/api/delete-all-book", bookController.deleteAllBook);
// app.put("/api/update-book-by-id", bookController.updateBookById);

//Account

// app.delete("/api/delete-all-user", userController.deleteAllUser);

const getAllUser = () => {
  return axios.get(`/api/get-all-user`);
};
const createNewUser = (email, password, firstName, lastName, address, gender, roleId) => {
  const data = new URLSearchParams();
  data.append("email", email);
  data.append("password", password);
  data.append("firstName", firstName);
  data.append("lastName", lastName);
  data.append("address", address);
  data.append("gender", gender);
  data.append("roleId", roleId);
  return axios.post(`/api/create-new-user`, data);
};
const updateUserById = (id, email, password, firstName, lastName, address, gender, roleId) => {
  const data = { _id: id, email, password, firstName, lastName, address, gender, roleId };
  return axios.put(`/api/update-user-by-id`, data);
};
const deleteUserById = (id) => {
  return axios.delete(`/api/delete-user-by-id?_id=${id}`);
};

//BOOK
const getAllBook = () => {
  return axios.get(`/api/get-all-book`);
};
const getBookPaginate = (perPage, page) => {
  return axios.get(`/api/get-book-paginate?page=${page}&limit=${perPage}`);
};

const updateBookById = (
  id,
  author,
  title,
  description,
  datePublish,
  pageNumber,
  category,
  imgUrl,
  price,
) => {
  const data = {
    _id: id,
    author,
    title,
    description,
    datePublish,
    pageNumber,
    category,
    imgUrl,
    price,
  };
  return axios.put(`api/update-book-by-id`, data);
};

export {
  postLoginUser,
  getAllUser,
  createNewUser,
  updateUserById,
  deleteUserById,
  getAllBook,
  getBookPaginate,
  updateBookById,
};
