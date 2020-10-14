import React from "react";
// reactstrap components
import {
  UncontrolledCollapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  
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
                    onClick={e =>{props.menuAction(2, 3)}}
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
                  
                >
                <i className='fa fa-thumb-tack'></i> Inventory 
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
                    onClick={e=>props.menuAction(3, 4)}
                  >
                    Inventory History
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.menuAction(3, 6)}
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
                  
                >
                  <i className='fa fa-wrench'></i> Maintenance 
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
                    onClick={e=>props.addMaintenance()}
                  >
                    Add Maintenance type
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.postMaintenance()}
                  >
                    Maintenance Request Form
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e =>props.menuAction(4, 1)}
                  >
                    Maintenance Categories
                  </DropdownItem>
                 
                  <DropdownItem
                    href="#"
                    onClick={e =>props.menuAction(4, 2)}
                  >
                    Maintenance Types List
                  </DropdownItem>
                  
                  <DropdownItem
                    href="#"
                    onClick={e=>props.menuAction(4, 3)}
                  >
                    Maintenance History
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.menuAction(4, 4)}
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
                  
                >
                  <i className='fa fa-hotel'></i> Rooms 
                </DropdownToggle>
                <DropdownMenu aria-labelledby="roomsid" >
                  <DropdownItem
                    href="#"
                    onClick={e =>props.addRoomCategory()}
                  >
                    Add House
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.addRoom()}
                  >
                    Add Room
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.postRoom()}
                  >
                    Booking
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e =>props.menuAction(5, 1)}
                  >
                    Houses
                  </DropdownItem>
                  
                  <DropdownItem
                    href="#"
                    onClick={e =>props.menuAction(5, 2)}
                  >
                    Rooms List
                  </DropdownItem>
                  
                  <DropdownItem
                    href="#"
                    onClick={e=>props.menuAction(5, 3)}
                  >
                    Room History
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.menuAction(5, 4)}
                  >
                    Rooms Report
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
                  id="usersid"
                  nav
                  
                >
                <i className='fa fa-user'></i> Staff 
                </DropdownToggle>
                <DropdownMenu aria-labelledby="usersid">
                  <DropdownItem
                    href="#"
                    onClick={e =>props.addUserCategory()}
                  >
                    Add Department
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.addUser()}
                  >
                    Add Staff
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e =>props.menuAction(6, 1)}
                  >
                    Departments
                  </DropdownItem>
                  
                  <DropdownItem
                    href="#"
                    onClick={e =>props.menuAction(6, 2)}
                  >
                    Staff List
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={e=>props.menuAction(6, 4)}
                  >
                    Staff Activity Log
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