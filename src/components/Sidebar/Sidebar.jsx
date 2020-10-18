import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import logo from "logo-white.svg";
import {SERVER_URL, imgx} from './../../actions/common';
import "assets/css/mine.css";
var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    let {username, photo} = this.props.user || {};
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div className="logo">
          <a
            href=""
            className="simple-text logo-mini"
            target="_blank"
          >
            <div className="logo-img">
              <img src={require("assets/img/logo.png")} alt="s" />
            </div>
          </a>
          <a
            href=""
            className="simple-text logo-normal"
            target="_blank"
          >
           {process.env.REACT_APP_WEBSITE_AKA}
          </a>
        </div>
        <div className="logo">
          <a
            href=""
            className="simple-text logo-normal"
            target="_blank"
            style={{fontFamily:'Josefin Sans', textTransform:'none', textAlign:'center', fontSize:'1.6rem'}}
          >
           Jebba
          </a>
        </div>
        
          
        <div className="sidebar-wrapper sc" id="sidebar-wrapper" ref="sidebar">
        <Nav>
              <li className="sidebarmenu">
                    <span className="fa fa-dashboard" ></span>
                    <p className="" >Dashboard {" "}</p>  
              </li>
              <li className="sidebarmenu">
                    <span className="fa fa-user" ></span>
                    <p className="" data-toggle='collapse' data-target="#guest">Guest {" "}</p>  
                    <span className="fa fa-caret-right" ></span>
              </li>
              <span className='collapse fade in' id='guest'>
              <li className="sidebarmenus my-0 py-0" >
                    <p className="" > Guest List {" "}</p>  
              </li>
              <li className="sidebarmenus my-0 py-0">
                    <p className="" > Report {" "}</p>  
              </li>
              </span>
              <li className="sidebarmenu">
                    <span className="fa fa-thumb-tack" ></span>
                    <p className="" data-toggle='collapse' data-target="#invt">Inventory {" "}</p>  
                    <span className="fa fa-caret-right" ></span>
              </li>
              <span className='collapse' id='invt'>
              <li className="sidebarmenus my-0 py-0" >
                    <p className="" > Add Category</p>  
              </li>
              <li className="sidebarmenus my-0 py-0">
                    <p className="" > Add Inventory type</p>  
              </li>
              <li className="sidebarmenus my-0 py-0">
                    <p className="" > Inventory Form</p>  
              </li>
              <li className="sidebarmenus my-0 py-0" >
                    <p className="" > Category list</p>  
              </li>
              <li className="sidebarmenus my-0 py-0">
                    <p className="" > Inventory</p>  
              </li>
              <li className="sidebarmenus my-0 py-0">
                    <p className="" > History</p>  
              </li>
              <li className="sidebarmenus my-0 py-0">
                    <p className="" > Report</p>  
              </li>
              </span>
              <li className="sidebarmenu">
                    <span className="fa fa-wrench" ></span>
                    <p className="" data-toggle='collapse' data-target="#dash">Maintennce {" "}</p>
                    <span className="fa fa-caret-right" ></span>  
              </li>
              <li className="sidebarmenu">
                    <span className="fa fa-users" ></span>
                    <p className="" data-toggle='collapse' data-target="#dash">Staff {" "}</p>
                    <span className="fa fa-caret-right" ></span>  
              </li>
              <li className="sidebarmenu">
                    <span className="fa fa-lock" ></span>
                    <p className="" data-toggle='collapse' data-target="#dash">Logout {" "}</p> 
                    <span className="fa fa-caret-right" ></span> 
              </li>
              

               
        </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
