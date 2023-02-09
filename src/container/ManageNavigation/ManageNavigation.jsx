import "./ManageNavigation.scss";
import {
  AppstoreOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  BookOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const items = [
  {
    label: "Home",
    key: "/manage-book-user",
    icon: <HomeOutlined />,
  },
  {
    label: "Thể loại",
    key: "TypeBook",
    icon: <BookOutlined />,
    children: [
      {
        type: "group",
        children: [
          {
            label: "Ngôn Tình",
            key: "setting:1",
          },
          {
            label: "SelfHelp",
            key: "setting:2",
          },
        ],
      },
    ],
  },
  {
    label: "Bảng Xếp Hạng",
    key: "rank",
    icon: <HeartOutlined />,
  },
  {
    label: "Tác giả",
    key: "author",
    icon: <AppstoreOutlined />,
    // disabled: true,
  },

  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Giỏ hàng
      </a>
    ),
    icon: <ShoppingCartOutlined />,
    key: "alipay",
  },
  {
    label: "Tài khoản",
    key: "SubMenu",
    icon: <AppstoreOutlined />,
    children: [
      {
        type: "group",
        children: [
          {
            label: "Thông tin",
            key: "/manage-account",
          },
          {
            label: "Đăng xuất",
            key: "nguyen",
          },
        ],
      },
    ],
  },
];
const ManageNavigation = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const navigate = useNavigate();
  const onClick = (e) => {
    // console.log("click ", e.key);
    navigate(e.key);
    setCurrentUrl(e.key);
  };
  // const handleClickNavigate = () => {
  //   navigate(e.key);
  //   setCurrent(e.key);
  // };
  return <Menu onClick={onClick} selectedKeys={[currentUrl]} mode="horizontal" items={items} />;
};
export default ManageNavigation;
