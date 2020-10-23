import React from "react";
import {connect} from "react-redux";
import moment from "moment";
import Container from "reactstrap/lib/Container";
import ServiceNavbar from "./../components/Navbars/ServiceNavbar";
import HomeTopCard from "./HomeTopCard";
import HomeBottomCard from "./HomeBottomCard";
import ClientTopCard from "./Client/TopCard";
import ClientBottomCard from "./Client/BottomCard";
import BookingTopCard from "./Booking/TopCard";
import BookingBottomCard from "./Booking/BottomCard";
import RoomBottomCard from "./Room/BottomCard";
import RoomBottomCard1 from "./Room/BottomCard1";
import MaintenanceBottomCard from "./Maintenance/BottomCard";
import InventoryBottomCard from "./Inventory/BottomCard";
import UserBottomCard from "./User/BottomCard";

import FormBooking from './Form/FormBooking';
import FormRoom from './Form/FormRoom';
import FormRoomCategory from './Form/FormRoomCategory';
import FormRoomTransaction from './Form/FormRoomTransaction';
import FormMaintenance from './Form/FormMaintenance';
import FormMaintenanceCategory from './Form/FormMaintenanceCategory';
import FormMaintenanceTransaction from './Form/FormMaintenanceTransaction';
import FormInventory from './Form/FormInventory';
import FormInventoryCategory from './Form/FormInventoryCategory';
import FormInventoryTransaction from './Form/FormInventoryTransaction';
import FormUser from './Form/FormUser';
import FormUserCategory from './Form/FormUserCategory';
import FormUserTransaction from './Form/FormUserTransaction';


import { getRoomcategorys } from './../actions/roomcategory';
import { getRoomtypes } from './../actions/roomtype';
import { getInventorycategorys } from './../actions/inventorycategory';
import { getMaintenancecategorys } from './../actions/maintenancecategory';
import { getUsercategorys } from './../actions/usercategory';


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          topcard:0,
          bottomcard:0,

          categoryid:null,
          categoryname:'',
          inventoryid:null,
          inventoryname: '',
          maintenanceid: null,
          maintenancename:'',
          userid: null,
          username:'',
          roomid: null,
          roomname:'',

          defaulttoday:new Date(),
          defaultstarted:null,
          defaultended:null,
          choicestarted:null,
          choiceended:null,

          addbooking:false,
          addroom:false,
          addroomcategory:false,
          addroomtransaction:false,
          addmaintenance:false,
          addmaintenancecategory:false,
          addmaintenancetransaction:false,
          addinventory:false,
          addinventorycategory:false,
          addinventorytransaction:false,
          adduser:false,
          addusercategory:false,
          addusertransaction:false,
         
          numbooking:null,
          numroom:null,
          numroomcategory:null,
          numroomtransaction:null,
          nummaintenance:null,
          nummaintenancecategory:null,
          nummaintenancetransaction:null,
          numinventory:null,
          numinventorycategory:null,
          numinventorytransaction:null,
          numuser:null,
          numusercategory:null,
          numusertransaction:null,
          

          bookingroomid:null,
          bookingroomdata:{},
          bookingroomdate:''

        }
      }


    componentDidMount(){
     

      let dt = new Date();
      let firstday = new Date(dt.getFullYear(), dt.getMonth(), 1);
      let lastday = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
      this.setState({
         defaultstarted: moment(firstday).format("YYYY-MM-DD"),
         defaultended: moment(lastday).format("YYYY-MM-DD")
      })

      let params1 = {
        data:{},
        cat:'categoryroomall',
        table:'rooms'
      }
      let params2 = {
        data:{},
        cat:'categoryinventoryall',
        table:'inventory_types'
      }
      let params3 = {
        data:{},
        cat:'categorymaintenanceall',
        table:'maintenance_types'
      }
      let params4 = {
        data:{},
        cat:'categoryuserall',
        table:'user_types'
      }
      let params5 = {
        data:{},
        cat:'roomall',
        table:'room_types'
      }
      this.props.getRoomcategorys(params1);
      this.props.getInventorycategorys(params2);
      this.props.getMaintenancecategorys(params3);
      this.props.getUsercategorys(params4);
      this.props.getRoomtypes(params5);

    }
    

    componentWillUpdate(prevProps, prevState){
          if(prevProps.topcard !== this.props.topcard){this.setState({topcard:this.props.topcard})}
          if(prevProps.bottomcard !== this.props.bottomcard){this.setState({bottomcard:this.props.bottomcard})}
    }
    menuAction = (topcard, bottomcard) =>{
        this.setState({topcard:topcard, bottomcard:bottomcard});
    }

    loadNewDates = (starts, ends) =>{
        this.setState({
            choicestarted:new Date(starts),
            choiceended : new Date(ends)
        })
    }

    render() {
      
        let { topcard, 
              bottomcard, 
              addbooking, 
              addinventory, 
              addinventorycategory, 
              addinventorytransaction,
              addmaintenance, 
              addmaintenancecategory, 
              addmaintenancetransaction,
              addroom, 
              addroomcategory,
              addroomtransaction, 
              adduser, 
              addusercategory,
              addusertransaction, 

              numbooking, 
              numinventory, 
              numinventorycategory,
              numinventorytransaction, 
              nummaintenance, 
              nummaintenancecategory,
              nummaintenancetransaction, 
              numroom, 
              numroomcategory,
              numroomtransaction,
              numuser, 
              numusercategory,
              numusertransaction,

              categoryid,
              categoryname,
              inventoryid,
              inventoryname,
              maintenanceid,
              maintenancename,
              roomid,
              roomname,
              userid,
              username,

              choiceended,
              choicestarted,
              defaultended,
              defaultstarted,
              defaulttoday,

              bookingroomid,
              bookingroomdata,
              bookingroomdate
            } = this.state;

            
        
        return (
            <>
            {addbooking ? <FormBooking st={addbooking} st1={numbooking} roomid={bookingroomid} roomdate={bookingroomdate} roomdata={bookingroomdata}  handleClose={()=>this.setState({addbooking:false})} />:''}
            {addroom ? <FormRoom st={addroom} st1={numroom} handleClose={()=>this.setState({addroom:false})} />:''}
            {addroomcategory ? <FormRoomCategory mid={0} st={addroomcategory} st1={numroomcategory} handleClose={()=>this.setState({addroomcategory:false})} />:''}
            {addroomtransaction ? <FormRoomTransaction st={addroomtransaction} st1={numroomtransaction} handleClose={()=>this.setState({addroomtransaction:false})} />:''}
            {addmaintenance ? <FormMaintenance st={addmaintenance} st1={nummaintenance} handleClose={()=>this.setState({addmaintenance:false})} />:''}
            {addmaintenancecategory ? <FormMaintenanceCategory st={addmaintenancecategory} st1={nummaintenancecategory} handleClose={()=>this.setState({addmaintenancecategory:false})} />:''}
            {addmaintenancetransaction ? <FormMaintenanceTransaction st={addmaintenancetransaction} st1={nummaintenancetransaction} handleClose={()=>this.setState({addmaintenancetransaction:false})} />:''}
            {addinventory ? <FormInventory st={addinventory} st1={numinventory} handleClose={()=>this.setState({addinventory:false})} />:''}
            {addinventorycategory ? <FormInventoryCategory st={addinventorycategory} st1={numinventorycategory} handleClose={()=>this.setState({addinventorycategory:false})} />:''}
            {addinventorytransaction ? <FormInventoryTransaction st={addinventorytransaction} st1={numinventorytransaction} handleClose={()=>this.setState({addinventorytransaction:false})} />:''}
            {adduser ? <FormUser st={adduser} st1={numuser} handleClose={()=>this.setState({adduser:false})} />:''}
            {addusercategory ? <FormUserCategory st={addusercategory} st1={numusercategory} handleClose={()=>this.setState({addusercategory:false})} />:''}
            {addusertransaction ? <FormUserTransaction st={addusertransaction} st1={numusertransaction} handleClose={()=>this.setState({addusertransaction:false})} />:''}
            
            <ServiceNavbar 
              menuAction={(a, b)=>this.menuAction(a, b)}
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
            <Container fluid>
              {topcard === 0 ?
                <>
                  <HomeTopCard  
                      id={topcard}
                      title={'Dashboard'}
                      icon='fa fa-dashboard'
                      handleBooking={(roomid, roomdata, roomdate, rowid)=>this.setState({
                          addbooking:true,
                          numbooking:rowid,
                          bookingroomid:roomid,
                          bookingroomdata:roomdata,
                          bookingroomdate:roomdate
                      })}
                      setDate={(start, end)=>this.setState({choicestarted:start, choiceended:end})}
                      />
                  <HomeBottomCard id={bottomcard}/>
                </> :''}
              {topcard === 1 ?
                <>
                  <HomeTopCard  
                      id={topcard}
                      title={'Booking'}
                      icon='fa fa-dashboard'
                      handleBooking={(roomid, roomdata, roomdate, rowid)=>this.setState({
                          addbooking:true,
                          numbooking:rowid,
                          bookingroomid:roomid,
                          bookingroomdata:roomdata,
                          bookingroomdate:roomdate
                      })}
                      setDate={(start, end)=>this.setState({choicestarted:start, choiceended:end})}
                      />
                  <BookingBottomCard id={bottomcard}/>
                </> :''}
              {topcard === 2 ?
                <>
                  <HomeTopCard  
                      id={topcard}
                      title={'Guest'}
                      icon='fa fa-users'
                      handleBooking={(roomid, roomdata, roomdate, rowid)=>this.setState({
                          addbooking:true,
                          numbooking:rowid,
                          bookingroomid:roomid,
                          bookingroomdata:roomdata,
                          bookingroomdate:roomdate
                      })}
                      setDate={(start, end)=>this.setState({choicestarted:start, choiceended:end})}
                       />
                  <RoomBottomCard1 
                      id={bottomcard}
                      categoryid={categoryid}
                      categoryname={categoryname}
                      roomid={roomid}
                      roomname={roomname}
                      choicestarted={choicestarted}
                      choiceended={choiceended}
                      defaultstarted={defaultstarted}
                      defaultended={defaultended}
                      roomAdd={(rid)=>this.setState({addroom:true, numroom:rid})}
                      roomTransactionAdd={(rid)=>this.setState({addroomtransaction:true, numroomtransaction:rid})}
                      />
                </> :''}
              {topcard === 3 ?
                <>
                    <HomeTopCard  
                      id={topcard}
                      title={'Inventory '}
                      icon={'fa fa-thumb-tack'}
                      handleBooking={(roomid, roomdata, roomdate, rowid)=>this.setState({
                          addbooking:true,
                          numbooking:rowid,
                          bookingroomid:roomid,
                          bookingroomdata:roomdata,
                          bookingroomdate:roomdate
                      })}
                      setDate={(start, end)=>this.setState({choicestarted:start, choiceended:end})}
                      />
                  <InventoryBottomCard 
                      id={bottomcard}
                      categoryid={categoryid}
                      categoryname={categoryname}
                      inventoryid={inventoryid}
                      inventoryname={inventoryname}
                      choicestarted={choicestarted}
                      choiceended={choiceended}
                      defaultstarted={defaultstarted}
                      defaultended={defaultended}
                      inventoryAdd={(rid)=>this.setState({addinventory:true, numinventory:rid})}
                      inventoryTransactionAdd={(rid)=>this.setState({addinventorytransaction:true, numinventorytransaction:rid})}
                      />
                </> :''}
              {topcard === 4 ?
                <>
                  <HomeTopCard  
                      id={topcard}
                      title={'Maintenance '}
                      icon={'fa fa-wrench'} 
                      handleBooking={(roomid, roomdata, roomdate, rowid)=>this.setState({
                        addbooking:true,
                        numbooking:rowid,
                        bookingroomid:roomid,
                        bookingroomdata:roomdata,
                        bookingroomdate:roomdate
                    })}
                    setDate={(start, end)=>this.setState({choicestarted:start, choiceended:end})}
                      />
                  <MaintenanceBottomCard 
                      id={bottomcard}
                      categoryid={categoryid}
                      categoryname={categoryname}
                      maintenanceid={maintenanceid}
                      maintenancename={maintenancename}
                      choicestarted={choicestarted}
                      choiceended={choiceended}
                      defaultstarted={defaultstarted}
                      defaultended={defaultended}
                      maintenanceAdd={(rid)=>this.setState({addmaintenance:true, nummaintenance:rid})}
                      maintenanceTransactionAdd={(rid)=>this.setState({addmaintenancetransaction:true, nummaintenancetransaction:rid})}
                      />
                </> :''}
              {topcard === 5 ?
                <>
                  <HomeTopCard  
                      id={topcard}
                      title={'Room '}
                      icon={'fa fa-hotel'}
                      handleBooking={(roomid, roomdata, roomdate, rowid)=>this.setState({
                        addbooking:true,
                        numbooking:rowid,
                        bookingroomid:roomid,
                        bookingroomdata:roomdata,
                        bookingroomdate:roomdate
                    })}
                    setDate={(start, end)=>this.setState({choicestarted:start, choiceended:end})}
                     
                      />
                  <RoomBottomCard 
                      id={bottomcard}
                      categoryid={categoryid}
                      categoryname={categoryname}
                      roomid={roomid}
                      roomname={roomname}
                      choicestarted={choicestarted}
                      choiceended={choiceended}
                      defaultstarted={defaultstarted}
                      defaultended={defaultended}
                      roomAdd={(rid)=>this.setState({addroom:true, numroom:rid})}
                      roomTransactionAdd={(rid)=>this.setState({addroomtransaction:true, numroomtransaction:rid})}
                      />
                </> :''}
              {topcard === 6 ?
                <>
                  <HomeTopCard  
                      id={topcard}
                      title={'Staff '}
                      icon={'fa fa-user'}
                      handleBooking={(roomid, roomdata, roomdate, rowid)=>this.setState({
                        addbooking:true,
                        numbooking:rowid,
                        bookingroomid:roomid,
                        bookingroomdata:roomdata,
                        bookingroomdate:roomdate
                      })}
                      setDate={(start, end)=>this.setState({choicestarted:start, choiceended:end})}
                      />
                  <UserBottomCard 
                      id={bottomcard}
                      categoryid={categoryid}
                      categoryname={categoryname}
                      userid={userid}
                      username={username}
                      choicestarted={choicestarted}
                      choiceended={choiceended}
                      defaultstarted={defaultstarted}
                      defaultended={defaultended}
                      userAdd={(rid)=>this.setState({adduser:true, numuser:rid})}
                      userTransactionAdd={(rid)=>this.setState({addusertransaction:true, numusertransaction:rid})}
                      />
                </> :''}
              
            </Container>
            </>
        )
    }


}

const mapStateToProps = (state, ownprop) =>{
  

}
export default connect(mapStateToProps, 
  {
    getRoomcategorys, 
    getInventorycategorys, 
    getMaintenancecategorys,
    getUsercategorys,
    getRoomtypes
    })(Home);