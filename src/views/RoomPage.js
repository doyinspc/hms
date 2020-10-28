import React from "react";
import {connect} from "react-redux";
import moment from "moment";
import Container from "reactstrap/lib/Container";
import HomeTopCard from "./HomeTopCard";
import RoomBottomCard from "./Room/BottomCategory";
import FormRoom from './Form/FormRoom';
import FormRoomCategory from './Form/FormRoomCategory';
import FormRoomTransaction from './Form/FormRoomTransaction';

class RoomPage extends React.Component {
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
  			choiceended : new Date(),
  			roomid: null,
        roomname:'',
        addroom:false,
      	addroomcategory:false,
      	addroomtransaction:false,
      	numroom:null,
      	numroomcategory:null,
      	numroomtransaction:null,
      	categoryid:null,
        categoryname:''
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
     }
    


	render(){
		let { 
				addbooking, 
				numbooking, 
				bookingroomid, 
				bookingroomdata, 
				bookingroomdate,
				choicestarted,
				choiceended,
				defaultstarted,
    		defaultended,
    		roomid,
        roomname,
        addroom,
      	addroomcategory,
      	addroomtransaction,
      	numroom,
      	numroomcategory,
      	numroomtransaction,
      	categoryid,
    		categoryname

			 } = this.state || '';


		return(
			<>
			{addroom ? <FormRoom st={addroom} st1={numroom} handleClose={()=>this.setState({addroom:false})} />:''}
            {addroomcategory ? <FormRoomCategory st={addroomcategory} st1={numroomcategory} handleClose={()=>this.setState({addroomcategory:false})} />:''}
            {addroomtransaction ? <FormRoomTransaction st={addroomtransaction} st1={numroomtransaction} handleClose={()=>this.setState({addroomtransaction:false})} /> : ''}
			<Container style={{position:'relative'}}>
                <>
                <div style={{minHeight:'50px'}}>
                </div>
                  <HomeTopCard  
                      id={0}
                      title={'HouseKeeping '}
                      icon={'fa fa-room'}
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
                      id={1}
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
                </>
             </Container>
             </>

		)
	}

}
const mapStateToProps = (state, ownprop) =>({
  

})
export default connect(mapStateToProps, {})(RoomPage);