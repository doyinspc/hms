import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import DemoNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "routes.js";

var ps;

class Dashboard extends React.Component {
  state = {
    backgroundColor: "blue",
    backgroundColors: "info"
  };
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleColorClick = color => {
    this.setState({ backgroundColor: color });
  };
  handleColorClicks = color => {
  
    this.setState({ backgroundColors: color });
  };

  menuAction=(a, b)=>{
    this.props.topcard = a;
    this.props.bottomcard = b;
  }
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
          menuAction={(a, b)=>this.props.menuAction(a, b)}
          addRoomCategory={()=>this.setState({addroomcategory:true, numroomcategory:null})}
          addRoom={()=>this.setState({addroom:true, numroom:null})}
          postRoom={()=>this.setState({addroomtransaction:true})}
          addBooking={()=>this.setState({addbooking:true, numbooking:null })}
          addMaintenanceCategory={()=>this.setState({addmaintenancecategory:true, nummaintenancecategory:null})}
          addMaintenance={()=>this.setState({addmaintenance:true, nummaintenance:null})}
          postMaintenance={()=>this.setState({addmaintenancetransaction:true})}
          addInventoryCategory={()=>this.setState({addinventorycategory:true, numinventorycategory:null})}
          addInventory={()=>this.setState({addinventory:true,  numinventory:null})}
          postInventory={()=>this.setState({addinventorytransaction:true})}
          addUserCategory={()=>this.setState({addusercategory:true, numusercategory:null})}
          addUser={()=>this.setState({adduser:true,  numuser:null})}
          postUser={()=>this.setState({addusertransaction:true})}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} 
            backgroundColor={this.state.backgroundColors}
          />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                  {...this.props}
                />
              );
            })}
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default Dashboard;
