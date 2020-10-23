import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import { deleteMaintenancetransaction, registerMaintenancetransaction, updateMaintenancetransaction, getMaintenancetransactions, getMaintenancetransaction } from '../../actions/maintenancetransaction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText,  Input, Col, Label, Container } from 'reactstrap';
import Select  from 'react-select';
import { callError, axiosConfig, axiosConfig1, MAIN_TOKEN, API_PATHS } from 'actions/common';

import $ from 'jquery'; 

const statuss = [
    {'value':1, 'label':'Low'},
    {'value':2, 'label':'Normal'},
    {'value':3, 'label':'High'},
    {'value':4, 'label':'Emergency'}
  ];


const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [categoryid, setCategoryid] = useState({});
  const [data, setData] = useState({});
  const [isshown, setIsshown] = useState({});
  const [cats, setCats] = useState(false);
 //const componentRef = useRef('')
  const resetdata= async() =>{
    props.handleClose();
}

  const toggle = () => setModal(!modal);
  useEffect(() => {
    setData(props.maintenancetransactions);
  },[props.maintenancetransactions])
  useEffect(() => {
    if(parseInt(id) > 0){
    let params = {
        data:JSON.stringify({'maintenanceid':id}),
        cat:'maintenancetransaction',
        table:'maintenance_transactions'
      }
      props.getMaintenancetransactions(params)
    }
   },[id]);


   useEffect(() =>{
     //initialize datatable
    $(document).ready(function () {
      $('#myTable').DataTable();
    });
   },[])

  useEffect(() => {
    setModal(props.st);
    if(parseInt(props.mid) > 0 )
    {
     setId(parseInt(props.mid)); 
    }
    if(props.st1 && parseInt(props.st1) > 0)
    {
      let se = props.maintenancecategorys.maintenancecategorys && Array.isArray(props.maintenancecategorys.maintenancecategorys) ? props.maintenancecategorys.maintenancecategory.filter(rw=>parseInt(rw.id) === parseInt(props.st1))[0]  : [] ;
      let ar = {'value':props.st1, 'label':se.name};
      setCategoryid(ar);
      setCats(true);
     }else
     {
      let se = props.maintenancecategorys.maintenancecategorys && Array.isArray(props.maintenancecategorys.maintenancecategorys) ? props.maintenancecategorys.maintenancecategorys  : [] ;
      let newArrs = se.map(element => {
      let ar = {};
      ar['value'] = element.id;
      ar['label'] = element.name;
      return ar;
    });
   
    }
},[props.mid, props.st1, props.st]);
  


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

    

 let tabl = data && Array.isArray(data) && data.length > 0 ? data.map((prop, ind)=>{
     if(prop !== null){
     let st = statuss.filter(rw=>rw.value == prop.status)[0];
     
     return <tr 
                id={ind} 
                style={{padding:'1px', margin:'0px'}}
                onMouseEnter={()=>loadShown(prop.id, 0)}
                onMouseLeave={()=>loadShown(prop.id, 1)}
                >
                
                <td style={{padding:'1px', margin:'0px'}}>{moment(new Date(prop.transaction_date)).format("DD-MM-YYYY hh:mm:ss")}</td>
                <td style={{padding:'1px', margin:'0px'}}>
                { prop.id in isshown && isshown[prop.id] === true ? 
                    <span className='reportcontrol pull-left'>
                        <a onClick={()=>editRow(prop.id, prop)} href='#'><i className='fa fa-edit'></i></a>
                        <a onClick={()=>deleteRow(prop.id, prop)} href='#'><i className='fa fa-trash'></i></a>
                    </span>
                : ''}{prop.maintenancename}
                </td>
                
                <td style={{padding:'1px', margin:'0px'}}><a onClick={()=>loadComplete(prop.id)}><span className={prop.is_completed == 1 ? 'badge badge-success': 'badge badge-danger'}>{st.label}</span></a></td>
                <td style={{padding:'1px', margin:'0px'}}>{moment(new Date(prop.transaction_date)).fromNow()}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.username}</td>
            </tr>
 }}):''
  return (
    <div>
      <Modal 
      id='mainbody'  
      isOpen={modal} 
      size='lg' 
      toggle={toggle} backdrop='static' keyboard={false}>
        <ModalHeader toggle={resetdata}><i className='fa fa-wrench'></i> Maintenances Report</ModalHeader>
        <ModalBody >
          <h6><i className='fa fa-hotel'></i> {props.data.categoryname}{" "}{props.data.name}</h6>
          <Container>
        <table width='100%' className=" table table-bordered table-striped" id="myTable">
            <thead>
                <tr style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>REQUEST DATE</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}} width='250px'>MAINTENANCE ISSUES</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>PIORITY</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>RES.<b/> TIME</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}} width='70px'>BY</th>
                </tr>
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
