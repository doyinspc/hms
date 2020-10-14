import React from "react";
import { UncontrolledTooltip } from "reactstrap";
import moment from 'moment';

let ars = {
    1:'Supply',
    2:'Dispatched',
    3:'Deployed',
    4:'Damaged',
}
class UserRow extends React.Component {
   constructor(props){
       super(props);
       this.state ={
            id:null,
            num:0,
            data:{}
       }
   }

    async componentDidMount(){
        let id = this.props.id;
        let num = this.props.num;
        this.setState({id:id, num:num});
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.id !== this.state.id || prevProps.id !== this.props.id){
        let id = this.props.id;
        let num = this.props.num;
        this.setState({id:id, num:num});
        }
    }


    render() {
        let { num } = this.state;
        let { id, name, qty, is_active, cost, description, categoryname } = this.props.data || '';
        let sum = this.state.id === 6 ?
        Number(this.props.data[1])  ? Number(this.props.data[1]) : 0  - 
        Number(this.props.data[2])  ? Number(this.props.data[2]) : 0  -  
        Number(this.props.data[3])  ? Number(this.props.data[3]) : 0  - 
        Number(this.props.data[4])  ? Number(this.props.data[4]) : 0 : 0 ;
        
        return (
            <>
            {this.state.id === 1 && parseInt(id) > 0 ? 
            <tr>
                <td className='text-center'>{num}</td>
                <td>{name}</td>
                <td>{description}</td>
                <td className='text-left'>
                <button id={`too0${id}`} className="btn btn-sm my-0 py-0 mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.catreport(parseInt(id))}><i className="fa fa-file"></i></button>
                    <button id={`too1${id}`} className="btn btn-sm my-0 py-0 mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.catexpand(parseInt(id))}><span className='badge badge-primary'>{qty}</span></button>
                    <button 
                            id={`too2${id}`} 
                            className= {parseInt(is_active) === 0 ? "btn btn-sm my-0 py-0 mx-1 mb-1 btn-round btn-raised btn-icon btn-primary" : "btn btn-sm mx-1 mb-1 my-0 py-0 btn-round btn-raised btn-icon btn-outline-danger"} 
                            onClick={()=>this.props.catactivate(parseInt(id), parseInt(is_active))}>
                                <i className= {parseInt(is_active) === 0 ? "fa fa-thumbs-up" : "fa fa-thumbs-down"}></i>
                    </button>
                    <button id={`too3${id}`} className="btn btn-sm my-0 py-0 mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.catadd(parseInt(id))}><i className="now-ui-icons ui-1_simple-add"></i></button>
                    <button id={`too3${id}`} className="btn btn-sm my-0 py-0 mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.catedit(parseInt(id))}><i className="fa fa-edit"></i></button>
                    <button id={`too4${id}`} className="btn btn-sm my-0 py-0 mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.catdelete(parseInt(id))}><i className="now-ui-icons ui-1_simple-remove"></i></button>
                    
                </td>
            </tr>:''}
            {this.state.id === 2 && parseInt(id) > 0 ? 
            <tr>
                <td className='text-center'>{num}</td>
                <td>{`${this.props.data.title} ${this.props.data.surname} ${this.props.data.firstname} ${this.props.data.middlename}`}</td>
                <td>{this.props.data.gender == 1? 'Male' : 'Female'}</td>
                <td>{moment(this.props.data.dob).format("Do MMMM YYYY")}</td>
                <td>{moment(this.props.data.doe).format("Do MMMM YYYY")}</td>
                <td>{this.props.data.phone1}{' '}{this.props.data.phone2}</td>
                <td>{this.props.data.email}</td>
                <td>{this.props.data.categoryname}</td>
                <td>
                   <button id={`tooa1${id}`} className="btn mx-1 mb-1 btn-sm  btn-round btn-raised btn-icon btn-outline-primary" ><i className="fa fa-tasks"></i></button>
                  
                    <button 
                            id={`tooa2${id}`} 
                            className= {parseInt(is_active) === 0 ? "btn btn-sm  mx-1 mb-1 btn-round btn-raised btn-icon btn-primary" : "btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-danger"} 
                            onClick={()=>this.props.activate(parseInt(id), parseInt(is_active))}>
                                <i className= {parseInt(is_active) === 0 ? "fa fa-thumbs-up" : "fa fa-thumbs-down"}></i>
                    </button>
                    <button id={`tooa5${id}`} className="btn mx-1 mb-1 btn-sm  btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.access(parseInt(id), this.props.data)}><i className="fa fa-lock"></i></button>
                    <button id={`tooa3${id}`} className="btn mx-1 mb-1 btn-sm  btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.edit(parseInt(id))}><i className="fa fa-edit"></i></button>
                    <button id={`tooa4${id}`} className="btn mx-1 mb-1 btn-sm  btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.delete(parseInt(id))}><i className="now-ui-icons ui-1_simple-remove"></i></button>
                   
                </td>
            </tr>:''}
            {this.state.id === 3 && parseInt(id) > 0 ? 
            <tr>
                <td className='text-center'>{num}</td>
                <td>{name}</td>
                <td>{description}</td>
                <td className='align-left'>
                   <button id={`tooa1${id}`} className="btn mx-1 mb-1 btn-sm btn-round btn-raised btn-icon btn-outline-primary" ><i className="fa fa-tasks"></i></button>
                    <button 
                            id={`tooa2${id}`} 
                            className= {parseInt(is_active) === 0 ? "btn mx-1 btn-sm  mb-1 btn-round btn-raised btn-icon btn-primary" : "btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-danger"} 
                            onClick={()=>this.props.activate(parseInt(id), parseInt(is_active))}>
                                <i className= {parseInt(is_active) === 0 ? "fa fa-thumbs-up" : "fa fa-thumbs-down"}></i>
                    </button>
                    
                    <button id={`tooa3${id}`} className="btn mx-1 mb-1 btn-sm  btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.edit(parseInt(id))}><i className="fa fa-edit"></i></button>
                    <button id={`tooa4${id}`} className="btn mx-1 mb-1 btn-sm  btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.delete(parseInt(id))}><i className="now-ui-icons ui-1_simple-remove"></i></button>   
                </td>
            </tr>:''}
            {this.state.id === 4 && parseInt(id) > 0 ? 
            <tr>
                <td className='text-center'><a className='text-danger' onClick={()=>this.props.tdelete(parseInt(id))}>x</a>{num}</td>
                <td>{this.props.data.transaction_date}</td>
                <td><a href='#' onClick={()=>this.props.tedit(parseInt(id), this.props.data)}>{this.props.data.username}</a></td>
                <td>{ars[parseInt(this.props.data.status)]}</td>
                <td>{this.props.data.quantity}</td>
                <td>{this.props.data.receiver}</td>
                <td>{this.props.data.username}</td>
            </tr>:''}
            {this.state.id === 5 && parseInt(id) > 0 ? 
            <tr>
                <td className='text-center'><a className='text-danger' onClick={()=>this.props.tdelete(parseInt(id))}>x</a>{num}</td>
                <td><a href='#' onClick={()=>this.props.tedit(parseInt(id), this.props.data)}>{this.props.data.transaction_date}</a></td>
                <td>{ars[parseInt(this.props.data.status)]}</td>
                <td>{this.props.data.quantity}</td>
                <td>{this.props.data.receiver}</td>
                <td>{this.props.data.username}</td>
            </tr>:''}
            {this.state.id === 6 && parseInt(id) > 0 ? 
            <tr>
                <td className='text-center' width='70px'>{num}</td>
                <td>{this.props.data.username}</td>
                <td className='text-center'>{this.props.data[1]}</td>
                <td className='text-center'>{this.props.data[2]}</td>
                <td className='text-center'>{this.props.data[3]}</td>
                <td className='text-center'>{this.props.data[4]}</td>
                <td className='text-center'>{sum}</td>
            </tr>:''}
              
            </>
        )
    }
}
export default UserRow;