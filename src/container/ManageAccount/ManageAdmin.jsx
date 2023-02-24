import "./ManageAdmin.scss";
import { Space, Table } from "antd";
import { Button, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getAllUser } from "../../services/apiServices";
import CreateAccount from "./CreateAccount";
import UpdateAccount from "./UpdateAccount";
import DeleteAccount from "./DeleteAccount";
const ManageAdmin = (props) => {
  const [listUser, setListUser] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  useEffect(() => {
    fetchAllUser();
  }, []);
  const fetchAllUser = async () => {
    const res = await getAllUser();
    if (res && res.EC === 0) {
      setListUser(res.data);
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 10,
      ellipsis: {
        showTitle: false,
      },
      render: (email) => (
        <Tooltip placement="topLeft" title={email}>
          {email}
        </Tooltip>
      ),
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      width: 20,
      ellipsis: {
        showTitle: false,
      },
      render: (password) => (
        <Tooltip placement="topLeft" title={password}>
          {password}
        </Tooltip>
      ),
    },
    {
      title: "firstName",
      dataIndex: "firstName",
      key: "firstName",
      width: 10,
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
      title: "lastName",
      key: "lastName",
      dataIndex: "lastName",
      width: 10,
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      width: 10,
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
      title: "gender",
      key: "gender",
      dataIndex: "gender",
      width: 10,
    },
    {
      title: "Role",
      key: "roleId",
      dataIndex: "roleId",
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
      width: 10,
    },
  ];

  return (
    <>
      <div className="manage-admin-container">
        <div className="button-crud-user">
          <Button type="primary" onClick={showModalCreateParent}>
            Create New User By ADMIN
          </Button>
        </div>
        <div className="table-list-user">
          <CreateAccount
            isModalCreateOpen={isModalCreateOpen}
            setIsModalCreateOpen={setIsModalCreateOpen}
            fetchAllUserFromParent={fetchAllUser}
          />
          <UpdateAccount
            isModalUpdateOpen={isModalUpdateOpen}
            setIsModalUpdateOpen={setIsModalUpdateOpen}
            fetchAllUserFromParent={fetchAllUser}
            dataUpdate={dataUpdate}
          />
          <DeleteAccount
            isModalDeleteOpen={isModalDeleteOpen}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
            fetchAllUserFromParent={fetchAllUser}
            dataDelete={dataDelete}
          />
          <Table rowKey={() => Math.random()} columns={columns} dataSource={listUser} style={{}} />
        </div>
      </div>
    </>
  );
};
export default ManageAdmin;
