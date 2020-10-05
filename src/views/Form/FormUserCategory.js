import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUsercategory, updateUsercategory } from './../../actions/usercategory';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input, Col } from 'reactstrap';


const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  

  const resetdata= async() =>{
    toggle();
    setId(0);
    setName('');
    setDescription('');
    props.handleClose();
}

  const toggle = () => setModal(!modal);
  useEffect(() => {
    setModal(props.st);
    if(parseInt(props.mid) > 0 )
    {
     setId(parseInt(props.mid));
     populate(props.usercategorys.usercategory);  
    }
    
},[props.st]);

  const handleSubmit = (e) =>{
        e.preventDefault();
      
        let fd = new FormData();
        fd.append('name', name);
        fd.append('description', description);
        fd.append('table', 'user_categorys');
        
        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateUsercategory(fd);
        }else{
          fd.append('cat', 'insert');
          props.registerUsercategory(fd);
        }
        
        resetdata();
  }

  const populate = async(data) =>{
        setName(data.name);
        setDescription(data.description);
    }

    
  
  let editId = id ? id : null;
  let editColor = 'primary';

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop='static' keyboard={false}>
        <ModalHeader toggle={resetdata}><i className='fa fa-hospital-o'></i> User Categories</ModalHeader>
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
    usercategorys:state.usercategoryReducer
  })
  
export default connect(mapStateToProps, { registerUsercategory, updateUsercategory })(Modals)
