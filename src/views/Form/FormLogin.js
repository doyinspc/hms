import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Redirect, NavLink } from 'react-router-dom';
import { userLogin } from '../../actions/user';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText,  Input, Col } from 'reactstrap';
import Select  from 'react-select';

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState(null);
  const [passwd, setPasswd] = useState(null);
  useEffect(() => {
    if(props.st === true){
         setModal(true);
    }
   

  },[props.st])

  const resetdata= async() =>{
    props.handleClose();
  }

 // const toggle = () => setModal(!modal);
  
  
  const handleSubmit = (e) =>{
        e.preventDefault();
        let fd = new FormData();
        fd.append('username', username);
        fd.append('password', passwd);
        fd.append('cat', 'login');
        fd.append('table', 'user_types');
        props.userLogin(fd);
        resetdata();
  }

  

  
  return (
    <div>
      <Modal isOpen={modal} fade  style={{backgroundColor:'transparent !important'}} backdrop='static' keyboard={false}>
        <ModalHeader toggle={resetdata}><i className='fa fa-lock'></i> Login</ModalHeader>
        <ModalBody>
        <Form>
          <FormGroup row>
          <Col sm={12}>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fa fa-user"></i></div>
              </div>
              <Input 
                      type="text" 
                      name="username" 
                      id="username" 
                      placeholder='Employment ID' 
                      required
                      defaultValue={username}
                      onChange={e=>setUsername(e.target.value)} 
                      />
            </div>
          </Col>
          </FormGroup>
          <FormGroup row>
          <Col sm={12}>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fa fa-lock"></i></div>
              </div>
              <Input 
                      type="password" 
                      name="passwd" 
                      id="username" 
                      placeholder='Password' 
                      required
                      defaultValue={passwd}
                      onChange={e=>setPasswd(e.target.value)} 
                      />
            </div>
          </Col>
          </FormGroup>
            
          
        </Form>
        </ModalBody>
        <ModalFooter>
          
          <Button color="warning" onClick={resetdata}>Cancel</Button> {' '}
          <Button color='info' onClick={handleSubmit}>Log In</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    user:state.userReducer.user,
    roomcategorys:state.roomcategoryReducer,
    roomtypes:state.roomtypeReducer
  })
  
export default connect(mapStateToProps, { userLogin })(Modals)
