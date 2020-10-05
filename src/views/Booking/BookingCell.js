import { timers } from "jquery";
import React from "react";


class BookingCell extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            is_paid:false,
            is_lodged:false,
            data:{},
            dataid:''
        }
    }

   componentDidMount(){
       let d = this.props.data;
            this.setState({
                is_paid:d.guestispaid,
                data: d,
                is_lodged: d.guestislodged,
                guestname: d.guestname,
                dataid:d.guestname,
            })
   }

    render() {
        let {is_paid, is_lodged, data}= this.state;
        let passedDate = new Date(this.props.dateid) >= new Date() ? true : false ;

        return (
            <>
            {data === 0 ?
             <td 
                onClick={()=>this.props.loadBooking(0)}
                className='col-xs-6 text-success' 
                style={{minWidth:'200px', height:'40px', paddingBlock:'1px',textAlign:'center', fontSize:'1.2em'}}>
                           { !passedDate ?  <i className="text-warning fa fa-lock"></i> : this.props.maint === 1 ? <i className="text-danger now-ui-icons ui-1_simple-remove"></i> :<i className="now-ui-icons ui-1_simple-add"></i> }
            </td>: 
            <td 
                onClick={()=>this.props.loadBooking(data.id)}
                className={ passedDate ? "col-xs-6 bg-info" : "col-xs-6 bg-success"} 
                style={{minWidth:'200px', height:'40px', paddingBlock:'1px',textAlign:'center', fontSize:'1.2em'}}>
                            {data.guestname} 
                            <i className={ is_paid ? "text-success fa fa-money" : "text-danger fa fa-money"}></i>
                            {is_lodged ? <i className="fa fa-lock"></i>:''}
            </td>
            
            
            }
            </>
        )
    }
}
export default BookingCell;