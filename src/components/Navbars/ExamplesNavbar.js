import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";

function ExamplesNavbar(props) {
  console.log(props.backgroundColor);
  const [navbarColor, setNavbarColor] = React.useState("navbar-info");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const sidebarToggle = React.useRef();
  const toggle = () => {
    setIsOpen(!this.state.isOpen)
  };
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} color={props.backgroundColor} expand="lg">
        <Container fluid>
        <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={sidebarToggle}
                className="navbar-toggler"
                onClick={() => openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
           
          </div>
          
           <NavbarToggler onClick={toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <div className="navbar-translate">
            <NavbarBrand
              href="#"
              target="_blank"
              id="navbar-brand"
              style={{fontFamily:'Josefin sans', fontSize:'1.3em', textTransform:'capitalize'}}
            >
           
             Welcome James !

            
            </NavbarBrand>  
          </div>
          
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <form class="form-inline my-0 py-0 ml-auto">
                <div class="form-group no-border">
                  <input type="text" style={{height:'25px'}} class="form-control form-control-sm" placeholder="Search"/>
                </div>
               
              </form>
                
             
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <i className='now-ui-icons business_globe'></i>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink1">
                  <a class="dropdown-item" href="/staffregister"><i className='now-ui-icons business_globe'></i> Kainji</a>
                  <a class="dropdown-item" href="/staffregister"><i className='now-ui-icons business_globe'></i> Jebba</a>
                </div>
              </li>
             
               <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <i className='now-ui-icons users_single-02'></i>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink1">
                  <a class="dropdown-item" href="/staffregister"><i className='now-ui-icons users_single-02'></i> Edit</a>                  
                  <a class="dropdown-item" href="/staffregister"><i className='now-ui-icons users_single-02'></i> Logout</a>
                </div>
                
              </li>
              
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ExamplesNavbar;
