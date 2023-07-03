import { Navigate } from "react-router-dom";
import Home from "../view/home/Home";
import UserProfile from "../view/UserProfile/UserProfile";
import Login from "../view/Login/Login";
import Placerecommendation from "../view/Placerecommendation/Placerecommendation";
import Map from '../view/Map/Map';
import DestinationBusyness from '../view/DestinationBusyness/DestinationBusyness';
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
  { path: "/placerecommendation", element: <Placerecommendation /> },
  { path: "/map", element: <Map /> },
  { path: "/destinationBusyness", element: <DestinationBusyness /> },
  { path: "/register", element: <Register />},
  
];

export default Routes;
