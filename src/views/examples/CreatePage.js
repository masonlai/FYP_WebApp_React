
import React from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

function CreatePage() {

  return (
    <>
      <div
        style={{
          backgroundRepeat:'repeat',
          backgroundImage:
            "url(" + require("assets/img/full-bloom.png") + ")",
          minHeight: '100vh',
          maxHeight: '999px',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',

        }}
      >
        <div></div>
      </div>

     </>
  );
}

export default CreatePage;
