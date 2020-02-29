import React, {useContext} from "react";
import {BackgroundContext} from '../views/Index'
import '../../src/assets/scss/paper-kit/cards/pageIndex.scss'


function Aboutus() {

    const theme = useContext(BackgroundContext);
    return (
        <div style={theme}>
            <div className='form'>
                <div className='container'>
                    <div className='createForm'>
                        <div style={{marginTop: '5vh'}}/>
                        IDK what should i say
                        <div style={{marginBottom: '6vh'}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Aboutus;

