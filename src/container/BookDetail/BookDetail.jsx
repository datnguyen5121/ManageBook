import "./BookDetail.scss";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getBookById } from "../../services/apiServices";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddUpdateCart } from "../../services/cartApi";
import { addBookIntoCart } from "../../redux/action/cartAction";
const BookDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const quizId = params.id;
  const [detailbook, setDetailBook] = useState({});
  const account = useSelector((state) => state.user.account);
  const [quantity, setQuantity] = useState(0);
  console.log(quizId);
  useEffect(() => {
    fetchBookDetail(quizId);
  }, []);

  const fetchBookDetail = async (inputId) => {
    try {
      let res = await getBookById(inputId);
      if (res && res.EC === 0) {
        setDetailBook(res.data);
      }
    } catch (error) {
      notification.error({
        message: "Error",
        placement: "bottomRight",
        description: "Error",
      });
    }
  };
  const decreaseQuantity = (value) => {
    console.log(value);
    setQuantity(value - 1);
  };
  const increaseQuantity = (value) => {
    setQuantity(value + 1);
  };
  console.log(account);
  const handLeAddToCart = () => {
    let payload = {
      bookId: detailbook._id,
      title: detailbook.title,
      category: detailbook.category,
      imgUrl: detailbook.imgUrl,
      price: detailbook.price,
      quantity: quantity,
      email: account.email,
    };
    if (quantity === 0) {
      notification.error({
        message: "Error",
        placement: "bottomRight",
        description: "You must add quantity !",
      });
    } else {
      dispatch(addBookIntoCart(payload));
    }
  };
  const handleChangeQuantity = (event) => {
    console.log(typeof +event.target.value);
    setQuantity(+event.target.value);
  };
  return (
    <>
      <div className="book-detail-container">
        <div className="book-detail-content">
          <div className="bookdetail-content-left">
            <div className="bookdetail-img">
              <img src={detailbook.imgUrl}></img>
            </div>
          </div>
          <div className="bookdetail-border"></div>
          <div className="bookdetail-content-right">
            <div className="content-1">
              <div className="bookdetail-author">Tác giả: {detailbook.author}</div>
              <div className="bookdetail-title">{detailbook.title}</div>
              <div className="bookdetail-price">
                <div className="price-font">{detailbook.price}$</div>
              </div>
              <div className="delivery-ship">
                <div className="delivery-font">Miễn phí vận chuyển</div>
              </div>
              <div className="address-user">
                <div>Giao đến</div>
                <div className="address">{account.address}</div>
                <div className="change-address" onClick={() => navigate("/manage-user")}>
                  Thay đổi địa chỉ
                </div>
              </div>
              <div className="quantity-title">Số Lượng</div>
              <div className="quantity-container">
                <button onClick={() => quantity > 0 && decreaseQuantity(quantity)}>-</button>
                <input
                  className="quantity-input"
                  value={quantity}
                  onChange={handleChangeQuantity}
                ></input>
                <button onClick={() => increaseQuantity(quantity)}>+</button>
              </div>
              <div className="button-group">
                <button className="btn btn-add-card" onClick={handLeAddToCart}>
                  Thêm vào giỏ hàng
                </button>
                <button className="btn btn-buy-now">Mua luôn</button>
              </div>
            </div>
            <div className="content-2"></div>
          </div>
        </div>
        <div className="book-detail-info">
          <div className="info-title">Thông tin Chi Tiết</div>
          <div className="info-table">
            <table>
              <tbody>
                <tr>
                  <td>Tác giả</td>
                  <td>
                    <div className="author">{detailbook.author}</div>
                  </td>
                </tr>
                <tr>
                  <td>Tên sản phẩm</td>
                  <td>
                    <div className="title">{detailbook.title}</div>
                  </td>
                </tr>
                <tr>
                  <td>Ngày xuất bản</td>
                  <td>
                    <div className="datePublish">{detailbook.datePublish}</div>
                  </td>
                </tr>
                <tr>
                  <td>Số trang</td>
                  <td>
                    <div className="pageNumber">{detailbook.pageNumber}</div>
                  </td>
                </tr>
                <tr>
                  <td>Thể loại</td>
                  <td>
                    <div className="category">{detailbook.category}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="book-detail-description">
          <div className="description-title">Mô tả Sản Phẩm</div>
          <div className="bookdetail-description">{detailbook.description}</div>
        </div>
      </div>
    </>
  );
};
export default BookDetail;
