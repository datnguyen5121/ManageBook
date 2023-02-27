import { getAllCart } from "../../services/cartApi";
import { AddUpdateCart } from "../../services/cartApi";
import { deleteAllCart } from "../../services/cartApi";
import { deleteCart } from "../../services/cartApi";
import { updateCartById } from "../../services/cartApi";
import { notification } from "antd";
import cartReducer from "../reducer/cartReducer";
export const GET_ALL_CART = "GET_ALL_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_BOOK_TO_CART = "ADD_BOOK_TO_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const PICK_BOOK_TO_BUY = "PICK_BOOK_TO_BUY";
export const PICK_ALL = "PICK_ALL";

export const getAll = (email) => {
  return async (dispatch, getState) => {
    const arrBook = await getAllCart(email);
    const listBooks = arrBook.data.map((book) => {
      return {
        quantity: book?.quantity,
        bookId: book?.bookId?._id,
        category: book?.bookId?.category,
        imgUrl: book?.bookId?.imgUrl,
        price: book?.bookId?.price,
        title: book?.bookId?.title,
        checked: false,
      };
    });
    dispatch({
      type: GET_ALL_CART,
      payload: listBooks,
    });
  };
};
export const addBookIntoCart = (data) => {
  return async (dispatch, getState) => {
    let res = await AddUpdateCart({
      email: data.email,
      bookId: data.bookId,
      quantity: data.quantity,
    });
    if (res && res.EC === 0) {
      notification.success({
        message: "Success",
        placement: "bottomRight",
        description: "Add Book Into Cart Success",
      });
    } else {
      notification.error({
        message: "Error",
        placement: "bottomRight",
        description: "Add Book Into Cart Error",
      });
    }

    let arr = [...getState().cart.listBooks];
    console.log("arr", arr);
    arr.forEach((book) => {
      if (book.bookId === data.bookId && book.quantity && data.quantity) {
        book.quantity += data.quantity;
      }
    });
    dispatch({
      type: ADD_BOOK_TO_CART,
      payload: arr,
    });
  };
};
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

export const removeAllCart = () => {
  return {
    type: REMOVE_ALL_FROM_CART,
  };
};
export const clickBook = (bookId) => {
  return async (dispatch, getState) => {
    let arr = [...getState().cart.listBooks];
    // console.log("arr", arr);
    // console.log("bookId", bookId);
    arr.forEach((book) => {
      if (book.bookId === bookId) {
        book.checked = !book.checked;
      }
    });
    dispatch({
      type: PICK_BOOK_TO_BUY,
      payload: arr,
    });
  };
};
export const clickAllBook = (isAll) => {
  return async (dispatch, getState) => {
    let arr = [...getState().cart.listBooks];
    arr.forEach((book) => {
      if (isAll === false) {
        book.checked = true;
      }
      if (isAll === true) {
        book.checked = false;
      }
    });
    dispatch({
      type: PICK_ALL,
      payload: arr,
    });
  };
};
