import "./ManageAdmin.scss";
import { Space, Table } from "antd";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { getAllUser } from "../../services/apiServices";
import CreateAccount from "./CreateAccount";
import UpdateAccount from "./UpdateAccount";
import DeleteAccount from "./DeleteAccount";
import ManageNavigation from "../Navigation/ManageNavigation";
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
      width: 50,
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      width: 50,
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
      width: 50,
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
          <a onClick={() => showModalDeleteParent(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="manage-admin-container">
        <ManageNavigation />
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
