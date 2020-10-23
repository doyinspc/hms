import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerRoomtransaction, updateRoomtransaction } from './../../actions/roomtransaction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input, Col } from 'reactstrap';
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
  const [surname, setSurname] = useState('');
  const [fullname, setFullname] = useState('');
  const [startbook, setStartbook] = useState(null);
  const [startbooks, setStartbooks] = useState([]);
  const [endbook, setEndbook] = useState(null);
  const [guestno, setGuestno] = useState(new Date());
  const [roomid, setRoomid] = useState(new Date());
  const [description, setDescription] = useState(null);
  const [ispaid, setIspaid] = useState(null);
  const [islodged, setIslodged] = useState(null);
  const [phone, setPhone] = useState(null);
  const [idtype, setIdtype] = useState(null);
  const [idnumber, setIdnumber] = useState(null);
  const [cate, setCate] = useState([]);
  const [cateid, setCateid] = useState(null);
  const [isdates, setIsdates] = useState(0);
  const [roomoption, setRoomoption] = useState([]);

  const resetdata= async() =>{
    toggle();
    setId(0);
    setSurname();
    setFullname();
    setPhone();
    setStartbook('');
    setEndbook('');
    setGuestno('');
    setRoomid('');
    setDescription();
    setIspaid(null);
    setIslodged(null);
    props.handleClose();
}

  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    setModal(true);
    if(parseInt(props.mid) > 0  )
    {
     setId(parseInt(props.mid));
     populate(props.roomtransaction);
    }
    let se = props.roomcategory && Array.isArray(props.roomcategory) ? props.roomcategory  : [] ;
    let newArrs = [];
    se.forEach(element => {
      let ar = {};
      ar['value'] = element.id;
      ar['lable'] = element.name;
      newArrs.push(ar);
    });

    //SET ROOM
    if(props.roomid && parseInt(props.roomid) > 0)
    {
      let er = {};
      er.value = props.roomid;
      er.label = props.roomdata.name;
      setRoomid(er);
    }
    
    if(props.roomdate && Array.isArray(props.roomdate) && props.roomdate.length > 0)
    {
      setStartbooks(props.roomdate);
      setIsdates(2);
    }
    else if(props.roomdate && props.roomdate !== "" && props.roomdate != null && !Array.isArray(props.roomdate))
    {
      setStartbook(moment(props.roomdate).format("YYYY-MM-DD hh:mm:ss"));
      setIsdates(1);
    }
   
    setCate(newArrs);
},[props.mid]);

  useEffect(() => {
    let d = props.room_types && Array.isArray(props.room_types) ? props.room_types : [];
    let r = d.filter(r=>r.categoryid === cateid)
    let newArr = [];
    r.forEach(element => {
      let ar = {};
      ar['value'] = element.id;
      ar['lable'] = element.name;
      newArr.push(ar);
    });
    setRoomoption(newArr);
},[cateid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        let trackid = Math.floor(Math.random() * 10000000000);
      if(isdates === 1)
        {
        let duration = Math.abs(new Date(startbook) - new Date());
        let fd = new FormData();
        fd.append('fullname', fullname);
        fd.append('roomid', roomid.value);
        fd.append('userid', props.user.id);
        fd.append('guestno', guestno);
        fd.append('transaction_date', startbook);
        fd.append('endbook', endbook);
        fd.append('description', description);
        fd.append('is_paid', ispaid);
        fd.append('is_lodged', islodged);
        fd.append('phone', phone);
        fd.append('idtype', idtype);
        fd.append('idnumber', idnumber);
        fd.append('trackid', trackid);
        fd.append('duration', duration);
        fd.append('checker', startbook+":::"+roomid.value);
        fd.append('table', 'room_transactions');

        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateRoomtransaction(fd);
        }else{
          fd.append('cat', 'insert');
          props.registerRoomtransaction(fd);
        }
      }
      if(isdates === 2)
      {
        for(let i = 0 ; i < startbooks.length; i++)
        {
          let newbook =   startbooks[i];
          let duration = Math.abs(new Date(newbook) - new Date());
              let fd = new FormData();
              fd.append('fullname', fullname);
              fd.append('roomid', roomid.value);
              fd.append('userid', props.user.id);
              fd.append('guestno', guestno);
              fd.append('transaction_date', newbook);
              fd.append('endbook', endbook);
              fd.append('description', description);
              fd.append('is_paid', ispaid);
              fd.append('is_lodged', islodged);
              fd.append('phone', phone);
              fd.append('idtype', idtype);
              fd.append('idnumber', idnumber);
              fd.append('trackid', trackid);
              fd.append('duration', duration);
              fd.append('checker', newbook+":::"+roomid.value);
              fd.append('table', 'room_transactions');

              fd.append('cat', 'confirm');
              props.registerRoomtransaction(fd);
              

        }

      }
        //resetdata();
        
  }

  const populate = async(data) =>{
    
        let nm = {};
        nm['value'] = data.course_department;
        nm['label'] = data.departmentname;
        setCate(nm);

        let gt0 = moment(data.course_start).format('YYYY-MM-DDTHH:mm');
        let gt1 = moment(data.course_end).format('YYYY-MM-DDTHH:mm');
        setSurname(data.surname);
        setFullname(data.firstname);
        setIspaid(data.ispaid);
        setIslodged(data.lodged);
        setDescription(data.description);
        setStartbook(gt0);
        setEndbook(gt1);
    }

    const handleCate = (selected) => {
      setCateid( selected );
    }
    const handleRoom = (selected) => {
      setRoomid( selected );
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
        <ModalHeader toggle={resetdata}>{parseInt(props.roomid) > 0 ? props.roomdata.categoryname +" "+ props.roomdata.name: "Booking"}</ModalHeader>
        <ModalBody>
          <h6>
            {isdates === 1 ? new Date(startbook).toDateString() : ''} 
            {isdates === 2 ? startbooks.map(prp=>{return new Date(prp).toDateString() + ' | '}):''}
          </h6>
        <Form>
        {parseInt(props.roomid) > 0 ? "" : 
              <><FormGroup row>
                <Label for="name" sm={3}>Room Type</Label>
                <Col sm={9}>
                <Select
                  styles = { customStyles }
                  value={cateid}
                  onChange={handleCate}
                  options={cate}
                  autoFocus={true}
                />
                <FormText></FormText>
                </Col> 
            </FormGroup>
            <FormGroup row>
                <Label for="roomid" sm={3}>Room Name</Label>
                <Col sm={9}>
                <Select
                  styles = { customStyles }
                  value={roomid}
                  onChange={handleRoom}
                  options={roomoption}
                  autoFocus={true}
                />
                <FormText></FormText>
                </Col> 
        </FormGroup></>}
            <FormGroup row>
                <Label for="fullname" sm={3}>Fullname </Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    fullname="fullname" 
                    id="fullname"  
                    required
                    defaultValue={fullname}
                    onChange={e=>setFullname(e.target.value)} 
                    placeholder="fullname" />
                </Col>
                
            </FormGroup>
            <FormGroup row>
                <Label for="guestno" sm={3}>No. of Guest</Label>
                <Col sm={9}>
                <Input 
                    type="number" 
                    name="guestno" 
                    id="guestno"
                    value={guestno}
                    onChange={e=>setGuestno(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            {props.roomdate === null ?<><FormGroup row>
                <Label for="startbook" sm={3}>Book From </Label>
                <Col sm={9}>
                <Input 
                    type="datetime-local" 
                    name="startbook" 
                    id="startbook"
                    value={startbook}
                    onChange={e=>setStartbook(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="endbook" sm={3}>Booking Ends </Label>
                <Col sm={9}>
                <Input 
                    type="datetime-local" 
                    name="endbook" 
                    id="endbook"
                    defaultValue={endbook}
                    onChange={e=>setEndbook(e.target.value)} 
                     />
                </Col>
            </FormGroup></>:''}
            <FormGroup row>
                <Label for="phone" sm={3}>Phone No.</Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="phone" 
                    id="phone"
                    value={phone}
                    onChange={e=>setPhone(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="idtype" sm={3}>ID Card Type</Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="idtype" 
                    id="idtype"
                    value={idtype}
                    onChange={e=>setIdtype(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="idnumber" sm={3}>ID Card No.</Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="idnumber" 
                    id="idnumber"
                    value={idnumber}
                    onChange={e=>setIdnumber(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="description" sm={12}>Introduction </Label>
                <Col sm={12}>
                <Input 
                    type="textarea" 
                    name="description" 
                    id="description"  
                    required
                    
                    defaultValue={description}
                    onChange={e=>setDescription(e.target.value)} 
                     />
                </Col>
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
    roomtransaction: state.roomtransactionReducer.roomtransaction,
    user:state.userReducer.user,
    roomcategorys:state.roomcategoryReducer.roomcategorys,
    rooms:state.roomReducer.rooms,
  })
  
export default connect(mapStateToProps, { registerRoomtransaction, updateRoomtransaction})(Modals)
