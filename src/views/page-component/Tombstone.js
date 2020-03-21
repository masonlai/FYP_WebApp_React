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
    Container, Row,
    Spinner, Table,
    Col, Tooltip
} from "reactstrap";
import {visitRecord} from "../../components/apiManager/apiManager"
import {AuthContext} from "../Indexpage";
import {Link} from 'react-scroll'
import tombstoneimage from '../../assets/img/tombstone.png'
import Cookies from 'universal-cookie';
import censerOn from '../../assets/img/censerOn.png'
import censerOff from '../../assets/img/censerOff.png'
import getWindowWidth from "../../components/apiManager/getWindowWidth";


function Tombstone(props) {
    const cookies = new Cookies();
    const auth = useContext(AuthContext);
    const split = (string) => {
        return string.split(" ")
    };
    const {height, width} = getWindowWidth();
    const [isOpen, setIsOpen] = useState(false);
    const [flower, setFlower] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);
    const toggle_collapse = () => setIsOpen(!isOpen);
    const toggle_dropdown = () => setDropdownOpen(prevState => !prevState);

    const flowerController = (e) => {
        setFlower(e.target.name);
    };

    const submitFlower = () => {
        setLoading(true);
        if (cookies.get('user').access_token) {
            visitRecord(props.pageId, cookies.get('user').access_token, flower).then(function (value) {
                props.refresh(props.pageId)
            })
        }

        setLoading(false)

    };
    let flowerRow = [];


    const [censer, setCenser] = useState(censerOff);
    const censerChange = () => {
        setCenser(censerOn)
    };
    const [isOpenVister, setIsOpenVister] = useState(false);

    const toggleVister = () => setIsOpenVister(!isOpenVister);
    let lenFlower = Object.keys(props.record).length;

    for (let i = 0; i < lenFlower && i < 15; i++) {
        let flowerNum = i;
        let flowerTop = 0;
        //make different height of flower
        if (i % 2 == 0) {
            flowerTop = 5
        } else {
            flowerTop = 0
        }
        if (width < 575.98) {
            flowerRow.push(<div className='divFlower' style={{
                marginTop: flowerTop + 'vh',
                marginLeft: i * 3 + 'vh',
                position: 'absolute',
                zIndex: 50
            }}>
                <img className='flower' src={props.record[flowerNum].flower_url}/>
            </div>)
        } else {
            flowerRow.push(<div className='divFlower' style={{
                marginTop: flowerTop + 'vh',
                marginLeft: i * 5 + 'vh',
                position: 'absolute',
                zIndex: 50
            }}>
                <img className='flower' src={props.record[flowerNum].flower_url}/>
            </div>)
        }
    }


    return (
        <> <Container style={{marginBottom: '60vh'}}>
            <div name='test1' className='rounded mx-auto d-block tombstoneBackGround' style={{
                backgroundImage:
                    "url(" + tombstoneimage + ")"
            }}>
                <text style={{color: 'white'}}>a</text>
                <div className='font'>{props.name}</div>
                <div className='date'>{props.birthday}</div>
                <div className='to'>TO</div>
                <div className='date'>{props.deathday}</div>
                <Row className='moblie'>
                    {/* If some people visited this page */}
                    {flowerRow}

                    {/* Click for burn incense*/}
                    <Col className='d-flex justify-content-center'>
                        <img style={{zIndex: '51'}} src={censer} onClick={censerChange} id="TooltipExample"/>
                        <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
                            One click to burn incense sticks
                        </Tooltip>
                    </Col>

                    {auth.AuthData == true && <div className='col-12'>
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
                                            <DropdownItem header style={{backgroundColor: '#e6f9ff'}}>Flower
                                                type</DropdownItem>
                                            {typeof props.flowersName !== "undefined"&&
                                                props.flowersName.map(function (num) {
                                                var name = num.split(".");
                                                return <DropdownItem style={{backgroundColor: '#e6f9ff'}}
                                                                     onClick={flowerController}
                                                                     name={num}>{name[0]}</DropdownItem>
                                            })}
                                        </DropdownMenu>
                                    </Dropdown>
                                    {flower && <img src={props.flowerBase + flower}/>}
                                    <br/>
                                    {flower &&
                                    <Link style={{color: 'inherit', textDecoration: 'inherit', fontWeight: 'bold'}}
                                          activeClass="active" className="test1" to="test1" spy={true} smooth={true}
                                          duration={500}>
                                        <Button block color="info" size="lg"
                                                outline onClick={submitFlower}>
                                            {loading ? <Spinner animation="border"
                                                                variant="light"/> : 'Rest In Peace'}</Button></Link>}
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>}
                    {/*there is the list of all visitors.*/}
                    <Button block outline color="primary" onClick={toggleVister}
                            style={{marginTop: '4vh'}}>Visitors</Button>
                    <Collapse isOpen={isOpenVister}>
                        <Card style={{zIndex: '999'}}>
                            <CardBody>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Username</th>
                                        <th>Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Object.entries(props.record).map(([key, value]) => {
                                        return <tr>
                                            <th scope="row">{parseInt(key, 10) + 1}</th>
                                            <td>{value.username}</td>
                                            <td>{split(value.date)[1] + ' ' + split(value.date)[2] + ' ' + split(value.date)[3]}</td>
                                        </tr>
                                    })}

                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Collapse>

                </Row>

            </div>

            <div className='flowerRow transparent'>

            </div>

        </Container>
        </>
    );
}

export default Tombstone;
