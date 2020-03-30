import React, {useState, useContext} from "react";
import {AuthContext, BackgroundContext} from '../../views/Indexpage'
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
import {CreatePage, Login} from "../apiManager/apiManager";
import {getDefaultTheme} from '../apiManager/apiManager'
import UploadTheme from "../Modal/UploadTheme";
import Cookies from "universal-cookie";
import {useSpring, animated} from 'react-spring'
import ResponsiveEmbed from 'react-responsive-embed'

function Step2(props) {
    const theme = useContext(BackgroundContext);
    const location = useLocation();
    const [position, setPosition] = useState('leftTheme');
    const [pageTheme, setPageTheme] = useState('Theme1');
    const [personalTheme, setPersonalTheme] = useState(null);
    const [backgroundMusic, setBackgroundMusic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [defaultTheme, setDefaultTheme] = useState({})
    const [goPageBtn, setGoPageBtn] = useState(<div></div>)
    const {refresh} = useContext(AuthContext);
    const cookies = new Cookies();
    React.useEffect(() => {
        if (props.location.state == null) {
            props.history.push({
                pathname: "index"
            })
        }
        getDefaultTheme().then(function (value) {
            //get the default theme from backend
            setDefaultTheme(value.DefaultTheme)
        })
    }, [])

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
            backgroundMusic,
            (cookies.get('user')).id
        );
        refresh()

        if ((cookies.get('user')).religion == 'Buddhism') {
            setVideoURL('https://www.youtube.com/embed/CXXDJLgmcTw?autoplay=1&mute=0')
        } else {
            setVideoURL('https://www.youtube.com/embed/9EqW2dkuj2Y?autoplay=1&mute=0')
        }
        set(!flipped)
        setVideo({zIndex: '99', opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`)})

        if (!result.error) {
            const resolve = Promise.resolve(result);
            resolve.then(function (value) {
                setGoPageBtn(<Button block className='mt-4' onClick={goToPage} value={value.id}>GO TO THE PAGE</Button>)
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

    const goToPage = (e) => {
        props.history.push({
            pathname: "Page/" + e.target.value,
        })
    }

    const [flipped, set] = useState(false)
    const {transform, opacity} = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: {mass: 5, tension: 500, friction: 80}
    })
    const [video, setVideo] = useState({opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`)})
    const [videoUrl, setVideoURL] = useState('')


    return (

        <div style={theme}>
            <animated.div className='c'
                          style={video}>
                <ResponsiveEmbed src={videoUrl} allowFullScreen allow="autoplay"/>
                {goPageBtn}
            </animated.div>
            <animated.div style={{opacity: opacity.interpolate(o => 1 - o), transform}}>
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
                                                <input id="leftTheme" type="radio" name="theme-position"
                                                       value="leftTheme"
                                                       onChange={positionChange}/>
                                                <label className="drinkcard-cc leftTheme" htmlFor="leftTheme"></label>
                                                <input id="centerTheme" type="radio" name="theme-position"
                                                       value="centerTheme" onChange={positionChange}/>
                                                <label className="drinkcard-cc centerTheme"
                                                       htmlFor="centerTheme"></label>
                                                <input id="rightTheme" type="radio" name="theme-position"
                                                       value="rightTheme"
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
                                            {Object.entries(defaultTheme).map(([key, value]) => {
                                                return <Row>
                                                    <input style={{backgroundImage: `url(${value})`}} type="radio"
                                                           name="theme" value={key} id={key}
                                                           onChange={themeChange}/>
                                                    <label style={{backgroundImage: `url(${value})`}}
                                                           className="drinkcard-cc" htmlFor={key}></label>
                                                </Row>
                                            })}

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
            </animated.div>
        </div>
    );
}

export default withRouter(Step2);
