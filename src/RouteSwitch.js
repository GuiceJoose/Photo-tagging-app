import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./Home";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
