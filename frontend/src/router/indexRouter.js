import { Navigate } from "react-router-dom";
import Home from "../view/Home/Home";
import UserProfile from "../view/UserProfile/UserProfile";
import Login from "../view/Login/Login";
import Map from '../view/Map/Map';
import Register from '../view/Register/Register';
import TopAttractions from '../view/TopAttractions/TopAttractions';
import SignUp from '../view/SignUp/SignUp';



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
  { path: "/register", element: <Register />},
  { path: "/topattractions", element: <TopAttractions /> },
  { path: "/signup", element: <SignUp /> },
  
];

export default Routes;
