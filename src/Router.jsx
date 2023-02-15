import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import App from "./App";
import HeaderPage from "./component/Header/HeaderPage";
import ManageBookUser from "./container/BookUser/ManageBookUser";
import AccountPage from "./container/ManageAccount/AccountPage";
import ManageAdmin from "./container/ManageAccount/ManageAdmin";
import ManageLibrary from "./container/ManageLibrary/ManageLibrary";
import ManageUser from "./container/ManageUser/ManageUser";
import { notification } from "antd";
import BookDetail from "./container/BookDetail/BookDetail";
const Router = (props) => {
  const [api, contextHolder] = notification.useNotification();
  return (
    <>
      {contextHolder}
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/manage-book-user" element={<ManageBookUser />} />
        <Route path="/header-page" element={<HeaderPage />} />
        <Route path="/manage-account" element={<AccountPage />}>
          <Route index element={<ManageAdmin />} />
        </Route>
        <Route path="/manage-library" element={<ManageLibrary />} />
        <Route path="/manage-user" element={<ManageUser />} />
        <Route path="/detail-book/:id" element={<BookDetail />} />
      </Routes>
    </>
  );
};

export default Router;
