import { useEffect, useState } from "react";
import { getAllBook } from "../../services/apiServices";
import React from "react";
import { Card } from "antd";
import "./ListBook.scss";
const { Meta } = Card;
const ListBook = () => {
  const [listBook, SetListBook] = useState([]);
  useEffect(() => {
    handleGetAllTheBook();
  }, []);
  const handleGetAllTheBook = async () => {
    let res = await getAllBook();
    console.log(res.data);
    if (res && res.EC === 0) {
      SetListBook(res.data);
    }
  };
  console.log(listBook);

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
    </>
  );
};

export default ListBook;
