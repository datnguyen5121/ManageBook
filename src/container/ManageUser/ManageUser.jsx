import { Descriptions } from "antd";
import "./ManageUser.scss";
import { useSelector } from "react-redux";
const ManageUser = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  return (
    <>
      <div className="manage-user-container">
        <Descriptions title="User Info" bordered size="small">
          <Descriptions.Item label="Email" span={2}>
            {account.email}
          </Descriptions.Item>
          <Descriptions.Item label="Password" span={2}>
            {account.password}
          </Descriptions.Item>
          <Descriptions.Item
            label="Full Name"
            span={2}
          >{`${account.lastName} ${account.firstName}`}</Descriptions.Item>
          <Descriptions.Item label="Address">{account.address}</Descriptions.Item>
          <Descriptions.Item label="Gender" span={2}>
            {account.gender}
          </Descriptions.Item>
          <Descriptions.Item label="RoleId">{account.roleId}</Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
};

export default ManageUser;
