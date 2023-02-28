import Login from "./component/Auth/Login";
import { useState } from "react";
import Register from "./component/Auth/Register";
const HomePage = (props) => {
  const [isHidden, setIsHidden] = useState(true);
  const handleToggle = () => {
    setIsHidden(!isHidden);
  };
  return (
    <>
      <div className="homepage-container">
        <div className="left-content-homepage"></div>
        <div className="right-content-homepage">
          <div className="homepage-login" hidden={!isHidden}>
            <Login handleToggle={handleToggle} />
          </div>
          <div className="homepage-login" hidden={isHidden}>
            <Register handleToggle={handleToggle} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
