import { Button, Form, Input, Select, Modal, notification } from "antd";
import { useState } from "react";
import { createNewUser } from "../../services/apiServices";
import { getAllUser } from "../../services/apiServices";

const { Option } = Select;

const CreateAccount = (props) => {
  const [api, contextHolder] = notification.useNotification();
  let { isModalCreateOpen, setIsModalCreateOpen } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [roleId, setRoleId] = useState("");

  const handleOk = async () => {
    let data = await createNewUser(email, password, firstname, lastname, address, gender, roleId);
    console.log(data);
    if (data && data.EC === 0) {
      notification.success({
        message: "Success",
        placement: "bottomRight",
        description: "Create Success",
      });
      handleCancel();
      await props.handleGetAllUserFromParent();
    } else {
      notification.error({
        message: "Error",
        placement: "bottomRight",
        description: "Create Error",
      });
    }
  };
  const handleCancel = () => {
    setIsModalCreateOpen(false);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setGender("");
    setRoleId("");
  };
  const onGenderChange = (value) => {
    console.log(value);
    setGender(value);
  };
  const onRoleId = (value) => {
    setRoleId(value);
  };
  return (
    <>
      {contextHolder}
      <div className="create-account-container">
        <Modal
          title="Create Account"
          open={isModalCreateOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div style={{ fontWeight: 200, fontSize: "25px", textAlign: "center" }}>
            Create Account
          </div>
          <Form style={{ paddingRight: 20, paddingLeft: 20 }}>
            <Form.Item
              label="Email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="First name"
              name="firstname"
              value={firstname}
              onChange={(event) => setFirstName(event.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please input your firstname!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last name"
              name="lastname"
              value={lastname}
              onChange={(event) => setLastName(event.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please input your lastname!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a option and change input text above"
                value={gender}
                onChange={onGenderChange}
                allowClear
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="Role"
              label="Role"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a option and change input text above"
                value={roleId}
                onChange={onRoleId}
                allowClear
              >
                <Option value="ADMIN">ADMIN</Option>
                <Option value="USER">USER</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default CreateAccount;
