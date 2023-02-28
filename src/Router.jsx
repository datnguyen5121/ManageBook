import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import App from "./App";
import ManageBookUser from "./container/BookUser/ManageBookUser";
import AccountPage from "./container/ManageAccount/AccountPage";
import ManageAdmin from "./container/ManageAccount/ManageAdmin";
import ManageLibrary from "./container/ManageLibrary/ManageLibrary";
import ManageUser from "./container/ManageUser/ManageUser";
import { notification } from "antd";
import BookDetail from "./container/BookDetail/BookDetail";
import Cart from "./component/Cart/Cart";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import ManageNavigation from "./component/Navigation/ManageNavigation";
import Layout from "./Layout";
import ListBookSearch from "./container/ListBook/ListBookSearch";
const Router = (props) => {
  const [api, contextHolder] = notification.useNotification();
  return (
    <>
      {contextHolder}
      {/* <Layout> */}
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route element={<Layout />}>
          <Route
            path="/manage-book-user"
            element={
              <PrivateRoute>
                <ManageBookUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-account"
            element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            }
          >
            <Route index element={<ManageAdmin />} />
          </Route>
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-library"
            element={
              <PrivateRoute>
                <ManageLibrary />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-user"
            element={
              <PrivateRoute>
                <ManageUser />
              </PrivateRoute>
            }
          />
          <Route
            path="list-book-search"
            element={
              <PrivateRoute>
                <ListBookSearch />
              </PrivateRoute>
            }
          />
          <Route
            path="/detail-book/:id"
            element={
              <PrivateRoute>
                <BookDetail />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      {/* </Layout> */}
    </>
  );
};

export default Router;
