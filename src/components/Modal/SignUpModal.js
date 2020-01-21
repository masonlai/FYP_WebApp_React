import React, {useContext, useState} from "react";
import {
    Button,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal, NavLink,
    Row,
    Spinner
} from "reactstrap";
import {AuthContext} from '../../views/Index';
import {Signup} from "../../assets/apiManager/apiManager";
import {Link} from "react-router-dom";


function SignUpModal({fromLogin = false}) {
    const [modal, setModal] = React.useState(false);
    const auth = useContext(AuthContext)
    const toggleModal = () => {
        setModal(!modal);
    };
    if (fromLogin) {
        setModal(true)
    }
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [religion, setReligion] = useState('');
    const [error, setError] = useState('');
    const {toggleAuth} = useContext(AuthContext)
    const mySubmitHandler = (data) => {
        data.preventDefault();
        setLoading(true)
        Signup(username, password, email, religion).then(function (value) {
            toggleAuth(value)
            if (value.access_token) {
                setError('')
                console.log(value)
                setLoading(false)
            } else {
                setLoading(false)
                setError(value.message)

            }

        });
    }
    const handleChange_username = (e) => {
        const {value} = e.target;
        setUsername(value);
    };
    const handleChange_password = (e) => {
        const {value} = e.target;
        setPassword(value);
    };
    const handleChange_email = (e) => {
        const {value} = e.target;
        setEmail(value);
    };
    const handleChange_religion = (e) => {
        const {value} = e.target;
        setReligion(value);
    };
    return (
        <>
            <Button color="primary" block outline type="button" className="mr-1" size="lg" onClick={toggleModal}>
                Register
            </Button>
            {/* Modal */}
            <Modal isOpen={modal} toggle={toggleModal}>
                {auth.AuthData.username ?
                    <div>
                        <div className="modal-header">
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
                                Welcome {auth.AuthData.username}
                            </h5>
                        </div>
                        <div className="modal-body">
                            Sign up successfully. Do you want to create a webpage for deceased now?
                        </div>
                        <div className="modal-footer">
                            <div className="left-side">
                                <Button
                                    className="btn-link"
                                    color="default"
                                    type="button"
                                    onClick={toggleModal}
                                >
                                    Later
                                </Button>
                            </div>
                            <div className="divider"/>
                            <div className="right-side">
                                <Link to="/about">
                                <Button className="btn-link" color="danger" type="button">
                                   Go
                                </Button>
                                </Link>
                            </div>
                        </div>
                    </div> :
                    <div>
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
                                        <Form className="register-form" onSubmit={mySubmitHandler}>
                                            <label>Username</label>
                                            <InputGroup className="form-group-no-border">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="nc-icon nc-badge"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Username" type="text" value={username}
                                                       onChange={handleChange_username}/>
                                            </InputGroup>
                                            <label>Password</label>
                                            <InputGroup className="form-group-no-border">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="nc-icon nc-key-25"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Password" type="password" value={password}
                                                       onChange={handleChange_password}/>
                                            </InputGroup>
                                            <label>Email</label>
                                            <InputGroup className="form-group-no-border">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="nc-icon nc-badge"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Email" type="email" value={email}
                                                       onChange={handleChange_email}/>
                                            </InputGroup>


                                            <label>
                                                Religion
                                            </label>
                                            <InputGroup className="form-group-no-border">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="nc-icon nc-globe"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="select" name="select" id="exampleSelect" value={religion}
                                                       onChange={handleChange_religion}>
                                                    <option>Christianity</option>
                                                    <option>Buddhism</option>
                                                    <option>Other</option>
                                                </Input>
                                                <div className="form-control-feedback">
                                                    {error ? error : ""}
                                                </div>
                                            </InputGroup>
                                            <Button
                                                block
                                                className="btn-round"
                                                color="primary"
                                                type="submit"
                                            >
                                                {loading ? <Spinner animation="border" variant="light"/> : 'Sign up'}
                                            </Button>
                                        </Form>
                                        <div className="sign-up">
                                            <Button
                                                className="btn-link"
                                                color="primary"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                            >
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>}

            </Modal>
        </>
    )
};

export default SignUpModal;