import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useState } from "react";
import "./Login.scss";
import { Select } from "antd";
import { postLoginUser } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import { doLogin } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";
import { postRegister } from "../../services/apiServices";
const { Option } = Select;

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([handleSubmitBtnRegistera-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  const handleSubmitBtnRegister = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      notification.error({
        message: "Error",
        placement: "bottomRight",
        description: "Invalid Email",
      });
      return;
    }
    if (!password) {
      notification.error({
        message: "Error",
        placement: "bottomRight",
        description: "Invalid Password",
      });
      return;
    }
    const data = await postRegister(email, password, firstName, lastName, address, gender);
    if (data && +data.EC === 0) {
      notification.success({
        message: "Success",
        placement: "bottomRight",
        description: "Register Success",
      });

      // dispatch(doLogin(data));
      // navigate("/manage-book-user");
    } else {
      notification.error({
        message: "Error",
        placement: "bottomRight",
        description: "Register Error",
      });
    }
    console.log(data);
  };
  const handleLogin = (event) => {
    event.preventDefault();
    props.handleToggle();
  };
  const onGenderChange = (value) => {
    console.log(value);
    setGender(value);
  };
  return (
    <>
      <div className="login-page-container">
        <div className="login-title">Register</div>
        <div className="login-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your firstName!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input your lastName!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              value={gender}
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

            <Form.Item className="flex-2">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={() => handleSubmitBtnRegister()}
              >
                Register
              </Button>
              Or{" "}
              <a href="" onClick={handleLogin}>
                Log in now!
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Register;
