import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { registerRoommaintenance, updateRoommaintenance } from '../../actions/roommaintenance';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText,  Input, Col, Label } from 'reactstrap';
import Select  from 'react-select';
import { callError, axiosConfig, MAIN_TOKEN, API_PATHS } from 'actions/common';


const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null)
  const [date, setDate] = useState(moment(new Date()).format('DD/MM/YYYY hh:mm:ss'));
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(null);

  const resetdata= async() =>{
    toggle();
    setId(null);
    setDate('');
    setDescription('');
    props.handleClose();
}

  const toggle = () => setModal(!modal);
 
  useEffect(() => {
    setModal(props.st);
    if(parseInt(props.mid) > 0 )
    {
      setId(parseInt(props.mid));
      populate(props.roommaintenances.roommaintenance);  
    }
    if(props.dt && props.dt != null)
    {
       setDate(moment(new Date(props.dt)).format('DD/MM/YYYY hh:mm:ss'))
    }
    setLocation(parseInt(props.loc));

},[props.mid, props.dt]);
  
  const handleSubmit = (e) =>{
        e.preventDefault();
        
        let fd = new FormData();

        fd.append('description', description);
        fd.append('transaction_date', date);
        fd.append('locationid', location);
        fd.append('table', 'room_maintenance');
        
        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateRoommaintenance(fd);
        }else{
          fd.append('cat', 'insert');
          props.registerRoommaintenance(fd);
        }
        
        resetdata();
  }

  const populate = async(data) =>{
        setDate(data.transaction_date);
        setDescription(data.description);
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
        <ModalHeader toggle={resetdata}><i className='fa fa-wrench'></i> Housekeeping Form</ModalHeader>
        <ModalBody>
          <h6><i className='fa fa-hotel'></i> {props.data.categoryname}{" "}{props.data.name}</h6>
        <Form>
          <FormGroup row>
                <Label for="date" sm={3}>Date  </Label>
                <Col sm={9}>
                <Input 
                    type="datetime-local" 
                    name="date" 
                    id="date"
                    defaultValue={date}
                    onChange={e=>setDate(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col sm={12}>
                <Input 
                    type="textarea" 
                    name="description" 
                    id="description"  
                    placeholder="Describe activit(ies)"
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
          <Button color={editColor} onClick={handleSubmit}>{editId ? 'Edit' : 'Room out of order !'}</Button>{' '}
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
    roommaintenances:state.roommaintenanceReducer
  })
  
export default connect(mapStateToProps, { registerRoommaintenance, updateRoommaintenance })(Modals)
