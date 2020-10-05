import React from "react";
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Link } from "react-router-dom";
import {getInventorycategorys, getInventorycategory, registerInventorycategory, updateInventorycategory, deleteInventorycategory } from './../../actions/inventorycategory';
import {getInventorytypes, getInventorytype, registerInventorytype, updateInventorytype, deleteInventorytype } from './../../actions/inventorytype';
import {getInventorytransactions, getInventorytransaction, registerInventorytransaction, updateInventorytransaction, deleteInventorytransaction } from './../../actions/inventorytransaction';
import FormInventoryCategory from "views/Form/FormInventoryCategory";
import FormInventory from "views/Form/FormInventory";
import InventoryRow from './InventoryRow';
import FormInventoryTransaction from "views/Form/FormInventoryTransaction";

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
        let inventoryid = this.props.inventoryid ? parseInt(this.props.inventoryid) : null;
        let inventoryname = this.props.inventory ? parseInt(this.props.inventoryname) : '';
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
                cat:'categoryinventoryall',
                table:'inventory_categorys'
            }
         
         this.setState({subtopic:'Inventory Categories List'});
         this.props.getInventorycategorys(params);
        }
        if(id === 2)
        {
            //GET ALL INVENTORYS
            let params = {
                data:{},
                cat:'inventoryall',
                table:'inventory_types'
            }
         this.setState({subtopic:'Inventories List'});
         this.props.getInventorytypes(params);
        }
        if(id === 3)
        {
            //GET INVENTORYS BY CATEGORY
            let params = {
                data:{'categoryid':categoryid},
                cat:'categoryinventory',
                table:'inventory_types'
            }
        this.setState({subtopic:categoryname});
         this.props.getInventorytypes(params);
        }
        if(id === 4)
        {
            //GET INVENTORY TRANSACTIONS
            //DATE RANGE NEEDED
            let dt = {
                'starts':started,
                'ends':ended
            }
            let params = {
                data:JSON.stringify(dt),
                cat:'inventorytransaction',
                table:'inventory_transactions'
            }
        let catn = 'Inventory History:' + daterange;
        this.setState({subtopic:catn});
        this.props.getInventorytransactions(params);
        }
        if(id === 5)
        {
            //GET INVENTORY TRANSACTIONS PARTICULAR TYPE
            //DATE RANGE NEEDED
            //INVTORY ID NEEDED
            let dt = {
                'starts':started,
                'ends':ended,
                'inventoryid':inventoryid,
            }
            let params = {
                data:JSON.stringify(dt),
                cat:'inventorytransaction',
                table:'inventory_transactions'
            }
        let catn = 'Inventory History :' + inventoryname + daterange;
        this.setState({subtopic:catn});
        this.props.getInventorytransactions(params);
        }
        if(id === 6)
        {
            //GET INVENTORY TRANSACTION REPORT SUMMARY
            let dt = {
                'starts':started,
                'ends':ended,
                'categoryid':categoryid,
            }
            let params = {
                data: JSON.stringify(dt),
                cat:'inventorytransactionsummary',
                table:'inventory_transactions'
            }
        
        let catn = 'Inventory Report :' + categoryname + daterange;
        this.setState({subtopic:catn});
        this.props.getInventorytransactions(params);
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
        let inventoryid = this.props.inventoryid ? parseInt(this.props.inventoryid) : null;
        let inventoryname = this.props.inventory ? parseInt(this.props.inventoryname) : '';
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
                cat:'categoryinventoryall',
                table:'inventory_categorys'
            }
         
         this.setState({subtopic:'Inventory Categories List'});
         this.props.getInventorycategorys(params);
        }
        if(id === 2)
        {
            //GET ALL INVENTORYS
            let params = {
                data:{},
                cat:'inventoryall',
                table:'inventory_types'
            }
         this.setState({subtopic:'Inventories List'});
         this.props.getInventorytypes(params);
        }
        if(id === 3)
        {
            //GET INVENTORYS BY CATEGORY
            let params = {
                data:{'categoryid':categoryid},
                cat:'categoryinventory',
                table:'inventory_types'
            }
        this.setState({subtopic:categoryname});
         this.props.getInventorytypes(params);
        }
        if(id === 4)
        {
            //GET INVENTORY TRANSACTIONS
            //DATE RANGE NEEDED
            let dt = {
                'starts':started,
                'ends':ended
            }
            let params = {
                data:JSON.stringify(dt),
                cat:'inventorytransaction',
                table:'inventory_transactions'
            }
        let catn = 'Inventory History:' + daterange;
        this.setState({subtopic:catn});
        this.props.getInventorytransactions(params);
        }
        if(id === 5)
        {
            //GET INVENTORY TRANSACTIONS PARTICULAR TYPE
            //DATE RANGE NEEDED
            //INVTORY ID NEEDED
            let dt = {
                'starts':started,
                'ends':ended,
                'inventoryid':inventoryid,
            }
            let params = {
                data:JSON.stringify(dt),
                cat:'inventorytransaction',
                table:'inventory_transactions'
            }
        let catn = 'Inventory History :' + inventoryname + daterange;
        this.setState({subtopic:catn});
        this.props.getInventorytransactions(params);
        }
        if(id === 6)
        {
            //GET INVENTORY TRANSACTION REPORT SUMMARY
            let dt = {
                'starts':started,
                'ends':ended,
                'categoryid':categoryid,
            }
            let params = {
                data: JSON.stringify(dt),
                cat:'inventorytransactionsummary',
                table:'inventory_transactions'
            }
        
        let catn = 'Inventory Report :' + categoryname + daterange;
        this.setState({subtopic:catn});
        this.props.getInventorytransactions(params);
        }
    }
    }
    //EDIT CATEGORY
    categoryEditForm = id =>{
        this.props.getInventorycategory(id);
        this.setState({cfid:true, mid:id});
    }
    //REPORT
    categoryReport = (cid, catname) =>{
        this.setState({id:5});
        //GET ALL INVENTORYS
         //GET INVENTORY TRANSACTIONS PARTICULAR TYPE
            //DATE RANGE NEEDED
            //INVTORY ID NEEDED
            let dt = {
                'starts':this.state.started,
                'ends':this.state.ended,
                'inventoryid':cid,
            }
            let params = {
                data:JSON.stringify(dt),
                cat:'inventorytransaction',
                table:'inventory_transactions'
            }
        let catn = 'Inventory History :' + catname + this.state.daterange;
        this.setState({subtopic:catn});
        this.props.getInventorytransactions(params);
    }
    //EXPAND
    categoryExpand = (cid, catname) =>{
        this.setState({id:3});
        //GET ALL INVENTORYS
        let params = {
            data:{'categoryid':cid},
            cat:'categoryinventory',
            table:'inventory_types'
        }
        this.setState({subtopic: catname});
        this.props.getInventorytypes(params);
    }
    //EXPAND
    categoryAdd = id =>{
        this.props.inventoryAdd(id)
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
                fd.append('table', 'inventory_categorys');
                this.props.updateInventorycategory(fd);
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
        fd.append('table', 'inventory_categorys');
        this.props.updateInventorycategory(fd);
    }
     //ADD A TRANSACTION
    addTransactionForm = id =>{
        this.props.inventoryTransactionAdd(id)
    }
    //EDIT INVENTORY
    editForm = id =>{
        this.props.getInventorytype(id);
        this.setState({fid:true, mid:id});
    }
    //DELETE INVENTORY
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
                fd.append('table', 'inventory_types');
                this.props.updateInventorytype(fd);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        
    }
    //ACTIVATE INVENTORY
    activateForm = (id, ac) =>{
        let act = ac === 0 ? 1 : 0;
        let fd = new FormData();
        fd.append('id', id);
        fd.append('is_active', act);
        fd.append('cat', 'update');
        fd.append('table', 'inventory_types');
        this.props.updateInventorytype(fd);
    }
    //EDIT INVENTORY TRANSACTION
    transactionEditForm = id =>{
        this.props.getInventorytransaction(id);
        this.setState({tfid:true, mid:id});
    }
    //DELETE INVENTORY TRANSACTION
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
                this.props.deleteInventorytransaction(id);
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
            data = this.props.inventorycategorys.inventorycategorys;
        }
        else if(this.state.id === 2 || this.state.id === 3)
        {
            data = this.props.inventorytypes.inventorytypes;
        }
        else if(this.state.id === 4 || this.state.id === 5 )
        {
            data = this.props.inventorytransactions.inventorytransactions;
        }
        else if(this.state.id === 6)
        {
            let d = this.props.inventorytransactions.inventorytransactions && Array.isArray(this.props.inventorytransactions.inventorytransactions) ? this.props.inventorytransactions.inventorytransactions :[];
            let ar = {};
            d.forEach(element => {
                if(element.inventoryid !== null && element.inventoryid !== undefined && parseInt(element.inventoryid) > 0){
                if(element.inventoryid in Object.keys(ar))
                {
                    ar[element.inventoryid][element.status] = parseFloat(element.qty) > 0 ? parseFloat(element.qty) : parseFloat(element.qty)  * -1 ;;
                }else
                {
                    ar[element.inventoryid] = {};
                    ar[element.inventoryid]['id'] = element.inventoryid; 
                    ar[element.inventoryid]['inventoryname'] = element.inventoryname; 
                    ar[element.inventoryid][element.status] = parseFloat(element.qty) > 0 ? parseFloat(element.qty) : parseFloat(element.qty)  * -1 ; 
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
            return <InventoryRow  
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
                return <InventoryRow  
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
            <FormInventoryTransaction
                st={tfid}
                mid={mid}
                handleClose={()=>this.setState({mid:null, tfid:false})}
            />:''}
            {cfid === true? 
            <FormInventoryCategory
                st={cfid}
                mid={mid}
                handleClose={()=>this.setState({mid:null, cfid:false})}
            />:''}
            {fid ?
            <FormInventory
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
    inventorycategorys:state.inventorycategoryReducer,
    inventorytypes:state.inventorytypeReducer,
    inventorytransactions:state.inventorytransactionReducer,
  })
  
export default connect(mapStateToProps, 
    { 
        getInventorycategorys, 
        getInventorycategory, 
        registerInventorycategory,
        updateInventorycategory,
        deleteInventorycategory,
        getInventorytypes, 
        getInventorytype, 
        registerInventorytype,
        updateInventorytype,
        deleteInventorytype,
        getInventorytransactions, 
        getInventorytransaction, 
        registerInventorytransaction,
        updateInventorytransaction,
        deleteInventorytransaction
    })(BottomCard)
