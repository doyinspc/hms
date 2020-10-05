import React from "react";
import {connect} from "react-redux";
import { Card, CardFooter, CardBody, Container } from 'reactstrap';
import CardHeader from "reactstrap/lib/CardHeader";
import DateRangePickers from "./Form/DateRangePicker";
import Calendars from './Form/Calendar'
import {Row, Col } from 'reactstrap';

class TopCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            fid:false,
            id:null,
            data:{}
        }

    }
    lunchCalendar=(id, data)=>{
        this.setState({
            fid:true,
            id:id,
            data:data
        })
    }
    render() {
        let room = this.props.roomtypes;
        let arr = room.map((prop, ind)=>{
            return <div
                        key={ind}
                        onClick={()=>this.lunchCalendar(prop.id, prop)}
                        className='col-md-2 m-2 p-2'
                        style={{
                            width:'200px',
                            paddingBlock:'4px',
                            border: '2px solid #ccc',
                            backgroundColor: prop.is_active == 1 ? 'red':'white',
                            color: prop.is_active == 1 ? 'white' : 'black'
                        }}
                    >
                    {prop.categoryname}{' '}<b className='pull-right'>{prop.name}</b>
                    </div>

        })
        return (
            <>
            {this.state.fid ?<Calendars
                st={this.state.fid}
                mid={this.state.id}
                data={this.state.data}
                handleBooking={(roomid, data, datebooked, NULL)=>this.props.handleBooking(roomid, data, datebooked, NULL)}
                handleClose={()=>this.setState({fid:false, id:null, data:{}})}
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
                         <Row sm='12' className='d-flex flex-wrap align-items-center'>
                             
                             {arr}
                             
                         </Row>
                    
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
    roomtypes:state.roomtypeReducer.roomtypes
})
export default connect(mapStateToProps, 
  {
    
    })(TopCard);