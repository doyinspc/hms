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

import AdminLayout from "layouts/Admin.jsx";
import AccountLayout from "layouts/Account.jsx";
import HomeLayout from "views/Home.js";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={ store }>
        <BrowserRouter  history={hist}>
          <Switch>
            <Switch>
              <Route path="/admin" render={props => <AdminLayout {...props} />} />
              <Route path="/account" render={props => <AccountLayout {...props} />} />
              
              <Route path="/" render={props => <HomeLayout {...props} />} />
              <Redirect to="/" />
            </Switch>
          </Switch>
        </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
