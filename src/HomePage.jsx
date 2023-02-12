import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Login from "./component/Auth/Login";
import ManageNavigation from "./container/Navigation/ManageNavigation";

const HomePage = (props) => {
  return (
    <>
      <ManageNavigation />
      <div className="homepage-container">
        <div className="left-content-homepage"></div>
        <div className="right-content-homepage">
          <div className="homepage-login">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
