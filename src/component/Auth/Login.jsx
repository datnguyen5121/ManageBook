import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useState } from "react";
import "./Login.scss";
import { postLoginUser } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import { doLogin, doRegister } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  const handleSubmitBtnLogin = async () => {
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
    const data = await postLoginUser(email, password);
    if (data && +data.EC === 0) {
      notification.success({
        message: "Success",
        placement: "bottomRight",
        description: "Login Success",
      });
      dispatch(doLogin(data));
      navigate("/manage-book-user");
    }
    console.log(data);
  };
  const handleRegister = (event) => {
    event.preventDefault();
    props.handleToggle();
  };
  return (
    <>
      <div className="login-page-container">
        <div className="login-title">Login</div>
        <div className="login-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
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
            <Form.Item className="flex-1">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ paddingLeft: 8 }}>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item className="flex-2">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={() => handleSubmitBtnLogin()}
              >
                Log in
              </Button>
              Or{" "}
              <a href="" onClick={handleRegister}>
                Register now!
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
