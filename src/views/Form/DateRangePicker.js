import React, {Component} from "react";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { Col, FormGroup, Label, Row } from "reactstrap";
 
class DateRangePickers extends Component {

  constructor(props){
    super(props);
    this.state={
      startDate: new Date(),
      endDate:new Date(),
    }
  }
 
  onSub = ()=>{
    this.props.setDate(this.state.startDate, this.state.endDate);
  }
  render(){
     let { startDate, endDate } = this.state;
    return (
      
      <Row xs='12' className='mx-0' >
        <Label xs='1' className='mx-0 my-2 px-0 align-right'>From:</Label>
        <Col xs='5' className='mx-0 my-2'>
          <input 
            type='date' 
            className='form-control'
            name='startdate'
            value={startDate}
            onChange={(e)=>{this.setState({startDate:e.target.value})}}
            />
        </Col>
        <Label xs='1'  className='mx-0 my-2  px-0'>To:</Label>
        <Col xs='4'  className='mx-0 my-2  px-0'>
          <input 
            type='date' 
            className='form-control'
            name='enddate'
            value={endDate}
            onChange={(e)=>{this.setState({endDate:e.target.value})}}
            />
          </Col>
        <Col xs='1'  className='mx-0 my-2 px-3'>
            <button 
              name='button' 
              className='btn btn-sm btn-success'
              onClick={this.onSub}>Go!</button>
        </Col>
      </Row>
    )
  }
}
export default DateRangePickers;