import React, {useContext, useState, useImperativeHandle, forwardRef} from "react";
import {
    Button,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    Row,
    Spinner
} from "reactstrap";
import {AuthContext} from '../../views/Indexpage';
import {Signup} from "../apiManager/apiManager";
import {Link} from "react-router-dom";



function SignUpModal({fromLogin = false}, ref) {
    const [modal, setModal] = React.useState(false);
    const auth = useContext(AuthContext);
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
    const [religion, setReligion] = useState('Christianity');
    const [error, setError] = useState('');
    const {toggleAuth} = useContext(AuthContext);

    const mySubmitHandler = (data) => {
        data.preventDefault();
        setLoading(true);
        Signup(username, password, email, religion).then(function (value) {
            toggleAuth(value);
            if (value.access_token) {
                setError('');
                setLoading(false)
            } else {
                setLoading(false);
                setError(value.message)
            }

        });
    };
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
    useImperativeHandle(ref, () => ({
        openSignup: (newVal) => {
            toggleModal()
        }
    }));
    return (
        <>
            {/* Modal */}
            <Modal isOpen={modal} toggle={toggleModal}>
                {auth.AuthData == true ?
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
                                Welcome
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
                                <Link to='/craetePage'>
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
                                                        <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Username" type="text" value={username}
                                                       onChange={handleChange_username} required/>
                                            </InputGroup>
                                            <label>Password</label>
                                            <InputGroup className="form-group-no-border">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fa fa-key" aria-hidden="true"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Password" type="password" value={password}
                                                       onChange={handleChange_password} required/>
                                            </InputGroup>
                                            <label>Email</label>
                                            <InputGroup className="form-group-no-border">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Email" type="email" value={email}
                                                       onChange={handleChange_email} required/>
                                            </InputGroup>


                                            <label>
                                                Religion
                                            </label>
                                            <InputGroup className="form-group-no-border">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fa fa-university" aria-hidden="true"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="select" name="select" id="exampleSelect" value={religion}
                                                       onChange={handleChange_religion} required>
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
}

SignUpModal = forwardRef(SignUpModal);
export default SignUpModal;