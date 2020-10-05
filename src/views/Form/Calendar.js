import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerBooking, updateBooking } from './../../actions/booking';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input, Col, Container, Row } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import Select  from 'react-select';
import { MAIN_TOKEN, API_PATHS, axiosConfig, callError } from './../../actions/common';
import "assets/css/mine.css";
import { createNull } from 'typescript';

const path = API_PATHS;
const ses = [
  {'value':'First Term', 'label':'First Term'},
  {'value':'Second Term', 'label':'Second Term'},
  {'value':'Third Term', 'label':'Third Term'},
  {'value':'Admission', 'label':'Admission'}
];
const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [activemonth, setActivemonth] = useState(0);
  const [activeyear, setActiveyear] = useState(0);
  

  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    setModal(true);
    if(parseInt(props.mid) > 0)
    {
     setId(parseInt(props.mid));
    }
    let dt = new Date();
    let yrs = dt.getFullYear();
    let mts = dt.getMonth();
    setActivemonth(mts);
    setActiveyear(yrs);
    let fulltitle = props.data.categoryname+' '+props.data.name
    setTitle(fulltitle)
},[props.mid])

const resetdata = () =>{
    props.handleClose();
}

const onNext=()=>{
    let cmonth = activemonth;
    let cyear = activeyear;
    let nmonth = activemonth;
    let nyear = activeyear;
    if(cmonth === 12)
    {
        nyear = cyear + 1;
        nmonth = 1;
    }else
    {
        nyear = cyear;
        nmonth = cmonth + 1
    }
    setActivemonth(nmonth);
    setActiveyear(nyear);
}

const onPrev=()=>{
    let cmonth = activemonth;
    let cyear = activeyear;
    let nmonth = activemonth;
    let nyear = activeyear;
    if(cmonth === 1)
    {
        nyear = cyear - 1;
        nmonth = 12;
    }else
    {
        nyear = cyear;
        nmonth = cmonth - 1
    }
    setActivemonth(nmonth);
    setActiveyear(nyear);
}

const calendarArray = (yr, mt) =>{
    let dt = new Date();
    let numOfDays = new Date(yr, mt, 0).getDate() ;
    let firstday = new Date(yr, mt, 1).getDay();
    let lastday = new Date(yr, mt + 1, 0).getDay();
    let totaldays = numOfDays + firstday;
    let noOfWeeks = Math.ceil(totaldays / 7);
    let offset = numOfDays - totaldays + 1;
    let days = {};
    for(let i = 0; i < noOfWeeks; ++i)
    {
        let b = {};
            for(let j = 0 ; j < 7; ++j)
            {
                let ar = {
                    'wk':i,
                    'dy':j,
                    'year':yr,
                    'month':mt,
                    'ds': offset++,
                    'dt':new Date(yr, mt, offset).toDateString(),
                    'dx':new Date(yr, mt, offset).getDate()
                }
                b[j] = ar;
            }
            days[i] = b;
    }
    return days;
}

let arrr = calendarArray(activeyear, activemonth);

let d = [0, 1, 2, 3, 4].map((prop, ind)=>{
     return <tr>
            { 
                [0, 1, 2, 3, 4, 5, 6].map((prop1, ind1)=>{
                    return <td 
                            className="tablerow"
                            onClick={()=>props.handleBooking(props.mid, props.data, arrr[prop][prop1]['dt'], null)}>
                        <div>
                          <b>{arrr[prop][prop1]['dx']}</b>
                        </div>
                        <div className='m-0 p-0' style={{width:'100%', fontSize:'0.8em', minHeight:'80%'}}>
                        </div>
                    </td>
                })
            }
     </tr>

});
  return (
    <div>
      <Modal isOpen={modal} size='lg'  toggle={toggle} backdrop='static' keyboard={false}>
        <ModalHeader toggle={resetdata} xs='12'>
            <Container xs='12' style={{width:'500px'}} >
                <Row xs='12'>
                <Col xs='2' class="pull-right" style={{margin:'0px', top:'0px'}}>
                    <div class="dropdown" style={{margin:'0px', padding:'0px', marginLeft:'5px',  marginTop:'-18px'}}>
                    <button type="button" class=" m-0 p-0 btn btn-round btn-icon dropdown-toggle btn-outline-default no-caret" data-toggle="dropdown">
                        <i class="now-ui-icons loader_gear m-0 p-0"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="#" onClick={()=>this.setState({ostate:1})}>Maintenance</a>
                    <a class="dropdown-item" href="#" onClick={()=>this.setState({ostate:2})}>Housekeeping</a>
                    </div>
                    </div>
                    </Col>
                    <Col xs='10' class="pull-right" style={{margin:'0px', top:'0px'}}>
                    <Row xs='12'>{title}</Row>
                    <Row xs='12'><small>{moment(new Date(activeyear, activemonth, 1)).format('MMMM YYYY')}</small></Row>
                    </Col>
                    

                </Row>
                </Container>
            </ModalHeader>
        <ModalBody>
            <Container>
            <table width='100%' border='2px'>
                <thead>
                    <tr>
                        <td className='calenderHeader'>Mon</td>
                        <td className='calenderHeader'>Tues</td>
                        <td className='calenderHeader'>Wed</td>
                        <td className='calenderHeader'>Thu</td>
                        <td className='calenderHeader'>Fri</td>
                        <td className='calenderHeader'>Sat</td>
                        <td className='calenderHeader'>Sun</td>
                    </tr>
                </thead>
                <tbody>
                    {d}
                </tbody>

            </table>
            </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onPrev}>Previos</Button>{" "}
          <Button color="secondary" onClick={resetdata}>Cancel</Button>{" "}
          <Button color="primary" onClick={onNext}>Next</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    booking: state.bookingReducer.booking,
    user:state.userReducer.user,
    roomcategorys:state.roomcategoryReducer.roomcategorys,
    rooms:state.roomReducer.rooms,
  })
  
export default connect(mapStateToProps, { registerBooking, updateBooking})(Modals)
