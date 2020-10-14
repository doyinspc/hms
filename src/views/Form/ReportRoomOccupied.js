import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerRoomtype, updateRoomtype } from '../../actions/roomtype';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText,  Input, Col, Container, Row } from 'reactstrap';
import Select  from 'react-select';

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState({});
  const resetdata= async() =>{
    
    props.handleClose();
}

  const toggle = () => setModal(!modal);
  
useEffect(() => {
    
    setId(props.mid);
    setData(props.data);

},[props.mid, props.data]);

let room = data;
let house = props.roomcategorys;
let arr = house.map((prp, inn)=>{
    return <div key={inn}><h4>{prp.name}</h4>
    {room && Array.isArray(room) && room.length > 0 ? room.filter(rw=>rw.categoryid == prp.id).map((prop, ind)=>{
    return <><div
        key={ind}
        data-toggle='collapse'
        data-target={`#w${ind}`}
        className='col-md-2 m-2 p-2 '
        style={{
            width:'200px',
            paddingBlock:'4px',
            border: '2px solid #ccc',
            backgroundColor: prop.is_active == 1 ? 'red':'white',
            color: prop.is_active == 1 ? 'white' : 'black'
        }}
        >
        <div id={`w${ind}`} className='collapse floatblock' >
            <ul className='floatlink'>
                <a onClick={()=>this.lunchLock(prop.id, prop)} href="#"><li>Lock/Unlock Room</li></a>
            </ul>
        </div>
        {prop.categoryname}{' '}<b className='pull-right'>{prop.name}</b>
    </div>
    </>

}):''
    }<hr/></div>
    })


  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop='static' keyboard={false}>
        <ModalHeader toggle={resetdata}><i className='fa fa-bed'></i>Occupied Rooms</ModalHeader>
        <ModalBody>
        <Container>
            <Row>
                {arr}
            </Row>
        </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    user:state.userReducer.user,
    roomcategorys:state.roomcategoryReducer.roomcategorys,
    roomtypes:state.roomtypeReducer
  })
  
export default connect(mapStateToProps, { registerRoomtype, updateRoomtype })(Modals)
