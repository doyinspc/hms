import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerRoomcategory, updateRoomcategory } from './../../actions/roomcategory';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input, Col } from 'reactstrap';
import { alllocations, alllocationsObj } from './../../actions/common'; 
import Select  from 'react-select';

const lockz = alllocations;
const lockzobject = alllocationsObj;

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState(null);
  

  const resetdata= async() =>{
    toggle();
    setId(0);
    setName('');
    props.handleClose();
}

  const toggle = () => setModal(!modal);
  useEffect(() => {
    setModal(props.st);
    if(parseInt(props.mid) > 0 )
    {
     setId(parseInt(props.mid));
     populate(props.data);  
    }
    
},[props.st]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        
        let ll = props.user.location === 3 ? location.value : props.user.location;
        let fd = new FormData();
        fd.append('name', name);
        fd.append('locationid', ll);
        fd.append('table', 'room_categorys');
        
        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateRoomcategory(fd);
        }else{
          fd.append('cat', 'insert');
          props.registerRoomcategory(fd);
        }
        
        resetdata();
  }

  const populate = async(data) =>{
        setName(data.name);
        let nm = {};
        nm['value'] = data.locationid;
        nm['label'] = lockz[data.locationid];
        setLocation(nm);
    }

     const handleCate = (selected) => {
      setLocation( selected );
    }
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted green',
        color: state.isSelected ? 'yellow' : 'black',
        backgroundColor: state.isSelected ? 'green' : 'white'
      }),
      control: (provided) => ({
        ...provided,
        marginTop: "1%",
      })
    }

  
  let editId = id ? id : null;
  let editColor = 'primary';

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop='static' keyboard={false}>
        <ModalHeader toggle={resetdata}><i className='fa fa-hospital-o'></i> House</ModalHeader>
        <ModalBody>
        <Form>
          <FormGroup row>
          <Col sm={12}>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="fa fa-hospital-o"></i></div>
              </div>
              <Input 
                      type="text" 
                      name="name" 
                      id="name" 
                      placeholder='Name' 
                      required
                      defaultValue={name}
                      onChange={e=>setName(e.target.value)} 
                      />
            </div>
          </Col>
          </FormGroup>
          {props.user.location === 3 ? <FormGroup row>
           <Col sm={12}>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="fa fa-location"></i></div>
              </div>
              <Col sm={11}>
                <Select
                  styles = { customStyles }
                  value={location}
                  onChange={handleCate}
                  options={lockzobject}
                  autoFocus={true}
                />
                <FormText></FormText>
                </Col> 
            </div>
          </Col>
            </FormGroup>:<h2>{lockz[props.user.location]}</h2>}
            
            
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color={editColor} onClick={handleSubmit}>{editId ? 'Edit' : 'Submit'}</Button>{' '}
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    user:state.userReducer,
    roomcategorys:state.roomcategoryReducer
  })
  
export default connect(mapStateToProps, { registerRoomcategory, updateRoomcategory })(Modals)
