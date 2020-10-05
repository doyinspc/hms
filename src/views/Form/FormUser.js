import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerInventorytype, updateInventorytype } from '../../actions/inventorytype';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText,  Input, Col } from 'reactstrap';
import Select  from 'react-select';

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [categoryid, setCategoryid] = useState({});
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [options, setOptions] = useState({});
  const [cats, setCats] = useState(false);

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
     populate(props.inventorytypes.inventorytype);  
    }
    if(props.st1 && parseInt(props.st1) > 0)
    {
      let se = props.inventorycategorys.inventorycategorys && Array.isArray(props.inventorycategorys.inventorycategorys) ? props.inventorycategorys.inventorycategory.filter(rw=>parseInt(rw.id) === parseInt(props.st1))[0]  : [] ;
      let ar = {'value':props.st1, 'label':se.name};
      setCategoryid(ar);
      setCats(true);
     }else
     {
      let se = props.inventorycategorys.inventorycategorys && Array.isArray(props.inventorycategorys.inventorycategorys) ? props.inventorycategorys.inventorycategorys  : [] ;
      let newArrs = se.map(element => {
      let ar = {};
      ar['value'] = element.id;
      ar['label'] = element.name;
      return ar;
    });
    setOptions(newArrs);
    }
    
    

},[props.mid, props.st1, props.st]);

  const handleSubmit = (e) =>{
        e.preventDefault();
      
        let fd = new FormData();
        fd.append('name', name);
        fd.append('description', description);
        fd.append('categoryid', categoryid.value);
        fd.append('table', 'inventory_types');
        
        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateInventorytype(fd);
        }else{
          fd.append('cat', 'insert');
          props.registerInventorytype(fd);
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
        <ModalHeader toggle={resetdata}><i className='fa fa-bed'></i> Inventorys</ModalHeader>
        <ModalBody>
        <Form>
        {!cats ? <FormGroup row>
        <Col sm={12}>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="fa fa-hospital-o"></i></div>
              </div>
              <Col sm={11}>
                <Select
                  styles = { customStyles }
                  value={categoryid}
                  onChange={handleCate}
                  options={options}
                  autoFocus={true}
                />
                <FormText></FormText>
                </Col> 
            </div>
          </Col>
            </FormGroup>:<h2>{categoryid.label}</h2>}
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
    inventorycategorys:state.inventorycategoryReducer,
    inventorytypes:state.inventorytypeReducer
  })
  
export default connect(mapStateToProps, { registerInventorytype, updateInventorytype })(Modals)
