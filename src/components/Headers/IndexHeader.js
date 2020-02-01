import React, {useState} from "react";
import SignUpModal from "components/Modal/SignUpModal.js";
import {
    Link,
} from "react-router-dom";
// reactstrap components
import {
    Form,
    Container,
    Input,
    InputGroupAddon,
    InputGroup, Button,
} from "reactstrap";
import {withRouter, useHistory} from "react-router-dom";

function IndexHeader(props) {
    let history = useHistory();
    const [search, setSearch] = useState('');
    const onChange = (e) => {
        const {value} = e.target;
        setSearch(value);
    };
    const handleSubmit = (data) => {
        if (search == '') {
            data.preventDefault();
        } else {
            props.history.push({
                pathname: "PageIndex",
                state: {
                    key: search,
                    page:1
                }
            })
        }

    };
    return (
        <>
            <div
                className="page-header section-dark"
                style={{
                    backgroundImage:
                        "url(" + require("assets/img/a.jpg") + ")"
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
                                <img alt="..." src={require("assets/img/fog-low.png")}/>
                            </div>
                            <div className="fog-low right" style={{pointerEvents: 'none'}}>
                                <img alt="..." src={require("assets/img/fog-low.png")}/>
                            </div>
                        </div>
                        <h2 className="presentation-subtitle text-center">
                            Here for you to commemorate deceased a online worship system
                        </h2>
                        <div className='row' style={{marginTop: '4em'}}>
                            <div className='offset-lg-1 col-sm-12 col-lg-3'>
                                <Link to='/PageIndex'>
                                    <Button color="primary" block outline type="button" className="mr-1" size="lg">
                                        Tutorial
                                    </Button></Link>
                            </div>
                            <div className="offset-lg-4 col-sm-12 col-lg-3">
                                <SignUpModal/>
                            </div>
                        </div>
                    </Container>
                </div>
                <div
                    className="moving-clouds"
                    style={{
                        backgroundImage: "url(" + require("assets/img/clouds.png") + ")", pointerEvents: 'none'
                    }}
                />

            </div>

        </>
    );
}

export default withRouter(IndexHeader);