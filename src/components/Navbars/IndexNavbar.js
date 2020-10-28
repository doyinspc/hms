import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function IndexNavbar(props) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
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
      <Navbar  style={{width:'100%'}} className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              href=""
              target="_blank"
              id="navbar-brand"
              className='mainname'
              style={{fontFamily:'Kaushan Script', color:'yellow', fontSize:'1.5em', textTransform:'none'}}
            >silhms
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              Powered By {process.env.REACT_APP_WEBSITE_NAME}
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink
                  href="#booking"
                  
                >
                  <i className="now-ui-icons files_paper"></i>
                  <p>Booking</p>
                </NavLink>
              </NavItem>
              
             {props.user.isAuthenticated ? 
              <NavItem>
                <NavLink
                  href="/account/home"
                >
                  <i className="now-ui-icons users_single-02"></i>
                  <p>Welcome {props.user.user.surname} !</p>
                </NavLink>
              </NavItem>:
              <NavItem> 
                <NavLink
                  href="#"
                  onClick={()=>props.login(true)}
                >
                  <i className="now-ui-icons ui-1_lock-circle-open"></i>
                  <p>Staff Login</p>
                </NavLink>
              </NavItem>}
               {props.user.isAuthenticated ? 
              <NavItem>
                <NavLink
                  onClick={()=>props.logout()}
                >
                  <i className="now-ui-icons ui-1_lock-circle-open"></i>
                  <p>Logout</p>
                </NavLink>
              </NavItem>:''}
              <NavItem>
                <NavLink
                  href=""
                  target="_blank"
                  id="twitter-tooltip"
                >
                  <i className="fab fa-twitter"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href=""
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href=""
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({ 
    user:state.userReducer
})
  
export default connect(mapStateToProps, {})(IndexNavbar)