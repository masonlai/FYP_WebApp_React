import React, {useState} from "react";
import {Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, Row} from "reactstrap";

function MessageModal() {
  const [modal, setModal] = useState(true);
  const toggleModal = () => {
    setModal(!modal);
      };
    return(
        <>
            {/* Modal */}
              <Modal isOpen={modal} toggle={toggleModal}>
                <div className="modal-header card-register" style={{borderRadius: '8px 8px 0 0'}}>
                  <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={toggleModal}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                  <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                  >
                    Message Box
                  </h5>
                </div>
                <div className="modal-body card-register" style={{borderRadius: '0 0 8px 8px'}}>
        <Container>

        </Container>
                </div>
              </Modal>
            </>
    )
};

export default MessageModal;