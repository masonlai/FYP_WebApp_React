import React, {useContext} from "react";
import {BackgroundContext} from '../../views/Index'
import '../../assets/scss/paper-kit/cards/pageIndex.scss'
import {
    Container
} from "reactstrap";
import ResponsiveEmbed from 'react-responsive-embed'


function Tutorial() {

    const theme = useContext(BackgroundContext);
    return (
        <div style={theme}>
            <div className='form'>
                <div className='container'>
                    <div className='createForm'>
                        <div style={{marginTop: '5vh'}}/>
                        <Container>
                        Sign up:
                        <ResponsiveEmbed src='https://www.youtube.com/embed/gD8Ym6qziEU' allowFullScreen/>
                        <br/>
                        <hr/>
                        Login and create page:
                        <ResponsiveEmbed src='https://www.youtube.com/embed/R9eHlXu9F9E' allowFullScreen/>
                        <br/>
                        <hr/>
                        Leaving comment:
                        <ResponsiveEmbed src='https://www.youtube.com/embed/f0155-b1KsA' allowFullScreen/>
                        <br/>
                        <hr/>
                        floral tributes:
                        <ResponsiveEmbed src='https://www.youtube.com/embed/l4zo2Hfk5b4' allowFullScreen/>
                        </Container>
                        <div style={{marginBottom: '5vh'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default Tutorial;

