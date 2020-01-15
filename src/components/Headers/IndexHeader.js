
import React from "react";

// reactstrap components
import {
    Container,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup, FormGroup, Col, Button,
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
              <div className='row'>
              <div className='col-sm-12 col-lg-2'>
                <Button color="primary" block outline type="button" className="mr-1">
                  Regular
                </Button>
              </div>
              <div className="offset-lg-8 col-sm-12 col-lg-2">
                <Button color="primary" block outline type="button" className="mr-1">
                  Regular
                </Button>
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
