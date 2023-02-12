import "./ManageLibrary.scss";
import { Space, Table } from "antd";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { getAllUser } from "../../services/apiServices";
import ManageNavigation from "../Navigation/ManageNavigation";
import { getAllBook } from "../../services/apiServices";

const ManageLibrary = (props) => {
  const [dataBook, setBookData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  useEffect(() => {
    fetchBookData();
  }, []);
  const fetchBookData = async () => {
    const res = await getAllBook();
    if (res && res.EC === 0) {
      setBookData(res.data);
    }
  };
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const showModalCreateParent = () => {
    setIsModalCreateOpen(true);
  };
  const showModalUpdateParent = (user) => {
    console.log("showModalUpdateParent", user);
    setDataUpdate(user);
    setIsModalUpdateOpen(true);
  };
  const showModalDeleteParent = (user) => {
    console.log("showModalDeleteParent", user);
    setDataDelete(user);
    setIsModalDeleteOpen(true);
  };

  const columns = [
    {
      title: "author",
      dataIndex: "author",
      key: "author",
      width: 10,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "datePublish",
      key: "datePublish",
      dataIndex: "datePublish",
    },
    {
      title: "pageNumber",
      key: "pageNumber",
      dataIndex: "pageNumber",
      width: 10,
    },
    {
      title: "category",
      key: "category",
      dataIndex: "category",
      width: 50,
    },
    {
      title: "imgUrl",
      key: "imgUrl",
      dataIndex: "imgUrl",
      width: 50,
    },
    {
      title: "price",
      key: "price",
      dataIndex: "price",
      width: 25,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <a onClick={() => showModalUpdateParent(record)}>Edit </a>
          <a onClick={() => showModalDeleteParent(record)}>Delete</a>
        </Space>
      ),
      width: 50,
    },
  ];

  return (
    <>
      <div className="manage-library-container">
        <ManageNavigation />
        <div className="button-crud-user">
          <Button type="primary" onClick={showModalCreateParent}>
            Create Book By ADMIN
          </Button>
        </div>
        <div className="table-list-library">
          <Table rowKey={() => Math.random()} columns={columns} dataSource={dataBook} style={{}} />
        </div>
      </div>
    </>
  );
};
export default ManageLibrary;
