import { Navigate } from "react-router-dom";
import Home from "../view/Home/Home";
import Login from "../view/Login/Login";
import Map from '../view/Map/Map';
import Register from '../view/Register/Register';
import TopAttractions from '../view/TopAttractions/TopAttractions';
import ForgotPassword from '../view/ForgotPassword/Forgotpassword';



const Routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  { path: "/login", element: <Login /> },
  { path: "/map", element: <Map /> },
  { path: "/register", element: <Register />},
  { path: "/topattractions", element: <TopAttractions /> },
  { path: "/forgotpassword", element: <ForgotPassword /> },
  
];

export default Routes;
