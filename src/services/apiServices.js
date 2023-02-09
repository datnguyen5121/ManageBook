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

// app.get("/api/get-all-user", userController.getAllUser);
// app.post("/api/create-new-user", userController.createNewUser);
// app.delete("/api/delete-user-by-id", userController.deleteUserById);
// app.delete("/api/delete-all-user", userController.deleteAllUser);
// app.put("/api/update-user-by-id", userController.updateUserById);

export { postLoginUser };
