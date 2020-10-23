import React from "react";
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Link, NavLink } from "react-router-dom";
import {getUsercategorys, getUsercategory, registerUsercategory, updateUsercategory, deleteUsercategory } from './../../actions/usercategory';
import {getUsertypes, getUsertype, registerUsertype, updateUsertype, deleteUsertype } from './../../actions/usertype';
import {getUsertransactions, getUsertransaction, registerUsertransaction, updateUsertransaction, deleteUsertransaction } from './../../actions/usertransaction';
import FormUserCategory from "views/Form/FormUserCategory";
import FormUser from "views/Form/FormUser";
import UserRow from './UserRow';
import FormUserTransaction from "views/Form/FormUserTransaction";
import FormUserAccess from "views/Form/FormUserAccess";

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

    componentDidMount(){
        //GET PROPS
        let id = parseInt(this.props.id);
        let categoryid = this.props.categoryid ? parseInt(this.props.categoryid) : null;
        let categoryname = this.props.category ? parseInt(this.props.categoryname) : '';
        let userid = this.props.userid ? parseInt(this.props.userid) : null;
        let username = this.props.user ? parseInt(this.props.username) : '';
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
                cat:'categoryuserall',
                table:'user_categorys'
            }
         
         this.setState({subtopic:'User Categories List'});
         this.props.getUsercategorys(params);
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
        let userid = this.props.userid ? parseInt(this.props.userid) : null;
        let username = this.props.user ? parseInt(this.props.username) : '';
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
                cat:'categoryuserall',
                table:'user_categorys'
            }
         
         this.setState({subtopic:'User Categories List'});
         this.props.getUsercategorys(params);
        }
        
    }
    }
    //EDIT CATEGORY
    categoryEditForm = (id, dat) =>{
        this.props.getUsercategory(id);
        this.setState({cfid:true, mid:id});
    }
    //REPORT
    categoryReport = (cid, catname) =>{
        this.setState({id:5});
        //GET ALL USERS
         //GET USER TRANSACTIONS PARTICULAR TYPE
            //DATE RANGE NEEDED
            //INVTORY ID NEEDED
            let dt = {
                'starts':this.state.started,
                'ends':this.state.ended,
                'userid':cid,
            }
            let params = {
                data:JSON.stringify(dt),
                cat:'usertransaction',
                table:'user_transactions'
            }
        let catn = 'User History :' + catname + this.state.daterange;
        this.setState({subtopic:catn});
        this.props.getUsertransactions(params);
    }
    //EXPAND
    categoryExpand = (cid, catname) =>{
        this.setState({id:3});
        //GET ALL USERS
        let params = {
            data:{'categoryid':cid},
            cat:'categoryuser',
            table:'user_types'
        }
        this.setState({subtopic: catname});
        this.props.getUsertypes(params);
    }
    //EXPAND
    categoryAdd = (id, dat) =>{
        this.props.userAdd(id)
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
                fd.append('table', 'user_categorys');
                this.props.updateUsercategory(fd);
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
        fd.append('table', 'user_categorys');
        this.props.updateUsercategory(fd);
    }
     //ADD A TRANSACTION
    addTransactionForm = id =>{
        this.props.userTransactionAdd(id)
    }
    //EDIT USER
    editForm = id =>{
        this.props.getUsertype(id);
        this.setState({fid:true, mid:id});
    }
    //EDIT USER
    accessForm = (id, data) =>{
        this.props.getUsertype(id);
        this.setState({afid:true, mid:id, data:data});
    }
    //DELETE USER
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
                fd.append('table', 'user_types');
                this.props.updateUsertype(fd);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        
    }
    //ACTIVATE USER
    activateForm = (id, ac) =>{
        let act = ac === 0 ? 1 : 0;
        let fd = new FormData();
        fd.append('id', id);
        fd.append('is_active', act);
        fd.append('cat', 'update');
        fd.append('table', 'user_types');
        this.props.updateUsertype(fd);
    }
    //EDIT USER TRANSACTION
    transactionEditForm = id =>{
        this.props.getUsertransaction(id);
        this.setState({tfid:true, mid:id});
    }
    //DELETE USER TRANSACTION
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
                this.props.deleteUsertransaction(id);
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
        let { cfid, mid, isshown } = this.state  || '';
        let data = this.props.usercategorys.usercategorys;
        let tabl = data && Array.isArray(data) ? data.map((prop, ind)=>{
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
                                    <a onClick={()=>this.categoryReport(prop.id, prop)} href='#'><i className='fa fa-file'></i></a>
                                    <NavLink to={`/account/users/${prop.id}`}><i className='fa fa-list'></i></NavLink>
                                    <a onClick={()=>this.categoryActivateForm(parseInt(prop.id), parseInt(prop.is_active))} href='#'>{<i className= {parseInt(prop.is_active) === 0 ? "fa fa-thumbs-up" : "fa fa-thumbs-down"}></i>}</a>
                                    <a onClick={()=>this.categoryAdd(prop.id, prop)} href='#'><i className='now-ui-icons ui-1_simple-add'></i></a>
                                    <a onClick={()=>this.categoryEditForm(prop.id, prop)} href='#'><i className='fa fa-edit'></i></a>
                                    <a onClick={()=>this.categoryDeleteForm(prop.id, prop)} href='#'><i className='now-ui-icons ui-1_simple-remove'></i></a>
                                </span>
                            : ''}
                            

                        </td>
                        <td className='text-center' style={{maxWidth:'10px'}} >{prop.qty}</td>
                    </tr>
                }): '';
        


        return (
            <>
            
            {cfid === true? 
            <FormUserCategory
                st={cfid}
                mid={mid}
                handleClose={()=>this.setState({mid:null, cfid:false})}
            />:''}
            
              <div className="content">
                  <div className='card'>
                  <div className='card-header tablecardheader'>
                  <h4 className='cardtitl'>Departments</h4>
                  </div>
                  <div className='card-body table-responsive'>
                    <table className=' table-bordered display nowrap table-striped mytables table-condensed table-hover' id='myTables' width='100%'>
                        <thead>
                            <tr>
                                <th style={{maxWidth:'10px'}}>SN.</th>
                                <th>Departments</th>
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
    user:state.userReducer.user,
    usercategorys:state.usercategoryReducer
  })
  
export default connect(mapStateToProps, 
    { 
        getUsercategorys, 
        getUsercategory, 
        registerUsercategory,
        updateUsercategory,
        deleteUsercategory,
        getUsertypes
    })(BottomCard)
