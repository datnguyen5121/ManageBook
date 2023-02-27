import { useDispatch } from "react-redux";
import { clickAllBook, clickBook, getAll, removeCart } from "../../redux/action/cartAction";
import { useSelector } from "react-redux";
import { updateCartById } from "../../services/cartApi";
import { updateQuantityCart } from "../../redux/action/cartAction";
import "./Cart.scss";
import { useEffect, useState } from "react";
const Cart = () => {
  const account = useSelector((state) => state.user.account);
  const listBooks = useSelector((state) => state.cart.listBooks);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  let email = account.email;
  useEffect(() => {
    dispatch(getAll(email));
  }, []);
  useEffect(() => {
    handleTotalPayment();
  }, [listBooks]);
  const handleCheck = (item) => {
    dispatch(clickBook(item.bookId));
  };
  const handleQuantityDecrease = (bookId, quantity) => {
    let quantityInput = +quantity - 1;
    dispatch(updateQuantityCart(bookId, quantityInput));
  };
  const handleQuantityIncrease = (bookId, quantity) => {
    let quantityInput = +quantity + 1;
    dispatch(updateQuantityCart(bookId, quantityInput));
  };
  const handleRemoveCart = (bookId) => {
    const data = {
      email: email,
      bookId: bookId,
    };
    dispatch(removeCart(data));
  };
  const handleClickAll = () => {
    setCheck(!check);
    console.log("check", check);
    dispatch(clickAllBook(check));
  };
  const handleTotalPayment = () => {
    let a = listBooks.filter((item) => {
      return item && item.checked === true;
    });
    let b = 0;
    for (let i = 0; i < a.length; i++) {
      b += a[i].price * a[i].quantity;
    }
    // console.log(a);
    console.log("total", b);
    setTotal(b);
  };
  return (
    <>
      <div className="cart-container">
        <div className="cart-thead">
          <div className="cart-thead-check-all">
            <label className="thdead-checkbox" htmlFor="accept">
              <input type="checkbox" id="checkbox" hidden />
              <div
                className={check ? "checkbox-box checked" : "checkbox-box"}
                htmlFor="checkbox"
                onClick={handleClickAll}
              ></div>
            </label>
          </div>
          <div className="cart-thead-product">Sản phẩm</div>
          <div className="cart-thead-price">Đơn giá</div>
          <div className="cart-thead-quantity">Số lượng</div>
          <div className="cart-thead-price">Số tiền</div>
          <div className="cart-thead-control">Thao tác</div>
        </div>
        <div className="cart-tbody">
          {listBooks && listBooks.length > 0 ? (
            listBooks.map((item, index) => {
              return (
                <>
                  <div className="cart-product" key={item.bookId}>
                    <div className="cart-tbody-check-all">
                      <label className="thdead-checkbox" htmlFor="accept">
                        <input type="checkbox" checked={item.checked} hidden />
                        <div
                          className={
                            item.checked === true ? "checkbox-box checked" : "checkbox-box"
                          }
                          htmlFor="checkbox"
                          onClick={() => {
                            handleCheck(item);
                          }}
                        ></div>
                      </label>
                    </div>
                    <div className="cart-imgUrl">
                      <img
                        src={item.imgUrl}
                        style={{ width: "80px", height: "80px", objectFit: "contain" }}
                      ></img>
                    </div>
                    <div className="cart-title-product">{item.title}</div>
                    <div className="cart-category">{item.category}</div>
                    <div className="cart-price">{item.price}</div>
                    <div className="cart-quantity">
                      <div className="quantity-container">
                        <button onClick={() => handleQuantityDecrease(item.bookId, item.quantity)}>
                          -
                        </button>
                        <input
                          className="quantity-input"
                          value={item.quantity}
                          // disabled={true}
                          // onChange={handleChangeQuantity}
                        ></input>
                        <button onClick={() => handleQuantityIncrease(item.bookId, item.quantity)}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-price-payment">{item.quantity * item.price}</div>
                    <div className="cart-control" onClick={() => handleRemoveCart(item.bookId)}>
                      Xoá
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div>Không có sản phẩm</div>
          )}
        </div>
        <div className="cart-payment-container">
          <div className="cart-payment-content">
            <div className="cart-payment-voucher">
              <div className="cart-discount">Mã voucher ưu đãi</div>
              <div className="cart-voucher-enter">Nhập mã giảm giá</div>
            </div>
            <div className="cart-pay">
              <div className="cart-payment-price">{total}</div>
              <div className="cart-payment-buy">
                <button>
                  <label>Mua hàng</label>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
