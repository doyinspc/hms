
import Home from "views/Home.js";
import User from "views/UserPage.js";
import Room from "views/RoomPage.js";
import Users from "views/User/UserPages.js";
var dashRoutes = [
  
  
  {
    path: "/home",
    name: "Home",
    icon: "design_app",
    component: Home ,
    layout: "/account",
    num: 1
  },
  {
    path: "/user",
    name: "Staff",
    icon: "design_app",
    component: User ,
    layout: "/account",
    num: 1
  },{
    path: "/room",
    name: "Room",
    icon: "design_app",
    component: Room ,
    layout: "/account",
    num: 1
  },
   {
    path: "/users/:id",
    name: "Staffs",
    icon: "design_app",
    component: Users ,
    layout: "/account",
    num: 1
  },
  
];
export default dashRoutes;
