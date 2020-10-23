import React from "react";
import { NavLink, Link, Redirect } from "react-router-dom";
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
    this.state ={
        loc:0
    }
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

  handleDirectDash = () =>{
    return <Redirect to="/account/user" />
  }

  render() {
    let {username, photo} = this.props.user || {};
   
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div className="logo" style={{backgroundColor:'#fff', color:'skyblue'}}>
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
            href="#"
            className="simple-text logo-normal"
            target="_blank"
            style={{color:'skyblue', lineHeight:'80%',  margin:'0px', padding:'0px', marginBottom:'0px',marginTop:'5px' }}
          >
           <p className='text-info' style={{ margin:'0px', padding:'0px',  textTransform:'capitalize', fontSize:'1.5em', fontFamily:'Bree Serif'}}>{process.env.REACT_APP_WEBSITE_AKA}</p>
           <p style={{fontSize:'0.6em', color:'#000', margin:'0px', padding:'0px', textTransform:'capitalize', fontFamily:'Josefin Sans'}}>Powered By {process.env.REACT_APP_WEBSITE_NAME}</p>
          </a>
        </div>
        <div className="logo" style={{background:'#666666'}}>
          <a
            href=""
            className="simple-text logo-normal"
            target="_blank"
            style={{fontFamily:'Josefin Sans', textTransform:'capitalize', textAlign:'center', fontSize:'1.6rem'}}
          >
           {process.env.REACT_APP_FOLDER}
          </a>
        </div>
        
          
        <div className="sidebar-wrapper sc" id="sidebar-wrapper" ref="sidebar" style={{background:'#666666'}}>
        <Nav>
              <NavLink to='/account/home'><li className="sidebarmenu">
                    <span className="fa fa-dashboard" ></span>
                    <p className="" >Dashboard {" "}</p>  
              </li></NavLink>
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
                    <p className="" data-toggle='collapse' data-target="#mtn">Maintennce {" "}</p>
                    <span className="fa fa-caret-right" ></span>  
              </li>
              <span className='collapse' id='mtn'>
              <li className="sidebarmenus my-0 py-0" >
                    <p className="" > Add Category</p>  
              </li>
              <li className="sidebarmenus my-0 py-0">
                    <p className="" > Add Maintenance type</p>  
              </li>
              <li className="sidebarmenus my-0 py-0">
                    <p className="" > Maintenance Request Form</p>  
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
                    <span className="fa fa-users" ></span>
                    <p className="" data-toggle='collapse' data-target="#stf">Staff {" "}</p>
                    <span className="fa fa-caret-right" ></span>  
              </li>
              <span className='collapse' id='stf'>
              <li className="sidebarmenus my-0 py-0" >
                   <NavLink 
                    to='/account/user' 
                    className="sidebarmenux my-0 py-0"
                    >Add Department </NavLink>  
              </li>
              <li className="sidebarmenus my-0 py-0">
                    <NavLink 
                    to='/account/user' 
                    className="sidebarmenux my-0 py-0"
                    >Add Staff </NavLink>
              </li>
              <li className="sidebarmenus my-0 py-0">
                    <NavLink 
                    to='/account/user' 
                    className="sidebarmenux my-0 py-0"
                    >Staff List </NavLink>
              </li>
              <li className="sidebarmenus my-0 py-0">
                     <NavLink 
                    to='/account/users' 
                    className="sidebarmenux my-0 py-0"
                    >Staff Activity Log </NavLink>
              </li>
           
              </span>
              <li className="sidebarmenu">
                    <span className="fa fa-lock" ></span>
                    <p className="" data-toggle='collapse' data-target="#dash">Logout {" "}</p> 
                    
              </li>
              

               
        </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
