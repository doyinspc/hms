import React from "react";
import {connect} from "react-redux";
import moment from "moment";
import Container from "reactstrap/lib/Container";
import HomeTopCard from "./HomeTopCard";
import HomeBottomCard from "./HomeBottomCard";

import { getRoomcategorys } from './../actions/roomcategory';
import { getRoomtypes } from './../actions/roomtype';
import { getInventorycategorys } from './../actions/inventorycategory';
import { getMaintenancecategorys } from './../actions/maintenancecategory';
import { getUsercategorys } from './../actions/usercategory';


class HomePage extends React.Component {
	 constructor(props){
        super(props);
        this.state ={
        	addbooking : false, 
			numbooking : null, 
			bookingroomid : null, 
			bookingroomdata : {}, 
			bookingroomdate : new Date(), 
			defaulttoday:new Date(),
          	defaultstarted:null,
          	defaultended:null,
			choicestarted : new Date(),
			choiceended : new Date()
        }
     }

     componentDidMount()
     {
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
     



	render(){
		let { 
				addbooking, 
				numbooking, 
				bookingroomid, 
				bookingroomdata, 
				bookingroomdate,
				choicestarted,
				choiceended
			 } = this.state || '';
		return(
			<Container fluid>
                <>
                  <HomeTopCard  
                      id={1}
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
                  <HomeBottomCard id={0}/>
                </>
             </Container>

		)
	}

}
const mapStateToProps = (state, ownprop) =>{
  

}
export default connect(mapStateToProps, {
	 getRoomcategorys, 
    getInventorycategorys, 
    getMaintenancecategorys,
    getUsercategorys,
    getRoomtypes
})(HomePage);