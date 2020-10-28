import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import { deleteMaintenancetransaction, registerMaintenancetransaction, updateMaintenancetransaction, getMaintenancetransactions, getMaintenancetransaction } from '../../actions/maintenancetransaction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText,  Input, Col, Label, Container } from 'reactstrap';
import Select  from 'react-select';
import { callError, axiosConfig, axiosConfig1, MAIN_TOKEN, API_PATHS, alllocations, statuss} from 'actions/common';
import ReportMaintenanceDetails from './ReportMaintenanceDetails.js';
import $ from 'jquery'; 
const lockz = alllocations;
const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [sid, setSid] = useState(false);
  const [title, setTitle] = useState('');
  const [titles, setTitles] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [data, setData] = useState({});
  const [grp, setGrp] = useState({});
  const [isshown, setIsshown] = useState({});
 //const componentRef = useRef('')
  const resetdata= async() =>{
    props.handleClose();
}

  const toggle = () => setModal(!modal);
 
  

  useEffect(() => {
    setModal(props.st);
    setTitle(props.title);
    setStart(props.start);
    setEnd(props.end);
    setData(props.data);
    setGrp(props.grp);
},[props.st, props.start, props.end, props.data, props.title]);
  
const loadShown = (id, cat) =>{
    let ar = {};
    if(cat === 0)
    {
        ar[id] = true;
    }else{
        ar[id] = false;
    }
    setIsshown(ar);
}

const detailCategory = (cat, start, end, catname)=>{
    let datas={
       'locationid': props.user.location,
        'categoryid':cat,
        'starts': moment(new Date(start)).format('YYYY-MM-DD'),
        'ends': moment(new Date(end)).format('YYYY-MM-DD')
    }
     let params = {
        data:JSON.stringify(datas),
        cat:'maint1',
        table:'maintenance_transactions'
      }
      props.getMaintenancetransactions(params)
      setTitles(catname);
      setSid(true);
}
const detailPiority = (cat, start, end, catname)=>{
      let datas={
        'locationid': props.user.location,
        'status':cat,
        'starts': moment(new Date(start)).format('YYYY-MM-DD'),
        'ends': moment(new Date(end)).format('YYYY-MM-DD')
    }
    let params = {
        data:JSON.stringify(datas),
        cat:'maint2',
        table:'maintenance_transactions'
      }
      props.getMaintenancetransactions(params);
      setTitles(catname);
      setSid(true);
}
const detailState = (cat, start, end, catname)=>{
      let datas={
        'locationid': props.user.location,
        'is_completed':cat,
        'starts': moment(new Date(start)).format('YYYY-MM-DD'),
        'ends': moment(new Date(end)).format('YYYY-MM-DD')
    }
    let params = {
        data:JSON.stringify(datas),
        cat:'maint3',
        table:'maintenance_transactions'
      }
      props.getMaintenancetransactions(params);
      setTitles(catname);
      setSid(true);
}


let tabl ='';
if(grp === 1)
{
     tabl = data && Array.isArray(data) && data.length > 0 ? data.map((prop, ind)=>{
     if(prop !== null)
     {
         return <tr 
                id={ind} 
                style={{padding:'1px', margin:'0px'}}
                onMouseEnter={()=>loadShown(prop.id, 0)}
                onMouseLeave={()=>loadShown(prop.id, 1)}
                >
                <td style={{padding:'1px', margin:'0px'}}><a onClick={()=>detailCategory(prop.categoryid, start, end, prop.categoryname)}>{prop.categoryname}</a></td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.num}</td>
            </tr>
      }
    }):''
}
if(grp === 2)
{
     tabl = data && Array.isArray(data) && data.length > 0 ? data.map((prop, ind)=>{
     if(prop !== null)
     {
         return <tr 
                id={ind} 
                style={{padding:'1px', margin:'0px'}}
                onMouseEnter={()=>loadShown(prop.id, 0)}
                onMouseLeave={()=>loadShown(prop.id, 1)}
                >
                <td style={{padding:'1px', margin:'0px'}}><a onClick={()=>detailPiority(prop.status, start, end, statuss[prop.status])}>{statuss[prop.status]}</a></td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.num}</td>
            </tr>
      }
    }):''
}

if(grp === 3)
{
     tabl = data && Array.isArray(data) && data.length > 0 ? data.map((prop, ind)=>{
     if(prop !== null)
     {
         return <tr 
                id={ind} 
                style={{padding:'1px', margin:'0px'}}
                onMouseEnter={()=>loadShown(prop.id, 0)}
                onMouseLeave={()=>loadShown(prop.id, 1)}
                >
                <td style={{padding:'1px', margin:'0px'}}><a onClick={()=>detailState(prop.is_completed, start, end, parseInt(prop.is_completed) === 0 ? 'Not Completed' : 'Completed')}>{parseInt(prop.is_completed) === 0 ? 'Not Completed' : 'Completed' }</a></td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.num}</td>
            </tr>
      }
    }):''
}

  return (
    <div>
    {sid ?
            <ReportMaintenanceDetails
                st={sid}
                title={title +" : "+titles}
                start={start}
                end={end}
                handleClose={()=>setSid(false)}
                />:''}
      <Modal 
      id='mainbody'  
      isOpen={modal} 
      size='lg' 
      toggle={toggle} backdrop='static' keyboard={false}>
        <ModalHeader toggle={resetdata}><i className='fa fa-wrench'></i> {title}{' '}<br/><small>{moment(start).format('DD MMMM YYYY')}{' TO '}{moment(end).format('DD MMMM YYYY')}</small></ModalHeader>
        <ModalBody >
        <Container>
        <table width='100%' className=" table table-bordered table-striped" id="myTable">
            <thead>
            {grp == 1 ?
                <tr style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>CATEGORY</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>NO. OF ISSUES</th>
                </tr>
              :''}
            {grp == 2 ?
                <tr style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>PIORITY</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>NO. OF ISSUES</th>
                </tr>
              :''}
            {grp == 3 ?
                <tr style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>STATE</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>NO. OF ISSUES</th>
                </tr>
            : ''}
               </thead>
            <tbody style={{fontSize:'0.8em', lineHeight:'100%', fontFamily: 'Tahoma', padding:'1px'}}>
            {tabl}
            </tbody>
            

        </table>
        </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
          
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    user:state.userReducer,
    maintenancecategorys:state.maintenancecategoryReducer,
    maintenancetypes:state.maintenancetypeReducer,
    maintenancetransactions:state.maintenancetransactionReducer.maintenancetransactions
  })
  
export default connect(mapStateToProps, { 
   deleteMaintenancetransaction, registerMaintenancetransaction, updateMaintenancetransaction, getMaintenancetransactions, getMaintenancetransaction })(Modals)
