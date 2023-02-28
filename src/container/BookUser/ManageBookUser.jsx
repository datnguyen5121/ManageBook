import "./ManageBookUser.scss";
import ListBook from "../ListBook/ListBook";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useSelector } from "react-redux";
const ManageBookUser = () => {
  const valueText = useSelector((state) => state.book.valueText);

  return (
    <>
      <div className="manage-book-navigate">{/* <ManageNavigation /> */}</div>
      <div className="manage-book-user-container">
        <ListBook valueText={valueText} />
      </div>
    </>
  );
};
export default ManageBookUser;
