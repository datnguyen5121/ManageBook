import { Layout, Space } from "antd";
import { Outlet } from "react-router-dom";
const { Sider, Content } = Layout;

const AccountPage = () => {
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
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Space>
    </div>
  );
};
export default AccountPage;
