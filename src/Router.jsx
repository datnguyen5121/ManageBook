import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import App from "./App";
import HeaderPage from "./component/Header/HeaderPage";
import ManageBookUser from "./container/ManageBookUser/ManageBookUser";
import ManageAccount from "./container/ManageAccount/ManageAccount";
const Router = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/manage-book-user" element={<ManageBookUser />} />
        <Route path="/header-page" element={<HeaderPage />} />
        <Route path="/manage-account" element={<ManageAccount />} />
      </Routes>
    </>
  );
};

export default Router;
