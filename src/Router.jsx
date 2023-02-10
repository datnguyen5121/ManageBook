import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import App from "./App";
import HeaderPage from "./component/Header/HeaderPage";
import ManageBookUser from "./container/BookUser/ManageBookUser";
import ManageAccount from "./container/ManageAccount/ManageAccount";
import UpdateAccount from "./container/ManageAccount/UpdateAccount";
import ManageAdmin from "./container/ManageAccount/ManageAdmin";
import ListBook from "./container/ListBook/ListBook";
const Router = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/manage-book-user" element={<ManageBookUser />} />
        <Route path="/header-page" element={<HeaderPage />} />
        <Route path="/manage-account" element={<ManageAccount />}>
          <Route index element={<ManageAdmin />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
