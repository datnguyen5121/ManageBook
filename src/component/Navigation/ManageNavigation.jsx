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
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { removeAllCart } from "../../redux/action/cartAction";
import { FaReact } from "react-icons/fa";
import Search from "../search/Search";
const ManageNavigation = () => {
  const dispatch = useDispatch();

  const [currentUrl, setCurrentUrl] = useState("");
  const navigate = useNavigate();
  const onClick = (e) => {
    // console.log("click ", e.key);
    navigate(e.key);
    setCurrentUrl(e.key);
  };
  const items = [
    {
      label: "Home",
      key: "/manage-book-user",
      icon: <HomeOutlined />,
    },

    {
      label: <span>Giỏ hàng</span>,
      icon: <ShoppingCartOutlined />,
      key: "/cart",
    },
    {
      label: (
        <span className="navigate-account">
          <AppstoreOutlined />
          Tài khoản
        </span>
      ),
      key: "SubMenu1",

      children: [
        {
          type: "group",
          children: [
            {
              label: "Thông tin User",
              key: "/manage-user",
            },
            {
              label: "Chuyển đến trang Admin",
              key: "/manage-account",
            },
            {
              label: "Quản lý thư viện",
              key: "/manage-library",
            },
            {
              label: (
                <span
                  onClick={() => {
                    console.log("logout");
                    dispatch(removeAllCart());
                    dispatch(doLogout());
                    console.log("dat");
                  }}
                >
                  Đăng xuất
                </span>
              ),
              key: "/",
            },
          ],
        },
      ],
    },
  ];
  // const handleClickNavigate = () => {
  //   navigate(e.key);
  //   setCurrent(e.key);
  // };
  return (
    <div className="manage-navigation-container">
      <div className="homepage-listbook">
        <NavLink to="/manage-book-user" className="navbar-brand">
          <FaReact className="brand-icon" />
          <div className="brand-title">Datnguyen</div>
        </NavLink>
      </div>
      <Search />
      <Menu onClick={onClick} selectedKeys={[currentUrl]} mode="horizontal" items={items} />
    </div>
  );
};
export default ManageNavigation;
