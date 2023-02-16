import "./ManageBookUser.scss";
import ListBook from "../ListBook/ListBook";
import ManageNavigation from "../Navigation/ManageNavigation";
import "react-perfect-scrollbar/dist/css/styles.css";
const ManageBookUser = () => {
  return (
    <>
      <div className="manage-book-navigate">{/* <ManageNavigation /> */}</div>
      <div className="manage-book-user-container">
        <ListBook />
      </div>
    </>
  );
};
export default ManageBookUser;
