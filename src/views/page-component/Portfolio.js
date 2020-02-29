/*!
this script is one of component of page
showing the info of deceased
 */

import React, {useState} from "react";
import {Container, Row, Col, Collapse, Button, CardBody, Card} from "reactstrap";
import '../../assets/scss/paper-kit/cards/page.scss'


function Portfolio(porps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <>

            <div className='backgorund-page'>
                a
                <div className='Portfolio'>
                    <Container>
                        <Row>
                            <Col lg='4'>
                                <div className='frame mt-3 ml-3'>
                                    <img className='portrait' src={porps.portrait}/>
                                </div>
                            </Col>
                            <Col>
                                <div className='name'>{porps.name}</div>
                                <br/>
                                <div className='pageText'>
                                    from {porps.birthday}
                                    <br/>
                                    to {porps.deathday}
                                </div>
                            </Col>

                        </Row>
                        <div className='mt-5'>
                            <Row className='pageText'><Col>nationality</Col><Col>{porps.nationality}</Col></Row>
                            <Row className='pageText'><Col>place of birth</Col><Col>{porps.placeOfBirth}</Col></Row>
                            <Row className='pageText'><Col>Gender</Col><Col>{porps.gender}</Col></Row>


                            <Row className='pageText'><Col>
                                <Button outline color="primary" onClick={toggle} style={{marginBottom: '1rem'}}>Life Profile</Button>
                                <Collapse isOpen={isOpen}>
                                    <Card style={{zIndex:'999'}}>
                                        <CardBody>
                                            {porps.lifeProfile}
                                        </CardBody>
                                    </Card>
                                </Collapse>
                                </Col></Row>


                        </div>
                    </Container>
                </div>
            </div>

        </>
    );
}

export default Portfolio;
