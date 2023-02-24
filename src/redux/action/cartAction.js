import { getAllCart } from "../../services/cartApi";
import { AddUpdateCart } from "../../services/cartApi";
import { deleteAllCart } from "../../services/cartApi";
import { deleteCart } from "../../services/cartApi";
import { updateCartById } from "../../services/cartApi";
import cartReducer from "../reducer/cartReducer";
export const GET_ALL_CART = "GET_ALL_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const getAll = (email) => {
  return async (dispatch, getState) => {
    console.log("email", email);
    const arrBook = await getAllCart(email);
    console.log(arrBook);
    const listBooks = arrBook.data.map((book) => {
      return {
        quantity: book?.quantity,
        bookId: book?.bookId?._id,
        category: book?.bookId?.category,
        imgUrl: book?.bookId?.imgUrl,
        price: book?.bookId?.price,
        title: book?.bookId?.title,
      };
    });
    console.log("listbook", listBooks);
    dispatch({
      type: GET_ALL_CART,
      payload: listBooks,
    });
  };
};
export const addBookIntoCart = () => {};
export const updateQuantityCart = (bookId, quantity) => {
  console.log("data", bookId, quantity);
  return async (dispatch, getState) => {
    let res = await updateCartById(bookId, quantity);
    let arr = [...getState().cart.listBooks];
    console.log("arr", arr);
    arr.forEach((book) => {
      if (book.bookId === bookId && book.quantity && quantity) {
        book.quantity = quantity;
      }
    });
    dispatch({
      type: ADD_TO_CART,
      payload: arr,
    });
  };
};

export const removeCart = (data) => {
  return async (dispatch, getState) => {
    console.log("hieu", data);
    let res = await deleteCart(data);
    console.log("res", res);
    let arr = [...getState().cart.listBooks];
    let newArr = arr.filter((item) => {
      return item.bookId !== data.bookId;
    });
    dispatch({
      type: REMOVE_FROM_CART,
      payload: newArr,
    });
  };
};
