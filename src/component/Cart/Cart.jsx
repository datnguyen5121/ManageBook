import { useDispatch } from "react-redux";
import { getAll, removeCart } from "../../redux/action/cartAction";
import { useSelector } from "react-redux";
import { updateCartById } from "../../services/cartApi";
import { updateQuantityCart } from "../../redux/action/cartAction";
import "./Cart.scss";
import { useEffect, useState } from "react";
const Cart = () => {
  const account = useSelector((state) => state.user.account);
  const listBooks = useSelector((state) => state.cart.listBooks);

  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  let email = account.email;
  useEffect(() => {
    dispatch(getAll(email));
  }, []);

  const handleCheck = () => {
    setCheck(!check);
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
  return (
    <>
      <div className="cart-container">
        <div className="cart-thead">
          <div className="cart-thead-check-all">
            <label className="thdead-checkbox" for="accept">
              <input type="checkbox" id="checkbox" hidden />
              <div
                className={check ? "checkbox-box checked" : "checkbox-box"}
                htmlFor="checkbox"
                onClick={handleCheck}
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
            listBooks.map((item) => {
              return (
                <>
                  <div className="cart-product" key={item.bookId}>
                    <div className="cart-tbody-check-all">
                      <label className="thdead-checkbox" for="accept">
                        <input type="checkbox" id="checkbox" hidden />
                        <div
                          className={check ? "checkbox-box checked" : "checkbox-box"}
                          htmlFor="checkbox"
                          onClick={handleCheck}
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
                        <input className="quantity-input" value={item.quantity}></input>
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
              <div className="cart-payment-price">200 $</div>
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
