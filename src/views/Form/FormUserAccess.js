import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { registerUsertype, updateUsertype } from '../../actions/usertype';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText,  Input, Col, Label, Container } from 'reactstrap';
import Select  from 'react-select';
import { callError } from 'actions/common';


const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [access0, setAccess0] = useState([]);
  const [access1, setAccess1] = useState([]);
  const [access2, setAccess2] = useState([]);
  const [access3, setAccess3] = useState([]);
  const [access4, setAccess4] = useState([]);

  const resetdata= async() =>{
    toggle();
    setId('');
    props.handleClose();
}

  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    setModal(props.st);
    if(parseInt(props.mid) > 0 )
    {
     setId(parseInt(props.mid));
     let d = props.data.access !== '' && props.data.access !== null && props.data.access !== undefined ? JSON.parse(props.data.access):[[],[],[],[],[],[]];
     
     setAccess0(d[0]);
      setAccess1(d[1]);
      setAccess2(d[2]);
      setAccess3(d[3]);
      setAccess4(d[4]);
    }

},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
      
        let fd = new FormData();
        let accc = [access0, access1, access2, access3, access4]
        let ac= JSON.stringify(accc);
        fd.append('access', ac);
        fd.append('table', 'user_types');
        
        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateUsertype(fd);
        }
        resetdata();
  }
  

  const handleChange0 = (e) =>{
    let ch = e.target.checked;
    let va = parseInt(e.target.value);
    let acc = [...access0];
    if(ch){acc.push(va); setAccess0(acc)}
    else{let aco = acc.filter(rw=>rw === va); setAccess0(aco)}
}

const handleChange1 = (e) =>{
    let ch = e.target.checked;
    let va = parseInt(e.target.value);
    let acc = [...access1];
    if(ch){acc.push(va); setAccess1(acc)}
    else{let aco = acc.filter(rw=>rw === va); setAccess1(aco)}
}

const handleChange2 = (e) =>{
    let ch = e.target.checked;
    let va = parseInt(e.target.value);
    let acc = [...access2];
    if(ch){acc.push(va); setAccess2(acc)}
    else{let aco = acc.filter(rw=>rw === va); setAccess2(aco)}
}

const handleChange3 = (e) =>{
    let ch = e.target.checked;
    let va = parseInt(e.target.value);
    let acc = [...access3];
    if(ch){acc.push(va); setAccess3(acc)}
    else{let aco = acc.filter(rw=>rw === va); setAccess3(aco)}
}

const handleChange4 = (e) =>{
    let ch = e.target.checked;
    let va = parseInt(e.target.value);
    let acc = [...access4];
    if(ch){acc.push(va); setAccess4(acc)}
    else{let aco = acc.filter(rw=>rw === va); setAccess4(aco)}
}

  
  let editId = id ? id : null;
  let editColor = 'primary';

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop='static' keyboard={false}>
        <ModalHeader toggle={resetdata}><i className='fa fa-user'></i> Staff Data</ModalHeader>
        <ModalBody>
        <Form>
<div class="accordion" id="accordionExample">
  <div class="card z-depth-0 bordered">
    <div class="card-header my-0 py-0" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link my-0 py-1" type="button" data-toggle="collapse" data-target="#collapseOne"
          aria-expanded="true" aria-controls="collapseOne">
          Guest
        </button>
      </h5>
    </div>
    <div id="collapseOne" class="collapse" aria-labelledby="headingOne"
      data-parent="#accordionExample">
      <div class="card-body">
          <Container style={{backgroundColor:'#cff'}}>
        <table width='100%'>
            <tr>
                <th>All</th>
                <td><input type='checkbox' defaultChecked={access0.includes(0) ? 'checked' : ''} value='0' onClick={handleChange0} /></td>
            </tr>
            <tr>
                <th>Veiw Report</th>
                <td><input type='checkbox' defaultChecked={access0.includes(5) || access0.includes(0) ? 'checked' : ''}value='5' onClick={handleChange0}/></td>
            </tr>
            <tr>
                <th>Send Message</th>
                <td><input type='checkbox' defaultChecked={access0.includes(6) || access0.includes(0) ? 'checked' : ''} value='6' onClick={handleChange0}/></td>
            </tr>
        </table>
        </Container>
      </div>
    </div>
  </div>
  <div class="card z-depth-0 bordered">
    <div class="card-header my-0 py-0" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed my-0 py-1" type="button" data-toggle="collapse"
          data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Booking
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
      <Container style={{backgroundColor:'#cff'}}>
        <table width='100%'>
            <tr>
                <th>All</th>
                <td><input type='checkbox' defaultChecked={access1.includes(0) || access1.includes(0) ? 'checked' : ''} value='0' onClick={handleChange1}/></td>
                </tr>
                <tr><th>Add</th>
                <td><input type='checkbox' defaultChecked={access1.includes(1) || access1.includes(0) ? 'checked' : ''} value='1' onClick={handleChange1}/></td>
                </tr>
                <tr><th>Edit</th>
                <td><input type='checkbox' defaultChecked={access1.includes(2) || access1.includes(0) ? 'checked' : ''} value='2' onClick={handleChange1}/></td>
                </tr>
                <tr><th>Delete</th>
                <td><input type='checkbox' defaultChecked={access1.includes(3) || access1.includes(0) ? 'checked' : ''} value='3' onClick={handleChange1}/></td>
                </tr>
                <tr><th>Report</th>
                <td><input type='checkbox' defaultChecked={access1.includes(4) || access1.includes(0) ? 'checked' : ''} value='4' onClick={handleChange1}/></td>
                </tr>
        </table>
            </Container>
      </div>
    </div>
  </div>
  <div class="card z-depth-0 bordered">
    <div class="card-header my-0 py-0" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed my-0 py-1" type="button" data-toggle="collapse"
          data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Inventory
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">
      <Container style={{backgroundColor:'#cff'}}>
        <table width='100%'>
            <tr>
                <th>All</th>
                <td><input type='checkbox' defaultChecked={access2.includes(0) || access2.includes(0) ? 'checked' : ''} value='0' onClick={handleChange2}/></td>
            </tr>
            <tr>
                <th>Manage Category</th>
                <td><input type='checkbox' defaultChecked={access2.includes(1) || access2.includes(0) ? 'checked' : ''} value='1' onClick={handleChange2}/></td>
            </tr>
            <tr>
                <th>Manage Item</th>
                <td><input type='checkbox' defaultChecked={access2.includes(2) || access2.includes(0) ? 'checked' : ''} value='2' onClick={handleChange2}/></td>
            </tr>
            <tr>
                <th>Add</th>
                <td><input type='checkbox' defaultChecked={access2.includes(3) || access2.includes(0) ? 'checked' : ''} value='3' onClick={handleChange2}/></td>
            </tr>
            <tr>
                <th>Edit</th>
                <td><input type='checkbox' defaultChecked={access2.includes(4) || access2.includes(0) ? 'checked' : ''} value='4' onClick={handleChange2}/></td>
            </tr>
            <tr>
                <th>Delete</th>
                <td><input type='checkbox' defaultChecked={access2.includes(5) || access2.includes(0) ? 'checked' : ''} value='5' onClick={handleChange2}/></td>
            </tr>
            <tr>
                <th>Veiw Report</th>
                <td><input type='checkbox' defaultChecked={access2.includes(6) || access2.includes(0) ? 'checked' : ''} value='6' onClick={handleChange2}/></td>
            </tr>
        </table>
        </Container>
      </div>
    </div>
  </div>
  <div class="card z-depth-0 bordered">
    <div class="card-header my-0 py-0" id="headingFour">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed my-0 py-1" type="button" data-toggle="collapse"
          data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          Maintenance
        </button>
      </h5>
    </div>
    <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
      <div class="card-body">
      <Container style={{backgroundColor:'#cff'}}>
      <table width='100%'>
            <tr>
                <th>All</th>
                <td><input type='checkbox' defaultChecked={access3.includes(0) || access3.includes(0) ? 'checked' : ''} value='0' onClick={handleChange3}/></td>
            </tr>
            <tr>
                <th>Manage Category</th>
                <td><input type='checkbox' defaultChecked={access3.includes(1) || access3.includes(0) ? 'checked' : ''} value='1' onClick={handleChange3}/></td>
            </tr>
            <tr>
                <th>Manage Item</th>
                <td><input type='checkbox' defaultChecked={access3.includes(2) || access3.includes(0) ? 'checked' : ''} value='2' onClick={handleChange3}/></td>
            </tr>
            <tr>
                <th>Add</th>
                <td><input type='checkbox' defaultChecked={access3.includes(3) || access3.includes(0) ? 'checked' : ''} value='3' onClick={handleChange3}/></td>
            </tr>
            <tr>
                <th>Edit</th>
                <td><input type='checkbox' defaultChecked={access3.includes(4) || access3.includes(0) ? 'checked' : ''} value='4' onClick={handleChange3}/></td>
            </tr>
            <tr>
                <th>Delete</th>
                <td><input type='checkbox' defaultChecked={access3.includes(5) || access3.includes(0) ? 'checked' : ''} value='5' onClick={handleChange3}/></td>
            </tr>
            <tr>
                <th>Veiw Report</th>
                <td><input type='checkbox' defaultChecked={access3.includes(6) || access3.includes(0) ? 'checked' : ''} value='6' onClick={handleChange3}/></td>
            </tr>
        </table>
        </Container>
      
      </div>
    </div>
  </div>
  <div class="card z-depth-0 bordered">
    <div class="card-header my-0 py-0" id="headingSix">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed my-0 py-1" type="button" data-toggle="collapse"
          data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
          Staff
        </button>
      </h5>
    </div>
    <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
      <div class="card-body">
      <Container style={{backgroundColor:'#cff'}}>
      <table width='100%'>
            <tr>
                <th>All</th>
                <td><input type='checkbox' defaultChecked={access4.includes(0) || access4.includes(0) ? 'checked' : ''} value='0' onClick={handleChange4}/></td>
            </tr>
            <tr>
                <th>Manage Category</th>
                <td><input type='checkbox' defaultChecked={access4.includes(1) || access4.includes(0) ? 'checked' : ''} value='1' onClick={handleChange4}/></td>
            </tr>
            <tr>
                <th>Manage Item</th>
                <td><input type='checkbox' defaultChecked={access4.includes(2) || access4.includes(0) ? 'checked' : ''} value='2' onClick={handleChange4}/></td>
            </tr>
            <tr>
                <th>Add</th>
                <td><input type='checkbox' defaultChecked={access4.includes(3) || access4.includes(0) ? 'checked' : ''} value='3' onClick={handleChange4}/></td>
            </tr>
            <tr>
                <th>Edit</th>
                <td><input type='checkbox' defaultChecked={access4.includes(4) || access4.includes(0) ? 'checked' : ''} value='4' onClick={handleChange4}/></td>
            </tr>
            <tr>
                <th>Delete</th>
                <td><input type='checkbox' defaultChecked={access4.includes(5) || access4.includes(0) ? 'checked' : ''} value='5' onClick={handleChange4}/></td>
            </tr>
            <tr>
                <th>Veiw Report</th>
                <td><input type='checkbox' defaultChecked={access4.includes(6) || access4.includes(0) ? 'checked' : ''} value='6' onClick={handleChange4}/></td>
            </tr>
        </table>
        </Container>
      
      </div>
    </div>
  </div>
  
</div>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color={editColor} onClick={handleSubmit}>Submit</Button>{' '}
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    user:state.userReducer.user,
    usercategorys:state.usercategoryReducer,
    usertypes:state.usertypeReducer
  })
  
export default connect(mapStateToProps, { registerUsertype, updateUsertype })(Modals)
