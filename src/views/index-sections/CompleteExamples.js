import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function CompleteExamples() {
  return (
    <>
      <div className="section">
        <Container className="text-center">
          <Row className="justify-content-md-center">
            <Col lg="8" md="12">
              <h2 className="title" style={{fontFamily:'Kaushan Script', textTransform:'none'}}>Welcome to SIL HMS</h2>
              <h5 className="description">
                With so much competition in the hospitality space, hotels must do more to show guests they’re the number one choice. 
                StreSERT Integrated Limited Hotels stands are keen on optimizing guest satisfaction at all its hotels. .
              </h5>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default CompleteExamples;
