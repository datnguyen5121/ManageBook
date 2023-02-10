import "./ManageBookUser.scss";
import ListBook from "../ListBook/ListBook";
import ManageNavigation from "../Navigation/ManageNavigation";

const ManageBookUser = () => {
  return (
    <>
      <div className="manage-book-navigate">
        <ManageNavigation />
      </div>
      <div className="manage-book-user-container">
        {/* <HeaderPage /> */}
        <div className=""></div>
        <ListBook />
      </div>
    </>
  );
};
export default ManageBookUser;
