import React, {useCallback, useState, useContext} from "react";
import {BackgroundContext} from '../../views/Index'
import {useLocation, withRouter} from "react-router-dom";
import {
    Button,
    Form,
    Input,
    Row,
    Col,
    Label,
    FormGroup,

} from "reactstrap";
import {CreatePage, test} from "../../assets/apiManager/apiManager";
import theme1 from '../../assets/img/antoine-barres.jpg'
import theme2 from '../../assets/img/dasdas.jpg'
import theme3 from '../../assets/img/header.jpg'
import theme4 from '../../assets/img/daniel-olahh.jpg'
import on99 from "../../assets/img/apple-icon.png";


function Step2(props) {
    const theme = useContext(BackgroundContext);
    const location = useLocation();
    const [position, setPosition] = useState('');
    const [pageTheme, setPageTheme] = useState('');
    const [sendTheme, setSendTheme] = useState('');
    const handleSubmit = (data) => {
        data.preventDefault();
        if(pageTheme == 'Theme1'){
            setSendTheme(theme1)
        }else if(pageTheme == 'Theme2'){
            setSendTheme(theme2)
        }else if(pageTheme == 'Theme3'){
            setSendTheme(theme3)
        }else if(pageTheme == 'Theme4'){
            setSendTheme(theme4)
        }
        console.log(
            props.location.state.gender,
            props.location.state.imageUrl,
            sendTheme,
            props.location.state.lifeProfile,
            position);
        CreatePage(props.location.state.dateOfBirth,
            props.location.state.dateOfDeath,
            props.location.state.fistName,
            props.location.state.lastName,
            props.location.state.gender,
            props.location.state.nationality,
            props.location.state.placeOfBirth,
            props.location.state.imageUrl,
            sendTheme,
            props.location.state.lifeProfile,
            position
        )

    };
    const themeChange = e => {
        const {value} = e.target;
        setPageTheme(value)
    };
    const positionChange = e => {
        const {value} = e.target;
        setPosition(value)
    };
    const uploadChange = () => {
        console.log(props.location.state.imageUrl);
        console.log(document.getElementById('themePhoto').files[0])
    };

    return (
        <div style={theme}>
            <div className='form'>
                <div style={{width: '100%', maxHeight: '10vh', backgroundColor: '#9BC2EE', minHeight: '8vh'}}>
                    <div className='offset-1'>
                        <text className='title'>Theme of page (you can skip)</text>
                    </div>
                </div>
                <div className='container'>
                    <div className='createForm'>
                        <Label> Please choose the portrait position</Label>
                        <Form onSubmit={handleSubmit}>
                            <div className='selectTheme'>
                                <Col className='d-flex justify-content-center'>
                                    <div className="cc-selector">
                                        <div className='mt-2'>

                                            <input id="leftTheme" type="radio" name="theme-position" value="leftTheme"
                                                   onChange={themeChange}/>
                                            <label className="drinkcard-cc leftTheme" htmlFor="leftTheme"></label>
                                            <input id="centerTheme" type="radio" name="theme-position"
                                                   value="centerTheme" onChange={themeChange}/>
                                            <label className="drinkcard-cc centerTheme" htmlFor="centerTheme"></label>
                                            <input id="rightTheme" type="radio" name="theme-position" value="rightTheme"
                                                   onChange={themeChange}/>
                                            <label className="drinkcard-cc rightTheme" htmlFor="rightTheme"></label>
                                        </div>
                                    </div>
                                </Col>
                            </div>
                            <hr/>
                            <Label> Please choose the Theme or submit by yourself</Label>
                            <Col className='d-flex justify-content-center'>
                                <div className="cc-selector">
                                    <div className='mt-2'>
                                        <Row>
                                            <input id="Theme1" type="radio" name="theme" value="Theme1"
                                                   onChange={themeChange}/>
                                            <label className="drinkcard-cc Theme1" htmlFor="Theme1"></label>
                                        </Row>
                                        <Row>
                                            <input id="Theme2" type="radio" name="theme" value="Theme2"
                                                   onChange={themeChange}/>
                                            <label className="drinkcard-cc Theme2" htmlFor="Theme2"></label>
                                        </Row>
                                        <Row>
                                            <input id="Theme3" type="radio" name="theme" value="Theme3"
                                                   onChange={themeChange}/>
                                            <label className="drinkcard-cc Theme3" htmlFor="Theme3"></label>
                                        </Row>
                                        <Row>
                                            <input id="Theme4" type="radio" name="theme" value="Theme4"
                                                   onChange={themeChange}/>
                                            <label className="drinkcard-cc Theme4" htmlFor="Theme4"></label>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <FormGroup>
                                <Label for="themePhoto">Theme photo</Label>
                                <Input type="file" name="themePhoto" id="themePhoto" onChange={uploadChange}/>
                            </FormGroup>

                            <Button block className='mb-4'>Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Step2);
