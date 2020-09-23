import React from "react";
import { UncontrolledTooltip } from "reactstrap";

class RoomRow extends React.Component {
   constructor(props){
       super(props);
       this.state ={
            grp:null,
            num:0,
            data:{}
       }
   }

    async componentDidMount(){
        let id = this.props.id;
        let num = this.props.num;
        this.setState({grp:id, num:num});
    }


    render() {
        let { num, grp } = this.state;
        return (
            <>
            {grp === 1 ? 
            <tr>
                <td className='text-center'>{num}</td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.qty}</td>
                <td>
                    <button id={`too1${this.props.data.id}`} className="btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.catexpand(parseInt(this.props.data.id))}><i className="fa fa-tasks"></i></button>
                    <button 
                            id={`too2${this.props.data.id}`} 
                            className= {parseInt(this.props.data.is_active) === 0 ? "btn mx-1 mb-1 btn-round btn-raised btn-icon btn-success" : "btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-danger"} 
                            onClick={()=>this.props.catactivate(parseInt(this.props.data.id), parseInt(this.props.data.is_active))}>
                                <i className= {parseInt(this.props.data.is_active) === 0 ? "fa fa-thumbs-up" : "fa fa-thumbs-down"}></i>
                    </button>
                    <button id={`too3${this.props.data.id}`} className="btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.catedit(parseInt(this.props.data.id))}><i className="fa fa-edit"></i></button>
                    <button id={`too4${this.props.data.id}`} className="btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.catdelete(parseInt(this.props.data.id))}><i className="now-ui-icons ui-1_simple-remove"></i></button>
                    <UncontrolledTooltip target={`too1${this.props.data.id}`}>Rooms</UncontrolledTooltip>
                    <UncontrolledTooltip target={`too2${this.props.data.id}`}>Activate/Deactivate</UncontrolledTooltip>
                    <UncontrolledTooltip target={`too3${this.props.data.id}`}>Edit</UncontrolledTooltip>
                    <UncontrolledTooltip target={`too4${this.props.data.id}`}>Delete</UncontrolledTooltip>
                </td>
            </tr>:''}
            {grp === 2 ? 
            <tr>
                <td className='text-center'>{num}</td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.description}</td>
                <td>{this.props.data.categoryname}</td>
                <td>
                   <button id={`tooa1${this.props.data.id}`} className="btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.catexpand(parseInt(this.props.data.id))}><i className="fa fa-tasks"></i></button>
                   <button id={`tooa1${this.props.data.id}`} className="btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.catexpand(parseInt(this.props.data.id))}><i className="fa fa-tasks"></i></button>
                    <button 
                            id={`tooa2${this.props.data.id}`} 
                            className= {parseInt(this.props.data.is_active) === 0 ? "btn mx-1 mb-1 btn-round btn-raised btn-icon btn-success" : "btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-danger"} 
                            onClick={()=>this.props.activate(parseInt(this.props.data.id), parseInt(this.props.data.is_active))}>
                                <i className= {parseInt(this.props.data.is_active) === 0 ? "fa fa-thumbs-up" : "fa fa-thumbs-down"}></i>
                    </button>
                    <button id={`tooa3${this.props.data.id}`} className="btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.edit(parseInt(this.props.data.id))}><i className="fa fa-edit"></i></button>
                    <button id={`tooa4${this.props.data.id}`} className="btn mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={()=>this.props.delete(parseInt(this.props.data.id))}><i className="now-ui-icons ui-1_simple-remove"></i></button>
                    <UncontrolledTooltip target={`tooa1${this.props.data.id}`}>Rooms</UncontrolledTooltip>
                    <UncontrolledTooltip target={`tooa2${this.props.data.id}`}>Open/Close Room</UncontrolledTooltip>
                    <UncontrolledTooltip target={`tooa3${this.props.data.id}`}>Edit</UncontrolledTooltip>
                    <UncontrolledTooltip target={`tooa4${this.props.data.id}`}>Delete</UncontrolledTooltip>
                </td>
            </tr>:''}
            {grp === 3 ? 
            <tr>
                <td className='text-center'>{num}</td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.description}</td>
                <td>
                    
                </td>
            </tr>:''}
            {grp === 4 ? 
            <tr>
                <td className='text-center'>{num}</td>
                <td>{this.props.data.roomname}</td>
                <td>{this.props.data.issue}</td>
                <td>{this.props.data.status}</td>
                <td>
                    
                </td>
            </tr>:''}
            {grp === 5 ? 
            <tr>
                <td className='text-center'>{num}</td>
                <td>{this.props.data.roomname}</td>
                <td>{this.props.data.maintenanceall}</td>
                <td>{this.props.data.maintenancecritical}</td>
                <td>{this.props.data.maintenancepending}</td>
                <td>{this.props.data.maintenancerate}</td>
                <td>{this.props.data.maintenancerate}</td>
                <td>{this.props.data.maintenancerate}</td>
                <td>
                    
                </td>
            </tr>:''}
            {grp === 6 ? 
            <tr>
               <td className='text-center'>{num}</td>
                <td>{this.props.data.roomname}</td>
                <td>{this.props.data.uptime}</td>
                <td>{this.props.data.downtime}</td>
                <td>{this.props.data.occupancyrate}</td>
                <td>{this.props.data.maintenancerate}</td>
                <td>
                    
                </td>
            </tr>:''}
              
            </>
        )
    }
}
export default RoomRow;