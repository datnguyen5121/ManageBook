import axios from "../utils/axiosCustomize";

const getAllCart = (email) => {
  return axios.get(`/api/get-all-cart?email=${email}`);
};
const AddUpdateCart = (data) => {
  return axios.post(`/api/add-update-cart`, data);
};
const deleteAllCart = () => {
  return axios.delete(`/api/delete-all-cart`);
};
const deleteCart = (data) => {
  console.log("axios data", data);
  return axios.delete("/api/delete-cart", { data });
};
const updateCartById = (bookId, quantity) => {
  return axios.post(`/api/update-cart-by-id`, { bookId, quantity });
};
export { getAllCart, AddUpdateCart, updateCartById, deleteAllCart, deleteCart };
