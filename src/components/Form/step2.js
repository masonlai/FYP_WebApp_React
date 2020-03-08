import React, {useState, useContext} from "react";
import {AuthContext} from '../../views/Indexpage'
import {BackgroundContext} from '../../views/Indexpage'
import {useLocation, withRouter} from "react-router-dom";

import {
    Button,
    Form,
    Input,
    Row,
    Col,
    Label,
    FormGroup, FormText, Spinner,

} from "reactstrap";
import {CreatePage} from "../../assets/apiManager/apiManager";
import UploadTheme from "./UploadTheme";
import Cookies from "universal-cookie";

function Step2(props) {
    const AuthData = useContext(AuthContext);
    const theme = useContext(BackgroundContext);
    const location = useLocation();
    const [position, setPosition] = useState('leftTheme');
    const [pageTheme, setPageTheme] = useState('Theme1');
    const [error, setError] = useState(false);
    const [personalTheme, setPersonalTheme] = useState(null);
    const [backgroundMusic, setBackgroundMusic] = useState(null);
    const [loading, setLoading] = useState(false);
    const cookies = new Cookies();
    React.useEffect(() => {
        if (props.location.state == null) {
            props.history.push({
                pathname: "index"
            })
        }
    })
    const callback = (hooksResultImgUrl) => {
        setPersonalTheme(hooksResultImgUrl)
    };
    const handleSubmit = (data) => {
        data.preventDefault();
        setLoading(true);
        if (personalTheme != '') {
            setPageTheme('')
        }
        let result = CreatePage(
            cookies.get('user').access_token,
            props.location.state.dateOfBirth,
            props.location.state.dateOfDeath,
            props.location.state.fistName,
            props.location.state.lastName,
            props.location.state.gender,
            props.location.state.nationality,
            props.location.state.placeOfBirth,
            props.location.state.imageUrl,
            pageTheme, personalTheme,
            props.location.state.lifeProfile,
            position,
            backgroundMusic
        );
        if (!result.error) {
            const resolve = Promise.resolve(result);
            resolve.then(function (value) {
                props.history.push({
                    pathname: "Page/"+value.id,
                })
            })
        }
    };
    const musicChange = e => {
        setBackgroundMusic(e.target.files[0])
    };
    const themeChange = e => {
        const {value} = e.target;
        setPageTheme(value)
    };
    const positionChange = e => {
        const {value} = e.target;
        setPosition(value);
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
                                                   onChange={positionChange}/>
                                            <label className="drinkcard-cc leftTheme" htmlFor="leftTheme"></label>
                                            <input id="centerTheme" type="radio" name="theme-position"
                                                   value="centerTheme" onChange={positionChange}/>
                                            <label className="drinkcard-cc centerTheme" htmlFor="centerTheme"></label>
                                            <input id="rightTheme" type="radio" name="theme-position" value="rightTheme"
                                                   onChange={positionChange}/>
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
                            <UploadTheme parentCallback={callback}/>
                            <FormGroup>
                                <Label for="exampleFile">Upload background music (mp3 file)</Label>
                                <Input type="file" name="file" id="exampleFile" accept=".mp3,audio/*"
                                       onChange={musicChange}/>
                                <FormText color="muted">
                                    Background music will be played when guests are Surfing the website.
                                </FormText>
                            </FormGroup>

                            <Button block className='mb-4'>{loading ?
                                <Spinner animation="border" variant="light"/> : 'Submit'}</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Step2);
