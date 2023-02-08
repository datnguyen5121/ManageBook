import "./App.scss";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <div className="app-container">
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
