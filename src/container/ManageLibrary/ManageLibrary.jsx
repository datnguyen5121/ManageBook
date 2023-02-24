import "./ManageLibrary.scss";
import { Space, Table, Tooltip } from "antd";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { getAllUser } from "../../services/apiServices";
import { getAllBook } from "../../services/apiServices";
import UpdateLibrary from "./UpdateLibrary";
import CreateLibrary from "./CreateLibrary";
import moment from "moment";
import CONSTANT from "../../common/constant";
const ManageLibrary = (props) => {
  const [dataBook, setBookData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataCreate, setDataCreate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  useEffect(() => {
    fetchBookData();
  }, []);
  const fetchBookData = async () => {
    const res = await getAllBook();
    if (res && res.EC === 0) {
      const data = formatListBook(res?.data);
      setBookData(data);
    }
  };
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const formatListBook = (data) => {
    const arr = data.map((item) => {
      return {
        ...item,
        datePublish: moment(item.datePublish).format(CONSTANT.FORMAT_DATE),
      };
    });
    return arr;
  };
  const showModalCreateParent = () => {
    setIsModalCreateOpen(true);
  };
  const showModalUpdateParent = (book) => {
    console.log("showModalUpdateParent", book);
    setDataUpdate(book);
    setIsModalUpdateOpen(true);
  };
  const showModalDeleteParent = (book) => {
    console.log("showModalDeleteParent", book);
    setDataDelete(book);
    setIsModalDeleteOpen(true);
  };

  const columns = [
    {
      title: "author",
      dataIndex: "author",
      key: "author",
      width: 20,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 20,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 20,
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
    },
    {
      title: "datePublish",
      key: "datePublish",
      dataIndex: "datePublish",
      width: 20,
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
      width: 20,
    },
    {
      title: "imgUrl",
      key: "imgUrl",
      dataIndex: "imgUrl",
      width: 20,
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "price($)",
      key: "price",
      dataIndex: "price",
      width: 10,
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
      width: 20,
    },
  ];

  return (
    <>
      <div className="manage-library-container">
        <div className="button-crud-user">
          <Button type="primary" onClick={showModalCreateParent}>
            Create Book By ADMIN
          </Button>
        </div>
        <div className="table-list-library">
          <CreateLibrary
            isModalCreateOpen={isModalCreateOpen}
            setIsModalCreateOpen={setIsModalCreateOpen}
            fetchBookDataFromParent={fetchBookData}
          />
          <UpdateLibrary
            isModalUpdateOpen={isModalUpdateOpen}
            setIsModalUpdateOpen={setIsModalUpdateOpen}
            fetchBookDataFromParent={fetchBookData}
            dataUpdate={dataUpdate}
          />
          <Table rowKey={() => Math.random()} columns={columns} dataSource={dataBook} style={{}} />
        </div>
      </div>
    </>
  );
};
export default ManageLibrary;
