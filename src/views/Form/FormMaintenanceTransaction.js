import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { registerMaintenancetransaction, updateMaintenancetransaction } from '../../actions/maintenancetransaction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText,  Input, Col, Label } from 'reactstrap';
import Select  from 'react-select';
import { callError, axiosConfig, MAIN_TOKEN, API_PATHS } from 'actions/common';

const statuss = [
    {'value':1, 'label':'Urgent'},
    {'value':2, 'label':'Daily'},
    {'value':3, 'label':'Weekly'},
    {'value':4, 'label':'Monthly'}
  ];


const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [categoryid, setCategoryid] = useState({});
  const [nameid, setNameid] = useState({0:'none'});
  const [status, setStatus] = useState({0:'None'});
  const [date, setDate] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(null);
  const [options, setOptions] = useState({});
  const [options1, setOptions1] = useState({});
  const [cats, setCats] = useState(false);

  const resetdata= async() =>{
    toggle();
    setId(null);
    setNameid({});
    setCategoryid({});
    setQuantity(0);
    setDate('');
    setDescription('');
    props.handleClose();
}

  const toggle = () => setModal(!modal);
  useEffect(() => {
    let params = {
        data:JSON.stringify({'categoryid':categoryid.value}),
        cat:'group',
        table:'maintenance_types',
        token:MAIN_TOKEN
      }
      axios.get(API_PATHS, {params}, axiosConfig)
        .then(res => { 
            let opt = res.data.map(row=>{
              let obs = {};
              obs['value'] = row.id;
              obs['label'] = row.name;
              return obs; 
           })
           setOptions1(opt);
        })
        .catch(err => {
            callError(err);
        })
  
   },[categoryid.value]);
  useEffect(() => {
    let params = {
        data:JSON.stringify({'maintenanceid':nameid.value}),
        cat:'groupqty',
        table:'maintenance_types',
        token:MAIN_TOKEN
      }
      axios.get(API_PATHS, {params}, axiosConfig)
        .then(res => { 
            let opt = res.data.map(row=>{
              let obs = {};
              obs['value'] = row.id;
              obs['label'] = row.name;
              return obs; 
           })
           
        })
        .catch(err => {
            //callError(err);
        })
  
   },[nameid.value]);
  useEffect(() => {
    setModal(props.st);
    if(parseInt(props.mid) > 0 )
    {
     setId(parseInt(props.mid));
     populate(props.maintenancetransactions.maintenancetransaction);  
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
    setOptions(newArrs);
    }
    
    

},[props.mid, props.st1, props.st]);
  
  const handleSubmit = (e) =>{
        e.preventDefault();
        let qty = quantity;
        if(parseFloat(status.value) === 2 || parseFloat(status.value) === 3 )
        {
          qty = quantity * -1;
        }
        let fd = new FormData();

        fd.append('description', description);
        fd.append('maintenanceid', nameid.value);
        fd.append('categoryid', categoryid.value);
        fd.append('userid', props.user.id);
        fd.append('transaction_date', date);
        fd.append('status', status.value);
        fd.append('location', location);
        fd.append('table', 'maintenance_transactions');
        
        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateMaintenancetransaction(fd);
        }else{
          fd.append('cat', 'insert');
          props.registerMaintenancetransaction(fd);
        }
        
        resetdata();
  }

  const populate = async(data) =>{
        let v = statuss.filter(rw => rw.value == data.status)[0];
        let nm = {};
        nm['value'] = data.categoryid;
        nm['label'] = data.categoryname;
        let nm1 = {};
        nm1['value'] = data.maintenanceid;
        nm1['label'] = data.maintenancename;
        let nm2 = {};
        nm2['value'] = data.status;
        nm2['label'] = v.label;
        setCategoryid(nm);
        setNameid(nm1);
        setStatus(nm2);
        setDate(data.transaction_date);
        setDescription(data.description);
        setLocation(data.location);
  }

  const handleCategory = (selected) => {
      setCategoryid( selected );
  }

  const handleMaintenance = (selected) => {
      setNameid( selected );
      
  }

  const handleStatus = (selected) => {
        setStatus( selected );
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
        <ModalHeader toggle={resetdata}><i className='fa fa-bed'></i> Maintenances Request Form</ModalHeader>
        <ModalBody>
        <Form>
        <FormGroup row>
              <Label for="category" sm={3}>Category</Label>
              <Col sm={9}>
                <Select
                  styles = { customStyles }
                  value={categoryid}
                  onChange={handleCategory}
                  options={options}
                  autoFocus={true}
                />
                <FormText></FormText>
              </Col> 
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={3}>Maintenance</Label>
              <Col sm={9}>
                <Select
                  styles = { customStyles }
                  defaultValue={nameid}
                  onChange={handleMaintenance}
                  options={options1}
                  autoFocus={true}
                />
                <FormText></FormText>
              </Col> 
            </FormGroup>
            <FormGroup row>
              <Label for="status" sm={3}>Status</Label>
              <Col sm={9}>
                <Select
                  styles = { customStyles }
                  defaultValue={status}
                  onChange={handleStatus}
                  options={statuss}
                  autoFocus={true}
                />
                <FormText></FormText>
              </Col> 
            </FormGroup>
          
          <FormGroup row>
                <Label for="date" sm={3}>Date  </Label>
                <Col sm={9}>
                <Input 
                    type="date" 
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
    maintenancecategorys:state.maintenancecategoryReducer,
    maintenancetypes:state.maintenancetypeReducer,
    maintenancetransactions:state.maintenancetransactionReducer
  })
  
export default connect(mapStateToProps, { registerMaintenancetransaction, updateMaintenancetransaction })(Modals)
