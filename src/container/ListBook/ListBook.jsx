import { useEffect, useState } from "react";
import { getAllBook } from "../../services/apiServices";
import { getBookPaginate } from "../../services/apiServices";
import { getBookPaginateCateGory } from "../../services/apiServices";
import { getBookPaginateSearch } from "../../services/apiServices";
import React from "react";
import { Card, Form, Select } from "antd";
import { Pagination } from "antd";
import "./ListBook.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doSearch } from "../../redux/action/bookAction";
const { Meta } = Card;
const { Option } = Select;

const ListBook = (props) => {
  const [listBook, setListBook] = useState([]);
  const [listBookPage, setListBookPage] = useState([]);

  const [pageBookNumber, SetPageBookNumber] = useState(1);
  const [totalBook, setTotalBook] = useState("");
  const [category, setCategory] = useState("");
  const { valueText } = props;
  const [textSearch, setTextSearch] = useState(valueText);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchBookList();
  }, [pageBookNumber]);
  useEffect(() => {
    fetchBookListCateGory();
  }, [category]);

  useEffect(() => {
    if (valueText) {
      fetchBookSearch();
      // dispatch(doSearch(""));
    }
  }, [valueText]);

  const fetchBookSearch = async () => {
    let res = await getBookPaginateSearch(10, pageBookNumber, valueText);
    console.log("res", res);
    if (res && res.EC === 0) {
      setListBook(res.data.listBook);
      setListBookPage(res.data.listBook);
      setTotalBook(res.data.total);
      setCategory("");
    }
  };
  const fetchBookList = async () => {
    let res = await getBookPaginate(10, pageBookNumber);
    console.log(res.data);
    if (res && res.EC === 0) {
      setListBook(res.data.listBook);
      setTotalBook(res.data.totalBook);
    }
  };

  const onChange = (pageNumber) => {
    // console.log("Page: ", pageNumber);
    SetPageBookNumber(pageNumber);
  };
  const onCategoryChange = (value) => {
    console.log(value);
    setCategory(value);
  };
  const fetchBookListCateGory = async () => {
    if (category) {
      let res = await getBookPaginateCateGory(10, pageBookNumber, category);
      console.log(res.data);
      if (res && res.EC === 0) {
        setListBook(res.data.listBook);
        setTotalBook(res.data.total);
      }
    } else {
      await fetchBookList();
    }
  };
  return (
    <>
      <div className="category-content" label="Thể loại" value={category}>
        <Select placeholder="Chọn thể loại sách" allowClear onChange={onCategoryChange}>
          <Option value="">Tất cả</Option>
          <Option value="Education">Education</Option>
          <Option value="Self-help">Self-help</Option>
          <Option value="Ngôn Tình">Ngôn Tình</Option>
        </Select>
      </div>
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

export default ListBook;
