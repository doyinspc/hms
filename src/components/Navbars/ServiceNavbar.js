import React from "react";
// reactstrap components
import {
  UncontrolledCollapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";
// core components

function ServiceNavbar(props){
  return (
    <>
      <Navbar className="bg-primary" expand="lg">
        <Container>
          <button
            className="navbar-toggler"
            id="navbarTogglerDemo01"
            type="button"
          >
            <span className="navbar-toggler-bar bar1"></span>
            <span className="navbar-toggler-bar bar2"></span>
            <span className="navbar-toggler-bar bar3"></span>
          </button>
          <UncontrolledCollapse navbar toggler="#navbarTogglerDemo01">
            
            <Nav className="mr-auto mt-2 mt-lg-0" navbar>
              <NavItem className="active">
                <NavLink href="#pablo" onClick={e =>{props.menuAction(0, 0)}}>
                  <i className='fa fa-dashboard'></i> Dashboard<span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>
              <NavItem >
                <NavLink href="#" onClick={e =>{props.menuAction(1, 0)}}>
                  <i className='fa fa-tasks'></i> Booking
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="clientsid"
                  nav
                  onClick={e =>{props.menuAction(2, 0)}}
                >
                  <i className='fa fa-group'></i> Guest
                </DropdownToggle>
                <DropdownMenu aria-labelledby="clientsid">
                  <DropdownItem
                    href="#pablo"
                    onClick={e =>{props.menuAction(2, 1)}}
                  >
                    Guest list
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={e =>{props.menuAction(2, 2)}}
                  >
                    Report
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="inventoryid"
                  nav
                  onClick={e =>{props.menuAction(3, 0)}}
                >
                <i className='fa fa-thumb-tack'></i> Inventory Manager
                </DropdownToggle>
                <DropdownMenu aria-labelledby="inventoryid">
                  <DropdownItem
                    href="#"
                    onClick={e =>props.addInventoryCategory()}
                  >
                    Add Category
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e =>props.menuAction(3, 1)}
                  >
                    Inventory Categories
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.addInventory()}
                  >
                    Add Inventory type
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e =>props.menuAction(3, 2)}
                  >
                    Inventory Types List
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.postInventory()}
                  >
                    Inventory Form
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.props.menuAction(3, 3)}
                  >
                    Inventory History
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.props.menuAction(3, 4)}
                  >
                    Inventory Report
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>        
              <UncontrolledDropdown nav>
                <DropdownToggle
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#"
                  id="maintenanceid"
                  nav
                  onClick={e =>{props.menuAction(4, 0)}}
                >
                  <i className='fa fa-wrench'></i> Maintenance Manager
                </DropdownToggle>
                <DropdownMenu aria-labelledby="maintenanceid">
                  <DropdownItem
                    href="#"
                    onClick={e =>props.addMaintenanceCategory()}
                  >
                    Add Category
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e =>props.menuAction(4, 1)}
                  >
                    Maintenance Categories
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.addRoom()}
                  >
                    Add Maintenance type
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e =>props.menuAction(4, 2)}
                  >
                    Maintenance Types List
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.postInventory()}
                  >
                    Maintenance Request Form
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.props.menuAction(3, 3)}
                  >
                    Maintenance History
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.props.menuAction(3, 4)}
                  >
                    Maintenance Report
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#"
                  id="roomsid"
                  nav
                  onClick={e =>{props.menuAction(5, 0)}}
                >
                  <i className='fa fa-hotel'></i> Rooms Manager
                </DropdownToggle>
                <DropdownMenu aria-labelledby="roomsid" >
                  <DropdownItem
                    href="#"
                    onClick={e =>props.addRoomCategory()}
                  >
                    Add Category
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e =>props.menuAction(5, 1)}
                  >
                    Room Categories
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.addRoom()}
                  >
                    Add Room
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e =>props.menuAction(5, 2)}
                  >
                    Rooms List
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.postInventory()}
                  >
                    Booking
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.props.menuAction(3, 3)}
                  >
                    Inventory History
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.props.menuAction(3, 4)}
                  >
                    Rooms Report
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ServiceNavbar;