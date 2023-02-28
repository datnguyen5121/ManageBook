import axios from "../utils/axiosCustomize";
const postLoginUser = (userEmail, userPassword) => {
  return axios.post(`/api/handle-login`, {
    email: userEmail,
    password: userPassword,
  });
};
const postRegister = (email, password, firstName, lastName, address, gender) => {
  const data = { email, password, firstName, lastName, address, gender };
  return axios.post(`/api/handle-register`, data);
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
const getBookPaginateCateGory = (perPage, page, category) => {
  return axios.get(
    `/api/get-book-paginate-type?page=${page}&limit=${perPage}&category=${category}`,
  );
};
const getBookPaginateSearch = (perPage, page, valueText) => {
  return axios.get(
    `/api/get-book-paginate-search?page=${page}&limit=${perPage}&valueText=${valueText}`,
  );
};
const getBookById = (id) => {
  return axios.get(`/api/get-book-by-id?_id=${id}`);
};
const createNewBook = (dataInput) => {
  const data = {
    author: dataInput.author,
    title: dataInput.title,
    description: dataInput.description,
    datePublish: dataInput.datePublish,
    pageNumber: dataInput.pageNumber,
    category: dataInput.category,
    imgUrl: dataInput.imgUrl,
    price: dataInput.price,
  };

  return axios.post(`/api/create-new-book`, data);
};
const updateBookById = (dataInput) => {
  const data = {
    _id: dataInput.id,
    author: dataInput.author,
    title: dataInput.title,
    description: dataInput.description,
    datePublish: dataInput.datePublish,
    pageNumber: dataInput.pageNumber,
    category: dataInput.category,
    imgUrl: dataInput.imgUrl,
    price: dataInput.price,
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
  postRegister,
  createNewBook,
  getBookPaginateCateGory,
  getBookById,
  getBookPaginateSearch,
};
