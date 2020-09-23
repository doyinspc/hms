import React from "react";
import Container from "reactstrap/lib/Container";
import ServiceNavbar from "./../components/Navbars/ServiceNavbar";
import HomeTopCard from "./HomeTopCard";
import HomeBottomCard from "./HomeBottomCard";
import ClientTopCard from "./Client/TopCard";
import ClientBottomCard from "./Client/BottomCard";
import BookingTopCard from "./Booking/TopCard";
import BookingBottomCard from "./Booking/BottomCard";
import RoomTopCard from "./Room/TopCard";
import RoomBottomCard from "./Room/BottomCard";
import MaintenanceTopCard from "./Maintenance/TopCard";
import MaintenanceBottomCard from "./Maintenance/BottomCard";
import InventoryTopCard from "./Inventory/TopCard";
import InventoryBottomCard from "./Inventory/BottomCard";

import FormBooking from './Form/FormBooking';
import FormRoom from './Form/FormRoom';
import FormRoomCategory from './Form/FormRoomCategory';
import FormMaintenance from './Form/FormMaintenance';
import FormMaintenanceCategory from './Form/FormMaintenanceCategory';
import FormInventory from './Form/FormInventory';
import FormInventoryCategory from './Form/FormInventoryCategory';


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          topcard:0,
          bottomcard:0,
          addbooking:false,
          addroom:false,
          addroomcategory:false,
          addmaintenance:false,
          addmaintenancecategory:false,
          addinventory:false,
          addinventorycategory:false
        }
      }

    menuAction = (topcard, bottomcard) =>{
        this.setState({topcard, bottomcard})
    }

    render() {
        let { topcard, bottomcard, addbooking, addinventory, addinventorycategory, addmaintenance, addmaintenancecategory, addroom, addroomcategory } = this.state;
        return (
            <>
            {addbooking ? <FormBooking st={addbooking} handleClose={()=>this.setState({addbooking:false})} />:''}
            {addroom ? <FormRoom st={addroom} handleClose={()=>this.setState({addroom:false})} />:''}
            {addroomcategory ? <FormRoomCategory mid={0} st={addroomcategory} handleClose={()=>this.setState({addroomcategory:false})} />:''}
            {addmaintenance ? <FormMaintenance st={addmaintenance} handleClose={()=>this.setState({addmaintenance:false})} />:''}
            {addmaintenancecategory ? <FormMaintenanceCategory st={addmaintenancecategory} handleClose={()=>this.setState({addmaintenancecategory:false})} />:''}
            {addinventory ? <FormInventory st={addinventory} handleClose={()=>this.setState({addinventory:false})} />:''}
            {addinventorycategory ? <FormInventoryCategory st={addinventorycategory} handleClose={()=>this.setState({addinventorycategory:false})} />:''}
            
            <ServiceNavbar 
              menuAction={(a, b)=>this.menuAction(a, b)}
              addRoomCategory={()=>this.setState({addroomcategory:true})}
              addRoom={()=>this.setState({addroom:true})}
              addBooking={()=>this.setState({addbooking:true})}
              addMaintenanceCategory={()=>this.setState({addmaintenancecategory:true})}
              addMaintenance={()=>this.setState({addmaintenance:true})}
              addInventoryCategory={()=>this.setState({addinventorycategory:true})}
              addInventory={()=>this.setState({addinventory:true})}
            />
            <Container fluid>
              {topcard === 0 ?
                <>
                  <HomeTopCard  id={topcard}/>
                  <HomeBottomCard id={bottomcard}/>
                </> :''}
              {topcard === 1 ?
                <>
                  <BookingTopCard  id={topcard}/>
                  <BookingBottomCard id={bottomcard}/>
                </> :''}
              {topcard === 2 ?
                <>
                  <ClientTopCard  id={topcard}/>
                  <ClientBottomCard id={bottomcard}/>
                </> :''}
              {topcard === 3 ?
                <>
                  <InventoryTopCard  id={topcard}/>
                  <InventoryBottomCard id={bottomcard}/>
                </> :''}
              {topcard === 4 ?
                <>
                  <MaintenanceTopCard  id={topcard}/>
                  <MaintenanceBottomCard id={bottomcard}/>
                </> :''}
              {topcard === 5 ?
                <>
                  <RoomTopCard  id={topcard}/>
                  <RoomBottomCard id={bottomcard}/>
                </> :''}
              
            </Container>
            </>
        )
    }


}
export default Home;