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
import $ from "jquery";
// import dt from  "datatables.net";
// import "datatables.net-buttons-dt/css/buttons.dataTables.css";
// import "datatables.net-bs";
// import buttons from "datatables.net-buttons-bs";

// import $ from 'jquery'
// window.jQuery = window.$ = $
// // import JSZip from 'jszip'
// // window.JSZip = JSZip
// // import 'pdfmake'
// import DataTable from 'datatables.net-bs'
// dataTable(window, $)
// import buttons from "datatables.net-buttons-bs";
// buttons(window, $)
// import columnVisibility from 'datatables.net-buttons/js/buttons.colVis.js'
// columnVisibility(window, $)
// import buttonsHtml5 from 'datatables.net-buttons/js/buttons.html5.js'
// buttonsHtml5(window, $)
// import buttonsPrint from 'datatables.net-buttons/js/buttons.print.js'
// buttonsPrint(window, $)
// // import colReorder from 'datatables.net-colreorder-bs4'
// colReorder(window, $)
// import fixedColumns from 'datatables.net-fixedcolumns-bs4'
// fixedColumns(window, $)
// import scroller from 'datatables.net-scroller-bs4'
// scroller(window, $)

// dt(window. $);
// require("datatables.net-buttons/js/buttons.colVis.js"); // Column visibility
// require("datatables.net-buttons/js/buttons.html5.js"); // HTML 5 file export
// require("datatables.net-buttons/js/buttons.flash.js"); // Flash file export
// require("datatables.net-buttons/js/buttons.print.js"); // Print view button
// require("datatables.net-buttons")(window, $);
// require("datatables.net-buttons/js/buttons.print.js")(window, $);
// require("datatables.net-buttons/js/buttons.colVis.js")(window, $);
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
        let id = this.props.id;
        let userid = this.props.userid ? parseInt(this.props.userid) : null;
        let username = this.props.user ? parseInt(this.props.username) : '';
        let choicestarted = this.props.choicestarted ? this.props.choicestarted : null;
        let choiceended = this.props.choiceended ? this.props.choiceended : null;
        let started = this.props.defaultstarted ? this.props.defaultstarted : null;
        let ended = this.props.defaultended ? this.props.defaultended : null;
        this.$el = $(this.el);
        if(choicestarted !== null && choiceended !== null && choiceended > choicestarted)
        {
            started = choicestarted;
            ended = choiceended;
        }

        let daterange = ' '+moment(started).format('MMMM Do YYYY') + ' - ' + moment(ended).format('MMMM Do YYYY');
        
        this.setState({
            id:id, 
            cat:id,
            started:started,
            ended:ended,
            daterange:daterange
        });
            
            let catname = this.props.usercategorys.usercategorys && Array.isArray(this.props.usercategorys.usercategorys) && this.props.usercategorys.usercategorys.length > 0 ? this.props.usercategorys.usercategorys.filter(rw=>parseInt(rw.id) === parseInt(id))[0] : {'name':'None'}
            //GET ALL CATEGORYS
            let res = {};
            let ctn = '';
            if(id === 'active'){
                res = {'is_active':0, 'is_delete':0};
                ctn = 'All Active Staff';
            }
            else if(id === 'inactive'){
                res = {'is_active':1, 'is_delete':0};
                ctn = 'All Deactivated Staff';
            }
            else if(id === 'delete'){
                res = {'is_delete':1}
                ctn = 'Deleted Staff';
            }
            else if(parseInt(id) > 0){
                res = {'categoryid':id, 'is_delete':0};
                ctn = catname !== undefined ? catname.name :'None'
            }
            let params = {
                data:JSON.stringify(res),
                cat:'categoryuser',
                table:'user_types'
            }
         
         this.setState({subtopic:ctn});
         this.props.getUsertypes(params);

           // $('#myTablesStaff').DataTable();
         
            
            

    }
     componentDidUpdate(prevProps, prevState){
        //GET PROPS
        if(prevProps.id !== this.props.id){
        let id = this.props.id;
        let userid = this.props.userid ? parseInt(this.props.userid) : null;
        let username = this.props.user ? parseInt(this.props.username) : '';
        let choicestarted = this.props.choicestarted ? this.props.choicestarted : null;
        let choiceended = this.props.choiceended ? this.props.choiceended : null;
        let started = this.props.defaultstarted ? this.props.defaultstarted : null;
        let ended = this.props.defaultended ? this.props.defaultended : null;
        this.$el = $(this.el);
        if(choicestarted !== null && choiceended !== null && choiceended > choicestarted)
        {
            started = choicestarted;
            ended = choiceended;
        }

        let daterange = ' '+moment(started).format('MMMM Do YYYY') + ' - ' + moment(ended).format('MMMM Do YYYY');
        
        this.setState({
            id:id, 
            cat:id,
            started:started,
            ended:ended,
            daterange:daterange
        });
            
            let catname = this.props.usercategorys.usercategorys && Array.isArray(this.props.usercategorys.usercategorys) && this.props.usercategorys.usercategorys.length > 0 ? this.props.usercategorys.usercategorys.filter(rw=>parseInt(rw.id) === parseInt(id))[0] : {'name':'None'}
            //GET ALL CATEGORYS
            let res = {};
            let ctn = '';
            if(id === 'active'){
                res = {'is_active':0, 'is_delete':0};
                ctn = 'All Active Staff';
            }
            else if(id === 'inactive'){
                res = {'is_active':1, 'is_delete':0};
                ctn = 'All Deactivated Staff';
            }
            else if(id === 'delete'){
                res = {'is_delete':1}
                ctn = 'Deleted Staff';
            }
            else if(parseInt(id) > 0){
                res = {'categoryid':id, 'is_delete':0};
                ctn = catname !== undefined ? catname.name :'None'
            }
            let params = {
                data:JSON.stringify(res),
                cat:'categoryuser',
                table:'user_types'
            }
         
         this.setState({subtopic:ctn});
         this.props.getUsertypes(params);

           // $('#myTablesStaff').DataTable();
         
        }
            

    }
   
    
    //EDIT USER
    editForm = (id, dat) =>{
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
        let { cfid, afid, mid, isshown, subtopic } = this.state  || '';
        let data = this.props.usertypes.usertypes;
        let tabl = data && Array.isArray(data) ? data.map((prop, ind)=>{
            let fullname = prop.title+" "+prop.surname+" "+prop.firstname+" "+prop.middlename;
            return <tr 
            key={ind}
                        style={{padding:'1px', margin:'0px'}}
                        onMouseEnter={()=>this.loadShown(prop.id, 0)}
                        onMouseLeave={()=>this.loadShown(prop.id, 1)}
                        >
                        <td className='text-center' width='10px' data-col-width='4' style={{maxWidth:'10px'}}>{ind + 1}</td>
                        <td className='text-left'>{prop.categoryname}</td>
                        <td className='text-left'>{prop.categoryname}</td>
                        <td className='text-left'>{prop.employment_no}</td>
                        <td className='text-left' style={{textTransform:'capitalize'}}>
                             {parseInt(prop.is_active) === 0 ? fullname : <strike>{fullname}</strike>}
                             { prop.id in isshown && isshown[prop.id] === true ? 
                                <span className='reportcontrol pull-right'>
                                    <a onClick={()=>this.accessForm(parseInt(prop.id), prop)} title='Access Level' href='#'><i className='fa fa-lock'></i></a>           
                                    <a onClick={()=>this.activateForm(parseInt(prop.id), parseInt(prop.is_active))} title='Block/Unblock' href='#'>{<i className= {parseInt(prop.is_active) === 0 ? "fa fa-thumbs-up" : "fa fa-thumbs-down"}></i>}</a>
                                    <a onClick={()=>this.editForm(prop.id, prop)} title='Edit' href='#'><i className='fa fa-edit'></i></a>
                                    <a onClick={()=>this.deleteForm(prop.id, prop)} title='Delete' href='#'><i className='now-ui-icons ui-1_simple-remove'></i></a>
                                </span>
                            : ''}
                        </td>
                        <td className='text-left' style={{textTransform:'capitalize'}} >{prop.office}</td>
                        <td className='text-center'  >{moment(prop.dob).format("DD/MM/YYYY")}</td>
                        <td className='text-center'  >{moment(prop.dob).subtract().format("DD/MM/YYYY")}</td>
                        <td className='text-center'  >{moment(prop.doe).format("DD/MM/YYYY")}</td>
                        <td className='text-center'  >{moment(prop.doe).format("DD/MM/YYYY")}</td>
                        <td className='text-center' >{parseInt(prop.gender) === 1 ? 'Male' : 'Female'}</td>
                        <td className='text-center' ><a href={`tel:${prop.phone1}`}>{prop.phone1}</a>{" "}<a href={`tel:${prop.phone2}`}>{prop.phone2}</a></td>
                        <td className='text-center' ><a href={`mailto:${prop.email}`}>{prop.email}</a></td>
                        <td className='text-left' style={{textTransform:'capitalize'}} >{prop.address}</td>
                    </tr>
                }): '';
        


        return (
            <>
            
            {cfid === true ? 
            <FormUserCategory
                st={cfid}
                mid={mid}
                handleClose={()=>this.setState({mid:null, cfid:false})}
            />:''}
            {afid === true ? 
            <FormUserAccess
                st={afid}
                mid={mid}
                data={this.state.data}
                handleClose={()=>this.setState({mid:null, afid:false})}
            />:''}
              <div className="content">
                  <div className='card'>
                  <div className='card-header tablecardheader'>
                  <h4 className='cardtitl'>{subtopic}</h4>
                  </div>
                  <div className='card-body table-responsive'>
                    <table ref={el=>this.el = el} className='table-bordered display wrap table-striped mytables table-condensed table-hover'  id='myTablesStaff' width='100%' >
                        <thead>
                            <tr>
                                <th style={{maxWidth:'10px'}}>SN.</th>
                                <th>Department</th>
                                <th>Location</th>
                                <th>Employment ID</th>
                                <th>Fullname</th>
                                <th>Designation</th>
                                <th>Empl. Date</th>
                                <th>Service Yrs.</th>
                                <th>Birth Date</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Phone No.</th>
                                <th>Email</th>
                                <th>Contact Address</th>
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
    usercategorys:state.usercategoryReducer,
    usertypes:state.usertypeReducer
  })
  
export default connect(mapStateToProps, 
    { 
        getUsertypes,
        getUsertype,
        updateUsertype,
        registerUsertype,
        deleteUsertype
    })(BottomCard)
