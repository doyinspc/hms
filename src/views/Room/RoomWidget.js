import React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import Swal from "sweetalert2";
import { getRoomdata } from "./../../actions/roomtype";
import $ from 'jquery';
class RoomWidget extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            roomsoccupied:0,
            roomsavailable: 0,
            roomsout:0,
            dateset:new Date()
        }
    }

    componentDidMount(){
        let params = {
            data:JSON.stringify({'currentdate':moment(new Date()).format('YYYY-MM-DD')}),
            cat:'roomsta',
            table:'room_types'
        }
        this.props.getRoomdata(params);
    }
    retState = (dt) =>{
        this.setState({dateset:new Date(dt)})
    }
    lunchDate = (func, func1) =>{
        Swal.fire({
            title: 'pick a date:',
            type: 'question',
            html: '<input id="datepicker" type="date"  class="swal2-input">',
            customClass: 'swal2-overflow',
            
          }).then(function(result) {
              if(result.value){
                  let v = $('#datepicker').val();
                  let params = {
                    data:JSON.stringify({'currentdate':moment(new Date(v)).format('YYYY-MM-DD')}),
                    cat:'roomsta',
                    table:'room_types'
                }
                func(params);
                func1(v);
              }
          });
        
    }

    render() {
        let { roomsout, dateset } = this.state;
        let rm = this.props.roomdata && Array.isArray(this.props.roomdata) && this.props.roomdata[0] ? this.props.roomdata[0].length : 0 ;
        //filter all ids
        let rm1 = this.props.roomdata && Array.isArray(this.props.roomdata) && this.props.roomdata[0] ? this.props.roomdata[0] : [] ;
        let isarray = rm1.map((prop, ind)=>{
                return prop.id;
        });
        
        //ALL ROOMS
        let rm2 = this.props.roomdata && Array.isArray(this.props.roomdata) && this.props.roomdata[1] ? this.props.roomdata[1] : [] ;
        let vacant = rm2.filter((rw)=>!isarray.includes(rw.id));
        let vacantno = vacant.length;


        return (
            <>
            <div className="row">
                <div className="col-lg-4 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-body ">
                            <div className="statistics statistics-horizontal">
                                <div className="info info-horizontal">
                                    <div className="row">
                                        <div className="col-5">
                                            <div data-toggle='collapse' data-target='#main1' className="icon icon-success icon-circle">
                                                <i className="fa fa-bed"></i>
                                            </div>
                                        </div>
                                        <div className="col-7 text-right">
                                            <h3 className="info-title">{rm}</h3>
                                            <h6 className="stats-title text-success"><b>Rooms Occupied</b></h6>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <hr/>
                        <div className="card-footer ">
                            <div className="stats" onClick={()=>this.lunchDate(this.props.getRoomdata, this.retState)}>
                                <i className="now-ui-icons ui-1_calendar-60"></i> {moment(dateset).calendar()}
                            </div>
                        </div>
                        <div id='main1' className='card collapse' style={{zIndex:101, position:'relative'}}>
                            <div className='card-body'>
                                <ul className='list-group list-group-flush'>
                            {
                                this.props.roomdata && Array.isArray(this.props.roomdata) && this.props.roomdata[0] ? this.props.roomdata[0].filter(rw=>parseInt(rw.id) > 0).map((prp, inn)=>{
                                    return <li className='list-group-item'>{prp.name}</li>
                                }):''
                            }
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-body ">
                            <div className="statistics statistics-horizontal">
                                <div className="info info-horizontal">
                                    <div className="row">
                                        <div className="col-5">
                                            <div className="icon icon-default icon-circle">
                                                <i className="fa fa-bed"></i>
                                            </div>
                                        </div>
                                        <div className="col-7 text-right">
                                            <h3 className="info-title">{vacantno}</h3>
                                            <h6 className="stats-title"><b>Rooms Available</b></h6>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <hr/>
                        <div className="card-footer ">
                            <div className="stats" onClick={()=>this.lunchDate(this.props.getRoomdata, this.retState)}>
                                <i className="now-ui-icons ui-1_calendar-60"></i> {moment(dateset).calendar()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-body ">
                            <div className="statistics statistics-horizontal">
                                <div className="info info-horizontal">
                                    <div className="row">
                                        <div className="col-5">
                                            <div className="icon icon-primary icon-circle">
                                                <i className="fa fa-bed"></i>
                                            </div>
                                        </div>
                                        <div className="col-7 text-right">
                                            <h3 className="info-title">{roomsout}</h3>
                                            <h6 className="stats-title text-danger"><b>Rooms Out of Service</b></h6>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <hr/>
                        <div className="card-footer ">
                            <div className="stats" onClick={()=>this.lunchDate(this.props.getRoomdata, this.retState)}>
                                <i className="now-ui-icons ui-1_calendar-60"></i> {moment(dateset).calendar()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({ 
    user:state.userReducer.user,
    roomdata:state.roomtypeReducer.roomdata,
    roomanalysis:state.roomcategoryReducer.roomanalysis,
  })
export default connect(mapStateToProps, {getRoomdata})(RoomWidget);