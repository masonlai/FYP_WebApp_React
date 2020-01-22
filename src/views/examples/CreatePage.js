import React, {useCallback, useState, useContext} from "react";
import {BackgroundContext} from '../../views/Index'
// reactstrap components
import {Button, Card, Form, Input, Container, Row, Col} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

function CreatePage() {
    const theme = useContext(BackgroundContext);

    return (
        <div style={theme}>
            <div className='form'>
                <div style={{width: '100%', maxHeight: '10vh', backgroundColor: '#9BC2EE', minHeight: '8vh'}}>
                    <div className='offset-1'>
                        <text className='title'>Building a page for condolence</text>
                        <p>Everything you need to build a page for deceased</p></div>
                </div>


            </div>
        </div>
    );
}

export default CreatePage;
