import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import { deleteMaintenancetransaction, registerMaintenancetransaction, updateMaintenancetransaction, getMaintenancetransactions, getMaintenancetransaction } from '../../actions/maintenancetransaction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText,  Input, Col, Label, Container } from 'reactstrap';
import Select  from 'react-select';
import { callError, axiosConfig, axiosConfig1, MAIN_TOKEN, API_PATHS, alllocations} from 'actions/common';

import $ from 'jquery'; 
const lockz = alllocations;
const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
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
    setDate(props.date);
    setData(props.data);
    setGrp(props.grp);
},[props.st, props.date, props.data, props.title]);
  


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
const loadComplete=(id) =>{

}
const editRow =(id, data)=>{
   props.getMaintenancetransaction(id);
   props.editMaintenance(id, data);
}
const deleteRow =(id, data)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this! You lose all records",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          props.deleteMaintenancetransaction({'id':id});
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}

let tabl ='';
console.log(data);
if(grp === 1 || grp === 2)
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
                <td style={{padding:'1px', margin:'0px'}}>{lockz[prop.locationid]}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.categoryname}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.name}</td>
                <td style={{padding:'1px', margin:'0px', textTransform:'capitalize'}}>{prop.fullname}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.phone}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.duration}</td>
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
                <td style={{padding:'1px', margin:'0px'}}>{prop.categoryname}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.name}</td>
            </tr>
      }
    }):''
}
  return (
    <div>
      <Modal 
      id='mainbody'  
      isOpen={modal} 
      size='lg' 
      toggle={toggle} backdrop='static' keyboard={false}>
        <ModalHeader toggle={resetdata}><i className='fa fa-wrench'></i> {title}{' '}{moment(date).format('DD MM YYYY')}</ModalHeader>
        <ModalBody >
        <Container>
        <table width='100%' className=" table table-bordered table-striped" id="myTable">
            <thead>
            {grp == 1 || grp == 2 ?
                <tr style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>LOCATION</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>HOUSE</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}} width='90px'>ROOM</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>GUEST NAME</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>PHONE</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}} width='70px'>RES</th>
                </tr>
              :''}
            {grp == 3 ?
                <tr style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>LOCATION</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>HOUSE</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}} width='90px'>ROOM</th>
                </tr>
            : ''}
            {grp == 4 ?
                <tr style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>LOCATION</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>HOUSE</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>ROOM</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>GUEST NAME</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>GUEST NO.</th>
                </tr>
             :'' }
            {grp == 5 || grp == 6 ?
                <tr style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>LOCATION</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>HOUSE</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>ROOM</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>DESCRIPTION</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>STATE</th>
                </tr>
                :''}
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
    user:state.userReducer.user,
    maintenancecategorys:state.maintenancecategoryReducer,
    maintenancetypes:state.maintenancetypeReducer,
    maintenancetransactions:state.maintenancetransactionReducer.maintenancetransactions
  })
  
export default connect(mapStateToProps, { 
   deleteMaintenancetransaction, registerMaintenancetransaction, updateMaintenancetransaction, getMaintenancetransactions, getMaintenancetransaction })(Modals)
