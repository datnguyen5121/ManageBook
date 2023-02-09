import "./ManageAccount.scss";
import { Layout, Space } from "antd";
import CreateAccount from "./CreateAccount";
const { Sider, Content } = Layout;

const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "black",
  paddingTop: "20px",
  backgroundColor: "#fff",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "100vh",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};

const ManageAccount = () => {
  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
          height: "100%",
        }}
        size={[0, 48]}
      >
        <Layout>
          <Sider style={siderStyle}>Sider</Sider>
          <Layout>
            <Content style={contentStyle}>
              <CreateAccount />
            </Content>
          </Layout>
        </Layout>
      </Space>
    </div>
  );
};
export default ManageAccount;
