import "./App.scss";
import { Outlet } from "react-router-dom";
import HeaderApp from "./component/Header/HeaderApp";
const App = () => {
  return (
    <div className="app-container">
      <div className="header-app-container">
        <HeaderApp />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default App;
