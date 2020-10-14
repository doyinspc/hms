import React from "react";
import { UncontrolledTooltip } from "reactstrap";


let ars = {
    1:'Supply',
    2:'Dispatched',
    3:'Deployed',
    4:'Damaged',
}
class RoomRow extends React.Component {
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
                <td>{name}</td>
                <td>{description}</td>
                <td>{categoryname}</td>
                <td>
                   <button id={`tooa1${id}`} className="btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" ><i className="fa fa-tasks"></i></button>
                  
                    <button 
                            id={`tooa2${id}`} 
                            className= {parseInt(is_active) === 0 ? "btn mx-1 mb-1 btn-round btn-raised btn-icon btn-primary" : "btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-danger"} 
                            onClick={()=>this.props.activate(parseInt(id), parseInt(is_active))}>
                                <i className= {parseInt(is_active) === 0 ? "fa fa-thumbs-up" : "fa fa-thumbs-down"}></i>
                    </button>
                    <button id={`tooa3${id}`} className="btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.edit(parseInt(id))}><i className="fa fa-edit"></i></button>
                    <button id={`tooa4${id}`} className="btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.delete(parseInt(id))}><i className="now-ui-icons ui-1_simple-remove"></i></button>
                   
                </td>
            </tr>:''}
            {this.state.id === 3 && parseInt(id) > 0 ? 
            <tr>
                <td className='text-center'>{num}</td>
                <td>{name}</td>
                <td>{description}</td>
                <td className='align-left'>
                   <button id={`tooa1${id}`} className="btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" ><i className="fa fa-tasks"></i></button>
                    <button 
                            id={`tooa2${id}`} 
                            className= {parseInt(is_active) === 0 ? "btn mx-1 mb-1 btn-round btn-raised btn-icon btn-primary" : "btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-danger"} 
                            onClick={()=>this.props.activate(parseInt(id), parseInt(is_active))}>
                                <i className= {parseInt(is_active) === 0 ? "fa fa-thumbs-up" : "fa fa-thumbs-down"}></i>
                    </button>
                    <button id={`tooa3${id}`} className="btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.edit(parseInt(id))}><i className="fa fa-edit"></i></button>
                    <button id={`tooa4${id}`} className="btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.delete(parseInt(id))}><i className="now-ui-icons ui-1_simple-remove"></i></button>   
                </td>
            </tr>:''}
           
            {this.state.id === 3 && parseInt(id) > 0 ? 
            <tr>
                <td className='text-center' width='70px'>{num}</td>
                <td>{this.props.data.roomname}</td>
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
export default RoomRow;