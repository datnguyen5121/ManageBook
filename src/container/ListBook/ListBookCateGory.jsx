import { useEffect, useState } from "react";
import { getAllBook } from "../../services/apiServices";
import { getBookPaginate } from "../../services/apiServices";
import React from "react";
import { Card } from "antd";
import { Pagination } from "antd";
import "./ListBookCateGory.scss";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const ListBookCateGory = () => {
  const [listBook, SetListBook] = useState([]);
  const [pageBookNumber, SetPageBookNumber] = useState(1);
  const [totalBook, setTotalBook] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchBookList();
  }, [pageBookNumber]);

  const fetchBookList = async () => {
    let res = await getBookPaginate(10, pageBookNumber);
    console.log(res.data);
    if (res && res.EC === 0) {
      SetListBook(res.data.listBook);
      setTotalBook(res.data.totalBook);
    }
  };

  const onChange = (pageNumber) => {
    // console.log("Page: ", pageNumber);
    SetPageBookNumber(pageNumber);
  };
  // console.log(pageBookNumber);
  return (
    <>
      <div className="listbook-container-scroll">
        <div className="listbook-container">
          {listBook?.map((item, index) => {
            return (
              <Card
                hoverable
                style={{
                  width: 200,
                  height: 333,
                }}
                key={`cart-${index}`}
                cover={<img alt="example" src={item.imgUrl} className="img-content" />}
                className="card-container"
                onClick={() => navigate(`/detail-book/${item._id}`)}
              >
                <Meta title={item.title} description={item.author} className="meta-container" />
                <div className="  ">
                  <div className="price">{item.price} $</div>
                </div>
                <div className="badge-delivery">Giao hàng siêu tốc</div>
              </Card>
            );
          })}
        </div>
        <div className="paginate-listbook-container">
          <Pagination
            total={totalBook}
            showTotal={(total) => `Total ${total} books`}
            defaultPageSize={10}
            defaultCurrent={1}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default ListBookCateGory;
