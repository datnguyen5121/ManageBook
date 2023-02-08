import "./Home.scss";
import { Outlet } from "react-router-dom";
import Header from "./component/Header/Header";
const Home = () => {
  return (
    <div>
      <div className="home-container">
        <div className="header-container">
          <Header />
        </div>
        <div className="home-content"></div>
      </div>
    </div>
  );
};
export default Home;
