import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import HomePage from "./HomePage";
import Login from "./component/Auth/Login";
import Header from "./component/Header/Header";

const App = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
        <Route index element={<HomePage/>}/>
        <Route path="dat" element={<Header />} />

        </Route>
        <Route path="login" element={<Login />} />

      </Routes>
    </>
  );
};

export default App;
