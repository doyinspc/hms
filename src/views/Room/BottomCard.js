import React from "react";
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Link } from "react-router-dom";
import {getRoomcategorys, getRoomcategory, registerRoomcategory, updateRoomcategory, deleteRoomcategory } from './../../actions/roomcategory';
import {getRoommaintenances, getRoommaintenance, registerRoommaintenance, updateRoommaintenance, deleteRoommaintenance } from './../../actions/roommaintenance';
import {getRoominventorys, getRoominventory, registerRoominventory, updateRoominventory, deleteRoominventory } from './../../actions/roominventory';
import {getRooms, getRoom, registerRoom, updateRoom, deleteRoom } from './../../actions/room';
import FormRoomCategory from "views/Form/FormRoomCategory";
import FormRoomInventory from "views/Form/FormRoomInventory";
import FormRoomMaintenance from "views/Form/FormRoomMaintenance";
import FormRoom from "views/Form/FormRoom";
import RoomRow from './RoomRow';

class BottomCard extends React.Component {
   constructor(props){
       super(props);
       this.state ={
            grp:null,
            cfid:false,
            mfid:false,
            ifid:false,
            mid:null,
            fid:false,
            data:{}
       }
   }

    async componentDidMount(){
        //GET PROPS
        let id = parseInt(this.props.id);
        console.log(id);
        this.setState({grp:id});
        let cat = this.props.cat ? parseInt(this.props.cat) : null;
        let started = this.props.started ? this.props.started : null;
        let ended = this.props.ended ? this.props.ended : null;
        let dt = new Date();
        let firstday = new Date(dt.getFullYear(), dt.getMonth(), 1);
        let lastday = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
        //GET DATE RANGE
        if(started !== null && ended === null )
        {

        }
        else if(started === null && ended !== null )
        {
            
        }
        else if(started === null && ended === null)
        {

        }
        else if(started !== null && ended !== null )
        {


        }
        
        
        if(id === 1)
        {
            //GET ALL CATEGORYS
            let params = {
                data:{},
                cat:'categoryroomall',
                table:'room_categorys'
            }
            await this.props.getRoomcategorys(params);
        }
        if(id === 2)
        {
            //GET ALL ROOMS
            let params = {
                data:{},
                cat:'roomall',
                table:'rooms'
            }
            await this.props.getRooms(params);
        }
        if(id === 3)
        {
            //GET ROOMS BY CATEGORY
            let params = {
                data:{'categoryid':cat},
                cat:'categoryroom',
                table:'rooms'
            }
            await this.props.getRooms(params);
        }
        if(id === 4)
        {
            //GET ALL ROOMS MAINTENANCE HISTORY
            let params = {
                data:{'categoryid':cat},
                cat:'roommaihis',
                table:'room_maintenances'
            }
            await this.props.getRoommaintenances(params);
        }
        if(id === 5)
        {
            //GET ALL ROOMS MAINTENANCE SUMMARY
            let params = {
                data:{'categoryid':cat},
                cat:'roommaista',
                table:'room_maintenances'
            }
            await this.props.getRoommaintenances(params);
        }
        if(id === 6)
        {
            //GET ALL ROOMS OCCUPANCY RATE
            let params = {
                data:{'categoryid':cat},
                cat:'roomsta',
                table:'rooms'
            }
            await this.props.getRooms(params);
        }
        if(id === 7)
        {
            //GET ALL ROOMS INVENTORY SUMMARY
            let params = {
                data:{'categoryid':cat},
                cat:'roominvsta',
                table:'room_inventorys'
            }
            await this.props.getRoominventorys(params);
        }
        
    }
     //EDIT MAINTENANCE
     maintenanceEditForm = id =>{
        this.props.getRoommaintenance({'id':id});
        this.setState({cfid:true, mid:id});
    }
    //DELETE MAINTENANCE
    maintenanceDeleteForm = id =>{
        
        let fd = new FormData();
        fd.append('id', id);
        fd.append('is_delete', 1);
        fd.append('cat', 'update');
        fd.append('table', 'room_maintenances');
        this.props.updateRoommaintenance(fd);
    }
    //ACTIVATE MAINTENANCE
    maintenanceActivateForm = (id, ac) =>{
        let act = ac === 1 ? 0 : 1;
        let fd = new FormData();
        fd.append('id', id);
        fd.append('is_active', act);
        fd.append('cat', 'update');
        fd.append('table', 'room_maintenances');
        this.props.updateRoommaintenance(fd);
    }
     //EDIT INVENTORY
     inventoryEditForm = id =>{
        this.props.getRoominventory({'id':id});
        this.setState({cfid:true, mid:id});
    }
    //DELETE INVENTORY
    inventoryDeleteForm = id =>{
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
                fd.append('table', 'room_inventorys');
                this.props.updateRoominventory(fd);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        
    }
    //ACTIVATE INVENTORY
    inventoryActivateForm = (id, ac) =>{
        let act = ac === 1 ? 0 : 1;
        let fd = new FormData();
        fd.append('id', id);
        fd.append('is_active', act);
        fd.append('cat', 'update');
        fd.append('table', 'room_inventorys');
        this.props.updateRoominventory(fd);
    }
    //EDIT CATEGORY
    categoryEditForm = id =>{
        this.props.getRoomcategory({'id':id});
        this.setState({cfid:true, mid:id});
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
    //EDIT ROOM
    editForm = id =>{
        this.props.getRoom({'id':id});
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
                fd.append('table', 'rooms');
                this.props.updateRoom(fd);
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
        let act = ac === 1 ? 0 : 1;
        let fd = new FormData();
        fd.append('id', id);
        fd.append('is_active', act);
        fd.append('cat', 'update');
        fd.append('table', 'rooms');
        this.props.updateRoom(fd);
    }

    render() {
        let { grp, mfid, ifid, cfid, fid, mid } = this.props.state  || '';
        let data = [];
        if(grp === 1)
        {
            data = this.props.roomcategorys.roomcategorys;
        }
        else if(grp === 2 || grp === 3 || grp === 6)
        {
            data = this.props.rooms.rooms;
        }
        else if(grp === 4 || grp === 5)
        {
            data = this.props.roommaintenances.roommaintenances;
        }
        else if(grp === 7)
        {
            data = this.props.roominventorys.roominventorys;
        }

        let  tabl = data && Array.isArray(data) ? data.map((prop, ind)=>{
            return <RoomRow  
                        num={ind + 1}
                        key={ind} 
                        grp={grp} 
                        data={prop} 
                        invedit={(rid)=>{this.inventoryEditForm(rid)}}
                        invdelete={(rid)=>{this.inventoryDeleteForm(rid)}}
                        invactivate={(rid, act)=>{this.inventoryActivateForm(rid, act)}}
                        maiedit={(rid)=>{this.maintenanceEditForm(rid)}}
                        maidelete={(rid)=>{this.maintenanceDeleteForm(rid)}}
                        maiactivate={(rid, act)=>{this.maintenanceActivateForm(rid, act)}}
                        catedit={(rid)=>{this.categoryEditForm(rid)}}
                        catdelete={(rid)=>{this.categoryDeleteForm(rid)}}
                        catactivate={(rid, act)=>{this.categoryActivateForm(rid, act)}}
                        edit={(rid)=>{this.editForm(rid)}}
                        delete={(rid)=>{this.deleteForm(rid)}}
                        activate={(rid, act)=>{this.activateForm(rid, act)}}
                    />
        }): '';


        return (
            <>
            {mfid ?<FormRoomMaintenance
                st={mfid}
                mid={mid}
                handleClose={()=>this.setState({mid:null, mfid:false})}
            />:''}
             {ifid ?<FormRoomInventory
                st={ifid}
                mid={mid}
                handleClose={()=>this.setState({mid:null, ifid:false})}
            />:''}
            {cfid ?<FormRoomCategory
                st={cfid}
                mid={mid}
                handleClose={()=>this.setState({mid:null, cfid:false})}
            />:''}
            {fid ?<FormRoom
                st={fid}
                mid={mid}
                handleClose={()=>this.setState({mid:null, fid:false})}
            />:''}
              <div className="content">
                  <div className='card'>
                    <table className='table table-bordered' width='100%'>
                        {grp === 1 ? <thead>
                            <tr>
                                <th>SN.</th>
                                <th>NAME</th>
                                <th>ACTION</th>
                            </tr>
                        </thead> :''}
                        {grp === 2 ? <thead>
                            <tr>
                                <th>SN.</th>
                                <th>NAME</th>
                                <th>DESCRIPTION</th>
                                <th>CATEGORY</th>
                                <th>ACTION</th>
                            </tr>
                        </thead> :''}
                        {grp === 3 ? <thead>
                            <tr>
                                <th>SN.</th>
                                <th>NAME</th>
                                <th>DESCRIPTION</th>
                                <th>ACTION</th>
                            </tr>
                        </thead> :''}
                        {grp === 4 ? <thead>
                            <tr>
                                <th>SN.</th>
                                <th>ROOM NAME</th>
                                <th>ISSUE </th>
                                <th>STATUS</th>
                                <th>PENDING</th>
                                <th>ACTION</th>
                            </tr>
                        </thead> :''}
                        {grp === 5 ? <thead>
                            <tr>
                                <th>SN.</th>
                                <th>ROOM NAME</th>
                                <th>NO. OF COMPLETED ISSUES</th>
                                <th>NO. OF ACTIVE ISSUES</th>
                                <th>No. OF CRITICAL ISSUES</th>
                                <th>NO. OF PENDING ISSUES</th>
                                <th>AVERAGE RES. TIME</th>
                                <th>ACTION</th>
                            </tr>
                        </thead> :''}
                        {grp === 6 ? <thead>
                            <tr>
                                <th>SN.</th>
                                <th>ROOM NAME</th>
                                <th>UPTIME(DAYS)</th>
                                <th>DOWNTIME(DAYS)</th>
                                <th>OCCUPANCY RATE</th>
                                <th>MAINTENANCE RATE</th>
                                <th>ACTION</th>
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
    roommaintenances:state.roommaintenanceReducer,
    roominventorys:state.roominventoryReducer,
    rooms:state.roomReducer,
  })
  
export default connect(mapStateToProps, 
    { 
        getRoomcategorys, 
        getRoomcategory, 
        registerRoomcategory,
        updateRoomcategory,
        deleteRoomcategory,
        getRooms, 
        getRoom, 
        registerRoom,
        updateRoom,
        deleteRoom,
        getRoominventorys,
        getRoominventory,
        registerRoominventory,
        updateRoominventory,
        deleteRoominventory,
        getRoommaintenances,
        getRoommaintenance,
        registerRoommaintenance,
        updateRoommaintenance,
        deleteRoommaintenance

    })(BottomCard)
