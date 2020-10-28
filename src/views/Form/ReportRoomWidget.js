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
const convertdays = (time) =>{
        let ys = parseInt(time)/( 60 * 60 * 30 * 24 * 12);
        let y = Math.floor(ys);
        let mts = (ys - y) * 12;
        let mt = Math.floor(mts);
        let ds = (mts - mt) * 30;
        let d = Math.floor(ds);
        let hs = (ds - d) * 24;
        let h  = Math.floor(hs);
        let ms = (hs - h) * 60;
        let m = Math.floor(ms);
        let ss = (ms - m) * 60;
        let s = Math.floor(ss);

        let dates = y > 0 ? y > 1 ? y + 'yrs ' :  y + 'yr  ' : '';
        dates += mt > 0 ? mt > 1 ? mt + 'mths ' :  mt + 'mth' : '';
        dates += d > 0 ? d > 1 ? d + 'days ' :  d + 'day' : '';
        dates += h > 0 ? h > 1 ? h + 'hrs ' :  h + 'hr ' : '';
        dates += m > 0 ? m > 1 ? m + 'mins ' :  m + 'min ' : '';
        dates += s > 0 ? s > 1 ? s + 'secs' :  s + 'sec' : '';

        return dates;
    }

let tabl ='';
console.log(data);
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
                <td style={{padding:'1px', margin:'0px'}}>{lockz[prop.locationid]}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.categoryname}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.name}</td>
                <td style={{padding:'1px', margin:'0px', textTransform:'capitalize'}}>{prop.fullname}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.phone}</td>
                <td style={{padding:'1px', margin:'0px'}}>{convertdays(prop.duration)}</td>
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
                <td style={{padding:'1px', margin:'0px'}}>{lockz[prop.locationid]}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.categoryname}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.name}</td>
                <td style={{padding:'1px', margin:'0px', textTransform:'capitalize'}}>{prop.fullname}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.phone}</td>
                <td style={{padding:'1px', margin:'0px'}}>{moment(prop.transaction_date).format('DD/MM/YYYY hh:mm:ss')}</td>
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
                <td style={{padding:'1px', margin:'0px'}}>{lockz[prop.locationid]}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.categoryname}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.name}</td>
            </tr>
      }
    }):''
}
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
                <td style={{padding:'1px', margin:'0px'}}>{lockz[prop.locationid]}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.categoryname}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.name}</td>
                <td style={{padding:'1px', margin:'0px', textTransform:'capitalize'}}>{prop.fullname}</td>
                <td style={{padding:'1px', margin:'0px'}}>{prop.phone}</td>
                <td style={{padding:'1px', margin:'0px'}}>{convertdays(prop.duration)}</td>
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
        <ModalHeader toggle={resetdata}><i className='fa fa-wrench'></i> {title}{' '}<small>{moment(date).format('DD MMMM YYYY')}</small></ModalHeader>
        <ModalBody >
        <Container>
        <table width='100%' className=" table table-bordered table-striped" id="myTable">
            <thead>
            {grp == 1 ?
                <tr style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>LOCATION</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>HOUSE</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>ROOM</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>GUEST NAME</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>PHONE</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>RES. TIME</th>
                </tr>
              :''}
            {grp == 2 ?
                <tr style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>LOCATION</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>HOUSE</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>ROOM</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>GUEST NAME</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>PHONE</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>BOOKED</th>
                </tr>
              :''}
            {grp == 3 ?
                <tr style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>LOCATION</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>HOUSE</th>
                    <th style={{fontSize:'0.9em', fontFamily:'Tahoma', fontWeight:'bolder', lineHeight:'110%'}}>ROOM</th>
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
