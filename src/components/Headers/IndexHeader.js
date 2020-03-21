import React, {useState, useRef} from "react";
import SignUpModal from "../Modal/SignUpModal.js";
import {
    Link, useLocation,
} from "react-router-dom";

import {
    Form,
    Container,
    Input,
    InputGroupAddon,
    InputGroup, Button,
    Alert
} from "reactstrap";
import {withRouter, useHistory} from "react-router-dom";
import backgorundimage from '../../assets/img/a.jpg'
import image1 from '../../assets/img/fog-low.png'
import image2 from '../../assets/img/fog-low.png'
import clouds from '../../assets/img/clouds.png'

function IndexHeader(props) {
    let history = useHistory();
    const [search, setSearch] = useState('');
    const onChange = (e) => {
        const {value} = e.target;
        setSearch(value);
    };
    const childRef = useRef();
    const openSignup = () => {
        childRef.current.openSignup();
    };
    const location = useLocation();
    if (location.pathname != '/index') {
        props.history.push('/index');
    }
    const handleSubmit = (data) => {
        if (search == '') {
            data.preventDefault();
        } else {
            props.history.push({
                pathname: "PageIndex/"+search+'/'+1,
            })
        }
    };

    return (
        <>
            <div
                className="page-header section-dark"
                style={{
                    backgroundImage:
                        "url(" +backgorundimage+ ")"
                }}
            >

                <div className="filter"/>
                <div className="content-center">
                    <Container>
                        <div className="title-brand row">
                            <Form onSubmit={handleSubmit}>
                                <InputGroup>
                                    <Input placeholder="Searching a page" type="text" onChange={onChange} required/>
                                    <InputGroupAddon addonType="append">
                                        <Button color="secondary" type='submit'>Search</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                            <div className="fog-low" style={{pointerEvents: 'none'}}>
                                <img alt="..." src={image1}/>
                            </div>
                            <div className="fog-low right" style={{pointerEvents: 'none'}}>
                                <img alt="..." src={image2}/>
                            </div>
                        </div>
                        <h2 className="presentation-subtitle text-center">
                            {props.location.state &&
                            <Alert color="danger">
                                No matching page!
                            </Alert>
                            }
                            Here for you to commemorate deceased a online worship system
                        </h2>
                        <div className='row' style={{marginTop: '4em'}}>
                            <div className='offset-lg-1 col-sm-12 col-lg-3'>
                                <Link to='/Tutorial'>
                                    <Button color="primary" block outline type="button" className="mr-1" size="lg">
                                        Tutorial
                                    </Button></Link>
                            </div>
                            <div className="offset-lg-4 col-sm-12 col-lg-3">
                                <Button color="primary" block outline type="button" className="mr-1" size="lg"
                                        onClick={openSignup}>
                                    Register
                                </Button>
                                <SignUpModal ChildComp ref={childRef}/>
                            </div>
                        </div>
                    </Container>
                </div>
                <div
                    className="moving-clouds"
                    style={{
                        backgroundImage: "url(" +clouds+ ")", pointerEvents: 'none'
                    }}
                />

            </div>

        </>
    );
}

export default withRouter(IndexHeader);