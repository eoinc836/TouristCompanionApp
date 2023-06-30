import { Navigate } from "react-router-dom";
import Home from "../view/home/Home";
import UserProfile from "../view/UserProfile/UserProfile";
import Login from "../view/Login/Login";
import Placerecommenclation from "../view/Placerecommenclation/Placerecommenclation";
import Map from '../view/Map/Map'
import DestinationBusyness from '../view/DestinationBusyness/DestinationBusyness'

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
  { path: "/placerecommenclation", element: <Placerecommenclation /> },
  { path: "/map", element: <Map /> },
  { path: "/destinationBusyness", element: <DestinationBusyness /> },
  
];

export default Routes;
