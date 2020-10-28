import React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import Swal from "sweetalert2";
import { getRoomdata } from "./../../actions/roomtype";
import ReportRoomWidget from "./../Form/ReportRoomWidget";
import $ from 'jquery';
class RoomWidget extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            roomsoccupied:0,
            roomsavailable: 0,
            roomsout:0,
            dateset:new Date(),
            fid:false,
            title:'',
            data:{},
            date:'',
            grp:''
        }
    }

    componentDidMount(){
        let p = {'locationid':this.props.user.location, 'currentdate':moment(new Date()).format('YYYY-MM-DD')};
        let params = {
            data:JSON.stringify(p),
            cat:'roomsta',
            table:'room_types'
        }
        this.props.getRoomdata(params);
    }
    componentDidUpdate(prevProps){
        if(prevProps.user.location !== this.props.user.location)
        {
            let p = {'locationid':this.props.user.location, 'currentdate':moment(new Date()).format('YYYY-MM-DD')};
            let params = {
                data:JSON.stringify(p),
                cat:'roomsta',
                table:'room_types'
            }
            this.props.getRoomdata(params);
       }
    }
    retState = (dt) =>{
        this.setState({dateset:new Date(dt)})
    }
    lunchDate = (func, func1, locs) =>{
        Swal.fire({
            title: 'pick a date:',
            type: 'question',
            html: '<input id="datepicker" type="date"  class="swal2-input form-control">',
            customClass: 'swal2-overflow',
            
          }).then(function(result) {
              if(result.value){
                  let v = $('#datepicker').val();
                  let params = {
                    data:JSON.stringify({'currentdate':moment(new Date(v)).format('YYYY-MM-DD'), 'locationid':locs}),
                    cat:'roomsta',
                    table:'room_types'
                }
                func(params);
                func1(v);
              }
          });    
    }

    showOccupied = (data, date) =>{
        this.setState({
            fid:true,
            title:'Rooms Occupied',
            data:data,
            date:date,
            grp:1
        })
    }
    showBooked = (data, date) =>{
        this.setState({
            fid:true,
            title:'Rooms Booked',
            data:data,
            date:date,
            grp:2
        })
    }
    showAvailable = (data, date) =>{
        this.setState({
            fid:true,
            title:'Rooms Available',
            data:data,
            date:date,
            grp:3
        })
    }
    showGuest = (data, date) =>{
        this.setState({
            fid:true,
            title:'Guest List',
            data:data,
            date:date,
            grp:4
        })
    }
    showService = (data, date) =>{
        this.setState({
            fid:true,
            title:'Rooms Out of Service',
            data:data,
            date:date,
            grp:5
        })
    }
    showOrder = (data, date) =>{
        this.setState({
            fid:true,
            title:'Rooms Out of Order',
            data:data,
            date:date,
            grp:6
        })
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
        let vacantno = vacant.length - rm;

        //ALL ROOMS OUT OF ORDER
        let rm3 = this.props.roomdata && Array.isArray(this.props.roomdata) && this.props.roomdata[2] ? this.props.roomdata[2] : [] ;
        let vacant3 = rm3.filter((rw)=>!isarray.includes(rw.id));
        let vacantno3 = vacant3.length;

        //ALL OUT OF ORDER
        let rm4 = this.props.roomdata && Array.isArray(this.props.roomdata) && this.props.roomdata[3] ? this.props.roomdata[3] : [] ;
        let outofservice = Array.isArray(rm4) && rm4.length > 0 ? rm4[0] : {'ids':0};
        let oos = 'ids' in outofservice && parseInt(outofservice['ids']) > 0 ? parseInt(outofservice['ids']) : 0;
        let oospers = 78;

        //GET ROOMS OCCUPIDE
        let islodged = rm1.filter(rw=>parseInt(rw.is_lodged) === 1);
        let inhouseno = islodged.length;

        //GET ROOMS OCCUPIDE
        let guestno1 = rm1.filter(rw=>parseInt(rw.is_lodged) === 1).map((prp, inp) =>{return prp.guestno});
        let guestno = guestno1.reduce((a, b)=> a + parseInt(b), 0);
        
        let allrm = vacant.length;
        let rmpers = Number((rm/allrm) * 100).toFixed(0);
        let inhousenopers = Number((inhouseno/allrm) * 100).toFixed(0);
        let vacantnopers = Number((vacantno/allrm) * 100).toFixed(0);

        return (
            <>
             {this.state.fid ?<ReportRoomWidget
                st={this.state.fid}
                title={this.state.title}
                data={this.state.data}
                date={this.state.date}
                grp={this.state.grp}
                handleClose={()=>this.setState({
                    fid:false, 
                    title:'',
                    grp:'', 
                    data:{},
                    date:''
                })}
                />:''}
            <div className="row">
                <div className="col-lg-4 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-header pull-right mb-0 pb-0" >
                     <div class="dropdown">
                        <a class="no-caret" data-toggle="dropdown">
                            <i className="fa fa-ellipsis-v "></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item" onClick={()=>this.lunchDate(this.props.getRoomdata, this.retState, this.props.user.location)} href="#">
                          <i className="now-ui-icons ui-1_calendar-60"></i> {moment(dateset).calendar()}</a>
                          <a class="dropdown-item" onClick={()=>this.showOccupied(rm1, dateset)} href="#">
                          <i className="now-ui-icons design_bullet-list-67"></i> Report</a>
                        </div>
                        </div>
                        </div>
                        <div 
                        className="card-body container  my-auto py-auto text-center justify-content-center align-items-center" 
                        style={{minHeight:'170px', lineHeight:'80%', display:'flex', flexDirection:'column'}}>
                            <h2 className='mx-auto px-auto text-success align-self-center' style={{padding:'0px', margin:'0px', fontSize:'4.4em'}}>{inhouseno}</h2>
                            <h4 className='mx-auto px-auto text-default align-self-center'style={{fontSize:'1.3em', padding:'0px', margin:'0px', fontFamily:'Bree Serif'}}>ROOMS OCCUPIED</h4>
                        </div>
                        <hr className='my-0'/>
                        <div className="card-footer my-0 py-1" style={{ fontFamily:'Josefin Sans'}}>
                            Percentege Occupied : {inhousenopers}%
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
                <div className="col-lg-4 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-header pull-right mb-0 pb-0" >
                     <div class="dropdown">
                        <a class="no-caret" data-toggle="dropdown">
                            <i className="fa fa-ellipsis-v "></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item" onClick={()=>this.lunchDate(this.props.getRoomdata, this.retState, this.props.user.location)} href="#">
                          <i className="now-ui-icons ui-1_calendar-60"></i> {moment(dateset).calendar()}</a>
                          <a class="dropdown-item" onClick={()=>this.showBooked(rm, dateset)} href="#">
                          <i className="now-ui-icons design_bullet-list-67"></i> Report</a>
                        </div>
                        </div>
                        </div>
                        <div 
                        className="card-body container  my-auto py-auto text-center justify-content-center align-items-center" 
                        style={{minHeight:'170px', lineHeight:'80%', display:'flex', flexDirection:'column'}}>
                            <h2 className='mx-auto px-auto align-self-center' style={{padding:'0px', margin:'0px', fontSize:'4.4em', color:'teal'}}>{rm}</h2>
                            <h4 className='mx-auto px-auto text-default align-self-center'style={{fontSize:'1.3em', padding:'0px', margin:'0px', fontFamily:'Bree Serif'}}>ROOMS BOOKED</h4>
                        </div>
                        <hr className='my-0'/>
                        <div className="card-footer my-0 py-1" style={{ fontFamily:'Josefin Sans'}}>
                            Percentage Booked : {rmpers}%
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
                <div className="col-lg-4 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-header pull-right mb-0 pb-0" >
                     <div class="dropdown">
                        <a class="no-caret" data-toggle="dropdown">
                            <i className="fa fa-ellipsis-v "></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item" onClick={()=>this.lunchDate(this.props.getRoomdata, this.retState, this.props.user.location)} href="#">
                          <i className="now-ui-icons ui-1_calendar-60"></i> {moment(dateset).calendar()}</a>
                          <a class="dropdown-item" onClick={()=>this.showAvailable(rm, dateset)} href="#">
                          <i className="now-ui-icons design_bullet-list-67"></i> Report</a>
                        </div>
                        </div>
                        </div>
                        <div 
                        className="card-body container  my-auto py-auto text-center justify-content-center align-items-center" 
                        style={{minHeight:'170px', lineHeight:'80%', display:'flex', flexDirection:'column'}}>
                            <h2 className='mx-auto px-auto text-info align-self-center' style={{padding:'0px', margin:'0px', fontSize:'4.4em'}}>{vacantno}</h2>
                            <h4 className='mx-auto px-auto text-default align-self-center'style={{fontSize:'1.3em', padding:'0px', margin:'0px', fontFamily:'Bree Serif'}}>ROOMS AVAILABLE</h4>
                        </div>
                        <hr className='my-0'/>
                        <div className="card-footer my-0 py-1" style={{ fontFamily:'Josefin Sans'}}>
                            Percentage Available : {vacantnopers}%
                        </div>
                       
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-header pull-right mb-0 pb-0" >
                     <div class="dropdown">
                        <a class="no-caret" data-toggle="dropdown">
                            <i className="fa fa-ellipsis-v "></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item" onClick={()=>this.lunchDate(this.props.getRoomdata, this.retState)} href="#">
                          <i className="now-ui-icons ui-1_calendar-60"></i> {moment(dateset).calendar()}</a>
                          <a class="dropdown-item" onClick={()=>this.showGuest(rm, dateset)} href="#">
                          <i className="now-ui-icons design_bullet-list-67"></i> Report</a>
                        </div>
                        </div>
                        </div>
                        <div 
                        className="card-body container  my-auto py-auto text-center justify-content-center align-items-center" 
                        style={{minHeight:'170px', lineHeight:'80%', display:'flex', flexDirection:'column'}}>
                            <h2 className='mx-auto px-auto text-warning align-self-center' style={{padding:'0px', margin:'0px', fontSize:'4.4em'}}>{guestno}</h2>
                            <h4 className='mx-auto px-auto text-default align-self-center' style={{fontSize:'1.3em', padding:'0px', margin:'0px', fontFamily:'Bree Serif'}}>INHOUSE</h4>
                        </div>
                        <hr className='my-0'/>
                        <div className="card-footer my-0 py-1" style={{ fontFamily:'Josefin Sans'}}>
                            Total Guest : {guestno}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-header pull-right mb-0 pb-0" >
                     <div class="dropdown">
                        <a class="no-caret" data-toggle="dropdown">
                            <i className="fa fa-ellipsis-v "></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item" onClick={()=>this.lunchDate(this.props.getRoomdata, this.retState, this.props.user.location)} href="#">
                          <i className="now-ui-icons ui-1_calendar-60"></i> {moment(dateset).calendar()}</a>
                          <a class="dropdown-item" onClick={()=>this.showService(rm, dateset)} href="#">
                          <i className="now-ui-icons design_bullet-list-67"></i> Report</a>
                        </div>
                        </div>
                        </div>
                        <div 
                        className="card-body container  my-auto py-auto text-center justify-content-center align-items-center" 
                        style={{minHeight:'170px', lineHeight:'80%', display:'flex', flexDirection:'column'}}>
                            <h2 className='mx-auto px-auto text-danger align-self-center' style={{padding:'0px', margin:'0px', fontSize:'4.4em'}}>{vacantno3}</h2>
                            <h4 className='mx-auto px-auto text-default align-self-center'style={{fontSize:'1.3em', padding:'0px', margin:'0px', fontFamily:'Bree Serif'}}>OUT OF SERVICE</h4>
                        </div>
                        <hr className='my-0'/>
                        <div className="card-footer my-0 py-1" style={{ fontFamily:'Josefin Sans'}}>
                            Current rooms out of commission : {vacantno3}%
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
                <div className="col-lg-4 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-header pull-right mb-0 pb-0" >
                     <div class="dropdown">
                        <a class="no-caret" data-toggle="dropdown">
                            <i className="fa fa-ellipsis-v "></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item" onClick={()=>this.lunchDate(this.props.getRoomdata, this.retState)} href="#">
                          <i className="now-ui-icons ui-1_calendar-60"></i> {moment(dateset).calendar()}</a>
                          <a class="dropdown-item" onClick={()=>this.showOrder(rm, dateset)} href="#">
                          <i className="now-ui-icons design_bullet-list-67"></i> Report</a>
                        </div>
                        </div>
                        </div>
                        <div 
                        className="card-body container  my-auto py-auto text-center justify-content-center align-items-center" 
                        style={{minHeight:'170px', lineHeight:'80%', display:'flex', flexDirection:'column'}}>
                            <h2 className='mx-auto px-auto text-primary align-self-center' style={{padding:'0px', margin:'0px', fontSize:'4.4em'}}>{oos}</h2>
                            <h4 className='mx-auto px-auto text-default align-self-center'style={{fontSize:'1.3em', padding:'0px', margin:'0px', fontFamily:'Bree Serif'}}>ROOMS OUT OF ORDER</h4>
                        </div>
                        <hr className='my-0'/>
                        <div className="card-footer my-0 py-1" style={{ fontFamily:'Josefin Sans'}}>
                            Percentage : {oospers}%
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
            </div>

            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({ 
    user:state.userReducer,
    roomdata:state.roomtypeReducer.roomdata,
    roomanalysis:state.roomcategoryReducer.roomanalysis,
  })
export default connect(mapStateToProps, {getRoomdata})(RoomWidget);