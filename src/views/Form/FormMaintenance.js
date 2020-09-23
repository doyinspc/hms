import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerMaintenancetype, updateMaintenancetype } from './../../actions/maintenancetype';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText,  Input, Col } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import Select  from 'react-select';
import { MAIN_TOKEN, API_PATHS, axiosConfig, callError } from './../../actions/common';

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
  const [categoryid, setCategoryid] = useState({});
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [cost, setCost] = useState(null);
  const [options, setOptions] = useState({'value':1, 'label':'Select'});

  const resetdata= async() =>{
    toggle();
    setId(0);
    setName('');
    setCategoryid({});
    setDescription('');
    setCost('');
    props.handleClose();
}

  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    setModal(props.st);
    if(parseInt(props.mid) > 0 )
    {
     setId(parseInt(props.mid));
     populate(props.maintenancetype.maintenancetype);  
    }
},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
      
        let fd = new FormData();
        fd.append('name', name);
        fd.append('description', description);
        fd.append('cost', cost);
        fd.append('categoryid', categoryid.value);
        fd.append('table', 'maintenance_types');
        
        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateMaintenance(fd);
        }else{
          fd.append('cat', 'insert');
          props.registerMaintenance(fd);
        }
        
        resetdata();
  }

  const populate = async(data) =>{
        let nm = {};
        nm['value'] = data.categoryid;
        nm['label'] = data.categoryname;
        setCategoryid(nm);
        setName(data.name);
        setDescription(data.description);
        setCost(data.cost);
    }
  const handleCate = (selected) => {
      setCategoryid( selected );
    }
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted orange',
        color: state.isSelected ? 'yellow' : 'black',
        backgroundColor: state.isSelected ? 'orange' : 'white',
        width:'100%'
      }),
      control: (provided) => ({
        ...provided,
        marginTop: "1%",
        width:'100%'
      })
    }

  
  let editId = id ? id : null;
  let editColor = 'primary';

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop='static' keyboard={false}>
        <ModalHeader toggle={resetdata}><i className='fa fa-bed'></i> Maintenances</ModalHeader>
        <ModalBody>
        <Form>
        <FormGroup row>
        <Col sm={12}>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="fa fa-hospital-o"></i></div>
              </div>
              <Select
                  styles = { customStyles }
                  value={categoryid}
                  onChange={handleCate}
                  options={options}
                  autoFocus={true}
                  width='100%'
                />
            </div>
          </Col>
            </FormGroup>
          <FormGroup row>
          <Col sm={12}>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="fa fa-bed"></i></div>
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
          <FormGroup row>
          <Col sm={12}>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="fa fa-euro"></i></div>
              </div>
              <Input 
                    type="text" 
                    name="cost" 
                    id="cost"  
                    placeholder='Price'
                    required
                    defaultValue={cost}
                    onChange={e=>setCost(e.target.value)} 
                     />
            </div>
          </Col>
          </FormGroup>
            
            <FormGroup row>
                <Col sm={12}>
                <Input 
                    type="textarea" 
                    name="description" 
                    id="description"  
                    placeholder="Description"
                    required
                    defaultValue={description}
                    onChange={e=>setDescription(e.target.value)} 
                     />
                </Col>
                <FormText color='mute'></FormText>
            </FormGroup>
            
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
    user:state.userReducer.user,
    maintenancetype:state.maintenancetypeReducer.maintenancetype
  })
  
export default connect(mapStateToProps, { registerMaintenancetype, updateMaintenancetype })(Modals)
