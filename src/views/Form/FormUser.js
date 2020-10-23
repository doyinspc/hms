import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { registerUsertype, updateUsertype } from '../../actions/usertype';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText,  Input, Col, Label } from 'reactstrap';
import Select  from 'react-select';
import { callError } from 'actions/common';

const statuss = [
  {'value':1, 'label':'Male'},
  {'value':2, 'label':'Female'},
  {'value':3, 'label':'Others'}
];
const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [categoryid, setCategoryid] = useState({});
  const [employment_no, setEmployment_no] = useState('');
  const [passwd, setPasswd] = useState('');
  const [rpasswd, setRpasswd] = useState('');
  const [passcolor, setPasscolor] = useState('');
  const [title, setTitle] = useState('');
  const [surname, setSurname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [gender, setGender] = useState({});
  const [dob, setDob] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [doe, setDoe] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [office, setOffice] = useState('');
  const [options, setOptions] = useState({});
  const [cats, setCats] = useState(false);

  const resetdata= async() =>{
    toggle();
    setId('');
    setCategoryid({});
    setEmployment_no('');
    setTitle('');
    setSurname('');
    setFirstname('');
    setMiddlename('');
    setGender('');
    setDob('');
    setDoe('');
    setPhone1('');
    setPhone2('');
    setEmail('');
    setAddress('');
    setOffice('');
    props.handleClose();
}

  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    setModal(props.st);
    if(parseInt(props.mid) > 0 )
    {
     setId(parseInt(props.mid));
     populate(props.usertypes.usertype);  
    }
    if(props.st1 && parseInt(props.st1) > 0)
    {
      let se = props.usercategorys.usercategorys && Array.isArray(props.usercategorys.usercategorys) ? props.usercategorys.usercategorys.filter(rw=>parseInt(rw.id) === parseInt(props.st1))[0]  : [] ;
      let ar = {'value':props.st1, 'label':se.name};
      setCategoryid(ar);
      setCats(true);
     }else
     {
      let se = props.usercategorys.usercategorys && Array.isArray(props.usercategorys.usercategorys) ? props.usercategorys.usercategorys  : [] ;
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
        fd.append('title', title);
        fd.append('surname', surname);
        fd.append('firstname', firstname);
        fd.append('middlename', middlename);
        fd.append('employment_no', employment_no);
        fd.append('dob', dob);
        fd.append('doe', doe);
        fd.append('gender', gender.value);
        fd.append('phone1', phone1);
        fd.append('phone2', phone2);
        fd.append('email', email);
        fd.append('address', address);
        fd.append('office', office);
        fd.append('categoryid', categoryid.value);
        fd.append('table', 'user_types');
        
        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateUsertype(fd);
        }else{
          if(passwd && passwd === rpasswd)
          {
            fd.append('cat', 'insert');
            fd.append('passwd', passwd);
            props.registerUsertype(fd);
          }else
          {
            callError('Passwords do not match');
          }
        }
        
        resetdata();
  }

  const populate = async(data) =>{
        
        let nm = {};
        nm['value'] = data.categoryid;
        nm['label'] = data.categoryname;
        let v = statuss.filter(rw => rw.value == data.status)[0];
        let nm1 = {};
        nm1['value'] = data.gender;
        nm1['label'] = v.label;
        setCategoryid(nm);
        setEmployment_no(data.employment_no);
        setTitle(data.title);
        setSurname(data.surname);
        setFirstname(data.firstname);
        setMiddlename(data.middlename);
        setGender(nm1);
        setDob(data.dob);
        setDoe(data.doe);
        setPhone1(data.phone1);
        setPhone2(data.phone2);
        setEmail(data.email);
        setAddress(data.address);
        setOffice(data.office);
    }
  const handleCate = (selected) => {
      setCategoryid( selected );
    }
  const handleGender = (selected) => {
      setGender( selected );
    }
  const changeRpasswd=(rpa)=>{
    setRpasswd(rpa);
    if(rpa === passwd)
    {
        setPasscolor('is-valid');
    }else
    {
        setPasscolor('is-invalid');
    }
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
        <ModalHeader toggle={resetdata}><i className='fa fa-user'></i> Staff Data</ModalHeader>
        <ModalBody>
        <Form>
        <FormGroup row>
                <Label for="employment_no" sm={12}>Employment Number<span className='text-danger'>*</span> </Label>
                <Col sm={12}>
                <Input 
                    type="text" 
                    name="employment_no" 
                    id="employment_no"
                    className='form-control form-control-sm'
                    required
                    defaultValue={employment_no}
                    onChange={e=>setEmployment_no(e.target.value)} 
                     />
                </Col>
            </FormGroup>
        { id && parseInt(id) > 0 ? '' : <><FormGroup row>
                <Label for="passwd" sm={12}>Password<span className='text-danger'>*</span> </Label>
                <Col sm={12}>
                <Input 
                    type="password" 
                    name="passwd" 
                    id="passwd"
                    required
                    defaultValue={passwd}
                    className={`form-control form-control-sm ${passcolor}`}
                    onChange={e=>setPasswd(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="rpasswd" sm={12}>Repeat Password<span className='text-danger'>*</span> </Label>
                <Col sm={12}>
                <Input 
                    type="text" 
                    name="rpasswd" 
                    id="rpasswd"
                    required
                    defaultValue={rpasswd}
                    className={`form-control form-control-sm ${passcolor}`}
                    onChange={e=>changeRpasswd(e.target.value)} 
                     />
                </Col>
            </FormGroup><hr/></>}

        {!cats ? <FormGroup row>
        <Col sm={12}>
                <Select
                  styles = { customStyles }
                  value={categoryid}
                  onChange={handleCate}
                  options={options}
                  autoFocus={true}
                />
                <FormText></FormText>
          </Col>
            </FormGroup>:<h4>{categoryid.label} Department</h4>}
            
            <FormGroup row>
                <Label for="title" sm={12}>Title </Label>
                <Col sm={12}>
                <Input 
                    type="text" 
                    name="title" 
                    id="title"
                    defaultValue={title}
                    onChange={e=>setTitle(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="surname" sm={12}>Surname<span className='text-danger'>*</span> </Label>
                <Col sm={12}>
                <Input 
                    type="text" 
                    name="surname" 
                    id="surname"
                    required
                    defaultValue={surname}
                    onChange={e=>setSurname(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="firstname" sm={12}>Firstname<span className='text-danger'>*</span> </Label>
                <Col sm={12}>
                <Input 
                    type="text" 
                    name="firstname" 
                    id="firstname"
                    required
                    defaultValue={firstname}
                    onChange={e=>setFirstname(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="middlename" sm={12}>Middlename</Label>
                <Col sm={12}>
                <Input 
                    type="text" 
                    name="middlename" 
                    id="middlename"
                    defaultValue={middlename}
                    onChange={e=>setMiddlename(e.target.value)} 
                     />
                </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="gender" sm={12}>Gender</Label>
              <Col sm={12}>
                <Select
                  styles = { customStyles }
                  defaultValue={gender}
                  onChange={handleGender}
                  options={statuss}
                  autoFocus={true}
                />
                <FormText></FormText>
              </Col> 
            </FormGroup>
          
          <FormGroup row>
                <Label for="dob" sm={12}>Date of Birth<span className='text-danger'>*</span> </Label>
                <Col sm={12}>
                <Input 
                    type="date" 
                    name="dob" 
                    id="dob"
                    required
                    defaultValue={dob}
                    onChange={e=>setDob(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="doe" sm={12}>Date of Employment<span className='text-danger'>*</span> </Label>
                <Col sm={12}>
                <Input 
                    type="date" 
                    name="doe" 
                    id="doe"
                    required
                    defaultValue={doe}
                    onChange={e=>setDoe(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="phone1" sm={12}>Phone Number.<span className='text-danger'>*</span> </Label>
                <Col sm={12}>
                <Input 
                    type="text" 
                    name="phone1" 
                    id="phone1"
                    required
                    defaultValue={phone1}
                    onChange={e=>setPhone1(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="phone2" sm={12}>Alternative. Phone Number. </Label>
                <Col sm={12}>
                <Input 
                    type="text" 
                    name="phone2" 
                    id="phone2"
                    defaultValue={phone2}
                    onChange={e=>setPhone2(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label for="email" sm={12}>Email<span className='text-danger'>*</span> </Label>
                <Col sm={12}>
                <Input 
                    type="email" 
                    name="email" 
                    id="email"
                    required
                    defaultValue={email}
                    onChange={e=>setEmail(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="office" sm={12}>Designation</Label>
                <Col sm={12}>
                <Input 
                    type="text" 
                    name="office" 
                    id="office"
                    defaultValue={office}
                    onChange={e=>setOffice(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Col sm={12}>
                <Input 
                    type="textarea" 
                    name="address" 
                    id="address"  
                    placeholder="House Address"
                    required
                    defaultValue={address}
                    onChange={e=>setAddress(e.target.value)} 
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
    usercategorys:state.usercategoryReducer,
    usertypes:state.usertypeReducer
  })
  
export default connect(mapStateToProps, { registerUsertype, updateUsertype })(Modals)
