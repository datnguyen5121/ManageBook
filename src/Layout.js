import { Outlet } from "react-router-dom";
import ManageNavigation from "./component/Navigation/ManageNavigation";

const Layout = (props) => {
  return (
    <div>
      <ManageNavigation />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
