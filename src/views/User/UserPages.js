import React from "react";
import {connect} from "react-redux";
import moment from "moment";
import Container from "reactstrap/lib/Container";
import HomeTopCard from "./../HomeTopCard";
import UserBottomCard from "./BottomData";
import FormUser from './../Form/FormUser';
import FormUserCategory from './../Form/FormUserCategory';
import FormUserTransaction from './../Form/FormUserTransaction';

class UserPages extends React.Component {
	 constructor(props){
        super(props);
        this.state ={
        addbooking : false, 
  			numbooking : null, 
  			bookingroomid : null, 
  			bookingroomdata : {}, 
  			bookingroomdate : new Date(), 
  			defaulttoday:new Date(),
        defaultstarted:null,
        defaultended:null,
  			choicestarted : new Date(),
  			choiceended : new Date(),
  			userid: null,
        username:'',
        adduser:false,
      	addusercategory:false,
      	addusertransaction:false,
      	numuser:null,
      	numusercategory:null,
      	numusertransaction:null,
      	categoryid:null,
        categoryname:''
        }
     }

     
     componentDidMount()
     {
      console.log(this.props);
	      let dt = new Date();
	      let firstday = new Date(dt.getFullYear(), dt.getMonth(), 1);
	      let lastday = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
	      this.setState({
	         defaultstarted: moment(firstday).format("YYYY-MM-DD"),
	         defaultended: moment(lastday).format("YYYY-MM-DD")
	      })
     }
    


	render(){
		let { 
				addbooking, 
				numbooking, 
				bookingroomid, 
				bookingroomdata, 
				bookingroomdate,
				choicestarted,
				choiceended,
				defaultstarted,
    		defaultended,
    		userid,
        username,
        adduser,
      	addusercategory,
      	addusertransaction,
      	numuser,
      	numusercategory,
      	numusertransaction,
      	categoryid,
    		categoryname

			 } = this.state || '';

  
		return(
			<>
			{adduser ? <FormUser st={adduser} st1={numuser} handleClose={()=>this.setState({adduser:false})} />:''}
            {addusercategory ? <FormUserCategory st={addusercategory} st1={numusercategory} handleClose={()=>this.setState({addusercategory:false})} />:''}
            {addusertransaction ? <FormUserTransaction st={addusertransaction} st1={numusertransaction} handleClose={()=>this.setState({addusertransaction:false})} /> : ''}
			<Container style={{position:'relative'}}>
                <>
                <div style={{minHeight:'50px'}}>
                </div>
                  <HomeTopCard  
                      id={0}
                      title={'Staff '}
                      icon={'fa fa-user'}
                      handleBooking={(roomid, roomdata, roomdate, rowid)=>this.setState({
                          addbooking:true,
                          numbooking:rowid,
                          bookingroomid:roomid,
                          bookingroomdata:roomdata,
                          bookingroomdate:roomdate
                      })}
                      setDate={(start, end)=>this.setState({choicestarted:start, choiceended:end})}
                      />
                  <UserBottomCard 
                      id={this.props.ids}
                      categoryid={categoryid}
                      categoryname={categoryname}
                      userid={this.props.user.id}
                      username={this.props.user.surname}
                      choicestarted={choicestarted}
                      choiceended={choiceended}
                      defaultstarted={defaultstarted}
                      defaultended={defaultended}
                      userAdd={(rid)=>this.setState({adduser:true, numuser:rid})}
                      userTransactionAdd={(rid)=>this.setState({addusertransaction:true, numusertransaction:rid})}
                      />
                </>
             </Container>
             </>

		)
	}

}
const mapStateToProps = (state, ownProps) =>({
  ids: ownProps.match.params.id,
  user: state.userReducer.user
})
export default connect(mapStateToProps, {})(UserPages);