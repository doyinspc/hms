import React from "react";
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Link } from "react-router-dom";
import {getRoomcategorys, getRoomcategory, registerRoomcategory, updateRoomcategory, deleteRoomcategory } from './../../actions/roomcategory';
import {getRoomtypes, getRoomtype, registerRoomtype, updateRoomtype, deleteRoomtype } from './../../actions/roomtype';
import {getRoomtransactions, getRoomtransaction, registerRoomtransaction, updateRoomtransaction, deleteRoomtransaction } from './../../actions/roomtransaction';
import FormRoomCategory from "views/Form/FormRoomCategory";
import FormRoom from "views/Form/FormRoom";
import RoomRow from './RoomRow';
import FormRoomTransaction from "views/Form/FormRoomTransaction";

class BottomCard extends React.Component {
   constructor(props){
       super(props);
       this.state ={
           id:null,
           cat:null,
            grp:null,
            tfid:false,
            cfid:false,
            mfid:false,
            ifid:false,
            mid:null,
            fid:false,
            data:{},
            subtopic:'All Categories',
            started:'',
            ended:'',
            daterange:''

       }
   }

    componentDidMount(){
        //GET PROPS
        let id = parseInt(this.props.id);
        let categoryid = this.props.categoryid ? parseInt(this.props.categoryid) : null;
        let categoryname = this.props.category ? parseInt(this.props.categoryname) : '';
        let roomid = this.props.roomid ? parseInt(this.props.roomid) : null;
        let roomname = this.props.room ? parseInt(this.props.roomname) : '';
        let choicestarted = this.props.choicestarted ? this.props.choicestarted : null;
        let choiceended = this.props.choiceended ? this.props.choiceended : null;
        let started = this.props.defaultstarted ? this.props.defaultstarted : null;
        let ended = this.props.defaultended ? this.props.defaultended : null;
        
        if(choicestarted !== null && choiceended !== null && choiceended > choicestarted)
        {
            started = choicestarted;
            ended = choiceended;
        }

        let daterange = ' '+moment(started).format('MMMM Do YYYY') + ' - ' + moment(ended).format('MMMM Do YYYY');
        
        this.setState({
            id:id, 
            cat:categoryid,
            started:started,
            ended:ended,
            daterange:daterange
        });
        
        if(id === 1)
        {
            //GET ALL CATEGORYS
            let params = {
                data:{},
                cat:'categoryroomall',
                table:'room_categorys'
            }
         
         this.setState({subtopic:'Room Categories List'});
         this.props.getRoomcategorys(params);
        }
        if(id === 2)
        {
            //GET ALL ROOMS
            let params = {
                data:{},
                cat:'roomall',
                table:'room_types'
            }
         this.setState({subtopic:'Inventories List'});
         this.props.getRoomtypes(params);
        }
        if(id === 3)
        {
            //GET ROOMS BY CATEGORY
            let params = {
                data:{'categoryid':categoryid},
                cat:'categoryroom',
                table:'room_types'
            }
        this.setState({subtopic:categoryname});
         this.props.getRoomtypes(params);
        }
        if(id === 4)
        {
            //GET ROOM TRANSACTIONS
            //DATE RANGE NEEDED
            let dt = {
                'starts':started,
                'ends':ended
            }
            let params = {
                data:JSON.stringify(dt),
                cat:'roomtransaction',
                table:'room_transactions'
            }
        let catn = 'Room History:' + daterange;
        this.setState({subtopic:catn});
        this.props.getRoomtransactions(params);
        }
        if(id === 5)
        {
            //GET ROOM TRANSACTIONS PARTICULAR TYPE
            //DATE RANGE NEEDED
            //INVTORY ID NEEDED
            let dt = {
                'starts':started,
                'ends':ended,
                'roomid':roomid,
            }
            let params = {
                data:JSON.stringify(dt),
                cat:'roomtransaction',
                table:'room_transactions'
            }
        let catn = 'Room History :' + roomname + daterange;
        this.setState({subtopic:catn});
        this.props.getRoomtransactions(params);
        }
        if(id === 6)
        {
            //GET ROOM TRANSACTION REPORT SUMMARY
            let dt = {
                'starts':started,
                'ends':ended,
                'categoryid':categoryid,
            }
            let params = {
                data: JSON.stringify(dt),
                cat:'roomtransactionsummary',
                table:'room_transactions'
            }
        
        let catn = 'Room Report :' + categoryname + daterange;
        this.setState({subtopic:catn});
        this.props.getRoomtransactions(params);
        }
    }
    componentDidUpdate(prevProps, prevState)
    {
        //GET PROPS
        if(prevProps.id !== this.props.id || prevProps.choicestarted !== this.props.choicestarted || prevProps.choiceended !== this.props.choiceended)
        {
        let id = parseInt(this.props.id);
        let categoryid = this.props.categoryid ? parseInt(this.props.categoryid) : null;
        let categoryname = this.props.category ? parseInt(this.props.categoryname) : '';
        let roomid = this.props.roomid ? parseInt(this.props.roomid) : null;
        let roomname = this.props.room ? parseInt(this.props.roomname) : '';
        let choicestarted = this.props.choicestarted ? this.props.choicestarted : null;
        let choiceended = this.props.choiceended ? this.props.choiceended : null;
        let started = this.props.defaultstarted ? this.props.defaultstarted : null;
        let ended = this.props.defaultended ? this.props.defaultended : null;
        this.setState({id:id, cat:categoryid});
        this.setState({grp:id});
        
        if(choicestarted !== null && choiceended !== null && choiceended > choicestarted)
        {
            started = choicestarted;
            ended = choiceended;
        }

        let daterange = ' '+moment(started).format('MMMM Do YYYY') + ' - ' + moment(ended).format('MMMM Do YYYY');
        
        this.setState({
            id:id, 
            cat:categoryid,
            started:started,
            ended:ended,
            daterange:daterange
        });
       
        if(id === 1)
        {
            //GET ALL CATEGORYS
            let params = {
                data:{},
                cat:'categoryroomall',
                table:'room_categorys'
            }
         
         this.setState({subtopic:'Room Categories List'});
         this.props.getRoomcategorys(params);
        }
        if(id === 2)
        {
            //GET ALL ROOMS
            let params = {
                data:{},
                cat:'roomall',
                table:'room_types'
            }
         this.setState({subtopic:'Inventories List'});
         this.props.getRoomtypes(params);
        }
        if(id === 3)
        {
            //GET ROOMS BY CATEGORY
            let params = {
                data:{'categoryid':categoryid},
                cat:'categoryroom',
                table:'room_types'
            }
        this.setState({subtopic:categoryname});
         this.props.getRoomtypes(params);
        }
        if(id === 4)
        {
            //GET ROOM TRANSACTIONS
            //DATE RANGE NEEDED
            let dt = {
                'starts':started,
                'ends':ended
            }
            let params = {
                data:JSON.stringify(dt),
                cat:'roomtransaction',
                table:'room_transactions'
            }
        let catn = 'Room History:' + daterange;
        this.setState({subtopic:catn});
        this.props.getRoomtransactions(params);
        }
        if(id === 5)
        {
            //GET ROOM TRANSACTIONS PARTICULAR TYPE
            //DATE RANGE NEEDED
            //INVTORY ID NEEDED
            let dt = {
                'starts':started,
                'ends':ended,
                'roomid':roomid,
            }
            let params = {
                data:JSON.stringify(dt),
                cat:'roomtransaction',
                table:'room_transactions'
            }
        let catn = 'Room History :' + roomname + daterange;
        this.setState({subtopic:catn});
        this.props.getRoomtransactions(params);
        }
        if(id === 6)
        {
            //GET ROOM TRANSACTION REPORT SUMMARY
            let dt = {
                'starts':started,
                'ends':ended,
                'categoryid':categoryid,
            }
            let params = {
                data: JSON.stringify(dt),
                cat:'roomtransactionsummary',
                table:'room_transactions'
            }
        
        let catn = 'Room Report :' + categoryname + daterange;
        this.setState({subtopic:catn});
        this.props.getRoomtransactions(params);
        }
    }
    }
    //EDIT CATEGORY
    categoryEditForm = id =>{
        this.props.getRoomcategory(id);
        this.setState({cfid:true, mid:id});
    }
    //REPORT
    categoryReport = (cid, catname) =>{
        this.setState({id:5});
        //GET ALL ROOMS
         //GET ROOM TRANSACTIONS PARTICULAR TYPE
            //DATE RANGE NEEDED
            //INVTORY ID NEEDED
            let dt = {
                'starts':this.state.started,
                'ends':this.state.ended,
                'roomid':cid,
            }
            let params = {
                data:JSON.stringify(dt),
                cat:'roomtransaction',
                table:'room_transactions'
            }
        let catn = 'Room History :' + catname + this.state.daterange;
        this.setState({subtopic:catn});
        this.props.getRoomtransactions(params);
    }
    //EXPAND
    categoryExpand = (cid, catname) =>{
        this.setState({id:3});
        //GET ALL ROOMS
        let params = {
            data:{'categoryid':cid},
            cat:'categoryroom',
            table:'room_types'
        }
        this.setState({subtopic: catname});
        this.props.getRoomtypes(params);
    }
    //EXPAND
    categoryAdd = id =>{
        this.props.roomAdd(id)
    }
    //DELETE CATEGORY
    categoryDeleteForm = id =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You will not be able restore",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
        
            if (result.value) {
                let fd = new FormData();
                fd.append('id', id);
                fd.append('is_delete', 1);
                fd.append('cat', 'update');
                fd.append('table', 'room_categorys');
                this.props.updateRoomcategory(fd);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
          
    }
    //ACTIVATE CATEGORY
    categoryActivateForm = (id, ac) =>{
        let act = ac === 1 ? 0 : 1;
        let fd = new FormData();
        fd.append('id', id);
        fd.append('is_active', act);
        fd.append('cat', 'update');
        fd.append('table', 'room_categorys');
        this.props.updateRoomcategory(fd);
    }
     //ADD A TRANSACTION
    addTransactionForm = id =>{
        this.props.roomTransactionAdd(id)
    }
    //EDIT ROOM
    editForm = id =>{
        this.props.getRoomtype(id);
        this.setState({fid:true, mid:id});
    }
    //DELETE ROOM
    deleteForm = id =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You will not be able restore",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
        
            if (result.value) {
                let fd = new FormData();
                fd.append('id', id);
                fd.append('is_delete', 1);
                fd.append('cat', 'update');
                fd.append('table', 'room_types');
                this.props.updateRoomtype(fd);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        
    }
    //ACTIVATE ROOM
    activateForm = (id, ac) =>{
        let act = ac === 0 ? 1 : 0;
        let fd = new FormData();
        fd.append('id', id);
        fd.append('is_active', act);
        fd.append('cat', 'update');
        fd.append('table', 'room_types');
        this.props.updateRoomtype(fd);
    }
    //EDIT ROOM TRANSACTION
    transactionEditForm = id =>{
        this.props.getRoomtransaction(id);
        this.setState({tfid:true, mid:id});
    }
    //DELETE ROOM TRANSACTION
    transactionDeleteForm = id =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You will not be able restore",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
        
            if (result.value) {
                this.props.deleteRoomtransaction(id);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        
    } 

    render() {
        let { tfid, cfid, fid, mid } = this.state  || '';
        let data = [];
        
        if(this.state.id === 1)
        {
            data = this.props.roomcategorys.roomcategorys;
        }
        else if(this.state.id === 2 || this.state.id === 3)
        {
            data = this.props.roomtypes.roomtypes;
        }
        else if(this.state.id === 4 || this.state.id === 5 )
        {
            data = this.props.roomtransactions.roomtransactions;
        }
        else if(this.state.id === 6)
        {
            let d = this.props.roomtransactions.roomtransactions && Array.isArray(this.props.roomtransactions.roomtransactions) ? this.props.roomtransactions.roomtransactions :[];
            let ar = {};
            d.forEach(element => {
                if(element.roomid !== null && element.roomid !== undefined && parseInt(element.roomid) > 0){
                if(element.roomid in Object.keys(ar))
                {
                    ar[element.roomid][element.status] = parseFloat(element.qty) > 0 ? parseFloat(element.qty) : parseFloat(element.qty)  * -1 ;;
                }else
                {
                    ar[element.roomid] = {};
                    ar[element.roomid]['id'] = element.roomid; 
                    ar[element.roomid]['roomname'] = element.roomname; 
                    ar[element.roomid][element.status] = parseFloat(element.qty) > 0 ? parseFloat(element.qty) : parseFloat(element.qty)  * -1 ; 
                }
            }
            })
            ;
            data = ar;
            console.log(ar);
        }
        let arrarr = [1, 2, 3, 4, 5];
        let  tabl = '';
        if(arrarr.includes(this.state.id)){
           tabl = data && Array.isArray(data) ? data.map((prop, ind)=>{
            return <RoomRow  
                        num={ind + 1}
                        key={ind} 
                        id={this.state.id} 
                        data={prop} 
                        catexpand={()=>{this.categoryExpand(prop.id, prop.name)}}
                        catreport={()=>{this.categoryReport(prop.id, prop.name)}}
                        catadd={(rid)=>{this.categoryAdd(prop.id)}}
                        catedit={(rid)=>{this.categoryEditForm(rid)}}
                        catdelete={(rid)=>{this.categoryDeleteForm(rid)}}
                        catactivate={(rid, act)=>{this.categoryActivateForm(rid, act)}}
                        edit={(rid)=>{this.editForm(rid)}}
                        delete={(rid)=>{this.deleteForm(rid)}}
                        activate={(rid, act)=>{this.activateForm(rid, act)}}
                        addtransaction={(rid)=>{this.aaddTransactionForm(rid)}}
                        tshow={(rid)=>{this.transactionShowForm(rid)}}
                        tedit={(rid)=>{this.transactionEditForm(rid)}}
                        tdelete={(rid)=>{this.transactionDeleteForm(rid)}}
                    />
        }): '';
        }else
        {
            tabl = data && Object.keys(data) ? Object.keys(data).map((prop, ind)=>{
                return <RoomRow  
                            num={ind + 1}
                            key={ind} 
                            id={this.state.id} 
                            data={data[prop]}
                        />
            }): '';

        }


        return (
            <>
            {tfid === true? 
            <FormRoomTransaction
                st={tfid}
                mid={mid}
                handleClose={()=>this.setState({mid:null, tfid:false})}
            />:''}
            {cfid === true? 
            <FormRoomCategory
                st={cfid}
                mid={mid}
                handleClose={()=>this.setState({mid:null, cfid:false})}
            />:''}
            {fid ?
            <FormRoom
                st={fid}
                mid={mid}
                handleClose={()=>this.setState({mid:null, fid:false})}
            />:''}
              <div className="content">
              {this.state.id === 1 ? 
                        <button 
                            className='btn btn-round btn-raised btn-icon btn-outline-primary' 
                            onClick={()=>this.setState({id:1, subtopic:'All Categories'})}>
                                <i className='fa fa-refresh mb-3'></i></button>:''}
                {this.state.id === 3 ? 
                        <button 
                            className='btn btn-round btn-raised btn-icon btn-outline-primary' 
                            onClick={()=>this.setState({id:1, subtopic:'All Categories'})}>
                                <i className='fa fa-backward mb-3'></i></button>:''}
                                {" "}<span class='h4'>{this.state.subtopic}</span>
            
                  <div className='card'>
                    <table className='table table-bordered' id='table' width='100%'>
                        {this.state.id === 1 ? <thead>
                            <tr>
                                <th width='60px'>SN.</th>
                                <th>NAME</th>
                                <th>DESCRIPTION</th>
                                <th width='260px'>ACTION</th>
                            </tr>
                        </thead> :''}
                        {this.state.id === 2 ? <thead>
                            <tr>
                                <th>SN.</th>
                                <th>NAME</th>
                                <th>DESCRIPTION</th>
                                <th>CATEGORY</th>
                                <th width='260px'>ACTION</th>
                            </tr>
                        </thead> :''}
                        {this.state.id === 3 ? <thead>
                            <tr>
                                <th>SN.</th>
                                <th>NAME</th>
                                <th>DESCRIPTION</th>
                                <th width='260px'>ACTION</th>
                            </tr>
                        </thead> :''}
                        {this.state.id === 4 ? <thead>
                            <tr>
                                <th width="60px">SN.</th>
                                <th>DATE</th>
                                <th>ITEM</th>
                                <th>STATUS</th>
                                <th>QTY</th>
                                <th>BY</th>
                                <th>LOGGED BY</th>
                            </tr>
                        </thead> :''}
                        {this.state.id === 5 ? <thead>
                            <tr>
                                <th width="60px">SN.</th>
                                <th>DATE</th>
                                <th>STATUS</th>
                                <th>QTY</th>
                                <th>BY</th>
                                <th>LOGGED BY</th>
                            </tr>
                        </thead> :''}
                        {this.state.id === 6 ? <thead>
                            <tr>
                                <th>SN.</th>
                                <th>ITEM</th>
                                <th width='60px'>INSTORE</th>
                                <th width='60px'>OUTSTORE</th>
                                <th width='60px'>DEPLOYED</th>
                                <th width='60px'>DAMAGED / RETIRED</th>
                                <th width='60px'>TOTAL</th>
                            </tr>
                        </thead> :''}
                        <tbody>
                            {tabl}
                        </tbody>
                    </table>
                  </div>
              </div>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({ 
    user:state.userReducer.user,
    roomcategorys:state.roomcategoryReducer,
    roomtypes:state.roomtypeReducer,
    roomtransactions:state.roomtransactionReducer,
  })
  
export default connect(mapStateToProps, 
    { 
        getRoomcategorys, 
        getRoomcategory, 
        registerRoomcategory,
        updateRoomcategory,
        deleteRoomcategory,
        getRoomtypes, 
        getRoomtype, 
        registerRoomtype,
        updateRoomtype,
        deleteRoomtype,
        getRoomtransactions, 
        getRoomtransaction, 
        registerRoomtransaction,
        updateRoomtransaction,
        deleteRoomtransaction
    })(BottomCard)
