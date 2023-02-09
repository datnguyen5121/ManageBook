import "./ManageAccount.scss";
import { Layout, Space } from "antd";
import CreateAccount from "./CreateAccount";
import ManageAdmin from "./ManageAdmin";
const { Sider, Content } = Layout;

const contentStyle = {
  textAlign: "center",
  minHeight: 20,
  lineHeight: "50px",
  color: "black",
  paddingTop: "5px",
  backgroundColor: "#fff",
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
        size="middle"
      >
        <Layout>
          <Layout>
            <Content style={contentStyle}>
              <ManageAdmin />
            </Content>
          </Layout>
        </Layout>
      </Space>
    </div>
  );
};
export default ManageAccount;
