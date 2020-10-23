import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory , createHashHistory} from "history";
import { BrowserRouter, HashRouter, Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider }from 'react-redux';
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.2.0";

import "assets/css/dash.css";
import "assets/css/demo.css";
import "assets/datatables.css"; 
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import "assets/css/mine.css";
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import AdminLayout from "layouts/Admin.jsx";
import AccountLayout from "layouts/Account.jsx";

import HomeLayout from "views/HomePage.js";
import InventoryLayout from "views/InventoryPage.js";
import MaintenanceLayout from "views/MaintenancePage.js";
import UserPage from "views/UserPage.js";
import UserPages from "views/User/UserPages.js";

import Login from "views/EmployeeLoginPage.js";
import LandingPage from "views/LandingPage.js";
import Index from "views/Index.js";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={ store }>
        <BrowserRouter basename="/jebba" history={hist}>
          <Switch>
            <Switch>
              <Route path="/admin" render={props => <AdminLayout {...props} />} />
              <Route path="/account" render={props => <AccountLayout {...props} />} />
              <Route path="/account/user" render={props => <UserPage {...props} />} />
              <Route exact path="/account/users/:id" render={props => <UserPages {...props} />} />
              <Route path="/account/home" render={props => <HomeLayout {...props} />} />
              <Route path="/account/inventory" render={props => <InventoryLayout {...props} />} />
              <Route path="/account/maintenance" render={props => <MaintenanceLayout {...props} />} />
              
             

              <Route path="/login" render={props => <Login {...props} />} />
              <Route path="/index" render={props => <Index {...props} />} />

              <Route path="/" render={props => <Index {...props} />} />

              <Redirect to="/" />
            </Switch>
          </Switch>
        </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
