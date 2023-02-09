import "./ManageBookUser.scss";
import HeaderPage from "../../component/Header/HeaderPage";
import { Pagination } from "antd";
import ListBook from "../ListBook/ListBook";
import ManageNavigation from "../ManageNavigation/ManageNavigation";
const ManageBookUser = () => {
  return (
    <>
      <div className="manage-book-navigate">
        <ManageNavigation />
      </div>
      <div className="manage-book-user-container">
        {/* <HeaderPage /> */}
        <ListBook />
      </div>
    </>
  );
};
export default ManageBookUser;
