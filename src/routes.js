
import Home from "views/Home.js";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: null,
    layout: "/admin"
  },
  
  {
    path: "/home",
    name: "Home",
    icon: "design_app",
    component: Home ,
    layout: "/account",
    num: 1
  },
  
];
export default dashRoutes;
