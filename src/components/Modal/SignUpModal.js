import React, {useContext} from "react";
import {Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, Row} from "reactstrap";
import {AuthContext} from '../../views/Index';

function SignUpModal() {
    const [modal, setModal] = React.useState(false);
    const auth = useContext(AuthContext)
    const toggleModal = () => {
        setModal(!modal);
    };
    return (
        <>
            <Button color="primary" block outline type="button" className="mr-1" size="lg" onClick={toggleModal}>
                Register
            </Button>
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
                        Register Form
                    </h5>
                </div>
                <div className="modal-body card-register" style={{borderRadius: '0 0 8px 8px'}}>
                    <Container>
                        <Row>
                            <Col className="mx-auto" lg="12" md="12">

                                <div className="social-line text-center">
                                </div>
                                <Form className="register-form">
                                    <label>Username</label>
                                    <InputGroup className="form-group-no-border">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="nc-icon nc-badge"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Username" type="text"/>
                                    </InputGroup>
                                    <label>Password</label>
                                    <InputGroup className="form-group-no-border">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="nc-icon nc-key-25"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Password" type="password"/>
                                    </InputGroup>
                                    <Button
                                        block
                                        className="btn-round"
                                        color="primary"
                                        type="button"
                                    >
                                        Login
                                    </Button>
                                </Form>
                                <div className="sign-up">
                                    <Button
                                        className="btn-link"
                                        color="primary"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        No account? Register now!
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Modal>
        </>
    )
};

export default SignUpModal;