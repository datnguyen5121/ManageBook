import { Button, Form, Input, Select, Modal, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { updateUserById } from "../../services/apiServices";
const { Option } = Select;
const UpdateAccount = (props) => {
  const [formUpdate] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  let { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate } = props;

  useEffect(() => {
    dataUpdate && handleFillForm(dataUpdate);
  }, [dataUpdate]);
  const handleFormSubmit = async (values) => {
    let data = await updateUserById(
      dataUpdate._id,
      values.email,
      values.password,
      values.firstname,
      values.lastname,
      values.address,
      values.gender,
      values.roleId,
    );
    if (data && data.EC === 0) {
      notification.success({
        message: "Success",
        placement: "bottomRight",
        description: "Update Success",
      });
      handleCancel();
      await props.handleGetAllUserFromParent();
    } else {
      notification.error({
        message: "Error",
        placement: "bottomRight",
        description: "Update Error",
      });
    }
  };

  const handleCancel = () => {
    setIsModalUpdateOpen(false);
  };
  const onGenderChange = (value) => {
    console.log(value);
  };
  const onRoleId = (value) => {
    console.log(value);
  };

  const handleFillForm = (data) => {
    formUpdate.setFieldValue("email", data.email);
    formUpdate.setFieldValue("password", data.password);
    formUpdate.setFieldValue("firstname", data.firstName);
    formUpdate.setFieldValue("lastname", data.lastName);
    formUpdate.setFieldValue("address", data.address);
    formUpdate.setFieldValue("gender", data.gender);
    formUpdate.setFieldValue("roleId", data.roleId);
  };
  return (
    <>
      {contextHolder}
      <div className="update-account-container">
        <Modal
          title="Update Account"
          open={isModalUpdateOpen}
          //   onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div style={{ fontWeight: 200, fontSize: "25px", textAlign: "center" }}>
            Update Account
          </div>
          <Form
            style={{ paddingRight: 20, paddingLeft: 20 }}
            onFinish={(values) => handleFormSubmit(values)}
            id="formUpdate"
            form={formUpdate}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password disabled={true} />
            </Form.Item>
            <Form.Item
              label="First name"
              name="firstname"
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
                allowClear
                onChange={onGenderChange}
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="roleId"
              label="Role"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a option and change input text above"
                allowClear
                onChange={onRoleId}
              >
                <Option value="ADMIN">ADMIN</Option>
                <Option value="USER">USER</Option>
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default UpdateAccount;
