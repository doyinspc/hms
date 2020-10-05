import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerRoom, updateRoom } from '../../actions/room';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText,  Input, Col } from 'reactstrap';
import Select  from 'react-select';

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [categoryid, setCategoryid] = useState({});
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [options, setOptions] = useState({});

  const resetdata= async() =>{
    toggle();
    setId(0);
    setName('');
    setCategoryid({});
    setDescription('');
    props.handleClose();
}

  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    setModal(props.st);
    if(parseInt(props.mid) > 0 )
    {
     setId(parseInt(props.mid));
     populate(props.roomcategorys.roomcategory);  
    }

    let se = props.roomcategory && Array.isArray(props.roomcategory) ? props.roomcategory  : [] ;
    let newArrs = se.map(element => {
      let ar = {};
      ar['value'] = element.id;
      ar['label'] = element.name;
      return ar;
    });
    
    setOptions(newArrs);
    console.log(newArrs);

},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
      
        let fd = new FormData();
        fd.append('name', name);
        fd.append('description', description);
        fd.append('categoryid', categoryid.value);
        fd.append('table', 'rooms');
        
        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateRoom(fd);
        }else{
          fd.append('cat', 'insert');
          props.registerRoom(fd);
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
    }
  const handleCate = (selected) => {
      setCategoryid( selected );
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
        <ModalHeader toggle={resetdata}><i className='fa fa-tasks'></i> Inventory Report</ModalHeader>
        <ModalBody>
        
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
    roomcategory:state.roomcategoryReducer.roomcategorys
  })
  
export default connect(mapStateToProps, { registerRoom, updateRoom })(Modals)
