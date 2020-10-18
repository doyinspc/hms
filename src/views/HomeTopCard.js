import React from "react";
import {connect} from "react-redux";
import { Card, CardFooter, CardBody, Container } from 'reactstrap';
import CardHeader from "reactstrap/lib/CardHeader";
import DateRangePickers from "./Form/DateRangePicker";
import Calendars from './Form/Calendar'
import {Row, Col } from 'reactstrap';
import { updateRoomtype } from './../actions/roomtype';
import "assets/css/mine.css";
import FormMaintenanceTransaction from "./Form/FormMaintenanceTransaction";
import FormMaintenancetransactionReport from "./Form/FormMaintenancetransactionReport";

class TopCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            fid:false,
            tid:false,
            id:null,
            data:{},
            trid:false,
            rid:null,
            rdata:{}
        }

    }
    lunchCalendar=(id, data)=>{
        this.setState({
            fid:true,
            id:id,
            data:data
        })
    }
    lunchRequest=(id, data)=>{
        this.setState({
            tid:true,
            id:null,
            data:data,
            loc:id
        })
    }
    lunchReport=(id, data)=>{
        this.setState({
            trid:true,
            rid:id,
            rdata:data
        })
    }
    lunchLock=(id, data)=>{
        let fd = new FormData();
        fd.append('id', id);
        fd.append('is_active', parseInt(data.is_active) === 1 ? 0 : 1);
        fd.append('cat', 'update');
        fd.append('table', 'room_types');
        this.props.updateRoomtype(fd);
    }
    lunchAddRoom=(id, data)=>{
        this.setState({
            fid:true,
            id:id,
            data:data
        })
    }
    render() {
        let room = this.props.roomtypes;
        let house = this.props.roomcategorys;
        let arr = Array.isArray(house) && house.length > 0 ? house.filter(rr=>parseInt(rr.is_active) === 0).map((prp, inn)=>{
        return <Col xs='12'  key={inn}><h6 className='subtitle'>{prp.name}</h6>
        <div className='d-flex flex-wrap align-items-center'>
        {room && Array.isArray(room) && room.length > 0 ? room.filter(rw=>rw.categoryid == prp.id).map((prop, ind)=>{
        return <><div
                key={ind}
                data-toggle='collapse'
                data-target={`#w${prop.id}`}
                className='col-md-2 m-2 p-2 '
                style={{
                    width:'200px',
                    paddingBlock:'4px',
                    border: '2px solid #ccc',
                    backgroundColor: prop.is_active == 1 ? 'red':'white',
                    color: prop.is_active == 1 ? 'white' : 'black'
                }}
                >
                <div id={`w${prop.id}`} className='collapse floatblock' >
                    <ul className='floatlink'>
                        <a onClick={()=>this.lunchCalendar(prop.id, prop)} href="#"><li>Booking</li></a>
                        <a onClick={()=>this.lunchRequest(prop.id, prop)} href="#"><li>Maintenance Request</li></a>
                        <a onClick={()=>this.lunchReport(prop.id, prop)} href="#"><li>Maintenance Report</li></a>
                        <a onClick={()=>this.lunchLock(prop.id, prop)} href="#"><li>Lock/Unlock Room</li></a>
                    </ul>
                </div>
                <b className='pull-right'>{prop.name}</b>
            </div>
            </>
        }):''
            }<hr/></div></Col>
            }) :'';
        return (
            <>
            {this.state.fid ?<Calendars
                st={this.state.fid}
                mid={this.state.id}
                data={this.state.data}
                handleBooking={(roomid, roomdata, roomdate, id)=>this.props.handleBooking(roomid, roomdata, roomdate, id)}
                handleClose={()=>this.setState({fid:false, id:null, data:{}})}
                />:''}
            {this.state.tid ? <FormMaintenanceTransaction
                st={this.state.tid}
                mid={this.state.id}
                loc={this.state.loc}
                data={this.state.data}
                handleBooking={(roomid, roomdata, roomdate, id)=>this.props.handleBooking(roomid, roomdata, roomdate, id)}
                handleClose={()=>this.setState({tid:false, id:null, data:{}})}
                />:''}
             {this.state.trid ? <FormMaintenancetransactionReport
                st={this.state.trid}
                mid={this.state.rid}
                data={this.state.rdata}
                editMaintenance={(rid, rdata)=>this.setState({tid:true, id:rid, data:rdata})}
                handleClose={()=>this.setState({trid:false, rid:null, rdata:{}})}
                />:''}
             <Card>
                 <CardHeader>
                     <Row sm='12'>
                         <Col xs='9'>
                        <h2><i className={this.props.icon}></i> {this.props.title} <a href='#' data-target='#dt' data-toggle="collapse"><small>{new Date().toDateString()}</small></a></h2>  
                        </Col>  
                        <Col xs='3' row>
                            <a href='#' data-toggle='collapse' data-target='#dx'><i className='fa fa-bed h4 my-2 mx-1'></i></a>
                            <a href='#' data-toggle='collapse' data-target='#dt'><i className='fa fa-calendar h4 my-2 mx-1'></i></a>
                            <a href='#' onClick={()=>window.print()}><i className='fa fa-print h4 my-2 mx-1'></i></a>
                            <a href='#' onClick={()=>window.print()}><i className='fa fa-share-alt h4 my-2 mx-1'></i></a>
                        </Col>                  
                    </Row>

                 </CardHeader>
                 <CardBody id='dx' className='collapse'>
                     <Container>
                         <Row sm='12' className='flex'>
                             
                             {arr}
                             
                         </Row>
                         <button  className="btn btn-sm my-0 py-0 mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.lunchAddRoom()}><i className="now-ui-icons ui-1_simple-add"></i></button>
                    </Container>
                 </CardBody>
                 <CardFooter id='dt' className='collapse'>
                    <DateRangePickers setDate={(start, end)=>{this.props.setDate(start, end)}}/>
                 </CardFooter>
             </Card>
            </>
        )
    }
}

const mapStateToProps = (state) =>({
    roomtypes:state.roomtypeReducer.roomtypes,
    roomcategorys:state.roomcategoryReducer.roomcategorys
})
export default connect(mapStateToProps, 
  {
    updateRoomtype
    })(TopCard);