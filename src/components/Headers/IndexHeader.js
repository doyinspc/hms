/*eslint-disable*/
import React from "react";
import Animate from 'animate.css-react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// reactstrap components
import { Container } from "reactstrap";
// core components

function IndexHeader(props) {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
    
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/header.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container className='pagemaker'>

           
          <div className="content-center brand" style={{padding:'15px' , backgroundColor:'rgba(0, 0, 0, 0.4)', borderRadius:'10px'}}>
          <Animate
                appear="fadeIn"
                durationAppear={2000}
                component="div" >
            <img
              alt="silhms"
              className="n-logo"
              height='100px'
              src={require("assets/img/logo.png")}
            />
            </Animate>
            <Animate
                appear="fadeInDown"
                durationAppear={3000}
                component="div" >
            <h1 className="h1-seo" style={{fontFamily:'Kaushan Script', textTransform:'lowercase'}}>{process.env.REACT_APP_WEBSITE_AKA}</h1>
            </Animate>
             <Animate
                appear="fadeInDown"
                durationAppear={4000}
                component="div" >
            <h3>{process.env.REACT_APP_WEBSITE_NAME}.</h3>
            <a href='#booking' className='btn btn-round btn-lg btn-warning'><i className="now-ui-icons files_paper"></i> <b>Guest Booking</b></a>
            {props.user.isAuthenticated ? <Link to='/account/home' className='btn btn-round btn-lg btn-outline-secondary'><i className="now-ui-icons users_single-02"></i> {props.user.user.surname} Login</Link>: <a href='#' onClick={()=>props.login(true)} className='btn btn-round btn-lg btn-outline-secondary'><i className="now-ui-icons ui-1_lock-circle-open"></i> Staff login</a>}
              </Animate>
          </div>
          
        </Container>
      </div>
    </>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    user:state.userReducer
})
  
export default connect(mapStateToProps, {})(IndexHeader);
