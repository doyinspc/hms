import React from "react";
import { connect } from "react-redux";
// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import IndexHeader from "../components/Headers/IndexHeader.js";
import DarkFooter from "../components/Footer/DarkFooter.js";


import CompleteExamples from "./index-sections/CompleteExamples.js";
import SignUp from "./index-sections/SignUp.js";
import Examples from "./index-sections/Examples.js";
import Download from "./index-sections/Download.js";
import FormLogin from "./Form/FormLogin.js";
import { getUserLogout } from "./../actions/user";

function Index(props) {
  const [sid, setSid] = React.useState(false); 
  const [email, setEmail] = React.useState('');
  const logOut = () =>{
      props.getUserLogout();
  }
 
  return (
    <>
    {sid === true ? <FormLogin st={sid} handleClose={()=>setSid(false)} />:''}
    <div style={{margin:'-7px'}}>
       <IndexNavbar 
            login={(tr)=>setSid(tr)} 
            logout={()=>logOut()} 
          />
      <div className="wrappers">
        <IndexHeader 
            login={(tr)=>setSid(tr)}
            />
        <div className="main">
          <CompleteExamples />
          <SignUp  />
          <Download />
        </div>
        <DarkFooter />
      </div>
      </div>
    </>
  );
}
const mapStateToProps = () =>{

}
export default connect(mapStateToProps, {getUserLogout})(Index);
