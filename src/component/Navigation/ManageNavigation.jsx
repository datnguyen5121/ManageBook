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
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { removeAllCart } from "../../redux/action/cartAction";
import { FaReact } from "react-icons/fa";
import Search from "../search/Search";
import { doSearch } from "../../redux/action/bookAction";
const ManageNavigation = () => {
  const dispatch = useDispatch();

  const [currentUrl, setCurrentUrl] = useState("");
  const navigate = useNavigate();
  const onClick = (e) => {
    // console.log("click ", e.key);
    navigate(e.key);
    setCurrentUrl(e.key);
  };
  const [valueText, setValueText] = useState("");
  const handleBtnSearch = () => {
    console.log(valueText);
    dispatch(doSearch(valueText));
    // navigate("/manage-book-search");
    // setValueText("");
  };
  const items = [
    {
      label: (
        <span
          onClick={() => {
            setValueText("");
            // window.location.reload();
          }}
        >
          <HomeOutlined /> Home
        </span>
      ),
      key: "/manage-book-user",
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
      <Search valueText={valueText} handleBtnSearch={handleBtnSearch} setValueText={setValueText} />
      <Menu onClick={onClick} selectedKeys={[currentUrl]} mode="horizontal" items={items} />
    </div>
  );
};
export default ManageNavigation;
