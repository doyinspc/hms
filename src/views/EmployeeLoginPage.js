import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { userLogin } from "./../actions/user";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row
} from "reactstrap";

// core components

const SignUp = (props) => {
  const [emailFocus, setEmailFocus] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [islog, setIslog] = React.useState(false);

  

  const onSubmit = e => {
    setIslog(true);
     // if(password && email)
     // {
     //   let fd = new FormData();
     //   fd.append('username', email);
     //   fd.append('password', password);
     //   fd.append('cat' , 'login');
     //   fd.append('table' , 'user_types');
     //   props.userLogin(fd);
     // }
  };
  if (props.user.isAuthenticated  || islog === true) {
    return <Redirect to="/account/home" />;
  }

 
  return (
    <>
      <div 
        className="section section-signup"
        style={{
          backgroundImage: "url(" + process.env.REACT_APP_BG + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: "700px"
        }}
      >
         <h3 className='text-light m-auto' style={{textAlign:'center'}}> {process.env.REACT_APP_WEBSITE_NAME}</h3>
          <Container>
            <Col className="ml-auto mr-auto" md="5">
           
            
              <Card className="card-login card-plain">
                <Form action="" className="form" method="" onSubmit={onSubmit}>
                  <CardHeader className="text-center">
                    <div className="logo-container" style={{ marginBottom:5 }}>
                      <img
                        alt="..."
                        src={require("assets/img/logo.png")}
                        height='100px'
                      ></img>
                    </div>
                  
                  <h5 className='text-light'> <b>HMS</b> Staff <b>Login</b></h5>
                  </CardHeader>
                  <CardBody style={{ marginTop:5 }}>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (emailFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="text"
                        name="email"
                        defaultValue={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(true)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (passwordFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password.."
                        type="password"
                        name="password"
                        defaultValue={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(true)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      type="submit"
                      size="lg"
                    >
                      Login
                    </Button>
                    <div className="pull-left">
                      
                    </div>
                  </CardFooter>
                </Form>
              </Card>
              
            </Col>
          </Container>
        
      </div>
    </>
  );
}
const mapStateToProps=(state)=>({
  user:state.userReducer.user
})
export default connect(mapStateToProps,{userLogin})(SignUp);
