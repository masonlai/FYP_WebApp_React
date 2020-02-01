import React, {useContext, useState} from "react";
import {AuthContext} from '../../views/Index'
import {Login} from '../../assets/apiManager/apiManager'


import {
    Button,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Container,
    Row,
    Col,
    Spinner,
    Input,
    NavItem,
    NavLink, Nav, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import {Link, useLocation} from "react-router-dom";

function LoginModal(props) {

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {toggleAuth} = useContext(AuthContext);
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);
    const toggleModal = () => {
        setModal(!modal);
    };

    const location = useLocation();
    const mySubmitHandler = (data) => {
        data.preventDefault();
        setLoading(true);
        Login(username, password).then(function (value) {
            toggleAuth(value);
            if (value.access_token) {
                setModal(!modal);
                setError('');
                setLoading(false)
            } else {
                setLoading(false);
                setError(value.message)

            }

        });
    };

    const logoutHandler = () => {
        toggleAuth('');
        setModal(!modal);
    };

    const handleChange_username = (e) => {
        const {value} = e.target;
        setUsername(value);
    };
    const handleChange_password = (e) => {
        const {value} = e.target;
        setPassword(value);
    };
    const auth = useContext(AuthContext);

    return (
        <>
            {auth.AuthData.username ?
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}
                                style={{backgroundColor: 'transparent', border: 'transparent'}}>
                    <DropdownToggle caret style={{backgroundColor: 'transparent', border: 'transparent'}}>
                        <a style={location.pathname != '/index' ? {
                            color: '#403D39',
                            'font-weight': '600'
                        } : {color: '#FFFFFF', 'font-weight': '600'}}><i
                            className="fa fa-user" style={location.pathname != '/index' ? {
                            color: '#403D39',
                            'font-weight': '600'
                        } : {color: '#FFFFFF', 'font-weight': '600'}}/>
                            <p className="d-lg-none"> {auth.AuthData.username}</p>
                            {auth.AuthData.username}</a>
                    </DropdownToggle>
                    <DropdownMenu>

                        <Link to="/craetePage"><DropdownItem>Create a webpage</DropdownItem></Link>
                        <DropdownItem>Edit webpages</DropdownItem>
                        <DropdownItem onClick={logoutHandler}>Logout</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>


                : <NavItem>
                    <NavLink
                        data-placement="bottom"
                        target="_blank"
                    > <i className="fa fa-sign-in"/>
                        <p href='#' onClick={toggleModal} className="d-lg-none"
                           style={{'color': '#403D39', 'fontWeight': '600'}}>Sign In</p>

                        <a href='#' onClick={toggleModal}
                           style={location.pathname != '/index' ? {color: '#403D39', 'font-weight': '600'} : {
                               color: '#FFFFFF',
                               'font-weight': '600'
                           }}>
                            Sign In</a>

                    </NavLink>
                </NavItem>
            }
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
                        Welcome
                    </h5>
                </div>
                <div className="modal-body card-register" style={{borderRadius: '0 0 8px 8px'}}>
                    <Container>
                        <Row>
                            <Col className="mx-auto" lg="12" md="12">

                                <div className="social-line text-center">
                                </div>
                                <form className="register-form" onSubmit={mySubmitHandler}>
                                    <label>Username</label>
                                    <InputGroup
                                        className={error ? "form-group-no-border has-danger" : "form-group-no-border"}>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="nc-icon nc-badge"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Username" type="text" value={username}
                                               onChange={handleChange_username} required/>
                                    </InputGroup>
                                    <label>Password</label>
                                    <InputGroup
                                        className={error ? "form-group-no-border has-danger" : "form-group-no-border"}>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="nc-icon nc-key-25"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Password" type="password" value={password}
                                               onChange={handleChange_password} required/>
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
                                        {loading ? <Spinner animation="border" variant="light"/> : 'Login'}
                                    </Button>

                                </form>
                                <div className="sign-up">
                                    <Button
                                        className="btn-link"
                                        color="primary"
                                        href="#pablo"
                                        onClick={toggleModal}
                                    >
                                        No account? Click the Register now!
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Modal>
        </>
    )
}


export default LoginModal;
