import "./ManageAdmin.scss";
import { Space, Table } from "antd";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { getAllUser } from "../../services/apiServices";
import CreateAccount from "./CreateAccount";
import UpdateAccount from "./UpdateAccount";

const ManageAdmin = (props) => {
  const [listUser, setListUser] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});

  useEffect(() => {
    handleGetAllUser();
  }, []);
  const handleGetAllUser = async () => {
    const res = await getAllUser();
    if (res && res.EC === 0) {
      setListUser(res.data);
    }
  };
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const showModalCreateParent = () => {
    setIsModalCreateOpen(true);
  };
  const showModalUpdateParent = (user) => {
    console.log("user", user);
    setDataUpdate(user);
    setIsModalUpdateOpen(true);
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "firstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "lastName",
      key: "lastName",
      dataIndex: "lastName",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "gender",
      key: "gender",
      dataIndex: "gender",
    },
    {
      title: "Role",
      key: "roleId",
      dataIndex: "roleId",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <a onClick={() => showModalUpdateParent(record)}>Edit </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <div className="button-crud-user">
          <Button type="primary" onClick={showModalCreateParent}>
            Create New User By ADMIN
          </Button>
        </div>
        <div className="table-list-user">
          <CreateAccount
            isModalCreateOpen={isModalCreateOpen}
            setIsModalCreateOpen={setIsModalCreateOpen}
            handleGetAllUserFromParent={handleGetAllUser}
          />
          <UpdateAccount
            isModalUpdateOpen={isModalUpdateOpen}
            setIsModalUpdateOpen={setIsModalUpdateOpen}
            handleGetAllUserFromParent={handleGetAllUser}
            dataUpdate={dataUpdate}
          />
          <Table
            rowKey={() => Math.random()}
            columns={columns}
            dataSource={listUser}
            style={{
              paddingLeft: 50,
              paddingRight: 50,
            }}
          />
        </div>
      </div>
    </>
  );
};
export default ManageAdmin;
