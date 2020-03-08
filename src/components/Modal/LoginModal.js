import React, {useContext, useState, useRef} from "react";
import {AuthContext} from '../../views/Indexpage'
import {Login} from '../../assets/apiManager/apiManager'
import SignUpModal from './SignUpModal'
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
    NavLink, DropdownToggle, DropdownMenu, DropdownItem,
    UncontrolledDropdown
} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {MobileContext} from '../Navbars/IndexNavbar'
import getWindowWidth from "../../assets/apiManager/getWindowWidth";
import Cookies from 'universal-cookie';

function LoginModal(props) {
    const {toggleNavbarCollapse} = useContext(MobileContext);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {toggleAuth} = useContext(AuthContext);
    const {logout} = useContext(AuthContext);
    const {height, width} = getWindowWidth();
    const childRef = useRef();
    const openSignup = () => {
        childRef.current.openSignup();
    }
    const cookies = new Cookies();
    const toggleModal = () => {
        setModal(!modal);
        toggleNavbarCollapse()
    };

    const location = useLocation();
    const mySubmitHandler = (data) => {
        data.preventDefault();
        setLoading(true);
        Login(username, password).then(function (value) {
            toggleAuth(value);
            if (value.access_token) {
                toggleNavbarCollapse();
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
        logout()
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
            {auth.AuthData == true ?
                <NavItem>
                    <UncontrolledDropdown setActiveFromChild>
                        <DropdownToggle tag="a" className="nav-link" caret
                                        style={location.pathname != '/index' || width < 575.98 ?
                                            {color: '#403D39', 'font-weight': '600'} :
                                            {color: '#FFFFFF', 'font-weight': '600'}}>{cookies.get('user').username}
                        </DropdownToggle>
                        <DropdownMenu>
                            <Link to="/craetePage"><DropdownItem>Create a webpage</DropdownItem></Link>
                            <DropdownItem>Edit webpages</DropdownItem>
                            <DropdownItem onClick={logoutHandler}>Logout</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </NavItem>
                : <NavItem>
                    <NavLink
                        data-placement="bottom"
                        target="_blank"
                    >

                        <a href="javascript:void(0);" onClick={toggleModal}
                           style={location.pathname != '/index' || width < 575.98 ?
                               {color: '#403D39', 'font-weight': '600'} :
                               {color: '#FFFFFF', 'font-weight': '600'}}>
                            <i className="fa fa-sign-in"/>Sign In</a>

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
                                                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
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
                                                <i className="fa fa-key" aria-hidden="true"></i>
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
                                        onClick={openSignup}
                                    >
                                        No account? Click the Register now!
                                    </Button>
                                    <SignUpModal ChildComp ref={childRef}/>
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
