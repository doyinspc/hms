import React from "react";
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Link } from "react-router-dom";
import {getRoomcategorys, getRoomcategory, registerRoomcategory, updateRoomcategory, deleteRoomcategory } from './../../actions/roomcategory';
import {getRoomtypes, getRoomtype, registerRoomtype, updateRoomtype, deleteRoomtype } from './../../actions/roomtype';
import {getRoomtransactions, getRoomtransaction, registerRoomtransaction, updateRoomtransaction, deleteRoomtransaction } from './../../actions/roomtransaction';

import RoomRow1 from './RoomRow1';

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
            //GET ROOM TRANSACTIONS
            //DATE RANGE NEEDED
            let dt = {
                'starts':started,
                'ends':ended
            }
            let params = {
                data:JSON.stringify(dt),
                cat:'guestroomtransaction',
                table:'room_transactions'
            }
        let catn = 'Guest List:' + daterange;
        this.setState({subtopic:catn});
        this.props.getRoomtransactions(params);
        }
        if(id === 2)
        {
            //GET ROOM TRANSACTIONS
            //DATE RANGE NEEDED
            let dt = {
                'starts':started,
                'ends':ended,
                'roomid':roomid
            }
            let params = {
                data:JSON.stringify(dt),
                cat:'guestroomtransaction',
                table:'room_transactions'
            }
        let catn = 'Guest List:' + daterange;
        this.setState({subtopic:catn});
        this.props.getRoomtransactions(params);
        }
        if(id === 3)
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
                cat:'guestroomtransactionsummry',
                table:'room_transactions'
            }
        let catn = 'Guest History :' + roomname + daterange;
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
   
    
    render() {
        let { tfid, cfid, fid, mid } = this.state  || '';
        let data = [];
        
        if(this.state.id === 1 || this.state.id === 2 )
        {
            data = this.props.roomtransactions.roomtransactions;
        }
        else if(this.state.id === 3)
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
            
        }
        let arrarr = [1, 2, 3];
        let  tabl = '';
        if(arrarr.includes(this.state.id)){
           tabl = data && Array.isArray(data) ? data.map((prop, ind)=>{
            return <RoomRow1  
                        num={ind + 1}
                        key={ind} 
                        id={this.state.id} 
                        data={prop} 
                       
                    />
        }): '';
        }


        return (
            <>
           
              <div className="content">
              <span class='h4'>{this.state.subtopic}</span>
            
                  <div className='card'>
                    <table className='table table-bordered' id='table' width='100%'>
                        {this.state.id === 1 ? <thead>
                            <tr>
                                <th width='60px'>SN.</th>
                                <th>GUEST NAME</th>
                                <th>PHONE NO.</th>
                                <th>IDENTIFICATION</th>
                                <th>ROOM</th>
                                <th width='260px'>ACTION</th>
                            </tr>
                        </thead> :''}
                        {this.state.id === 2 ? <thead>
                            <tr>
                                <th>DATE</th>
                                <th>GUEST NAME</th>
                                <th>PHONE NO.</th>
                                <th>CATEGORY</th>
                                <th width='260px'>ACTION</th>
                            </tr>
                        </thead> :''}
                        {this.state.id === 3 ? <thead>
                            <tr>
                                <th>GUEST NAME</th>
                                <th>PHONE</th>
                                <th>VISIT</th>
                                <th width='260px'>ACTION</th>
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
