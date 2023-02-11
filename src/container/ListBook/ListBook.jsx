import { useEffect, useState } from "react";
import { getAllBook } from "../../services/apiServices";
import { getBookPaginate } from "../../services/apiServices";
import React from "react";
import { Card } from "antd";
import { Pagination } from "antd";
import "./ListBook.scss";
const { Meta } = Card;

const ListBook = () => {
  const [listBook, SetListBook] = useState([]);
  const [pageBookNumber, SetPageBookNumber] = useState(1);
  const [totalBook, setTotalBook] = useState("");
  useEffect(() => {
    fetchBookList();
  }, [pageBookNumber]);

  const fetchBookList = async () => {
    let res = await getBookPaginate(5, pageBookNumber);
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
      <div className="listbook-container">
        {listBook?.map((item) => {
          return (
            <Card
              hoverable
              style={{
                width: 200,
              }}
              cover={
                <img
                  alt="example"
                  style={{
                    width: 200,
                    height: 240,
                  }}
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title={item.title} description={item.description} />
            </Card>
          );
        })}
      </div>
      <div className="paginate-listbook-container">
        <Pagination
          total={totalBook}
          showTotal={(total) => `Total ${total} books`}
          defaultPageSize={5}
          defaultCurrent={1}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default ListBook;
