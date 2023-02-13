import { Button, Form, Input, Select, Modal, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { updateBookById } from "../../services/apiServices";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { v4 } from "uuid";

const { Option } = Select;

const UpdateLibrary = (props) => {
  const [formUpdate] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  let { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate } = props;
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    console.log(objectUrl);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    dataUpdate && handleFillForm(dataUpdate);
  }, [dataUpdate]);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const uploadImage = async () => {
    if (!selectedFile) return;
    const imageRef = ref(storage, `image/${selectedFile.name + v4()}`);
    await uploadBytesResumable(imageRef, selectedFile);
    const res = await getDownloadURL(imageRef);
    return res;
  };

  const handleFormSubmit = async (values) => {
    try {
      const imgUrl = selectedFile ? await uploadImage() : preview;
      const data = {
        ...values,
        id: dataUpdate._id,
        imgUrl: `${imgUrl}`,
      };
      let res = await updateBookById(data);
      if (res && res.EC === 0) {
        notification.success({
          message: "Success",
          placement: "bottomRight",
          description: "Update Success",
        });
        handleCancel();
        await props.fetchBookDataFromParent();
      } else {
        notification.error({
          message: "Error",
          placement: "bottomRight",
          description: "Update Error",
        });
      }
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const handleCancel = () => {
    setIsModalUpdateOpen(false);
  };
  const onCateGoryChange = (value) => {
    console.log(value);
  };

  const handleFillForm = (data) => {
    formUpdate.setFieldValue("author", data.author);
    formUpdate.setFieldValue("title", data.title);
    formUpdate.setFieldValue("description", data.description);
    formUpdate.setFieldValue("datePublish", data.datePublish);
    formUpdate.setFieldValue("pageNumber", data.pageNumber);
    formUpdate.setFieldValue("category", data.category);
    formUpdate.setFieldValue("price", data.price);
    setPreview(data.imgUrl);
  };

  return (
    <>
      {contextHolder}
      <div className="update-book-container">
        <Modal
          title="Update Book"
          open={isModalUpdateOpen}
          //   onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div style={{ fontWeight: 200, fontSize: "25px", textAlign: "center" }}>Update Book</div>
          <Form
            style={{ paddingRight: 20, paddingLeft: 20 }}
            onFinish={(values) => handleFormSubmit(values)}
            id="formUpdate"
            form={formUpdate}
          >
            <Form.Item
              label="author"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Please input your author!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="datePublish"
              name="datePublish"
              rules={[
                {
                  required: true,
                  message: "Please input your datePublish!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div className="upload">
              <label htmlFor="file-upload" className="custom-file-upload">
                Upload
              </label>
              <input id="file-upload" type="file" onChange={onSelectFile} />
              {preview && <img src={preview} className="preview-img" />}
            </div>

            <Form.Item
              name="category"
              label="category"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a option and change input text above"
                allowClear
                onChange={onCateGoryChange}
              >
                <Option value="Education">Education</Option>
                <Option value="Economic">Economic</Option>
                <Option value="Self-help">Self-help</Option>
                <Option value="Ngôn Tình">Ngôn Tình</Option>
                <Option value="Ngoại Ngữ">Ngoại Ngữ</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <Input />
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

export default UpdateLibrary;
