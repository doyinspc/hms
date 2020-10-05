import React from "react";
import { connect } from "react-redux";
import { getRooms } from "./../../actions/room";
import { getBookings } from "./../../actions/booking";
import booking from "reducers/booking";
import FormBooking from "views/Form/FormBooking";
import BookingCell from "./BookingCell";

class BottomCard extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            cid:null,
            cst:false
        }
    }


    componentDidMount(){
        
        let params = {
            data:{},
            cat:'roomall',
            table:'rooms'
        }
        this.props.getRooms(params);
        this.props.getBookings({});
    }

    loadBooking = (id) =>{
        if(id == 0)
        {
            this.setState({cid:null, cst:true})
        }
        else if(id > 0)
        {
            this.setState({cid:id, cst:true})
        }
    }
    render() {
        let dt = new Date();
        let yr = dt.getFullYear();
        let mt = dt.getMonth();
        let numOfDays = new Date(yr, mt + 1, 0).getDate() ;
        let daysArray = new Array();
        let firstday = new Date(dt.getFullYear(), dt.getMonth(), 1);
        let lastday = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
        let rooms = this.props.rooms && Array.isArray(this.props.rooms) ? this.props.rooms : [];
        
        let bookings_data = this.props.bookings && Array.isArray(this.props.bookings) ? this.props.bookings : [];
        let booking_array = [];
        bookings_data.forEach(element => {
            booking_array[element.dateid] = {};
            booking_array[element.dateid][element.roomid] = {
                'id':element.id,
                'guestname':element.guestname,
                'guestislodged':element.is_lodged,
                'guestispaid':element.is_paid
            }
        });
        
        for(var i = 0; i < numOfDays; ++i)
        {
            daysArray[i] = new Date(yr, mt, i + 1);
        }
        let tda = <td
                    className='col-xs-6 bg-light'
                    style={{position:'absolute', minWidth:'200px', height:'50px', paddingBlock:'2px',textAlign:'left', fontWeight:'bolder'}}>
                        DAY
                    </td> 
        let tdb = <><td
                    className='col-xs-6 bg-light'
                    style={{position:'absolute', minWidth:'200px', height:'50px', paddingBlock:'2px',textAlign:'left', fontWeight:'bolder'}}>
                        OCCUPANCY RATE (%)
                    </td> 
                    </>
        let td = daysArray.map((prop, ind)=>{
            return <>
                    <td 
                    key={ind} 
                    className='col-xs-6'
                    style={{minWidth:'200px', height:'50px', paddingBlock:'2px',textAlign:'center', fontWeight:'bolder'}}>
                        {new Date(prop).toDateString()}
                    </td>
                    </>
        })
        let tdp = daysArray.map((prop, ind)=>{
            return <>
                    <td 
                        key={ind} 
                        style={{minWidth:'200px', height:'40px', paddingBlock:'1px',textAlign:'center', fontSize:'1.3em'}}>
                        {'0%'}
                    </td>
                    
                    </>
        })
        let row = rooms.map((prop, ind)=>{
               return <tr>
                        <td 
                            key={ind} 
                            className={parseInt(prop.is_active) === 0 ? 'bg-default col-xs-6 text-light': 'bg-danger col-xs-6 text-light'}
                            style={{position:'absolute', width:'200px', paddingBlock:'1px', textAlign:'left', fontSize:'1.3em'}}>
                            {prop.name}{" "} {parseInt(prop.is_active) === 1 ? <i className='now-ui-icons ui-2_settings-90 mt-1'></i>:''}
                        </td>   
                        {
                            daysArray.map((prop1, ind1)=>{
                            let data = prop1 in booking_array && prop in booking_array[prop1] ? booking_array[prop1][prop.id] : 0 ;
                            return <BookingCell
                                        key={ind1}
                                        data={data}
                                        rowactive={parseInt(prop.is_active)}
                                        roomid={parseInt(prop.id)}
                                        dateid={prop1}
                                        maint ={parseInt(prop.is_active) }
                                        loadBooking ={(rid)=>this.loadBooking(rid)}
                                    />
                         })}
                        </tr>
        })
        return (
            <>
            {this.state.cst ? 
            <FormBooking
                st={this.state.cst}
                mid={this.state.cid}
                handleClose={()=>this.setState({cst:false, cid:null})}
            />:''}
              <div class="content">
                  <table className="table table-bordered table-responsive" border='3px'>
                      <thead>
                        <tr>
                        {tda}{td}
                        </tr>
                        <tr>
                        {tdb}{tdp}
                        </tr>
                      </thead>
                      <tbody>
                          {row}
                      </tbody>
                  </table>
              </div>
            </>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({ 
    user:state.userReducer.user,
    rooms:state.roomReducer.rooms,
    bookings:state.bookingReducer,
  })
  
export default connect(mapStateToProps,{ getRooms, getBookings })(BottomCard)