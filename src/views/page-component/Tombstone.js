/*!
this script is one of component of page
a tombstone for deceased
 */

import React, {useContext, useState, useRef, useEffect} from 'react';
import {
    Collapse, Button,
    CardBody, Card, Dropdown,
    DropdownToggle, DropdownMenu,
    DropdownItem,
    Container, Row, Spinner
} from "reactstrap";
import {visitRecord} from "../../assets/apiManager/apiManager"
import {AuthContext} from "../Index";
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

function Tombstone(props) {
    const auth = useContext(AuthContext);
    const split = (string) => {
        return string.split(" ")
    };
    const [isOpen, setIsOpen] = useState(false);
    const [flower, setFlower] = useState('');
    const toggle_collapse = () => setIsOpen(!isOpen);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle_dropdown = () => setDropdownOpen(prevState => !prevState);
    const [loading, setLoading] = useState(false);

    const flowerController = (e) => {
        setFlower(e.target.name);
    };
    const submitFlower = () => {
        setLoading(true);
        if (auth.AuthData.access_token) {
            visitRecord(props.pageId, auth.AuthData.access_token, flower).then(function (value) {
                props.refresh(props.pageId)
            })
        }

        setLoading(false)


    };

    return (
        <> <Container>
            <div name='test1' className='rounded mx-auto d-block tombstoneBackGround' style={{
                backgroundImage:
                    "url(" + require("assets/img/tombstone.png") + ")"
            }}>
                <text style={{color: 'white'}}>a</text>
                <div className='font'>{props.name}</div>
                <div className='date'>{props.birthday}</div>
                <div className='to'>TO</div>
                <div className='date'>{props.deathday}</div>
                <Row className='moblie'>
                    {/* If some people visited this page */}
                    {props.record.one &&
                    <div className='divFlower'><img className='flower'
                                                    src={props.record.one.flower_url}/>{props.record.one.username}<br/>
                        {split(props.record.one.date)[1] + ' ' + split(props.record.one.date)[2] + ' ' + split(props.record.one.date)[3]}
                    </div>}
                    {props.record.two &&
                    <div className='divFlower'><img className='flower'
                                                    src={props.record.two.flower_url}/>{props.record.two.username}<br/>
                        {split(props.record.two.date)[1] + ' ' + split(props.record.two.date)[2] + ' ' + split(props.record.two.date)[3]}
                    </div>}
                    {props.record.three &&
                    <div className='divFlower'><img className='flower'
                                                    src={props.record.three.flower_url}/>{props.record.three.username}<br/>
                        {split(props.record.three.date)[1] + ' ' + split(props.record.three.date)[2] + ' ' + split(props.record.three.date)[3]}
                    </div>}
                    {props.record.four &&
                    <div className='divFlower'><img className='flower'
                                                    src={props.record.four.flower_url}/>{props.record.four.username}<br/>
                        {split(props.record.four.date)[1] + ' ' + split(props.record.four.date)[2] + ' ' + split(props.record.four.date)[3]}
                    </div>}

                </Row>

            </div>

            <div className='flowerRow transparent'>

            </div>

            {auth.AuthData.access_token && <div className='col-12'>
                <Button block outline color="info" onClick={toggle_collapse}
                        style={{marginBottom: '1rem'}} size="lg">Floral Tributes</Button>
                <Collapse isOpen={isOpen}>
                    <Card>
                        <CardBody>

                            <Dropdown isOpen={dropdownOpen} toggle={toggle_dropdown} onClick={flowerController}>
                                <DropdownToggle caret color="info" outline>
                                    Flower Type
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header style={{backgroundColor:'#e6f9ff'}}>Flower type</DropdownItem>
                                    <DropdownItem style={{backgroundColor:'#e6f9ff'}} onClick={flowerController} name='pink1.png'>Pink 1</DropdownItem>
                                    <DropdownItem style={{backgroundColor:'#e6f9ff'}} onClick={flowerController} name='pink2.png'>Pink 2</DropdownItem>
                                    <DropdownItem style={{backgroundColor:'#e6f9ff'}} onClick={flowerController} name='white1.png'>White</DropdownItem>
                                    <DropdownItem style={{backgroundColor:'#e6f9ff'}} onClick={flowerController} name='red1.png'>Red</DropdownItem>

                                </DropdownMenu>
                            </Dropdown>
                            {flower && <img src={props.flowerBase + flower}/>}
                            <br/>
                            {flower && <Link style={{ color: 'inherit', textDecoration: 'inherit', fontWeight:'bold'}}
                                      activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} >
                                <Button block color="info" size="lg"
                                               outline onClick={submitFlower}>
                                {loading ? <Spinner animation="border" variant="light"/> : 'Rest In Peace'}</Button></Link>}
                        </CardBody>
                    </Card>
                </Collapse>
            </div>}

        </Container>
        </>
    );
}

export default Tombstone;
