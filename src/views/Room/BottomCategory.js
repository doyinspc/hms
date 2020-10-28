import React from "react";
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Link, NavLink } from "react-router-dom";
import {getRoomcategorys, getRoomcategory, registerRoomcategory, updateRoomcategory, deleteRoomcategory } from './../../actions/roomcategory';
import {getRoomtypes, getRoomtype, registerRoomtype, updateRoomtype, deleteRoomtype } from './../../actions/roomtype';
import {getRoomtransactions, getRoomtransaction, registerRoomtransaction, updateRoomtransaction, deleteRoomtransaction } from './../../actions/roomtransaction';
import FormRoomCategory from "views/Form/FormRoomCategory";
import FormRoom from "views/Form/FormRoom";
import RoomRow from './RoomRow';
import FormRoomTransaction from "views/Form/FormRoomTransaction";
import $ from 'jquery';


const locs = {
    1:'Kaimji',
    2:'Jebba',
    3:'HQ'
}
class BottomCard extends React.Component {
   constructor(props){
       super(props);
       this.state ={
           id:null,
           cat:null,
            grp:null,
            afid:false,
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
            daterange:'',
            isshown:{}

       }
   }

    async componentDidMount(){
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
        
       
            //GET ALL CATEGORYS
            let params = {
                data:JSON.stringify({'locationid':this.props.user.location}),
                cat:'categoryroomall',
                table:'room_categorys'
            }
         
         this.setState({subtopic:'Room Categories List'});
        await  this.props.getRoomcategorys(params);
        
        $('#myTablex').DataTable();
        //tb.destroy();
    }
        
    async componentDidUpdate(prevProps, prevState)
    {
        //GET PROPS
        if(prevProps.user.location !== this.props.user.location || prevProps.id !== this.props.id || prevProps.choicestarted !== this.props.choicestarted || prevProps.choiceended !== this.props.choiceended)
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
       
       
            //GET ALL CATEGORYS
            let params = {
                data:JSON.stringify({'locationid':this.props.user.location}),
                cat:'categoryroomall',
                table:'room_categorys'
            }
         
         this.setState({subtopic:'Room Categories List'});
         await this.props.getRoomcategorys(params);
        $('#myTablex').DataTable();
        
    }
    }
    componentWillUnmount(){
        $('#myTablex').DataTable().destroy();
    }
    //EDIT CATEGORY
    categoryEditForm = (id, dat) =>{
        this.props.getRoomcategory(id);
        this.setState({cfid:true, mid:id, data:dat});
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
    categoryAdd = (id, dat) =>{
        this.props.roomAdd(id)
    }
    //DELETE CATEGORY
    categoryDeleteForm = (id, dat) =>{
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
    loadShown = (id, cat) =>{
          let ar = {};
          if(cat === 0)
          {
              ar[id] = true;
          }else{
              ar[id] = false;
          }
          this.setState({isshown:ar});
    }
    render() {
        let { cfid, mid, isshown, data } = this.state  || '';
        let datas = this.props.roomcategorys.roomcategorys;
        let tabl = datas && Array.isArray(datas) ? datas.map((prop, ind)=>{
            return <tr 
            key={ind}
                        style={{padding:'1px', margin:'0px'}}
                        onMouseEnter={()=>this.loadShown(prop.id, 0)}
                        onMouseLeave={()=>this.loadShown(prop.id, 1)}
                        >
                        <td className='text-center' width='10px' data-col-width='4' style={{maxWidth:'10px'}}>{ind + 1}</td>
                        <td className='text-left'>
                             {parseInt(prop.is_active) === 0 ? prop.name : <strike>{prop.name}</strike> }
                             { prop.id in isshown && isshown[prop.id] === true ? 
                                <span className='reportcontrol pull-right'>
                                    
                                    <NavLink to={`/account/rooms/${prop.id}`}><i className='fa fa-list'></i></NavLink>
                                    <a onClick={()=>this.categoryActivateForm(parseInt(prop.id), parseInt(prop.is_active))} href='#'>{<i className= {parseInt(prop.is_active) === 0 ? "fa fa-thumbs-up" : "fa fa-thumbs-down"}></i>}</a>
                                    <a onClick={()=>this.categoryAdd(prop.id, prop)} href='#'><i className='now-ui-icons ui-1_simple-add'></i></a>
                                    <a onClick={()=>this.categoryEditForm(prop.id, prop)} href='#'><i className='fa fa-edit'></i></a>
                                    <a onClick={()=>this.categoryDeleteForm(prop.id, prop)} href='#'><i className='now-ui-icons ui-1_simple-remove'></i></a>
                                </span>
                            : ''}
                            

                        </td>
                        <td className='text-center' style={{maxWidth:'10px'}} >{locs[prop.locationid]}</td>
                        <td className='text-center' style={{maxWidth:'10px'}} >{prop.qty}</td>
                    </tr>
                }): '';
        


        return (
            <>
            
            {cfid === true? 
            <FormRoomCategory
                st={cfid}
                mid={mid}
                data={data}
                handleClose={()=>this.setState({mid:null, cfid:false, data:{}})}
            />:''}
            
              <div className="content">
                  <div className='card'>
                  <div className='card-header tablecardheader'>
                  <h4 className='cardtitl'><a href='#' onClick={()=>this.categoryEditForm(null, {})}><i className='now-ui-icons ui-1_simple-add'></i></a> Houses</h4>
                  </div>
                  <div className='card-body table-responsive'>
                    <table className=' table-bordered display nowrap table-striped mytables table-condensed table-hover' id='myTablex' width='100%'>
                        <thead>
                            <tr>
                                <th style={{maxWidth:'10px'}}>SN.</th>
                                <th>Departments</th>
                                <th>Location</th>
                                <th style={{maxWidth:'10px'}} className='text-center'>QTY.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabl}
                        </tbody>
                    </table>
                  </div>
                  </div>
              </div>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({ 
    user:state.userReducer,
    roomcategorys:state.roomcategoryReducer
  })
  
export default connect(mapStateToProps, 
    { 
        getRoomcategorys, 
        getRoomcategory, 
        registerRoomcategory,
        updateRoomcategory,
        deleteRoomcategory,
        getRoomtypes
    })(BottomCard)
