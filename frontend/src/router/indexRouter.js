import { Navigate } from "react-router-dom";
import Home from "../view/Home/Home";
import UserProfile from "../view/UserProfile/UserProfile";
import Login from "../view/Login/Login";

import Map from '../view/Map/Map';
import TopAttractions from '../view/TopAttractions/TopAttractions';

import Register from '../view/Register/Register';


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
  { path: "/userProfile", element: <UserProfile /> },
  { path: "/map", element: <Map /> },
  { path: "/topattractions", element: <TopAttractions /> },
  { path: "/register", element: <Register />},
  
];

export default Routes;
