import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getRoomtransactions, getRoomtransaction, registerRoomtransaction, updateRoomtransaction } from './../../actions/roomtransaction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input, Col, Container, Row } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';

const Modalx = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [activemonth, setActivemonth] = useState(0);
  const [activeyear, setActiveyear] = useState(0);
  const [booking, setBooking] = useState({});
  const [datas, setDatas] = useState({});
  const [keepdate, setKeepdate] = useState([]);
  const [keeplog, setKeeplog] = useState([]);

  const toggle = () => setModal(!modal);
  useEffect(()=>{
    let arrr = calendarArray(activeyear, activemonth);
    setDatas(arrr);   
  },[activemonth, activeyear])
  useEffect(()=>{
    let rt = props.roomtransactions;
        let roomarr = {};
        rt.forEach(element => {
                //inventory, days
                if(element !== null && element !== undefined && Array.isArray(Object.keys(element)) && Object.keys(element).length > 0 ){
                let ar = {};
                    ar['name'] = element.fullname;
                    ar['rowid'] = element.id;
                    ar['islodged'] = element.is_lodged;
                if(element.roomid in roomarr)
                {
                    roomarr[element.roomid][moment(new Date(element.transaction_date)).format("YYYY-MM-DD")] = ar;
                }else
                {
                    roomarr[element.roomid] = {};
                    roomarr[element.roomid][moment(new Date(element.transaction_date)).format("YYYY-MM-DD")] = ar;
                }
            }
                
            });
        setBooking(roomarr); 
  },[props.roomtransactions])
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
    
    let numOfDays = new Date(yr, mt, 0).getDate() ;
    let firstday = new Date(yr, mt, 1).getDay();
    let lastday = new Date(yr, mt + 1, 0).getDay();
    let totaldays = numOfDays + firstday;
    let noOfWeeks = Math.ceil(totaldays / 7);
    let offset = numOfDays - totaldays + 1;
    let days = {};

    let dt0 = {
        'starts': moment(new Date(yr, mt, 1)).format("YYYY-MM-DD"),
        'ends': moment(new Date(yr, mt + 1, 0)).format("YYYY-MM-DD"),
         'roomid':id
    }
    let params = {
        data:JSON.stringify(dt0),
        cat:'roomtransaction',
        table:'room_transactions'
    }
    props.getRoomtransactions(params);
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
                    'dt':new Date(yr, mt, offset).toJSON(),
                    'dx':new Date(yr, mt, offset).getDate()
                }
                b[j] = ar;
            }
            days[i] = b;
    }
    return days;
}

const loadForm= () =>{
    props.handleBooking(props.mid, props.data, keepdate, id);
}

const removedata = () =>{

}

const selectDate = (dt, lg) =>{
    let d = [...keepdate];
    let k = [...keeplog];
    if(d.includes(dt))
    {
        let y = d.filter(rw =>rw !== dt );
        setKeepdate(y);
    }else
    {
        d.push(dt);
        setKeepdate(d);
    }

    if(lg !== 0){
            if(k.includes(lg))
            {
                let y1 = k.filter(rw =>rw !== lg );
                setKeeplog(y1);
            }else
            {
                k.push(lg);
                setKeeplog(k);
            }
        }
    
}

let d = [0, 1, 2, 3, 4].map((prop, ind)=>{
     return <tr>
            { prop in datas ?
                [0, 1, 2, 3, 4, 5, 6].map((prop1, ind1)=>{
                    return prop1 in datas[prop] ? <td 
                            key={ind1.toString() + ind.toString()}
                            style={{border : keepdate.includes(moment(new Date(datas[prop][prop1]['dt'])).format("YYYY-MM-DD")) ? '5px solid skyblue' : ''}}
                            className={ id in booking && moment(new Date(datas[prop][prop1]['dt'])).format("YYYY-MM-DD") in booking[id] && booking[id][moment(new Date(datas[prop][prop1]['dt'])).format("YYYY-MM-DD")]['islodged'] == 1 ? "tablerow1 bg-info" : "tablerow2"}
                            onClick={()=>selectDate(moment(new Date(datas[prop][prop1]['dt'])).format("YYYY-MM-DD"),  id in booking && moment(new Date(datas[prop][prop1]['dt'])).format("YYYY-MM-DD") in booking[id]  ? booking[id][moment(new Date(datas[prop][prop1]['dt'])).format("YYYY-MM-DD")]['rowid'] : 0)}>
                        <div>
                          <b>{datas[prop][prop1]['dx']}</b>
                        </div>
                        <div 
                            className='m-0 p-0' 
                            style={{
                                font :'Josefin Sans',
                                width:'100%', 
                                fontSize:'0.8em', 
                                minHeight:'80%',
                                lineHeight:'110%',
                                textAlign:'center',
                                textTransform:'capitalize',
                                fontWeight:'normal'
                                }}>
                            <b className={id in booking && moment(new Date(datas[prop][prop1]['dt'])).format("YYYY-MM-DD") in booking[id] && booking[id][moment(new Date(datas[prop][prop1]['dt'])).format("YYYY-MM-DD")]['islodged'] == 0 ? 'text-info': 'text-light'}>
                            {id in booking && moment(new Date(datas[prop][prop1]['dt'])).format("YYYY-MM-DD") in booking[id] ? booking[id][moment(new Date(datas[prop][prop1]['dt'])).format("YYYY-MM-DD")]['name'] : ''}
                            </b></div>
                    </td>: ''
                })
            :''}
     </tr>

});

let get_days_num = id in booking ?  Object.keys(booking[id]).length : 0;
let month_days = new Date(activeyear, activemonth, 0).getDate();
let occ = get_days_num >  0 ? (get_days_num/month_days) * 100 : 0;

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
  <Row xs='12'><small>{moment(new Date(activeyear, activemonth, 1)).format('MMMM YYYY')} ({Number(occ).toFixed(2)}%)</small></Row>
                    </Col>
                </Row>
                </Container>
            </ModalHeader>
        <ModalBody>
            <Container xs='12'>
                <Row xs='12' className='table-responsive'>
           <table width='100%' border='2px' style={{tableLayout:'fixed', width:'100%'}}>
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
            </Row> 
            </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onPrev}>Previos</Button>{" "}
          { keepdate.length > 0 ? <Button color="success" onClick={loadForm}>Book</Button>:''}
          { keeplog.length > 0 ? <Button color="danger" onClick={removedata}>Remove</Button>:''}
          <Button color="secondary" onClick={resetdata}>Close</Button>{" "}
          <Button color="primary" onClick={onNext}>Next</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    roomtransactions: state.roomtransactionReducer.roomtransactions,
    user:state.userReducer.user,
    roomcategorys:state.roomcategoryReducer.roomcategorys,
    rooms:state.roomReducer.rooms,
  })
  
export default connect(mapStateToProps, { getRoomtransactions, getRoomtransaction, registerRoomtransaction, updateRoomtransaction})(Modalx)
