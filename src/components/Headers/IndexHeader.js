
import React from "react";
import SignUpModal from "components/Modal/SignUpModal.js";
import {
    Link,
} from "react-router-dom";
// reactstrap components
import {
    Container,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup, FormGroup, Col, Button, Modal, Row, Card, Form,
} from "reactstrap";



function IndexHeader() {

  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/a.jpg") + ")"
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand row">
             <FormGroup>
                <Input placeholder="Searching a page" type="text" />
              </FormGroup>

              <div className="fog-low" style={{pointerEvents: 'none'}}>
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div>
              <div className="fog-low right" style={{pointerEvents: 'none'}}>
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div>
            </div>
            <h2 className="presentation-subtitle text-center">
              Here for you to commemorate deceased a online worship system
            </h2>
              <div className='row' style={{marginTop: '4em'}}>
              <div className='offset-lg-1 col-sm-12 col-lg-3'>
                 <Link to='/craetePage'>
                <Button color="primary" block outline type="button" className="mr-1" size="lg">
                  Tutorial
                </Button></Link>
              </div>
              <div className="offset-lg-4 col-sm-12 col-lg-3">
                  <SignUpModal />
              </div>
              </div>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("assets/img/clouds.png") + ")",pointerEvents: 'none'
          }}
        />

      </div>

    </>
  );
}

export default IndexHeader;
