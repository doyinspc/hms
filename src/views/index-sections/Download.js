import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

// core components

function Download() {
  return (
    <>
      <div
        className="section section-download"
        data-background-color="black"
        id="download-section"
      >
        <Container sm='12'>
         
          <Row className="text-left mt-5 ml-auto mr-auto justify-content-center align-items-center">
          <Col className="text-center" lg="12" md="12">
              <h3>Contact Us</h3>
            </Col>
          <Row className="text-left mt-0 ml-auto mr-auto justify-content-center align-items-center">
            <Col className="ml-3 mr-3" md="3" sm="12" style={{borderRight:'solid 1px #ccc'}}>
              <h2><i className='fa fa-bed'></i> Jebba</h2>
              <p className="description text-left">
                1600 Pennsylvania Avenue NW in Washington, D.C.
              </p>
               <p className="description text-left">
                <i className='fa fa-phone'></i>{"  " }<a href="tel:">234800000000</a>
              </p>
              <p className="description text-left">
                <i className='fa fa-envelope'></i>{"   "}<a href="mainto:">infosiljebba@silhms.com</a>
              </p>
            </Col>
            <Col className="ml-3 mr-3" md="3" sm="12" style={{borderRight:'solid 1px #ccc'}}>
              <h2><i className='fa fa-bed'></i> Kainji</h2>
              <p className="description text-left">
                Yakubu Gowon Crescent, The Three Arms Zone, Asokoro, Abuja, FCT, Nigeria
              </p>
              <p className="description text-left">
                <i className='fa fa-phone'></i>{"   "}<a href="tel:">234800000000</a>
              </p>
              <p className="description text-left">
                <i className='fa fa-envelope'></i>{"   "}<a href="mainto:">infosilkainji@silhms.com</a>
              </p>
            </Col>
            <Col className="ml-3 mr-3" md="3" sm="12">
              <h2><i className='fa fa-university'></i> HQ</h2>
              <p className="description text-left">
                Yakubu Gowon Crescent, The Three Arms Zone, Asokoro, Abuja, FCT, Nigeria
              </p>
              <p className="description text-left">
                <i className='fa fa-phone'></i>{"   "}<a href="tel:">234800000000</a>
              </p>
              <p className="description text-left">
                <i className='fa fa-envelope'></i>{"   "}<a href="mainto:">infosilkainji@silhms.com</a>
              </p>
            </Col>
            </Row>
          </Row>
          <br></br>
          <br></br>
          <Row className="justify-content-md-center sharing-area text-center">
            <Col className="text-center" lg="8" md="12">
              <h3>Follow Us on Social Media!</h3>
            </Col>
            <Col className="text-center" lg="8" md="12">
              <Button
                className="btn-outline-dark btn-icon btn-round"
                color="twitter"
                href=""
                id="tooltip86114138"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip86114138">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-outline-dark btn-icon btn-round"
                color="facebook"
                href=""
                id="tooltip735272548"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-facebook"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip735272548">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-outline-dark btn-icon btn-round"
                color="linkedin"
                href=""
                id="tooltip647117716"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-linkedin"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip647117716">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-outline-warning btn-icon btn-round"
                color="instagram"
                href=""
                id="tooltip6471177161"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-instagram"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip6471177161">
                Follow us
              </UncontrolledTooltip>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Download;
