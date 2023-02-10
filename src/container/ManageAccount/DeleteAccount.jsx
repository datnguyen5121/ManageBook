import { Button, Form, Input, Select, Modal, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { deleteUserById } from "../../services/apiServices";
const { Option } = Select;
const DeleteAccount = (props) => {
  const [formDelete] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  let { isModalDeleteOpen, setIsModalDeleteOpen, dataDelete } = props;

  useEffect(() => {
    dataDelete && handleFillForm(dataDelete);
  }, [dataDelete]);
  const handleFormSubmitDelete = async () => {
    console.log(dataDelete._id);
    let res = await deleteUserById(dataDelete._id);
    if (res && res.EC === 0) {
      notification.success({
        message: "Success",
        placement: "bottomRight",
        description: "Delete Success",
      });
      handleCancel();
      await props.handleGetAllUserFromParent();
    } else {
      notification.error({
        message: "Error",
        placement: "bottomRight",
        description: "Delete Error",
      });
    }
  };

  const handleCancel = () => {
    setIsModalDeleteOpen(false);
  };

  const handleFillForm = (data) => {
    formDelete.setFieldValue("email", data.email);
  };
  return (
    <>
      {contextHolder}
      <div className="update-account-container">
        <Modal
          title="Update Account"
          open={isModalDeleteOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div style={{ fontWeight: 200, fontSize: "25px", textAlign: "center" }}>
            Are you sure delete this account ?
          </div>
          <Form style={{ paddingRight: 20, paddingLeft: 20 }} id="formDelete" form={formDelete}>
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

            <Button type="primary" danger htmlType="submit" onClick={handleFormSubmitDelete}>
              Delete
            </Button>
            <Button type="primary" style={{ marginLeft: "20px" }} onClick={handleCancel}>
              Cancel
            </Button>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default DeleteAccount;
